import { Schema, model, Document, Types } from 'mongoose';

export interface IWork extends Document {
    workType: string;
    workPrice: number;
    workMechanic: Types.ObjectId;
}

const WorkSchema = new Schema<IWork>({
    workType:     { type: String, required: true },
    workPrice:    { type: Number, required: true },
    workMechanic: {type: Schema.Types.ObjectId, ref: "Employee", required: true},
});

export default model<IWork>('Work', WorkSchema);