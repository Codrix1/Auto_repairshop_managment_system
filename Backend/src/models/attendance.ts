import {Schema, Model, Document, Types, Date, model} from "mongoose";


export interface IAttendance extends Document {
    employeeId: Types.ObjectId;
    attendanceDate: string;
    checkIn?: string;
    checkOut?: string;
    status?: 'present' | 'absent' | 'excused';
    note?: string;
}

const attendanceSchema = new Schema<IAttendance>({
    employeeId: {type: Schema.Types.ObjectId, ref: "Employee", required: true },
    attendanceDate: {type: String, required: true},
    checkIn: { type: String }, 
    checkOut: { type: String },
    status: {
        type: String,
        enum: ['present', 'absent', 'excused'],
        default: 'absent'
    },
    note: { type: String }
    }, {
    timestamps: true
});

attendanceSchema.index({ employeeId: 1, attendanceDate: 1 }, { unique: true });

export default model<IAttendance>('Attendance',attendanceSchema);

