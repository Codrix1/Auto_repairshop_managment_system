import { Schema, model, Document, Types } from 'mongoose';

export interface IInstallment extends Document {
    
}

const InstallmentSchema = new Schema<IInstallment>({
    
});

export default model<IInstallment>('Installment', InstallmentSchema);