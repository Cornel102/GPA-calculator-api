import { Router } from 'express';
import { SubjectController } from '../controllers/SubjectController';

const router = Router();

router.post('/', SubjectController.create);
router.get('/', SubjectController.getAll);

export default router;

