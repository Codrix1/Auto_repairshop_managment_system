import { Request, Response } from "express";
import Installment from "../models/Installment";
import Employee from "../models/Employee";


const addInstallment = async (request: Request, response: Response) => {
    try {
        const {  } = request.body;
        const installment = await Installment.create({  });

        if (!installment) {
            response.status(500).json({ message: "Error creating Installment" });
            return;
        }

        response.status(200).json({ message: "Installment created successfully.",  });

    }
    catch (err: any) {
        response.status(500).json({ message: err.message })
    }
}
   

const getAllInstallments = async (request: Request, response: Response) => {
    try {
        const installments = await Installment.find();
        if (!installments) {
            response.status(500).json("No Installments found")
        }
        response.status(200).json(installments);
        return;
    }
    catch (err: any) {
        response.status(500).json({ message: err.message })
    }
}

const getInstallmentById = async (request: Request, response: Response) => {
    try {
        const installmentId = request.params.id;
        const installment = await Installment.find({ _id: installmentId });
        if (!installment) {
            response.status(500).json("No Installment found")
        }
        response.status(200).json(installment);
        return;
    }
    catch (err: any) {
        response.status(500).json({ message: err.message })
    }
}

const updateInstallment = async (request: Request, response: Response) => {
    try {
        const installmentId = request.params.id;
        const updateFields = request.body;
        const installment = await Installment.findOneAndUpdate(
            { _id: installmentId },
            updateFields,
            { new: true, omitUndefined: true }
        );
        if (!installment) {
            response.status(500).json("No Installment found");
            return;
        }
        response.status(200).json(Installment);
    }
    catch (err: any) {
        response.status(500).json({ message: err.message })
    }
}

const deleteInstallment = async (request: Request, response: Response) => {
    try {
        const installmentId = request.params.id;
        const installment = await Installment.findOneAndDelete({ _id: installmentId });
        if (!installment) {
            response.status(500).json("No Installment found")
            return;
        }
        response.status(200).json(Installment);
    }
    catch (err: any) {
        response.status(500).json({ message: err.message })
    }
}



export { addInstallment, getAllInstallments, getInstallmentById, updateInstallment, deleteInstallment };