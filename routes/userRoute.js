// routes/userRoute.js
import express from 'express';
import { login, signup, getProfileData, updatePass } from '../controller/userController.js';
import { verifyToken  } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/profile', verifyToken , getProfileData);
router.put('/profile/updatepassword', verifyToken , updatePass);

export default router;