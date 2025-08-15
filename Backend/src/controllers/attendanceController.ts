import { Request, Response } from "express";
import Attendance from "../models/attendance";
import Employee from "../models/Employee";

export const getAllAttendances = async (req: Request, res: Response) => {
    try {
        const attendances = await Attendance.find().populate('employeeId', 'name phoneNumber');
        if(!attendances)
        {
            res.status(500).json({message: "error fetching attendances"})
            return;
        }
        res.status(200).json(attendances);
    }
    catch(err: any)
    {
        res.status(500).json({message: err.message})
    }
}

export const setDailyAttendanceRecords = async (req: Request, res: Response) => {
    try {
        const currentEmployees = await Employee.find({ $or: [{ "role": "mechanic" }, { "role": "secertary" }] })
        currentEmployees.forEach(async employee => {
            const now = new Date();
            const yyyy = now.getFullYear();
            const mm = String(now.getMonth() + 1).padStart(2, '0');
            const dd = String(now.getDate()).padStart(2, '0');
            const attendanceDate = `${yyyy}-${mm}-${dd}`;
            await Attendance.create({ employeeId: employee._id, attendanceDate: attendanceDate })
        });
    }
    catch (err: any) {
        res.status(500).json({ message: err.message })
    }


}

export const getAttendanceById = async (req: Request, res: Response) => {
    try {
        const attendance = await Attendance.findById(req.params.id);
        if(!attendance)
        {
            res.status(404).json({message: "Attendance not found"})
            return;
        }
        res.status(200).json(attendance);
    }
    catch(err: any)
    {
        res.status(500).json({message: err.message})
    }
}

export const takeAttendance = async (req: Request, res: Response) => {
    try {
        const { employeeId, status, note } = req.body;
        const now = new Date();
        const yyyy = now.getFullYear();
        const mm = String(now.getMonth() + 1).padStart(2, '0'); 
        const dd = String(now.getDate()).padStart(2, '0');      
        const attendanceDate = `${yyyy}-${mm}-${dd}`;           
        console.log(attendanceDate);
        const attendance = await Attendance.create({employeeId, attendanceDate: attendanceDate, status, note});
        if(!attendance)
        {
            res.status(500).json({message: "error adding attendance"})
            return;
        }
        res.status(200).json(attendance);
    }
    catch(err: any)
    {
        res.status(500).json({message: err.message})
    }
}

export const checkInEmployee = async (req: Request, res: Response) => {
    try {
        const {employeeId} = req.body;
        const now = new Date();
        const yyyy = now.getFullYear();
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const dd = String(now.getDate()).padStart(2, '0');
        const hh = String(now.getHours()).padStart(2, '0');
        const min = String(now.getMinutes()).padStart(2, '0');
            
        const checkIn = `${yyyy}-${mm}-${dd} ${hh}:${min}`;
        const attendanceDate = `${yyyy}-${mm}-${dd}`;
        const attendance = await Attendance.findOneAndUpdate({employeeId, attendanceDate: attendanceDate}, {checkIn: checkIn}, {new: true});
        if(!attendance)
        {
            res.status(500).json({message: "error checking in employee"})
            return;
        }
        res.status(200).json(attendance);
    }
    catch(err: any)
    {
        res.status(500).json({message: err.message})
    }
}

export const checkOutEmployee = async (req: Request, res: Response) => {
    try {
        const {employeeId, status, note} = req.body;
        const now = new Date();
        const yyyy = now.getFullYear();
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const dd = String(now.getDate()).padStart(2, '0');
        const hh = String(now.getHours()).padStart(2, '0');
        const min = String(now.getMinutes()).padStart(2, '0');

        const checkOut = `${yyyy}-${mm}-${dd} ${hh}:${min}`;
        const attendanceDate = `${yyyy}-${mm}-${dd}`;
        const attendance = await Attendance.findOneAndUpdate({employeeId, attendanceDate: attendanceDate}, {checkOut: checkOut, status, note}, {new: true});
        if(!attendance)
        {
            res.status(500).json({message: "error checking out employee"})
            return;
        }
        res.status(200).json(attendance);
    }
    catch(err: any)
    {
        res.status(500).json({message: err.message})
    }
}

export const getAttendanceByEmployeeId = async (req: Request, res: Response) => {
    try {
        const {employeeId} = req.params;
        const attendance = await Attendance.find({employeeId}).populate('employeeId', 'employeeName employeePhone');
        if(!attendance)
        {
            res.status(404).json({message: "Attendance not found"})
            return;
        }
        res.status(200).json(attendance);
    }
    catch(err: any)
    {
        res.status(500).json({message: err.message})
    }
}

export const getAttendanceByDate = async (req: Request, res: Response) => {
    try {
        const {date} = req.params;
        const attendance = await Attendance.find({attendanceDate: date}).populate('employeeId', 'employeeName employeePhone');
        if(!attendance)
        {
            res.status(404).json({message: "Attendance not found"})
            return;
        }
        res.status(200).json(attendance);
    }
    catch(err: any)
    {
        res.status(500).json({message: err.message})
    }
}

export const updateAttendance = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const updateFields = req.body;
        const attendance = await Attendance.findByIdAndUpdate(id, updateFields, {new: true, omitUndefined: true});
        if(!attendance)
        {
            res.status(404).json({message: "Attendance not found"})
            return;
        }
        res.status(200).json(attendance);
    }
    catch(err: any)
    {
        res.status(500).json({message: err.message})
    }
}

export const removeAttendance = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const attendance = await Attendance.findByIdAndDelete(id);
        if(!attendance)
        {
            res.status(404).json({message: "Attendance not found"})
            return;
        }
        res.status(200).json(attendance);
    }
    catch(err: any)
    {
        res.status(500).json({message: err.message})
    }
}