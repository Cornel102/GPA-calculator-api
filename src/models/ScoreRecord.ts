import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export interface IScoreRecord extends Document {
  studentId: Types.ObjectId;
  subjectId: Types.ObjectId;
  score: number; // 0-100
  createdAt: Date;
  updatedAt: Date;
}

const ScoreRecordSchema: Schema<IScoreRecord> = new Schema(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
    score: { type: Number, required: true, min: 0, max: 100 },
  },
  { timestamps: true }
);

// Composite unique index to prevent duplicate score entries per student per subject
ScoreRecordSchema.index({ studentId: 1, subjectId: 1 }, { unique: true });

export const ScoreRecord: Model<IScoreRecord> = mongoose.model<IScoreRecord>('ScoreRecord', ScoreRecordSchema);

