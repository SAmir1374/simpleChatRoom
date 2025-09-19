import express from 'express';
import userController from '@/controller/userController';
import authController from '@/controller/authController';

const router = express.Router();

router.get('/', authController.logout);
router.post('/login', authController.login);
router.post('/register', userController.insert);

export default router;
