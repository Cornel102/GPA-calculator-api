import { Router } from 'express';
import { ScoreController } from '../controllers/ScoreController';

const router = Router();

// Assign or update a score
router.post('/scores', ScoreController.assignScore);
// Retrieve transcript and GPA for a student
router.get('/students/:id/transcript', ScoreController.transcript);

export default router;
