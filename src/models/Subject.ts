import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ISubject extends Document {
  code: string;
  title: string;
  creditUnits: number;
  createdAt: Date;
  updatedAt: Date;
}

const SubjectSchema: Schema<ISubject> = new Schema(
  {
    code: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    creditUnits: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

export const Subject: Model<ISubject> = mongoose.model<ISubject>('Subject', SubjectSchema);

