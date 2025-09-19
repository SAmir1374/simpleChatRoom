import express from 'express';
import userController from '@/controller/userController';

const router = express.Router();

router.get('/', userController.getAll);
router.get('/:id', userController.getOne);
router.post('/', userController.insert);
router.put('/:id', userController.updated);
router.delete('/:id', userController.removed);

export default router;
