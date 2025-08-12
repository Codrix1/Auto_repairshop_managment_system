import { Request, Response } from "express";
import Deductible from "../models/Deductible";
import Employee from "../models/Employee";


const addDeductible = async (request: Request, response: Response) => {
    try {
        const { employeeID, totalDeduction, numPeriods, remainingPeriods, reason, deductibleDate, payementDate } = request.body;
        const deductible = await Deductible.create({ employeeID: employeeID, totalDeduction: totalDeduction, numPeriods: numPeriods, remainingPeriods: remainingPeriods, reason: reason, deductibleDate: deductibleDate, payementDate: payementDate });

        if (!deductible) {
            response.status(500).json({ message: "Error creating Deductible" });
            return;
        }

        response.status(200).json({ message: "Deductible created successfully.",  employeeID: employeeID, totalDeduction: totalDeduction, numPeriods: numPeriods, remainingPeriods: remainingPeriods, reason: reason, deductibleDate: deductibleDate, payementDate: payementDate });
    }
    catch (err: any) {
        response.status(500).json({ message: err.message })
    }
}
   

const getAllDeductibles = async (request: Request, response: Response) => {
    try {
        const deductibles = await Deductible.find();
        if (!deductibles) {
            response.status(500).json("No Deductibles found")
        }
        response.status(200).json(deductibles);
        return;
    }
    catch (err: any) {
        response.status(500).json({ message: err.message })
    }
}

const getDeductibleById = async (request: Request, response: Response) => {
    try {
        const deductibleId = request.params.id;
        const deductible = await Deductible.find({ _id: deductibleId });
        if (!deductible) {
            response.status(500).json("No Deductible found")
        }
        response.status(200).json(deductible);
        return;
    }
    catch (err: any) {
        response.status(500).json({ message: err.message })
    }
}

const updateDeductible = async (request: Request, response: Response) => {
    try {
        const deductibleId = request.params.id;
        const updateFields = request.body;
        const deductible = await Deductible.findOneAndUpdate(
            { _id: deductibleId },
            updateFields,
            { new: true, omitUndefined: true }
        );
        if (!deductible) {
            response.status(500).json("No Deductible found");
            return;
        }
        response.status(200).json(deductible);
    }
    catch (err: any) {
        response.status(500).json({ message: err.message })
    }
}

const deleteDeductible = async (request: Request, response: Response) => {
    try {
        const deductibleId = request.params.id;
        const deductible = await Deductible.findOneAndDelete({ _id: deductibleId });
        if (!deductible) {
            response.status(500).json("No Deductible found")
            return;
        }
        response.status(200).json(deductible);
    }
    catch (err: any) {
        response.status(500).json({ message: err.message })
    }
}



export { addDeductible, getAllDeductibles, getDeductibleById, updateDeductible, deleteDeductible };