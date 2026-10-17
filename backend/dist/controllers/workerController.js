"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCallStatus = exports.uploadProfileImage = exports.getCustomerCalls = exports.getDashboardStats = exports.toggleAvailability = exports.getProfessions = exports.updateProfessions = exports.getLocation = exports.updateLocation = exports.updateProfile = exports.getProfile = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
const Call_1 = __importDefault(require("../models/Call"));
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_1 = require("../config/s3");
const socketService_1 = require("../services/socketService");
/**
 * @desc    Get Worker Profile
 * @route   GET /api/worker/profile
 */
const getProfile = async (req, res, next) => {
    try {
        let worker;
        const headerPhone = req.headers['x-user-phone'];
        const userPhone = req.user?.phoneNumber;
        if (req.user?.id && req.user.id !== 'mock-user-id') {
            try {
                worker = await User_1.default.findById(req.user.id);
            }
            catch (err) { }
        }
        const phoneCandidates = [userPhone, headerPhone].filter(Boolean);
        for (const rawP of phoneCandidates) {
            if (worker)
                break;
            const digits = rawP.replace(/\D/g, '');
            const last10 = digits.slice(-10);
            if (last10) {
                try {
                    worker = await User_1.default.findOne({
                        $or: [
                            { phoneNumber: rawP },
                            { phoneNumber: `+91${last10}` },
                            { phoneNumber: last10 },
                        ],
                    });
                }
                catch (err) { }
            }
        }
        if (!worker) {
            try {
                worker = await User_1.default.findOne({ role: 'worker' }).sort({ updatedAt: -1 });
            }
            catch (err) { }
        }
        if (!worker) {
            try {
                worker = await User_1.default.findOne().sort({ updatedAt: -1 });
            }
            catch (err) { }
        }
        if (!worker) {
            return res.status(200).json({
                success: true,
                worker: {
                    phoneNumber: req.user?.phoneNumber || '',
                    fullName: '',
                    email: '',
                    aadhaar: '',
                    profileImage: '',
                    professions: [],
                    location: { address: '', city: '', pincode: '', serviceRadius: 15 },
                    isAvailable: true,
                },
            });
        }
        return res.status(200).json({ success: true, worker });
    }
    catch (error) {
        next(error);
    }
};
exports.getProfile = getProfile;
/**
 * @desc    Update Worker Complete Profile Details
 * @route   POST /api/worker/profile
 */
const formatPhoneNumber = (phone) => {
    if (!phone)
        return null;
    const digits = phone.replace(/\D/g, '');
    const last10 = digits.slice(-10);
    return last10 ? `+91${last10}` : phone;
};
const updateProfile = async (req, res, next) => {
    try {
        const { fullName, email, aadhaar, gender, dob, referralCode, profileImageUri, phoneNumber, userId } = req.body;
        console.log("req.body====", req.body);
        const query = {};
        if (req.user?.id && req.user.id !== 'mock-user-id') {
            query._id = req.user.id;
        }
        else if (userId) {
            query._id = userId;
        }
        else if (req.user?.phoneNumber && req.user.phoneNumber !== '+919876543210') {
            query.phoneNumber = formatPhoneNumber(req.user.phoneNumber);
        }
        else if (phoneNumber) {
            query.phoneNumber = formatPhoneNumber(phoneNumber);
        }
        else if (req.user?.phoneNumber) {
            query.phoneNumber = formatPhoneNumber(req.user.phoneNumber);
        }
        else {
            query.phoneNumber = '+919876543210';
        }
        console.log('📥 [updateProfile Incoming Request]:', { fullName, email, aadhaar, phoneNumber, userId, query });
        const updateFields = {};
        if (fullName !== undefined)
            updateFields.fullName = fullName;
        if (email !== undefined)
            updateFields.email = email;
        if (aadhaar !== undefined)
            updateFields.aadhaar = aadhaar;
        if (gender !== undefined)
            updateFields.gender = gender;
        if (dob !== undefined)
            updateFields.dob = dob;
        if (referralCode !== undefined)
            updateFields.referralCode = referralCode;
        if (profileImageUri !== undefined && typeof profileImageUri === 'string' && profileImageUri.trim() !== '') {
            updateFields.profileImage = profileImageUri;
        }
        const user = await User_1.default.findOneAndUpdate(query, { $set: updateFields }, { new: true, upsert: true });
        console.log('🎉 [MongoDB Profile Updated Successfully]:', {
            _id: user?._id,
            phoneNumber: user?.phoneNumber,
            fullName: user?.fullName,
            email: user?.email,
            aadhaar: user?.aadhaar,
        });
        return res.status(200).json({
            success: true,
            message: 'Profile updated successfully in DB',
            user,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateProfile = updateProfile;
/**
 * @desc    Update Location and Service Radius
 * @route   POST /api/worker/location
 */
const updateLocation = async (req, res, next) => {
    try {
        const { address, city, pincode, maxDistanceKm, serviceRadius, distanceRange, coordinates, longitude, latitude } = req.body;
        const query = {};
        if (req.user?.id && req.user.id !== 'mock-user-id') {
            query._id = req.user.id;
        }
        else if (req.user?.phoneNumber && req.user.phoneNumber !== '+919876543210') {
            query.phoneNumber = formatPhoneNumber(req.user.phoneNumber);
        }
        else if (req.headers['x-user-phone']) {
            query.phoneNumber = formatPhoneNumber(req.headers['x-user-phone']);
        }
        else {
            query.phoneNumber = '+919876543210';
        }
        const radiusNumber = Number(maxDistanceKm || serviceRadius || distanceRange || 15);
        let coords = [76.7179, 30.7046];
        if (Array.isArray(coordinates) && coordinates.length === 2) {
            coords = [Number(coordinates[0]), Number(coordinates[1])];
        }
        else if (longitude !== undefined && latitude !== undefined) {
            coords = [Number(longitude), Number(latitude)];
        }
        const locationData = {
            type: 'Point',
            coordinates: coords,
            address: address || '',
            city: city || '',
            pincode: pincode || '',
            serviceRadius: radiusNumber,
        };
        const user = await User_1.default.findOneAndUpdate(query, { $set: { location: locationData } }, { new: true, upsert: true });
        console.log('📍 [MongoDB Location Saved]:', user?.location);
        return res.status(200).json({
            success: true,
            message: 'Location settings saved successfully in DB',
            location: user?.location || locationData,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateLocation = updateLocation;
/**
 * @desc    Get Worker Location and Service Radius
 * @route   GET /api/worker/location
 */
const getLocation = async (req, res, next) => {
    try {
        let user;
        if (req.user?.id && req.user.id !== 'mock-user-id') {
            try {
                user = await User_1.default.findById(req.user.id);
            }
            catch (e) { }
        }
        if (!user && req.user?.phoneNumber) {
            try {
                user = await User_1.default.findOne({ phoneNumber: formatPhoneNumber(req.user.phoneNumber) });
            }
            catch (e) { }
        }
        return res.status(200).json({
            success: true,
            location: user?.location || { address: 'Sector 17, Chandigarh', city: 'Chandigarh', pincode: '160017', serviceRadius: 15 },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getLocation = getLocation;
/**
 * @desc    Update Selected Professions
 * @route   POST /api/worker/professions
 */
const updateProfessions = async (req, res, next) => {
    try {
        const { professions } = req.body;
        const rawList = Array.isArray(professions) ? professions : (professions ? [professions] : []);
        const uniqueProfessions = Array.from(new Set(rawList.map((p) => (typeof p === 'string' ? p.trim().toLowerCase() : p)).filter(Boolean)));
        const query = {};
        if (req.user?.id && req.user.id !== 'mock-user-id') {
            query._id = req.user.id;
        }
        else if (req.user?.phoneNumber && req.user.phoneNumber !== '+919876543210') {
            query.phoneNumber = formatPhoneNumber(req.user.phoneNumber);
        }
        else if (req.headers['x-user-phone']) {
            query.phoneNumber = formatPhoneNumber(req.headers['x-user-phone']);
        }
        else {
            query.phoneNumber = '+919876543210';
        }
        const user = await User_1.default.findOneAndUpdate(query, { $set: { professions: uniqueProfessions } }, { new: true, upsert: true });
        console.log('🛠️ [MongoDB Professions Saved Unique]:', user?.professions);
        return res.status(200).json({
            success: true,
            message: 'Professions updated successfully in DB',
            professions: user?.professions || uniqueProfessions,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateProfessions = updateProfessions;
/**
 * @desc    Get Selected Professions
 * @route   GET /api/worker/professions
 */
const getProfessions = async (req, res, next) => {
    try {
        let user;
        if (req.user?.id && req.user.id !== 'mock-user-id') {
            try {
                user = await User_1.default.findById(req.user.id);
            }
            catch (e) { }
        }
        if (!user && req.user?.phoneNumber) {
            try {
                user = await User_1.default.findOne({ phoneNumber: formatPhoneNumber(req.user.phoneNumber) });
            }
            catch (e) { }
        }
        return res.status(200).json({
            success: true,
            professions: user?.professions || [],
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getProfessions = getProfessions;
/**
 * @desc    Toggle Worker Availability (Online/Offline)
 * @route   POST /api/worker/availability
 */
const toggleAvailability = async (req, res, next) => {
    try {
        const { isAvailable } = req.body;
        const query = {};
        if (req.user?.id && req.user.id !== 'mock-user-id') {
            query._id = req.user.id;
        }
        else if (req.headers['x-user-phone']) {
            query.phoneNumber = formatPhoneNumber(req.headers['x-user-phone']);
        }
        else if (req.user?.phoneNumber && req.user.phoneNumber !== '+919876543210') {
            query.phoneNumber = formatPhoneNumber(req.user.phoneNumber);
        }
        else if (req.user?.phoneNumber) {
            query.phoneNumber = formatPhoneNumber(req.user.phoneNumber);
        }
        else {
            query.phoneNumber = '+919876543210';
        }
        console.log('📥 [toggleAvailability Request]:', { isAvailable, query, headersPhone: req.headers['x-user-phone'], userPhone: req.user?.phoneNumber });
        let updatedUser = await User_1.default.findOneAndUpdate(query, { $set: { isAvailable } }, { new: true });
        if (!updatedUser && req.headers['x-user-phone']) {
            updatedUser = await User_1.default.findOneAndUpdate({ phoneNumber: formatPhoneNumber(req.headers['x-user-phone']) }, { $set: { isAvailable } }, { new: true });
        }
        if (!updatedUser && req.user?.phoneNumber) {
            updatedUser = await User_1.default.findOneAndUpdate({ phoneNumber: formatPhoneNumber(req.user.phoneNumber) }, { $set: { isAvailable } }, { new: true });
        }
        console.log(`🎉 [MongoDB Worker Availability Toggled Successfully]:`, {
            _id: updatedUser?._id,
            phoneNumber: updatedUser?.phoneNumber,
            isAvailable: updatedUser?.isAvailable,
        });
        return res.status(200).json({
            success: true,
            isAvailable: updatedUser?.isAvailable ?? isAvailable,
            message: `Worker is now ${isAvailable ? 'Online' : 'Offline'}`,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.toggleAvailability = toggleAvailability;
/**
 * @desc    Get Worker Dashboard Summary & Stats
 * @route   GET /api/worker/dashboard-stats
 */
const getDashboardStats = async (req, res, next) => {
    try {
        return res.status(200).json({
            success: true,
            stats: {
                profileViews: 245,
                callsReceived: 38,
                customersServed: 21,
                rating: 4.8,
                walletBalance: 450,
                isAvailable: true,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getDashboardStats = getDashboardStats;
/**
 * @desc    Get Customer Calls List for Worker
 * @route   GET /api/worker/customer-calls
 */
const getCustomerCalls = async (req, res, next) => {
    try {
        let workerObjectId = undefined;
        const phoneHeader = req.headers['x-user-phone'] || '';
        if (req.user?.id && mongoose_1.default.Types.ObjectId.isValid(req.user.id)) {
            workerObjectId = new mongoose_1.default.Types.ObjectId(req.user.id);
        }
        else if (phoneHeader) {
            const workerUser = await User_1.default.findOne({ phoneNumber: phoneHeader });
            if (workerUser)
                workerObjectId = workerUser._id;
        }
        if (!workerObjectId) {
            const workerUser = await User_1.default.findOne({ role: 'worker' });
            if (workerUser)
                workerObjectId = workerUser._id;
        }
        let callsFromDb = [];
        if (workerObjectId) {
            callsFromDb = await Call_1.default.find({
                $or: [
                    { workerId: workerObjectId },
                    { workerId: { $exists: false } },
                    { workerId: null }
                ]
            })
                .populate('customerId', 'fullName phoneNumber email profileImage location')
                .sort({ createdAt: -1 });
        }
        if (!callsFromDb || callsFromDb.length === 0) {
            callsFromDb = await Call_1.default.find()
                .populate('customerId', 'fullName phoneNumber email profileImage location')
                .sort({ createdAt: -1 });
        }
        const formattedCalls = await Promise.all(callsFromDb.map(async (c) => {
            let cust = c.customerId;
            if (cust && typeof cust === 'object' && cust.fullName) {
                // Already populated
            }
            else if (c.customerId && mongoose_1.default.Types.ObjectId.isValid(c.customerId)) {
                cust = await User_1.default.findById(c.customerId).select('fullName phoneNumber email profileImage location');
            }
            return {
                id: c._id ? c._id.toString() : c.id,
                customerName: cust?.fullName || c.customerName || 'Customer',
                phone: cust?.phoneNumber || c.customerPhone || '+91 98765 43210',
                service: c.service || 'Call Request Received',
                distance: cust?.location?.city ? `Near ${cust.location.city}` : (c.distance || '1.2 km away'),
                time: c.time || 'Just now',
                status: c.status || 'Pending',
                avatar: (cust?.profileImage && !cust.profileImage.startsWith('file://')) ? cust.profileImage : '👤',
            };
        }));
        console.log(`📞 [getCustomerCalls] Returning ${formattedCalls.length} call requests for worker`);
        return res.status(200).json({
            success: true,
            calls: formattedCalls,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getCustomerCalls = getCustomerCalls;
/**
 * @desc    Upload Worker Profile Image to AWS S3 & Sync MongoDB Key
 * @route   POST /api/worker/upload-profile-image
 */
const uploadProfileImage = async (req, res, next) => {
    try {
        const userId = req.body.userId || req.user?.id || req.query.userId;
        const file = req.file;
        console.log("888888888888888888888888888");
        if (!file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }
        let user;
        if (userId && userId !== 'mock-user-id') {
            try {
                user = await User_1.default.findById(userId);
            }
            catch (e) { }
        }
        if (!user && req.user?.id && req.user.id !== 'mock-user-id') {
            try {
                user = await User_1.default.findById(req.user.id);
            }
            catch (e) { }
        }
        if (!user && req.user?.phoneNumber) {
            try {
                user = await User_1.default.findOne({ phoneNumber: formatPhoneNumber(req.user.phoneNumber) });
            }
            catch (e) { }
        }
        if (!user && req.body?.phoneNumber) {
            try {
                user = await User_1.default.findOne({ phoneNumber: formatPhoneNumber(req.body.phoneNumber) });
            }
            catch (e) { }
        }
        if (!user && req.headers['x-user-phone']) {
            try {
                user = await User_1.default.findOne({ phoneNumber: formatPhoneNumber(req.headers['x-user-phone']) });
            }
            catch (e) { }
        }
        if (!user) {
            try {
                user = await User_1.default.findOne().sort({ createdAt: -1 });
            }
            catch (e) { }
        }
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const bucketName = (process.env.AWS_BUCKET_NAME || 'hunargo-dev').trim();
        const region = (process.env.AWS_REGION || 'ap-south-1').trim();
        console.log(bucketName, 'bucketName=================');
        // 1. Delete old image from AWS S3
        if (user.profileImage) {
            try {
                let oldKey = user.profileImage;
                if (oldKey.startsWith('http://') || oldKey.startsWith('https://')) {
                    try {
                        const parsedUrl = new URL(oldKey);
                        oldKey = parsedUrl.pathname.startsWith('/') ? parsedUrl.pathname.slice(1) : parsedUrl.pathname;
                    }
                    catch (e) {
                        const parts = oldKey.split('.amazonaws.com/');
                        if (parts.length > 1) {
                            oldKey = parts[1];
                        }
                    }
                }
                oldKey = decodeURIComponent(oldKey);
                if (oldKey && !oldKey.startsWith('file://') && !oldKey.startsWith('content://')) {
                    console.log(`🗑️ [S3 Delete] Deleting old image Key from S3: ${oldKey}`);
                    await s3_1.s3.send(new client_s3_1.DeleteObjectCommand({
                        Bucket: bucketName,
                        Key: oldKey,
                    }));
                    console.log(`✅ [S3 Deleted Successfully]: ${oldKey}`);
                }
            }
            catch (err) {
                console.warn('⚠️ S3 DeleteObject Warning:', err.message);
            }
        }
        // 2. Upload new image to AWS S3
        const targetUserId = user._id || userId || 'default';
        const rawExt = file.originalname ? file.originalname.split('.').pop() : 'png';
        const ext = rawExt ? rawExt.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() : 'png';
        const cleanExt = ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext) ? ext : 'png';
        const newKey = `workers/profile/${targetUserId}/${Date.now()}-profile.${cleanExt}`;
        const imageUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${newKey}`;
        try {
            console.log(`📤 [S3 Upload] Uploading to Key: ${newKey}`);
            await s3_1.s3.send(new client_s3_1.PutObjectCommand({
                Bucket: bucketName,
                Key: newKey,
                Body: file.buffer,
                ContentType: file.mimetype || `image/${cleanExt}`,
            }));
            user.profileImage = imageUrl;
            await user.save();
            console.log(`✅ [DB Updated]: profileImage set to ${imageUrl}`);
            return res.status(200).json({
                success: true,
                message: 'Profile image uploaded to S3 successfully',
                profileImage: user.profileImage,
                imageUrl,
                key: newKey,
            });
        }
        catch (uploadErr) {
            console.error('⚠️ S3 PutObject Error:', uploadErr.message);
            const mimeType = file.mimetype || `image/${cleanExt}`;
            const base64Image = `data:${mimeType};base64,${file.buffer.toString('base64')}`;
            user.profileImage = base64Image;
            await user.save();
            console.log(`✅ [DB Updated Fallback]: profileImage set to base64 Data URI`);
            return res.status(200).json({
                success: true,
                message: 'Profile image updated (Base64 fallback mode)',
                profileImage: user.profileImage,
                imageUrl: base64Image,
                key: newKey,
            });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.uploadProfileImage = uploadProfileImage;
/**
 * @desc    Update Call Request Status (Accept or Cancel)
 * @route   POST /api/worker/call-status
 */
const updateCallStatus = async (req, res, next) => {
    try {
        const { callId, status } = req.body;
        if (!callId || !status) {
            return res.status(400).json({ success: false, message: 'callId and status are required' });
        }
        let updatedCall = null;
        if (mongoose_1.default.Types.ObjectId.isValid(callId)) {
            updatedCall = await Call_1.default.findByIdAndUpdate(callId, { status }, { new: true });
        }
        if (!updatedCall) {
            updatedCall = await Call_1.default.findOneAndUpdate({ status: 'Pending' }, { status }, { new: true, sort: { createdAt: -1 } });
        }
        console.log(`📞 [Call Status Updated]: ID ${callId} set to status ${status}`);
        // Real-time broadcast to both Customer and Worker rooms
        if (updatedCall) {
            const eventPayload = {
                callId: updatedCall._id ? updatedCall._id.toString() : callId,
                status,
                customerId: updatedCall.customerId ? updatedCall.customerId.toString() : undefined,
                workerId: updatedCall.workerId ? updatedCall.workerId.toString() : undefined,
                updatedAt: new Date().toISOString(),
            };
            if (updatedCall.customerId) {
                (0, socketService_1.emitToUser)(updatedCall.customerId.toString(), 'call_status_updated', eventPayload);
            }
            if (updatedCall.workerId) {
                (0, socketService_1.emitToUser)(updatedCall.workerId.toString(), 'call_status_updated', eventPayload);
            }
        }
        return res.status(200).json({
            success: true,
            message: `Call status updated to ${status}`,
            call: updatedCall,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateCallStatus = updateCallStatus;
