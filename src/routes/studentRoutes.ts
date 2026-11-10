import { Router } from 'express';
import { StudentController } from '../controllers/StudentController';

const router = Router();

router.post('/', StudentController.create);
router.get('/', StudentController.getAll);
router.get('/:id', StudentController.getById);

export default router;

