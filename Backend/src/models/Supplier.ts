import { Schema, model, Document, Types } from 'mongoose';

export interface ISupplier extends Document {
  supplierName: string;
  supplierPhone: string;
  supplierAddress: string;
}

const SupplierSchema = new Schema<ISupplier>({
    supplierName: { type: String, required: true },
    supplierPhone: { type: String, required: true },
    supplierAddress: { type: String, required: true },
});

export default model<ISupplier>('Supplier', SupplierSchema);