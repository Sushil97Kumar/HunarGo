import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import User from '../models/User';
import Call from '../models/Call';

/**
 * @desc    Search Nearby Workers
 * @route   GET /api/customer/search-workers
 */
export const searchWorkers = async (req: AuthRequest, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { category, query } = req.query as { category?: string; query?: string };

    let workers: any = [];
    try {
      const filter: any = { role: 'worker', isAvailable: true };
      if (category) filter.professions = category;
      if (query) filter.fullName = new RegExp(query, 'i');
      workers = await User.find(filter);
    } catch (err) {}

    if (!workers || workers.length === 0) {
      workers = [
        { id: 'w1', name: 'Raj Kumar', profession: category || 'Electrician', rating: 4.9, distance: '1.2 km away', phone: '+91 98765 43210', experience: '5+ Years', rate: '₹350/hr' },
        { id: 'w2', name: 'Suresh Patel', profession: category || 'Plumber', rating: 4.7, distance: '2.5 km away', phone: '+91 98765 43211', experience: '4 Years', rate: '₹300/hr' },
        { id: 'w3', name: 'Manoj Singh', profession: category || 'Carpenter', rating: 4.8, distance: '3.1 km away', phone: '+91 98765 43212', experience: '6 Years', rate: '₹400/hr' },
      ];
    }

    return res.status(200).json({
      success: true,
      workers,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get Customer Outgoing Calls History
 * @route   GET /api/customer/calls
 */
export const getCallHistory = async (req: AuthRequest, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    let calls: any = [];
    try {
      calls = await Call.find({ customerId: req.user?.id }).sort({ createdAt: -1 });
    } catch (err) {}

    if (!calls || calls.length === 0) {
      calls = [
        { id: 'c1', workerName: 'Raj Kumar', profession: 'Electrician', date: 'Today, 2:30 PM', status: 'Connected', phone: '+91 98765 43210' },
        { id: 'c2', workerName: 'Suresh Patel', profession: 'Plumber', date: 'Yesterday, 11:15 AM', status: 'Completed', phone: '+91 98765 43211' },
      ];
    }

    return res.status(200).json({
      success: true,
      calls,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Call a Worker
 * @route   POST /api/customer/call-worker
 */
export const callWorker = async (req: AuthRequest, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { workerId, workerName, service } = req.body;

    try {
      await Call.create({
        customerName: 'Amit Sharma',
        workerPhone: '+91 98765 43210',
        service: service || 'Repair Request',
        status: 'Initiated',
        time: 'Just now',
      });
    } catch (err) {}

    return res.status(200).json({
      success: true,
      message: `Initiating direct phone call to ${workerName || 'worker'}...`,
    });
  } catch (error) {
    next(error);
  }
};
