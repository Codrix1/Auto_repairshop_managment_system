import Attendance from "../models/attendance";
import Employee from "../models/Employee";
import Deductible from "../models/Deductible";
import { Types } from "mongoose";
import { startOfMonth, endOfMonth } from "date-fns";

const applyDeductions = async (employeeId: string, baseSalary: number) => {
    const deductions = await Deductible.find({ employeeID: employeeId });

    let totalDeductionThisPeriod = 0;

    for (const d of deductions) {
        // If no remaining periods, skip deduction but keep the record
        if (d.remainingPeriods <= 0) continue;

        // Fixed deduction per period = totalDeduction / numPeriods
        const deductionPerPeriod = d.totalDeduction / d.numPeriods;

        // Add to total deductions for this period
        totalDeductionThisPeriod += deductionPerPeriod;

        // Reduce remaining periods
        d.remainingPeriods -= 1;

        // Log payment history
        d.payementDate.push({
            date: new Date(),
            amount: deductionPerPeriod
        });

        // Save updated deduction
        await d.save();
    }

    return baseSalary - totalDeductionThisPeriod;
};

// Weekly salary calculation
export const calculateSalaryByWeek = async (employeeID: string, startDate: Date, endDate: Date) => {
    const employee = await Employee.findById(employeeID);
    if (!employee) throw new Error("Employee not found to calculate salary");

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
                        1000 * 60 * 60
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
                        { $multiply: [{ $divide: ["$totalHours", 8] }, rate] }
                    ]
                }
            }
        }
    ]);

    if (!result.length) return { totalHours: 0, salary: 0 };

    const baseSalary = result[0].salary;
    const finalSalary = await applyDeductions(employeeID, baseSalary);

    return { totalHours: result[0].totalHours, salary: finalSalary };
};

// Monthly salary calculation
export const calculateSalaryByMonth = async (employeeID: string, monthDate: Date) => {
    const employee = await Employee.findById(employeeID);
    if (!employee) throw new Error("Employee not found to calculate salary");

    const rate = employee.rate;

    const startDate = startOfMonth(monthDate);
    const endDate   = endOfMonth(monthDate);

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

    if (!result.length) return { daysPresent: 0, salary: 0 };

    const baseSalary = result[0].salary;
    const finalSalary = await applyDeductions(employeeID, baseSalary);

    return { daysPresent: result[0].daysPresent, salary: finalSalary };
};