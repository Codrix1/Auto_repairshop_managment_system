import { Request, Response } from "express";
import Salary from "../models/Salary";
import { calculateSalaryByWeek, calculateSalaryByMonth } from "../utils/salary";


const addSalary = async (request: Request, response: Response) => {
    try{
        const {employeeId, calculatedSalary, bonus, salaryDate} = request.body;
        const newSalary = await Salary.create({employeeId: employeeId, calculatedSalary: calculatedSalary, bonus: bonus, salaryDate: salaryDate});

        if (!newSalary){
            response.status(500).json({message: "Error adding Salary"});
            return;
        }

        response.status(200).json({message: `Salary history for employee with ID: ${employeeId} added successfully.`, calculatedSalary: newSalary});

    }
    catch(err: any)
    {
        response.status(500).json({message: err.message})
    }
}

const getAllSalaries = async (response: Response) => {
    try{
        const salaries = await Salary.find();
        if (!salaries){
            response.status(500).json("No Salaries found")
        }
        response.status(200).json(salaries);
        return;
    }
    catch(err: any)
    {
        response.status(500).json({message: err.message})
    }
}

export const getSalaryById = async (request: Request, response: Response) => {
    try{
        const salaryId = request.params.id;
        const salary = await Salary.findById(salaryId);
        if (!salary){
            response.status(500).json("No Salary found");
            return;
        }
    }
    catch(err: any){
        response.status(500).json({message: err.message})
    }
}

const updateSalary = async (request: Request, response: Response) => {
    try{
        const salaryId = request.params.id;
        const updateFields = request.body;
        const salary = await Salary.findOneAndUpdate(
            {_id: salaryId},
            updateFields,
            { new: true, omitUndefined: true }
        );
        if (!salary){
            response.status(500).json("No Salary found");
            return;
        }
        response.status(200).json(salary);
    }
    catch(err: any)
    {
        response.status(500).json({message: err.message})
    }
}

const deleteSalary = async (request: Request, response: Response) => {
    try{
        const salaryId = request.params.id;
        const salary = await Salary.findOneAndDelete({_id: salaryId});
        if (!salary){
            response.status(500).json("No Salary found")
            return;
        }
        response.status(200).json(salary);
    }
    catch(err: any)
    {
        response.status(500).json({message: err.message})
    }
}

const calcSalaryByWeek = async (request: Request, response: Response) => {
    try{
        const salaryId = request.params.id;
        const {startDate, endDate} = request.body;
        const result = calculateSalaryByWeek(salaryId, startDate, endDate);
        if (!result){
            response.status(500).json("An error happend during calculation by week")
        }
        response.status(200).json(result);
        return;
    }
    catch(err: any)
    {
        response.status(500).json({message: err.message})
    }
}

const calcSalaryByMonth = async (request: Request, response: Response) => {
    try{
        const salaryId = request.params.id;
        const { month } = request.body; // month is of type Date
        const result = calculateSalaryByMonth(salaryId, month);
        if (!result){
            response.status(500).json("An error happend during calculation by month")
        }
        response.status(200).json(result);
        return;
    }
    catch(err: any)
    {
        response.status(500).json({message: err.message})
    }
}

export {addSalary, getAllSalaries, updateSalary, deleteSalary, calcSalaryByWeek, calcSalaryByMonth};