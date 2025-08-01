import { Schema, model, Document, Types } from 'mongoose';

export interface ICustomer extends Document {
  customerName: string;
  customerPhone: string;
}

const CustomerSchema = new Schema<ICustomer>({
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
});

export default model<ICustomer>('Customer', CustomerSchema);