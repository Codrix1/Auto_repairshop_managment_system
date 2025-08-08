import { Schema, model, Types } from "mongoose";


export interface ISalary extends Document {
    employeeId: Types.ObjectId;
    salaryType: string;
    rate: number;
}

const salarySchema = new Schema<ISalary>({
    employeeId: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    salaryType: { type: String, enum: ['hourly', 'monthly'], required: true },
    rate: { type: Number, required: true },
})

export default model<ISalary>("Salary", salarySchema);
