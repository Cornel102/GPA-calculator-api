import express from 'express';
import { Request, Response, NextFunction } from 'express-serve-static-core';
import { ScoreRecordRepository } from '../repositories/ScoreRecordRepository';
import { ScoreRecord } from '../models/ScoreRecord';

import { Student } from '../models/Student';
import { Subject } from '../models/Subject';
import { GpaCalculator } from '../services/GpaCalculator';
import mongoose from 'mongoose';

const scoreRepo = new ScoreRecordRepository(ScoreRecord);

export class ScoreController {
  // Assign or update a score for a student on a subject
  static async assignScore(req: Request, res: Response, next: NextFunction) {
    try {
      const { studentId, subjectId, score } = req.body;
      if (!studentId || !subjectId || score === undefined) {
        return res.status(400).json({ message: 'studentId, subjectId and score are required.' });
      }
      if (typeof score !== 'number' || score < 0 || score > 100) {
        return res.status(400).json({ message: 'Score must be a number between 0 and 100.' });
      }
      // Validate existence of student and subject
      const [student, subject] = await Promise.all([
        Student.findById(studentId).exec(),
        Subject.findById(subjectId).exec(),
      ]);
      if (!student) return res.status(404).json({ message: 'Student not found.' });
      if (!subject) return res.status(404).json({ message: 'Subject not found.' });

      const record = await scoreRepo.createOrUpdate({
        studentId: new mongoose.Types.ObjectId(studentId),
        subjectId: new mongoose.Types.ObjectId(subjectId),
        score,
      });
      res.status(200).json(record);
    } catch (err) {
      next(err);
    }
  }

  // List all score records
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const records = await scoreRepo.findAll();
      res.json(records);
    } catch (err) {
      next(err);
    }
  }

  // Get a specific score record by ID
  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const record = await scoreRepo.findById(id);
      if (!record) {
        return res.status(404).json({ message: 'Score record not found.' });
      }
      res.json(record);
    } catch (err) {
      next(err);
    }
  }

  // Delete a score record by ID
  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const record = await scoreRepo.delete(id);
      if (!record) {
        return res.status(404).json({ message: 'Score record not found.' });
      }
      res.json({ message: 'Score record deleted successfully.' });
    } catch (err) {
      next(err);
    }
  }

  // Transcript with GPA
  static async transcript(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: studentId } = req.params;
      const student = await Student.findById(studentId).exec();
      if (!student) return res.status(404).json({ message: 'Student not found.' });

      const records = await ScoreRecord.find({ studentId })
        .populate('subjectId')
        .exec();

      // Map each record to detailed info
      const detailed = records.map(rec => {
        const subject = rec.subjectId as any; // populated Subject
        const letter = GpaCalculator.getLetterGrade(rec.score);
        const points = GpaCalculator.getGradePoint(rec.score);
        return {
          subjectId: subject._id,
          code: subject.code,
          title: subject.title,
          creditUnits: subject.creditUnits,
          score: rec.score,
          letterGrade: letter,
          gradePoint: points,
        };
      });

      const gpa = GpaCalculator.computeGpa(records as any);

      res.json({
        student,
        transcript: detailed,
        totalCredits: detailed.reduce((sum, d) => sum + d.creditUnits, 0),
        gpa,
      });
    } catch (err) {
      next(err);
    }
  }
}

