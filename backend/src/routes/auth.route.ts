import express from 'express';
import { login, logout, validateToken } from '../controllers/auth.controller'; // ✔️ controller
import { loginValidation } from '../validations/validation';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.post('/login', loginValidation, login);
router.get('/validate-token', verifyToken, validateToken);
router.post("/logout", logout)

export default router;
