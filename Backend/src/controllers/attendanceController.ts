import { Request, Response } from "express";
import Attendance from "../models/attendance";


export const getAllAttendances = async (req: Request, res: Response) => {
    try {
        const attendances = await Attendance.find();
        if(!attendances)
        {
            res.status(500).json({message: "error fetching attendances"})
            return;
        }
    }
    catch(err: unknown)
    {
        res.status(500).json({message: err})
    }
}

export const getAttendanceById = async (req: Request, res: Response) => {
    try {
        const attendance = await Attendance.findById(req.params.id);
        if(!attendance)
        {
            res.status(404).json({message: "attendance not found"})
            return;
        }
    }
    catch(err: unknown)
    {
        res.status(500).json({message: err})
    }
}

export const takeAttendance = async (req: Request, res: Response) => {
    try {
        const {employeeId, checkIn, checkOut, status, note} = req.body;
        const now = new Date();
        const mm = now.getMonth() + 1;
        const dd = now.getDate();
        const yyyy = now.getFullYear();
        const attendanceDate = `${yyyy}-${mm}-${dd}`;
        const attendance = await Attendance.create({employeeId, attendanceDate: attendanceDate, checkIn: attendanceDate, status, note});
        if(!attendance)
        {
            res.status(500).json({message: "error adding attendance"})
            return;
        }
        res.status(200).json(attendance);
    }
    catch(err: unknown)
    {
        res.status(500).json({message: err})
    }
}