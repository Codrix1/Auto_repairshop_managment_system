import Attendance from "../models/attendance";
import Employee from "../models/Employee";
import { Types } from "mongoose";
import { startOfMonth, endOfMonth } from "date-fns";

export const calculateSalaryByWeek = async (employeeID: string, startDate: Date, endDate: Date) => {
    const employee = await Employee.findById(employeeID);

    if (!employee) {
        throw new Error("Employee not found to calculate salary");
    }

    const rate = employee.rate;

    const result = await Attendance.aggregate([
        {
            $match: {
                employeeId: new Types.ObjectId(employeeID),
                status: "present",
                attendanceDate: {
                    $gte: startDate.toISOString(),
                    $lte: endDate.toISOString()
                }
            }
        },
        {
            $addFields: {
                checkInDate: {
                    $dateFromString: {
                        dateString: { $concat: ["$attendanceDate", "T", "$checkIn"] },
                        format: "%Y-%m-%dT%H:%M"
                    }
                },
                checkOutDate: {
                    $dateFromString: {
                        dateString: { $concat: ["$attendanceDate", "T", "$checkOut"] },
                        format: "%Y-%m-%dT%H:%M"
                    }
                }
            }
        },
        {
            $addFields: {
                workedHours: {
                    $divide: [
                        { $subtract: ["$checkOutDate", "$checkInDate"] },
                        1000 * 60 * 60 // ms → hours
                    ]
                }
            }
        },
        {
            $group: {
                _id: null,
                totalHours: { $sum: "$workedHours" }
            }
        },
        {
            $project: {
                _id: 0,
                totalHours: 1,
                salary: {
                    $cond: [
                        { $eq: [employee.salaryType, "hourly"] },
                        { $multiply: ["$totalHours", rate] },
                        { $multiply: [{ $divide: ["$totalHours", 8] }, rate] } // 8 hrs/day
                    ]
                }
            }
        }
    ]);

    return result[0] || { totalHours: 0, salary: 0 };
};

export const calculateSalaryByMonth = async (employeeID: string, monthDate: Date) => {
    const employee = await Employee.findById(employeeID);

    if (!employee) {
        throw new Error("Employee not found to calculate salary");
    }

    const rate = employee.rate;

    // Month start & end
    const startDate = startOfMonth(monthDate);
    const endDate = endOfMonth(monthDate);

    const result = await Attendance.aggregate([
        {
            $match: {
                employeeId: new Types.ObjectId(employeeID),
                status: "present",
                attendanceDate: {
                    $gte: startDate.toISOString(),
                    $lte: endDate.toISOString()
                }
            }
        },
        {
            $group: {
                _id: null,
                daysPresent: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 0,
                daysPresent: 1,
                salary: { $multiply: ["$daysPresent", rate] }
            }
        }
    ]);

    return result[0] || { daysPresent: 0, salary: 0 };
};