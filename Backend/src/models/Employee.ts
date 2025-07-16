import bcrypt from 'bcryptjs'
import { Schema, model, Document } from 'mongoose';

export interface IEmployee extends Document {
  name: string;
  password: string;
  phoneNumber: string;
  address: string;
  salary: number;
  rate: number;
  role: 'mechanic' | 'secertary' | 'admin';
}

const EmployeeSchema = new Schema<IEmployee>({
  name: { type: String, required: true },
  password: { type: String, required: true },
  salary: { type: Number, required: true },
  rate: { type: Number, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  role: {
    type: String,
    enum: ['mechanic', 'secertary', 'admin'],
    default: 'mechanic'
  },
});

// Pre-save middleware to hash passwords
EmployeeSchema.pre('save', async function (next) {

  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();

});

export default model<IEmployee>('Employee', EmployeeSchema);
