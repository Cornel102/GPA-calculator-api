import { Router } from 'express';
import { SubjectController } from '../controllers/SubjectController';

const router = Router();

router.post('/', SubjectController.create);
router.get('/', SubjectController.getAll);
router.get('/:id', SubjectController.getById);
router.put('/:id', SubjectController.update);
router.delete('/:id', SubjectController.delete);

export default router;

