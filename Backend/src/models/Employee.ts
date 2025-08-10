import { Schema, model, Document } from 'mongoose';

export interface IEmployee extends Document {
  name: string;
  phoneNumber: string;
  address: string;
  salary: number;
  salaryType: string;
  rate: number;
  role: 'mechanic' | 'secertary' | 'admin';
}

const EmployeeSchema = new Schema<IEmployee>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  salary: { type: Number, required: true },
  salaryType: { type: String, enum: ['hourly', 'monthly'], required: true },
  rate: { type: Number, required: true },
  role: {
    type: String,
    enum: ['mechanic', 'secertary', 'admin'],
    default: 'mechanic'
  },
});


export default model<IEmployee>('Employee', EmployeeSchema);
