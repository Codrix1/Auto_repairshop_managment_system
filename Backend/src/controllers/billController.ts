import { Request, Response } from "express";
import Bill from "../models/Bill";


const addBill = async (request: Request, response: Response) => {
    try{
        const { customerID, partsUsed, totalPrice, billType } = request.body;
        const newBill = await Bill.create({customerID: customerID, partsUsed: partsUsed, totalPrice: totalPrice, billType: billType});

        if (!newBill){
            response.status(500).json({message: "Error adding bill"});
            return;
        }

        response.status(200).json({message: `Bill added successfully.`});

    }
    catch(err: any)
    {
        response.status(500).json({message: err.message})
    }
}

const getAllBills = async (response: Response) => {
    try{
        const bills = await Bill.find();
        if (!bills){
            response.status(500).json("No bills found")
        }
        response.status(200).json(bills);
        return;
    }
    catch(err: any)
    {
        response.status(500).json({message: err.message})
    }
}

const getBillById = async (request: Request, response: Response) => {
    try{
        const billId = request.params.id;
        const bill = await Bill.findById(billId);
        if (!bill){
            response.status(500).json("No bill found");
            return;
        }
        response.status(200).json(bill);
    }
    catch(err: any)
    {
        response.status(500).json({message: err.message})
    }
}

const updateBill = async (request: Request, response: Response) => {
    try{
        const billId = request.params.id;
        const updateFields = request.body;
        const bill = await Bill.findOneAndUpdate(
            {_id: billId},
            updateFields,
            { new: true, omitUndefined: true }
        );
        if (!bill){
            response.status(500).json("No bill found");
            return;
        }
        response.status(200).json(bill);
    }
    catch(err: any)
    {
        response.status(500).json({message: err.message})
    }
}

const deleteBill = async (request: Request, response: Response) => {
    try{
        const billId = request.params.id;
        const bill = await Bill.findOneAndDelete({_id: billId});
        if (!bill){
            response.status(500).json("No Bill found")
            return;
        }
        response.status(200).json(Bill);
    }
    catch(err: any)
    {
        response.status(500).json({message: err.message})
    }
}

export {addBill, getAllBills, getBillById, updateBill, deleteBill};