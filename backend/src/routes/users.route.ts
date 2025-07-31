import express from 'express';
import { register } from '../controllers/users.controller'; // ✔️ controller
import { registerValidation } from '../validations/validation';

const router = express.Router();

router.post('/register', registerValidation, register);


export default router;
