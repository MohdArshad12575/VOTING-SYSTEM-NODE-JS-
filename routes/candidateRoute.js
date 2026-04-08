import express from 'express';
import {addCandidate } from '../controller/candidateController.js';
import { verifyToken, checkIsAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/create", verifyToken, checkIsAdmin, addCandidate)

export default router;