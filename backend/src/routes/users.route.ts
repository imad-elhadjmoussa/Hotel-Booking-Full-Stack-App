import express from 'express';
import { getCurrentUser, register } from '../controllers/users.controller'; // ✔️ controller
import { registerValidation } from '../validations/validation';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.post('/register', registerValidation, register);
router.get('/me', verifyToken, getCurrentUser);

export default router;
