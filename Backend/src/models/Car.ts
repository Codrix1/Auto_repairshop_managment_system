import { Schema, model, Document, Types } from 'mongoose';

export interface ICar extends Document {
  customerId: Types.ObjectId;
  carName: string;
  carModel: string;
  licensePlate: string;
  carColor: string;
  mileage: number; 
  entryDate: Date;
}

const CarSchema = new Schema<ICar>({
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  carName: { type: String, required: true },
  carModel: { type: String, required: true },
  licensePlate: { type: String, required: true },
  carColor: { type: String, required: true },
  mileage: { type: Number, required: true },
  entryDate: { type: Date, required: true, default: Date.now }
});

export default model<ICar>('Car', CarSchema);
