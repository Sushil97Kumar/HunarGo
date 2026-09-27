import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import {
  searchWorkers,
  getCallHistory,
  callWorker,
  getCustomerProfile,
  updateCustomerProfile,
  createHelpSupport,
} from '../controllers/customerController';

const router = Router();

router.get('/search-workers', authMiddleware, searchWorkers);
router.get('/calls', authMiddleware, getCallHistory);
router.post('/call-worker', authMiddleware, callWorker);
router.get('/profile', authMiddleware, getCustomerProfile);
router.post('/profile', authMiddleware, updateCustomerProfile);
router.post('/help-support', authMiddleware, createHelpSupport);

export default router;
