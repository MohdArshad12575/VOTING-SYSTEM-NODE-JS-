// routes/userRoute.js
import express from 'express';
import { login, signup, getProfileData, updatePass ,getAllCandidates ,updateVote} from '../controller/userController.js';
import { verifyToken  } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/profile', verifyToken , getProfileData);
router.put('/profile/updatepassword', verifyToken , updatePass);
router.get('/candidates', verifyToken , getAllCandidates);
router.post('/vote/:candidateid', verifyToken , updateVote);



export default router;