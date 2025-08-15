import { Request, Response } from "express";
import Customer from "../models/customer";
import Employee from "../models/Employee";
import Attendance from "../models/attendance";

const addCustomer = async (request: Request, response: Response) => {
    try {
        const { name, phone } = request.body;
        const customer = await Customer.create({customerName: name, customerPhone: phone});
        
        if (!customer){
            response.status(500).json({message: "error adding customer"});
            return;
        }

        response.status(200).json(customer);
    }
    catch(err: unknown)
    {
        response.status(500).json({message: err})
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


const getAllCustomers = async (request: Request, response: Response) => {
    try{
        const customers = await Customer.find();
        if (!customers){
            response.status(500).json("No customers found")
        }
        response.status(200).json(customers);
        return;
    }
    catch(err: any)
    {
        response.status(500).json({message: err.message})
    }
}

const getCustomerById = async (request: Request, response: Response) => {
    try{
        const customerId = request.params.id;
        const customer = await Customer.find({_id:customerId});
        if (!customer){
            response.status(500).json("No customer found")
        }
        response.status(200).json(customer);
        return;
    }
    catch(err: any)
    {
        response.status(500).json({message: err.message})
    }
}

const updateCustomer = async (request: Request, response: Response) => {
    try{
        const customerId = request.params.id;
        const updateFields = request.body;
        const customer = await Customer.findOneAndUpdate(
            {_id:customerId},
            updateFields,
            { new: true, omitUndefined: true }
        );
        if (!customer){
            response.status(500).json("No customer found");
            return;
        }
        response.status(200).json(customer);
    }
    catch(err: any)
    {
        response.status(500).json({message: err.message})
    }
}

const deleteCustomer = async (request: Request, response: Response) => {
    try{
        const customerId = request.params.id;
        const customer = await Customer.findOneAndDelete({_id: customerId});
        if (!customer){
            response.status(500).json("No customer found")
            return;
        }
        response.status(200).json(customer);
    }
    catch(err: any)
    {
        response.status(500).json({message: err.message})
    }
}

export {addCustomer, getAllCustomers, getCustomerById, updateCustomer, deleteCustomer};