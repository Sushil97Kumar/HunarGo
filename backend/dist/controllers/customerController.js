"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCustomerProfile = exports.createHelpSupport = exports.getCustomerProfile = exports.callWorker = exports.getCallHistory = exports.searchWorkers = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
const Call_1 = __importDefault(require("../models/Call"));
const HelpSupport_1 = require("../models/HelpSupport");
const socketService_1 = require("../services/socketService");
const twilio_1 = require("../config/twilio");
/**
 * @desc    Search Nearby Workers
 * @route   GET /api/customer/search-workers
 */
const searchWorkers = async (req, res, next) => {
    try {
        const { category, query, lat, lng, radius = 25, page = '1', limit = '10' } = req.query;
        const pageNum = parseInt(page, 10) || 1;
        const limitNum = parseInt(limit, 10) || 10;
        const skip = (pageNum - 1) * limitNum;
        // Determine current customer
        let customerObjectId = undefined;
        const phoneHeader = req.headers['x-user-phone'] || '';
        if (req.user?.id && mongoose_1.default.Types.ObjectId.isValid(req.user.id)) {
            customerObjectId = new mongoose_1.default.Types.ObjectId(req.user.id);
        }
        else if (phoneHeader) {
            const customerUser = await User_1.default.findOne({ phoneNumber: phoneHeader });
            if (customerUser)
                customerObjectId = customerUser._id;
        }
        if (!customerObjectId) {
            const customerUser = await User_1.default.findOne({ role: 'customer' });
            if (customerUser)
                customerObjectId = customerUser._id;
        }
        // Find all worker IDs to whom this customer currently has a 'Pending' call request
        let pendingWorkerIds = [];
        if (customerObjectId) {
            const pendingCalls = await Call_1.default.find({ customerId: customerObjectId, status: 'Pending' });
            pendingWorkerIds = pendingCalls.map((c) => (c.workerId ? c.workerId.toString() : '')).filter(Boolean);
        }
        let totalWorkers = 0;
        let workers = [];
        try {
            const filter = { role: 'worker' };
            if (pendingWorkerIds.length > 0) {
                filter._id = { $nin: pendingWorkerIds.map((id) => new mongoose_1.default.Types.ObjectId(id)) };
            }
            if (category && category !== 'All') {
                const normalizedCategory = category.replace(/_/g, ' ').trim();
                filter.professions = { $regex: new RegExp(`^${normalizedCategory}$`, 'i') };
            }
            if (query && query.trim()) {
                const q = query.trim();
                filter.$or = [
                    { fullName: new RegExp(q, 'i') },
                    { professions: new RegExp(q, 'i') },
                ];
            }
            if (lat && lng) {
                const latitude = parseFloat(lat);
                const longitude = parseFloat(lng);
                const radiusInMeters = parseFloat(radius.toString()) * 1000;
                filter.location = {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [longitude, latitude],
                        },
                        $maxDistance: radiusInMeters,
                    },
                };
            }
            totalWorkers = await User_1.default.countDocuments(filter);
            workers = await User_1.default.find(filter).skip(skip).limit(limitNum);
        }
        catch (err) {
            const filter = { role: 'worker' };
            if (pendingWorkerIds.length > 0) {
                filter._id = { $nin: pendingWorkerIds.map((id) => new mongoose_1.default.Types.ObjectId(id)) };
            }
            if (category && category !== 'All') {
                const normalizedCategory = category.replace(/_/g, ' ').trim();
                filter.professions = { $regex: new RegExp(`^${normalizedCategory}$`, 'i') };
            }
            if (query && query.trim()) {
                const q = query.trim();
                filter.$or = [
                    { fullName: new RegExp(q, 'i') },
                    { professions: new RegExp(q, 'i') },
                ];
            }
            workers = await User_1.default.find(filter).skip(skip).limit(limitNum);
            totalWorkers = await User_1.default.countDocuments(filter);
        }
        const formattedWorkers = (workers || []).map((w) => ({
            id: w._id ? w._id.toString() : w.id,
            _id: w._id ? w._id.toString() : w.id,
            name: w.fullName || 'Worker',
            fullName: w.fullName || 'Worker',
            profession: Array.isArray(w.professions) && w.professions.length > 0 ? w.professions[0] : 'Handyman',
            professions: w.professions || [],
            rating: w.rating ? w.rating.toString() : '4.8',
            reviews: w.reviewCount ? w.reviewCount.toString() : '0',
            distance: w.location?.city ? `Near ${w.location.city}` : (w.location?.address ? w.location.address : 'Nearby'),
            distanceText: w.location?.city ? `Near ${w.location.city}` : (w.location?.address ? w.location.address : 'Nearby'),
            phone: w.phoneNumber || '',
            phoneNumber: w.phoneNumber || '',
            avatar: (w.profileImage && !w.profileImage.startsWith('file://') && !w.profileImage.startsWith('content://')) ? w.profileImage : '',
            profileImage: (w.profileImage && !w.profileImage.startsWith('file://') && !w.profileImage.startsWith('content://')) ? w.profileImage : '',
            experience: `${w.experienceYears || 1}+ Yrs`,
            hourlyRate: w.hourlyRate || 300,
        }));
        return res.status(200).json({
            success: true,
            workers: formattedWorkers,
            pagination: {
                page: pageNum,
                limit: limitNum,
                total: totalWorkers,
                totalPages: Math.ceil(totalWorkers / limitNum) || 1,
                hasMore: pageNum * limitNum < totalWorkers,
            },
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
        let customerObjectId = undefined;
        const phoneHeader = req.headers['x-user-phone'] || '';
        if (req.user?.id && mongoose_1.default.Types.ObjectId.isValid(req.user.id)) {
            customerObjectId = new mongoose_1.default.Types.ObjectId(req.user.id);
        }
        else if (phoneHeader) {
            const customerUser = await User_1.default.findOne({ phoneNumber: phoneHeader });
            if (customerUser) {
                customerObjectId = customerUser._id;
            }
        }
        // If no authenticated customer is identified, return empty call list
        if (!customerObjectId) {
            return res.status(200).json({
                success: true,
                calls: [],
            });
        }
        // Query ONLY calls placed by this specific customer
        const callsFromDb = await Call_1.default.find({ customerId: customerObjectId })
            .populate('workerId', 'fullName phoneNumber professions profileImage')
            .sort({ createdAt: -1 });
        if (!callsFromDb || callsFromDb.length === 0) {
            return res.status(200).json({
                success: true,
                calls: [],
            });
        }
        const formattedCalls = (await Promise.all(callsFromDb.map(async (c) => {
            let worker = c.workerId;
            if (worker && typeof worker === 'object' && worker.fullName) {
                // Already populated
            }
            else if (c.workerId && mongoose_1.default.Types.ObjectId.isValid(c.workerId)) {
                worker = await User_1.default.findById(c.workerId).select('fullName phoneNumber professions profileImage');
            }
            // If there is no valid worker related to this call, do not show it
            if (!worker || (!worker.fullName && !worker.phoneNumber)) {
                return null;
            }
            return {
                id: c._id ? c._id.toString() : c.id,
                workerId: worker?._id ? worker._id.toString() : (c.workerId ? c.workerId.toString() : undefined),
                workerName: worker?.fullName || 'Worker',
                profession: Array.isArray(worker?.professions) && worker.professions.length > 0 ? worker.professions[0] : 'Handyman',
                date: c.time || 'Just now',
                status: c.status || 'Pending',
                phone: worker?.phoneNumber || '',
                avatar: (worker?.profileImage && !worker.profileImage.startsWith('file://')) ? worker.profileImage : '',
                emoji: '📞',
            };
        }))).filter(Boolean);
        return res.status(200).json({
            success: true,
            calls: formattedCalls,
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
        const { workerId, workerName } = req.body;
        const phoneHeader = req.headers['x-user-phone'] || '';
        // 1. Caller Authorization Validation
        let customerObjectId = undefined;
        let customerUser = null;
        if (req.user?.id && mongoose_1.default.Types.ObjectId.isValid(req.user.id)) {
            customerObjectId = new mongoose_1.default.Types.ObjectId(req.user.id);
            customerUser = await User_1.default.findById(customerObjectId);
        }
        else if (phoneHeader) {
            customerUser = await User_1.default.findOne({ phoneNumber: phoneHeader });
            if (customerUser) {
                customerObjectId = customerUser._id;
            }
        }
        if (!customerUser || !customerObjectId) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized: Caller identity is missing or unverified. Please log in as a customer.',
            });
        }
        // 2. Target Worker Validation - Strictly target the requested worker only
        let targetWorker = null;
        if (workerId && mongoose_1.default.Types.ObjectId.isValid(workerId)) {
            targetWorker = await User_1.default.findById(workerId);
        }
        if (!targetWorker) {
            const workerPhone = (req.body.phone || req.body.phoneNumber || '').toString().trim();
            if (workerPhone) {
                targetWorker = (await User_1.default.findOne({ phoneNumber: (0, twilio_1.formatPhoneNumberE164)(workerPhone) })) ||
                    (await User_1.default.findOne({ phoneNumber: workerPhone }));
            }
        }
        // Do NOT fall back to arbitrary workers - call must strictly target the specific requested worker
        if (!targetWorker) {
            return res.status(404).json({
                success: false,
                message: 'The requested worker could not be found or is not registered.',
            });
        }
        if (targetWorker.role && targetWorker.role !== 'worker') {
            return res.status(400).json({
                success: false,
                message: 'Target user is not registered as a worker.',
            });
        }
        if (customerObjectId.toString() === targetWorker._id.toString()) {
            return res.status(400).json({
                success: false,
                message: 'You cannot place a call to yourself.',
            });
        }
        // 3. Generate Unique Call ID & Save in Call collection
        const newCall = await Call_1.default.create({
            customerId: customerObjectId,
            workerId: targetWorker._id,
            status: 'Pending',
            time: 'Just now',
        });
        const callId = newCall._id.toString();
        console.log(`\n=================================================`);
        console.log(`📞 [Call Request Initiated]:`);
        console.log(`   • Call ID     : ${callId}`);
        console.log(`   • Customer ID : ${customerObjectId.toString()} (${customerUser.fullName || customerUser.phoneNumber})`);
        console.log(`   • Worker ID   : ${targetWorker._id.toString()} (${targetWorker.fullName || targetWorker.phoneNumber})`);
        console.log(`   • Status      : ${newCall.status}`);
        console.log(`=================================================\n`);
        // 4. Send Real-time Incoming Call Event ONLY to the Target Worker (Never Broadcast!)
        const incomingCallPayload = {
            callId,
            callerId: customerObjectId.toString(),
            callerName: customerUser.fullName || 'Customer',
            callerPhone: customerUser.phoneNumber || phoneHeader || '',
            callerImage: customerUser.profileImage || '',
            targetWorkerId: targetWorker._id.toString(),
            targetWorkerPhone: targetWorker.phoneNumber || '',
            customer: {
                id: customerObjectId.toString(),
                name: customerUser.fullName || 'Customer',
                phoneNumber: customerUser.phoneNumber || phoneHeader || '',
                profileImage: customerUser.profileImage || '',
            },
            worker: {
                id: targetWorker._id.toString(),
                name: targetWorker.fullName || workerName || 'Worker',
                phone: targetWorker.phoneNumber || '',
                phoneNumber: targetWorker.phoneNumber || '',
                profession: Array.isArray(targetWorker.professions) && targetWorker.professions.length > 0 ? targetWorker.professions[0] : 'Handyman',
            },
            time: newCall.time || 'Just now',
            status: newCall.status || 'Pending',
            timestamp: new Date().toISOString(),
        };
        // Emit strictly to the target worker's private room: user:<workerId>
        const deliveryResult = (0, socketService_1.emitToUser)(targetWorker._id.toString(), 'incoming_call', incomingCallPayload, targetWorker.phoneNumber);
        console.log(`📡 [Call Delivery Summary]:`);
        console.log(`   • Requested Worker ID : ${targetWorker._id.toString()}`);
        console.log(`   • Target Room         : ${deliveryResult.room}`);
        console.log(`   • Sockets In Room     : ${deliveryResult.socketsCount} (${deliveryResult.delivered ? 'Delivered Real-time' : 'Worker Offline / Disconnected'})`);
        const isWorkerOnline = deliveryResult.socketsCount > 0;
        return res.status(200).json({
            success: true,
            message: isWorkerOnline
                ? `Call request sent to ${targetWorker.fullName || workerName || 'worker'} successfully!`
                : `Call request recorded. Target worker is currently offline.`,
            callId,
            call: newCall,
            deliveryStatus: {
                workerOnline: isWorkerOnline,
                connectedSocketsCount: deliveryResult.socketsCount,
                targetRoom: deliveryResult.room,
                delivered: deliveryResult.delivered,
            },
        });
    }
    catch (error) {
        console.error('⚠️ Error in callWorker:', error);
        next(error);
    }
};
exports.callWorker = callWorker;
/**
 * @desc    Get Current Logged-in Customer Profile
 * @route   GET /api/customer/profile
 */
const getCustomerProfile = async (req, res, next) => {
    try {
        let customer = null;
        const phoneHeader = req.headers['x-user-phone'] || '';
        if (req.user?.id) {
            try {
                customer = await User_1.default.findById(req.user.id);
            }
            catch (err) { }
        }
        if (!customer && phoneHeader) {
            try {
                customer = await User_1.default.findOne({ phoneNumber: phoneHeader });
            }
            catch (err) { }
        }
        if (!customer) {
            try {
                customer = await User_1.default.findOne({ role: 'customer' }).sort({ updatedAt: -1 });
            }
            catch (err) { }
        }
        const defaultPhone = phoneHeader || '';
        return res.status(200).json({
            success: true,
            profile: {
                id: customer?._id ? customer._id.toString() : '',
                fullName: customer?.fullName || '',
                phoneNumber: customer?.phoneNumber || defaultPhone,
                email: customer?.email || '',
                gender: customer?.gender || 'Male',
                dob: customer?.dob || '',
                profileImage: customer?.profileImage || '',
                location: customer?.location || {
                    address: '',
                    city: '',
                    pincode: '',
                },
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getCustomerProfile = getCustomerProfile;
/**
 * @desc    Submit Help & Customer Support Ticket
 * @route   POST /api/customer/help-support
 */
const createHelpSupport = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        if (!title || !title.trim()) {
            return res.status(400).json({ success: false, message: 'Please provide a title for your support ticket.' });
        }
        if (!description || !description.trim()) {
            return res.status(400).json({ success: false, message: 'Please provide a description of your issue.' });
        }
        let customerId = req.user?.id;
        if (!customerId) {
            const phoneHeader = req.headers['x-user-phone'] || '';
            if (phoneHeader) {
                const foundUser = await User_1.default.findOne({ phoneNumber: phoneHeader });
                if (foundUser)
                    customerId = foundUser._id.toString();
            }
        }
        if (!customerId) {
            const defaultUser = await User_1.default.findOne({ role: 'customer' });
            if (defaultUser)
                customerId = defaultUser._id.toString();
        }
        const helpTicket = await HelpSupport_1.HelpSupport.create({
            customerId: customerId || '60d0fe4f5311236168a109ca',
            title: title.trim(),
            description: description.trim(),
            status: 'open',
        });
        console.log('🎧 [MongoDB HelpSupport Saved]:', helpTicket);
        return res.status(201).json({
            success: true,
            message: 'Help & Customer Support ticket submitted successfully!',
            helpSupport: helpTicket,
        });
    }
    catch (error) {
        console.error('Error in createHelpSupport:', error);
        next(error);
    }
};
exports.createHelpSupport = createHelpSupport;
/**
 * @desc    Update Customer Profile Details
 * @route   POST /api/customer/profile
 */
const updateCustomerProfile = async (req, res, next) => {
    try {
        const { fullName, email, gender, dob, profileImage } = req.body;
        let customer = null;
        const phoneHeader = req.headers['x-user-phone'] || '';
        if (req.user?.id) {
            try {
                customer = await User_1.default.findById(req.user.id);
            }
            catch (err) { }
        }
        if (!customer && phoneHeader) {
            try {
                customer = await User_1.default.findOne({ phoneNumber: phoneHeader });
            }
            catch (err) { }
        }
        if (!customer) {
            try {
                customer = await User_1.default.findOne({ role: 'customer' });
            }
            catch (err) { }
        }
        if (customer) {
            if (fullName !== undefined)
                customer.fullName = fullName.trim();
            if (email !== undefined)
                customer.email = email.trim();
            if (gender !== undefined)
                customer.gender = gender;
            if (dob !== undefined)
                customer.dob = dob;
            if (profileImage !== undefined)
                customer.profileImage = profileImage;
            await customer.save();
            console.log('👤 [MongoDB Customer Profile Saved]:', customer);
        }
        return res.status(200).json({
            success: true,
            message: 'Customer profile updated successfully!',
            profile: {
                id: customer?._id ? customer._id.toString() : '',
                fullName: customer?.fullName || fullName || '',
                phoneNumber: customer?.phoneNumber || phoneHeader || '',
                email: customer?.email || email || '',
                gender: customer?.gender || gender || 'Male',
                dob: customer?.dob || dob || '',
                profileImage: customer?.profileImage || profileImage || '',
                location: customer?.location || {
                    address: '',
                    city: '',
                    pincode: '',
                },
            },
        });
    }
    catch (error) {
        console.error('Error in updateCustomerProfile:', error);
        next(error);
    }
};
exports.updateCustomerProfile = updateCustomerProfile;
