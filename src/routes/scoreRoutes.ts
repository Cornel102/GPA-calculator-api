import { Router } from 'express';
import { ScoreController } from '../controllers/ScoreController';

const router = Router();

// Assign or update a score
router.post('/scores', ScoreController.assignScore);
// List all score records
router.get('/scores', ScoreController.getAll);
// Get a specific score record by ID
router.get('/scores/:id', ScoreController.getById);
// Delete a specific score record by ID
router.delete('/scores/:id', ScoreController.delete);
// Retrieve transcript and GPA for a student
router.get('/students/:id/transcript', ScoreController.transcript);

export default router;
