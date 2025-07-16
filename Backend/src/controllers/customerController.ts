import { NextFunction, Request, Response } from "express";
import Customer from "../models/customer";


const addCustomer = async (request: Request, response: Response, next: NextFunction) => {
    try{
        const {name, phone} = request.body;
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

const getAllCustomers = async (request: Request, response: Response, next: NextFunction) => {
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

const getCustomerById = async (request: Request, response: Response, next: NextFunction) => {
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

const updateCustomer = async (request: Request, response: Response, next: NextFunction) => {
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

const deleteCustomer = async (request: Request, response: Response, next: NextFunction) => {
    try{
        const customerId = request.params.id;
        const customer = await Customer.findOneAndDelete({_id:customerId});
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

export {addCustomer,getAllCustomers, getCustomerById, updateCustomer, deleteCustomer};