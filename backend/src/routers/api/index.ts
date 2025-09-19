import express from 'express';
import user from './user';
import auth from './auth';

const router = express.Router();

router.use('/auth', auth);
router.use('/user', user);

export default router;
