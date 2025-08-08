import { Schema, model, Document, Types } from 'mongoose';

export interface ICarPart extends Document {
    name: string;
    buyingPrice: number;
    sellingPrice: number;
    quantity: number;
    External?: boolean;
    madeIn?: string;
    supplier: Types.ObjectId;
    category: 'Oils' | 'Oil Filters' | 'AC Filters' | 'Air Filters' | 'Petrol Filters' | 'Bejohant' | 'Seuor';
}

const CarPartSchema = new Schema({
    name: { type: String, required: true },
    buyingPrice: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
    External: { type: Boolean, default: false },
    madeIn: { type: String, default: "Egypt" },
    supplier: {type: Schema.Types.ObjectId, ref: "Supplier", required: true },
    category: {
        type: String,
        enum: ['Oils', 'Oil Filters', 'AC Filters', 'Air Filters', 'Petrol Filters', 'Bejohant', 'Seuor'],
        default: 'mechanic'
    },
});

export const CarPart = model<ICarPart>('CarPart', CarPartSchema);