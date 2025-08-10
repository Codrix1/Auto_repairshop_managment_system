import { NextFunction, Request, Response } from "express";
import { generateToken } from '../utils/auth'
import User from "../models/User";
import Employee from "../models/Employee";


const addEmployee = async (request: Request, response: Response) => {
    try {
        const { name, role, address, phoneNumber, salary, salaryType, rate } = request.body;
        const employee = await Employee.create({ name: name, role: role, address: address, phoneNumber: phoneNumber, salary: salary, salaryType: salaryType, rate: rate });

        if (!Employee) {
            response.status(500).json({ message: "Error adding employee" });
            return;
        }

        response.status(200).json({ message: "Employee registered successfully.", name: name, role: role, address: address, phoneNumber: phoneNumber, salary: salary, salaryType: salaryType, rate: rate });

    }
    catch (err: any) {
        response.status(500).json({ message: err.message })
    }
}
   

const getAllEmployees = async (request: Request, response: Response) => {
    try {
        const employees = await Employee.find();
        if (!employees) {
            response.status(500).json("No employees found")
        }
        response.status(200).json(employees);
        return;
    }
    catch (err: any) {
        response.status(500).json({ message: err.message })
    }
}

const getEmployeeById = async (request: Request, response: Response) => {
    try {
        const employeeId = request.params.id;
        const employee = await Employee.find({ _id: employeeId });
        if (!employee) {
            response.status(500).json("No employee found")
        }
        response.status(200).json(employee);
        return;
    }
    catch (err: any) {
        response.status(500).json({ message: err.message })
    }
}

const updateEmployee = async (request: Request, response: Response) => {
    try {
        const employeeId = request.params.id;
        const updateFields = request.body;
        const employee = await Employee.findOneAndUpdate(
            { _id: employeeId },
            updateFields,
            { new: true, omitUndefined: true }
        );
        if (!employee) {
            response.status(500).json("No employee found");
            return;
        }
        response.status(200).json(employee);
    }
    catch (err: any) {
        response.status(500).json({ message: err.message })
    }
}

const deleteEmployee = async (request: Request, response: Response) => {
    try {
        const employeeId = request.params.id;
        const employee = await Employee.findOneAndDelete({ _id: employeeId });
        if (!employee) {
            response.status(500).json("No employee found")
            return;
        }
        response.status(200).json(employee);
    }
    catch (err: any) {
        response.status(500).json({ message: err.message })
    }
}



export { addEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee};