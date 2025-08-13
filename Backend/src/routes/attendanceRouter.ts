import { Router } from "express";
import { checkInEmployee, checkOutEmployee, getAllAttendances, getAttendanceByDate, getAttendanceByEmployeeId, getAttendanceById, removeAttendance, takeAttendance, updateAttendance } from "../controllers/attendanceController";
import { authMiddleware } from "../middlewares/authMiddleWare";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const attendanceRouter = Router();

attendanceRouter.get("/", authMiddleware, getAllAttendances);
attendanceRouter.get("/:id", authMiddleware, getAttendanceById);
attendanceRouter.post("/", authMiddleware, roleMiddleware("admin") , takeAttendance);
attendanceRouter.post("/checkin", authMiddleware, roleMiddleware("admin") ,checkInEmployee);
attendanceRouter.post("/checkout", authMiddleware, roleMiddleware("admin") , checkOutEmployee);
attendanceRouter.get("/employee/:employeeId", authMiddleware, getAttendanceByEmployeeId);
attendanceRouter.get("/date/:date", authMiddleware, getAttendanceByDate);
attendanceRouter.put("/:id", authMiddleware, roleMiddleware("admin") , updateAttendance);
attendanceRouter.delete("/:id", authMiddleware, roleMiddleware("admin") ,removeAttendance);

export default attendanceRouter;