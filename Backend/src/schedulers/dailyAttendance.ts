import cron from 'node-cron';
import Employee from '../models/Employee';
import Attendance from '../models/attendance';

export const scheduleDailyAttendance = () => {
    cron.schedule('0 8 * * *', async () => {
        try {
            console.log("Running daily attendance scheduler...");

            const currentEmployees = await Employee.find({
                role: { $in: ["mechanic", "secretary"] }
            });

            const now = new Date();
            const yyyy = now.getFullYear();
            const mm = String(now.getMonth() + 1).padStart(2, '0');
            const dd = String(now.getDate()).padStart(2, '0');
            const attendanceDate = `${yyyy}-${mm}-${dd}`;

            for (const employee of currentEmployees) {
                const exists = await Attendance.findOne({
                    employeeId: employee._id,
                    attendanceDate
                });

                if (!exists) {
                    await Attendance.create({
                        employeeId: employee._id,
                        attendanceDate
                    });
                }
            }

            console.log("Daily attendance records created.");
        } catch (err) {
            console.error("Error in daily attendance scheduler:", err);
        }
    }, {
        timezone: "Africa/Cairo" // set your timezone here
    });
};