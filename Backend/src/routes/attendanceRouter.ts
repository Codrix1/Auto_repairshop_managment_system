import { Router } from "express";
import { checkInEmployee, checkOutEmployee, getAllAttendances, getAttendanceByDate, getAttendanceByEmployeeId, getAttendanceById, removeAttendance, takeAttendance, updateAttendance } from "../controllers/attendanceController";

const attendanceRouter = Router();

attendanceRouter.get("/", getAllAttendances);
attendanceRouter.get("/:id", getAttendanceById);
attendanceRouter.post("/", takeAttendance);
attendanceRouter.post("/checkin", checkInEmployee);
attendanceRouter.post("/checkout", checkOutEmployee);
attendanceRouter.get("/employee/:employeeId", getAttendanceByEmployeeId);
attendanceRouter.get("/date/:date", getAttendanceByDate);
attendanceRouter.put("/:id", updateAttendance);
attendanceRouter.delete("/:id", removeAttendance);

export default attendanceRouter;