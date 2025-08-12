import { Schema, model, Types } from "mongoose";

export interface ISalary extends Document {
    employeeId: Types.ObjectId;
    calculatedSalary: number;
    bonus?: number;
    salaryDate: Date
}

const salarySchema = new Schema<ISalary>({
    employeeId: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    calculatedSalary: { type: Number, required: true },
    bonus: { type: Number },
    salaryDate: { type: Date, required: true },
})

export default model<ISalary>("Salary", salarySchema);
