import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { upload } from '../middleware/uploadMiddleware';
import {
  getProfile,
  updateProfile,
  updateLocation,
  getLocation,
  updateProfessions,
  getProfessions,
  toggleAvailability,
  getDashboardStats,
  getCustomerCalls,
  uploadProfileImage,
} from '../controllers/workerController';

const router = Router();

router.get('/profile', authMiddleware, getProfile);
router.post('/profile', authMiddleware, updateProfile);
router.post('/upload-profile-image', upload.single('profileImage'), uploadProfileImage);
router.get('/location', authMiddleware, getLocation);
router.post('/location', authMiddleware, updateLocation);
router.get('/professions', authMiddleware, getProfessions);
router.post('/professions', authMiddleware, updateProfessions);
router.post('/availability', authMiddleware, toggleAvailability);
router.get('/dashboard-stats', authMiddleware, getDashboardStats);
router.get('/customer-calls', authMiddleware, getCustomerCalls);

export default router;
