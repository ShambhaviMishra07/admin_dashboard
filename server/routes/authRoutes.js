import express from 'express';
import {
  registerAdmin,
  loginAdmin,
  getMe,
  logoutAdmin,
  updateProfile,
  changePassword,
  getInviteCode,
  updateInviteCode,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.post('/logout', protect, logoutAdmin);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.put('/password', protect, changePassword);
router.get('/invite-code', protect, getInviteCode);
router.put('/invite-code', protect, updateInviteCode);



export default router;