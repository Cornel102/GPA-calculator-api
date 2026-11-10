import { Model, Types } from 'mongoose';
import { IScoreRecord } from '../models/ScoreRecord';

export class ScoreRecordRepository {
  private model: Model<IScoreRecord>;

  constructor(model: Model<IScoreRecord>) {
    this.model = model;
  }

  async createOrUpdate(data: { studentId: Types.ObjectId; subjectId: Types.ObjectId; score: number }) {
    // Upsert based on composite unique index
    return this.model.findOneAndUpdate(
      { studentId: data.studentId, subjectId: data.subjectId },
      { $set: { score: data.score } },
      { new: true, upsert: true, runValidators: true }
    ).exec();
  }

  async findByStudentId(studentId: string) {
    return this.model.find({ studentId }).populate('subjectId').exec();
  }

  async findAll() {
    return this.model.find().populate('studentId').populate('subjectId').exec();
  }

  async findById(id: string) {
    return this.model.findById(id).populate('studentId').populate('subjectId').exec();
  }

  async delete(id: string) {
    return this.model.findByIdAndDelete(id).exec();
  }
}

