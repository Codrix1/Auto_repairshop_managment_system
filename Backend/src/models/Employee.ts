import { Schema, model, Document } from 'mongoose';

export interface IEmployee extends Document {
  name: string;
  phoneNumber: string;
  address: string;
  salary: number;
}

const EmployeeSchema = new Schema<IEmployee>({
name: { type: String, required: true },
salary: { type: Number, required: true },
address: { type: String, required: true },
phoneNumber: { type: String, required: true },
});


export default model<IEmployee>('Employee', EmployeeSchema);
