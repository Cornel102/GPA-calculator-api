import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IStudent extends Document {
  name: string;
  email: string;
  matricNumber: string;
  department: string;
  createdAt: Date;
  updatedAt: Date;
}

const StudentSchema: Schema<IStudent> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    matricNumber: { type: String, required: true, unique: true },
    department: { type: String, required: true },
  },
  { timestamps: true }
);

export const Student: Model<IStudent> = mongoose.model<IStudent>('Student', StudentSchema);

