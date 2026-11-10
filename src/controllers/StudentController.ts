import { Request, Response, NextFunction } from 'express';
import { StudentRepository } from '../repositories/StudentRepository';
import { Student } from '../models/Student';

const studentRepo = new StudentRepository(Student);

export class StudentController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, matricNumber, department } = req.body;
      // Guard clauses
      if (!name || !email || !matricNumber || !department) {
        return res.status(400).json({ message: 'All fields are required.' });
      }
      const student = await studentRepo.create({ name, email, matricNumber, department });
      res.status(201).json(student);
    } catch (err) {
      next(err);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const students = await studentRepo.findAll();
      res.json(students);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const student = await studentRepo.findById(id);
      if (!student) {
        return res.status(404).json({ message: 'Student not found.' });
      }
      res.json(student);
    } catch (err) {
      next(err);
    }
  }
}

