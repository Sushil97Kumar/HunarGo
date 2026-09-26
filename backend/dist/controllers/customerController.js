"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callWorker = exports.getCallHistory = exports.searchWorkers = void 0;
const User_1 = __importDefault(require("../models/User"));
const Call_1 = __importDefault(require("../models/Call"));
/**
 * @desc    Search Nearby Workers
 * @route   GET /api/customer/search-workers
 */
const searchWorkers = async (req, res, next) => {
    try {
        const { category, query } = req.query;
        let workers = [];
        try {
            const filter = { role: 'worker', isAvailable: true };
            if (category)
                filter.professions = category;
            if (query)
                filter.fullName = new RegExp(query, 'i');
            workers = await User_1.default.find(filter);
        }
        catch (err) { }
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
    }
    catch (error) {
        next(error);
    }
};
exports.searchWorkers = searchWorkers;
/**
 * @desc    Get Customer Outgoing Calls History
 * @route   GET /api/customer/calls
 */
const getCallHistory = async (req, res, next) => {
    try {
        let calls = [];
        try {
            calls = await Call_1.default.find({ customerId: req.user?.id }).sort({ createdAt: -1 });
        }
        catch (err) { }
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
    }
    catch (error) {
        next(error);
    }
};
exports.getCallHistory = getCallHistory;
/**
 * @desc    Call a Worker
 * @route   POST /api/customer/call-worker
 */
const callWorker = async (req, res, next) => {
    try {
        const { workerId, workerName, service } = req.body;
        try {
            await Call_1.default.create({
                customerName: 'Amit Sharma',
                workerPhone: '+91 98765 43210',
                service: service || 'Repair Request',
                status: 'Initiated',
                time: 'Just now',
            });
        }
        catch (err) { }
        return res.status(200).json({
            success: true,
            message: `Initiating direct phone call to ${workerName || 'worker'}...`,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.callWorker = callWorker;
