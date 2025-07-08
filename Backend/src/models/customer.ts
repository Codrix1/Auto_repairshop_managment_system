import { Schema, model, Document, Types } from 'mongoose';

export interface ICustomer extends Document {
  customerId: Types.ObjectId;
  customerName: string;
  customerPhone: string;
}

const CustomerSchema = new Schema<ICustomer>({
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
});

export default model<ICustomer>('Customer', CustomerSchema);