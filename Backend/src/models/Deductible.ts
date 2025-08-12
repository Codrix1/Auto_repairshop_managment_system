import { Schema, model, Document, Types } from 'mongoose';

export interface IDeductible extends Document {
    employeeID: Types.ObjectId;
    numPeriods: number;
    remainingPeriods: number;
    totalDeduction: number;    // total money to deduct
    reason: string;
    deductibleDate: Date;
    payementDate: {
        date: Date, 
        amount: number;
    }[];
}

const DeductibleSchema = new Schema<IDeductible>({
    employeeID:           { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    numPeriods:           { type: Number, required: true },
    remainingPeriods:     { type: Number, required: true },
    totalDeduction:       { type: Number, required: true },
    reason:               { type: String, required: true },
    deductibleDate:       { type: Date, required: true },
    payementDate:       { type: [{
        date: Date, 
        amount: Number,
    }], required: true },
});

export default model<IDeductible>('Deductible', DeductibleSchema);