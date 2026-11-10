import express from 'express';
import { Request, Response, NextFunction } from 'express-serve-static-core';
import { SubjectRepository } from '../repositories/SubjectRepository';
import { Subject } from '../models/Subject';

const subjectRepo = new SubjectRepository(Subject);

export class SubjectController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { code, title, creditUnits } = req.body;
      if (!code || !title || creditUnits === undefined) {
        return res.status(400).json({ message: 'code, title and creditUnits are required.' });
      }
      const subject = await subjectRepo.create({ code, title, creditUnits });
      res.status(201).json(subject);
    } catch (err) {
      next(err);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const subjects = await subjectRepo.findAll();
      res.json(subjects);
    } catch (err) {
      next(err);
    }
  }
}

