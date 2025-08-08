import { Request, Response } from "express";
import { CarPart } from "../models/carPart";

const CATEGORY_ENUM = ['Oils', 'Oil Filters', 'AC Filters', 'Air Filters', 'Petrol Filters', 'Bejohant', 'Seuor'];

export const addCarPart = async (req: Request, res: Response) => {
    try {
        const { name, buyingPrice, sellingPrice, quantity, category, External, madeIn, supplier } = req.body;
        
        // Validate required fields
        if (!name || buyingPrice == null || sellingPrice == null || quantity == null || !supplier || !category) {
            return res.status(400).json({ message: "Missing required fields: name, buyingPrice, sellingPrice, quantity, madeIn, supplier, category" });
        }
        if (!CATEGORY_ENUM.includes(category)) {
            return res.status(400).json({ message: `Invalid category. Must be one of: ${CATEGORY_ENUM.join(", ")}` });
        }

        const carPart = new CarPart({ name, buyingPrice, sellingPrice, quantity, category, External, madeIn, supplier });
        await carPart.save();
        res.status(201).json(carPart);
    }
    catch (err: any) {
        res.status(500).json({ message: "Failed to add car part", error: err.message });
    }
}

export const getAllCarParts = async (req: Request, res: Response) => {
    try {
        const carParts = await CarPart.find();
        res.status(200).json(carParts);
    }
    catch (err: any) {
        res.status(500).json({ message: "Failed to get car parts", error: err.message });
    }
}

export const getCarPartById = async (req: Request, res: Response) => {
    try {
        const carPart = await CarPart.findById(req.params.id);
        res.status(200).json(carPart);
    }
    catch (err: any) {
        res.status(500).json({ message: "Failed to get car part", error: err.message });
    }
}

export const updateCarPart = async (req: Request, res: Response) => {
    try {
        const updateFields = req.body;
        // Prevent removing required fields
        if (updateFields.hasOwnProperty('supplier') && !updateFields.supplier) {
            return res.status(400).json({ message: "Supplier is required and cannot be removed." });
        }
        if (updateFields.hasOwnProperty('category') && !CATEGORY_ENUM.includes(updateFields.category)) {
            return res.status(400).json({ message: `Invalid category. Must be one of: ${CATEGORY_ENUM.join(", ")}` });
        }
        const carPart = await CarPart.findByIdAndUpdate(req.params.id, updateFields, { new: true, omitUndefined: true });
        if (!carPart) {
            return res.status(404).json({ message: "Car part not found" });
        }
        res.status(200).json(carPart);
    }
    catch (err: any) {
        res.status(500).json({ message: "Failed to update car part", error: err.message });
    }
}

export const deleteCarPart = async (req: Request, res: Response) => {
    try {
        await CarPart.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Car part deleted successfully" });
    }
    catch (err: any) {
        res.status(500).json({ message: "Failed to delete car part", error: err.message });
    }
}