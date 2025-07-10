import { NextFunction, Request, Response } from "express";
import Employee from "../models/Employee";
import { Error } from "mongoose";


const addEmployee = async (request: Request, response: Response, next: NextFunction) => {
    try{
        const {name, salary, address, phoneNumber} = request.body;
        const employee = await Employee.create({name: name, salary: salary, address: address, phoneNumber: phoneNumber});
        
        if (!employee){
            response.status(500).json({message: "error adding employee"});
            return;
        }

        response.status(200).json(employee);
    }
    catch(err: any)
    {
        response.status(500).json({message: err.message})
    }
}

const getAllEmployees = async (request: Request, response: Response, next: NextFunction) => {
    try{
        const employees = await Employee.find();
        if (!employees){
            response.status(500).json("No employees found")
        }
        response.status(200).json(employees);
        return;
    }
    catch(err: any)
    {
        response.status(500).json({message: err.message})
    }
}

const getEmployeeById = async (request: Request, response: Response, next: NextFunction) => {
    try{
        const employeeId = request.params.id;
        const employee = await Employee.find({_id:employeeId});
        if (!employee){
            response.status(500).json("No employee found")
        }
        response.status(200).json(employee);
        return;
    }
    catch(err: any)
    {
        response.status(500).json({message: err.message})
    }
}

const updateEmployee = async (request: Request, response: Response, next: NextFunction) => {
    try{
        const employeeId = request.params.id;
        const {name, salary, address, phoneNumber} = request.body;
        const employee = await Employee.findOneAndUpdate(
            {_id:employeeId},
            {name, salary, address, phoneNumber},
            { new: true }
        );
        if (!employee){
            response.status(500).json("No employee found");
            return;
        }
        response.status(200).json(employee);
    }
    catch(err: any)
    {
        response.status(500).json({message: err.message})
    }
}

const deleteEmployee = async (request: Request, response: Response, next: NextFunction) => {
    try{
        const employeeId = request.params.id;
        const employee = await Employee.findOneAndDelete({_id:employeeId});
        if (!employee){
            response.status(500).json("No employee found")
            return;
        }
        response.status(200).json(employee);
    }
    catch(err: any)
    {
        response.status(500).json({message: err.message})
    }
}

export {addEmployee,getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee};