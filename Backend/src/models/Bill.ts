import { Schema, model, Types } from "mongoose";

export interface IBill extends Document {
    customerID: Types.ObjectId;
    partsUsed: {
        partID: Types.ObjectId;
        quantity: number;
    }[];
    totalPrice: number;
    workDone: Types.ObjectId[];
    billType: "Open" | "Close";
}

const billSchema = new Schema<IBill>({
    customerID: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
    partsUsed: [{
        partID: { type: Types.ObjectId, ref: "CarPart", required: true },
        quantity: { type: Number, required: true },
    }],
    totalPrice: { type: Number, required: true },
    workDone: [{ type: Types.ObjectId, ref: "Work", required: true }],
    billType: {
        type: String,
        enum: ["Open", "Close"],
        default: "Open"
    },

})

export default model<IBill>("Bill", billSchema);