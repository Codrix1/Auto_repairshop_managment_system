import { Request, Response } from "express";
import Supplier from "../models/Supplier";

export const addSupplier = async (req: Request, res: Response) => {
  try {
    const { supplierName, supplierPhone, supplierAddress } = req.body;

    if (!supplierName || !supplierPhone || !supplierAddress) {
      return res.status(400).json({
        message: "Missing required fields: supplierName, supplierPhone, supplierAddress",
      });
    }

    const supplier = await Supplier.create({
      supplierName,
      supplierPhone,
      supplierAddress,
    });

    res.status(201).json(supplier);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllSuppliers = async (_req: Request, res: Response) => {
  try {
    const suppliers = await Supplier.find();
    res.status(200).json(suppliers);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getSupplierById = async (req: Request, res: Response) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    res.status(200).json(supplier);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const updateSupplier = async (req: Request, res: Response) => {
  try {
    const updateFields = req.body;
    const supplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, omitUndefined: true }
    );
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    res.status(200).json(supplier);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};


