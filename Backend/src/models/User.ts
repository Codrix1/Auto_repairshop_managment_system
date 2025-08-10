import bcrypt from 'bcryptjs'
import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    password: string;
    role: 'mechanic' | 'secertary' | 'admin';
    permissions: string[]
}

const UserSchema = new Schema<IUser>({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['mechanic', 'secertary', 'admin', 'none'],
        default: 'mechanic'
    },
    permissions: [{ type: String , required: true}]
});

// Pre-save middleware to hash passwords
UserSchema.pre('save', async function (next) {

    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();

});

export default model<IUser>('User', UserSchema);
