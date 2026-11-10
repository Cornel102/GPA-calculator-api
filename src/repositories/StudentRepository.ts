import { Model } from 'mongoose';
import { IStudent } from '../models/Student';

export class StudentRepository {
  private model: Model<IStudent>;

  constructor(model: Model<IStudent>) {
    this.model = model;
  }

  async create(data: Partial<IStudent>) {
    return this.model.create(data);
  }

  async findAll() {
    return this.model.find().exec();
  }

  async findById(id: string) {
    return this.model.findById(id).exec();
  }

  async update(id: string, data: Partial<IStudent>) {
    return this.model.findByIdAndUpdate(id, data, { new: true, runValidators: true }).exec();
  }

  async delete(id: string) {
    return this.model.findByIdAndDelete(id).exec();
  }
}

