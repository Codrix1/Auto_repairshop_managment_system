import { Router } from "express";
import { checkInEmployee, checkOutEmployee, getAllAttendances, getAttendanceByDate, getAttendanceByEmployeeId, getAttendanceById, removeAttendance, takeAttendance, updateAttendance } from "../controllers/attendanceController";
import { authMiddleware } from "../middlewares/authMiddleWare";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const attendanceRouter = Router();

attendanceRouter.get("/", authMiddleware, getAllAttendances);
attendanceRouter.get("/:id", authMiddleware, getAttendanceById);
attendanceRouter.post("/", authMiddleware, takeAttendance);
attendanceRouter.post("/checkin", authMiddleware, checkInEmployee);
attendanceRouter.post("/checkout", authMiddleware, checkOutEmployee);
attendanceRouter.get("/employee/:employeeId", authMiddleware, getAttendanceByEmployeeId);
attendanceRouter.get("/date/:date", authMiddleware, getAttendanceByDate);
attendanceRouter.put("/:id", authMiddleware, updateAttendance);
attendanceRouter.delete("/:id", authMiddleware,removeAttendance);

export default attendanceRouter;