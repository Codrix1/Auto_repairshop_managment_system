import { NextFunction, Request, Response } from "express";
import Employee from "../models/Employee";
import { generateToken } from '../utils/auth'
import bcrypt from 'bcryptjs'

const addEmployee = async (request: Request, response: Response) => {
    try{
        const {name, password, role, address, phoneNumber, salary, salaryType, rate} = request.body;
        const employee = await Employee.create({name: name, password: password, role: role, address: address, phoneNumber: phoneNumber, salary: salary, salaryType: salaryType, rate: rate});
        
        if (!employee){
            response.status(500).json({message: "Error adding employee"});
            return;
        }

        response.status(200).json({message: "User registered successfully.", name: name, role: role, address: address, phoneNumber: phoneNumber, salary: salary, salaryType: salaryType, rate: rate});

    }
    catch(err: any)
    {
        response.status(500).json({message: err.message})
    }
}

const getAllEmployees = async (request: Request, response: Response) => {
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

const getEmployeeById = async (request: Request, response: Response) => {
    try{
        const employeeId = request.params.id;
        const employee = await Employee.find({_id: employeeId});
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

const updateEmployee = async (request: Request, response: Response) => {
    try{
        const employeeId = request.params.id;
        const updateFields = request.body;
        const employee = await Employee.findOneAndUpdate(
            {_id: employeeId},
            updateFields,
            { new: true, omitUndefined: true }
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

const deleteEmployee = async (request: Request, response: Response) => {
    try{
        const employeeId = request.params.id;
        const employee = await Employee.findOneAndDelete({_id: employeeId});
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
   
  // Login User
const loginEmployee = async (req: Request, res: Response) => {
    try {
      const { name, password } = req.body;
      const employee = await Employee.findOne({ name: name });
      if (employee && (await bcrypt.compare(password, employee.password))) {
        res.status(200).json({
          message: "Logged in successfully",
          _id: employee._id,
          name: employee.name,
          role: employee.role,
          address: employee.address,
          phoneNumber: employee.phoneNumber,
          salary: employee.salary,
          salaryType: employee.salaryType,
          rate: employee.rate,
          token: generateToken(employee._id),
        });
      } else {
        res.status(401).json({ error: 'Invalid Data' });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

export {loginEmployee, addEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee};