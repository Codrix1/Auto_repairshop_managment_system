import { Schema, model, Document, Types } from 'mongoose';

export interface ICarPart extends Document {
    name: string;
    buyingPrice: number;
    sellingPrice: number;
    quantity: number;
    category: string;
    isImported?: boolean;
    madeIn: string;
    supplier?: string;
}

const CarPartSchema = new Schema({
    name: { type: String, required: true },
    buyingPrice: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
    category: { type: String, required: true },
    isImported: { type: Boolean, default: false },
    madeIn: { type: String, required: true },
    supplier: { type: String,},
});

export const CarPart = model<ICarPart>('CarPart', CarPartSchema);