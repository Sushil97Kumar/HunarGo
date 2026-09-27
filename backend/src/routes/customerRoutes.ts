import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import {
  searchWorkers,
  getCallHistory,
  callWorker,
  getCustomerProfile,
} from '../controllers/customerController';

const router = Router();

router.get('/search-workers', authMiddleware, searchWorkers);
router.get('/calls', authMiddleware, getCallHistory);
router.post('/call-worker', authMiddleware, callWorker);
router.get('/profile', authMiddleware, getCustomerProfile);

export default router;
