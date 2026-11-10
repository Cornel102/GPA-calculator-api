import { Model } from 'mongoose';
import { ISubject } from '../models/Subject';

export class SubjectRepository {
  private model: Model<ISubject>;

  constructor(model: Model<ISubject>) {
    this.model = model;
  }

  async create(data: Partial<ISubject>) {
    return this.model.create(data);
  }

  async findAll() {
    return this.model.find().exec();
  }

  async findById(id: string) {
    return this.model.findById(id).exec();
  }
}

