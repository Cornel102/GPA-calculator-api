import { IScoreRecord } from '../models/ScoreRecord';
import { ISubject } from '../models/Subject';

export class GpaCalculator {
  // Grade boundaries and points
  private static readonly gradeMap: { min: number; max: number; grade: string; points: number }[] = [
    { min: 70, max: 100, grade: 'A', points: 5 },
    { min: 60, max: 69, grade: 'B', points: 4 },
    { min: 50, max: 59, grade: 'C', points: 3 },
    { min: 45, max: 49, grade: 'D', points: 2 },
    { min: 40, max: 44, grade: 'E', points: 1 },
    { min: 0, max: 39, grade: 'F', points: 0 },
  ];

  /** Convert a numeric score (0‑100) to a letter grade */
  static getLetterGrade(score: number): string {
    const entry = this.gradeMap.find(g => score >= g.min && score <= g.max);
    return entry ? entry.grade : 'F';
  }

  /** Retrieve the grade point for a numeric score */
  static getGradePoint(score: number): number {
    const entry = this.gradeMap.find(g => score >= g.min && score <= g.max);
    return entry ? entry.points : 0;
  }

  /**
   * Compute cumulative GPA for a student.
   * @param records Array of score records populated with subject reference
   * @returns GPA rounded to two decimals
   */
  static computeGpa(records: (IScoreRecord & { subjectId: ISubject })[]): number {
    let totalQualityPoints = 0;
    let totalCredits = 0;
    for (const rec of records) {
      const gradePoint = this.getGradePoint(rec.score);
      const creditUnits = rec.subjectId.creditUnits;
      totalQualityPoints += gradePoint * creditUnits;
      totalCredits += creditUnits;
    }
    if (totalCredits === 0) return 0;
    const gpa = totalQualityPoints / totalCredits;
    return Math.round(gpa * 100) / 100; // two decimal places
  }
}

