import { Request, Response, NextFunction } from "express";
import { CarPart } from "../models/carPart";

export const addCarPart = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const {name,buyingPrice,sellingPrice,quantity,category,isImported,madeIn,supplier} = req.body;
        const carPart = new CarPart({name,buyingPrice,sellingPrice,quantity,category,isImported,madeIn,supplier});
        await carPart.save();
        res.status(201).json(carPart);
    }
    catch(err: any){
        res.status(500).json({message: "Failed to add car part",error: err.message});
    }
}

export const getAllCarParts = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const carParts = await CarPart.find();
        res.status(200).json(carParts);
    }
    catch(err: any){
        res.status(500).json({message: "Failed to get car parts",error: err.message});
    }
}

export const getCarPartById = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const carPart = await CarPart.findById(req.params.id);
        res.status(200).json(carPart);
    }
    catch(err: any){
        res.status(500).json({message: "Failed to get car part",error: err.message});
    }
}

export const updateCarPart = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const updateFields = req.body;
        const carPart = await CarPart.findByIdAndUpdate(req.params.id,updateFields,{new: true,omitUndefined: true});
        if(!carPart){
            return res.status(404).json({message: "Car part not found"});
        }
        res.status(200).json(carPart);
    }
    catch(err: any){
        res.status(500).json({message: "Failed to update car part",error: err.message});
    }
}

export const deleteCarPart = async (req:Request,res:Response,next:NextFunction) => {
    try {
        await CarPart.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Car part deleted successfully"});
    }
    catch(err: any){
        res.status(500).json({message: "Failed to delete car part",error: err.message});
    }
}