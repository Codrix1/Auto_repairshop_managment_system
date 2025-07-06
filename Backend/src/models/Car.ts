import { Schema, model, Document } from 'mongoose';

export interface ICar extends Document {
  customerName: string;
  phone: string;
  carType: string;
  carModel: string;
  carNumber: string;
  carColor: string;
  mileage: number; 
  entryDate: Date;
}

const CarSchema = new Schema<ICar>({
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  carType: { type: String, required: true },
  carModel: { type: String, required: true },
  carNumber: { type: String, required: true },
  carColor: { type: String, required: true },
  mileage: { type: Number, required: true },
  entryDate: { type: Date, required: true, default: Date.now }
});

export default model<ICar>('Car', CarSchema);
