import { Router } from "express";
import { getAllAttendances, getAttendanceById, takeAttendance } from "../controllers/attendanceController";

const attendanceRouter = Router();

attendanceRouter.get("/", getAllAttendances);
attendanceRouter.get("/:id", getAttendanceById);
attendanceRouter.post("/", takeAttendance);


export default attendanceRouter;