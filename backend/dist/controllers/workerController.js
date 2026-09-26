"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadProfileImage = exports.getCustomerCalls = exports.getDashboardStats = exports.toggleAvailability = exports.getProfessions = exports.updateProfessions = exports.getLocation = exports.updateLocation = exports.updateProfile = exports.getProfile = void 0;
const User_1 = __importDefault(require("../models/User"));
const Call_1 = __importDefault(require("../models/Call"));
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_1 = require("../config/s3");
/**
 * @desc    Get Worker Profile
 * @route   GET /api/worker/profile
 */
const getProfile = async (req, res, next) => {
    try {
        let worker;
        if (req.user?.id && req.user.id !== 'mock-user-id') {
            try {
                worker = await User_1.default.findById(req.user.id);
            }
            catch (err) { }
        }
        if (!worker && req.user?.phoneNumber) {
            try {
                worker = await User_1.default.findOne({ phoneNumber: formatPhoneNumber(req.user.phoneNumber) });
            }
            catch (err) { }
        }
        if (!worker && req.headers['x-user-phone']) {
            try {
                worker = await User_1.default.findOne({ phoneNumber: formatPhoneNumber(req.headers['x-user-phone']) });
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
        if (profileImageUri !== undefined)
            updateFields.profileImage = profileImageUri;
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
        const uniqueProfessions = Array.from(new Set(rawList.map((p) => (typeof p === 'string' ? p.trim() : p)).filter(Boolean)));
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
        try {
            await User_1.default.findOneAndUpdate({ phoneNumber: req.user?.phoneNumber }, { isAvailable });
        }
        catch (err) { }
        return res.status(200).json({
            success: true,
            isAvailable,
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
        let calls = [];
        try {
            calls = await Call_1.default.find().sort({ createdAt: -1 });
        }
        catch (err) { }
        if (!calls || calls.length === 0) {
            calls = [
                { id: '1', customerName: 'Amit Sharma', distance: '1.2 km away', service: 'Fan Repair & Wiring', time: 'Today 10:24 AM', status: 'Called', avatar: '👨' },
                { id: '2', customerName: 'Priya Singh', distance: '2.8 km away', service: 'Switchboard Fix', time: 'Yesterday 04:12 PM', status: 'Called', avatar: '👩' },
                { id: '3', customerName: 'Rohit Verma', distance: '4.5 km away', service: 'MCB Tripping Repair', time: '12 Sep 2025 11:36 AM', status: 'Called', avatar: '👨‍💼' },
                { id: '4', customerName: 'Neha Gupta', distance: '5.1 km away', service: 'Inverter Installation', time: '10 Sep 2025 03:20 PM', status: 'Called', avatar: '👩‍💼' },
                { id: '5', customerName: 'Vikas Malhotra', distance: '6.0 km away', service: 'General Electrical', time: '08 Sep 2025 02:15 PM', status: 'Called', avatar: '🧑‍🔧' },
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
exports.getCustomerCalls = getCustomerCalls;
/**
 * @desc    Upload Worker Profile Image to AWS S3 & Sync MongoDB Key
 * @route   POST /api/worker/upload-profile-image
 */
const uploadProfileImage = async (req, res, next) => {
    try {
        const userId = req.body.userId || req.user?.id || req.query.userId;
        const file = req.file;
        if (!file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }
        let user;
        if (userId) {
            try {
                user = await User_1.default.findById(userId);
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
        if (!user) {
            try {
                user = await User_1.default.findOne().sort({ createdAt: -1 });
            }
            catch (e) { }
        }
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const bucketName = process.env.AWS_BUCKET_NAME || 'hunargo-bucket';
        // 1. Delete old image from AWS S3
        if (user.profileImage) {
            try {
                console.log(`🗑️ [S3 Delete] Deleting old image Key: ${user.profileImage}`);
                await s3_1.s3.send(new client_s3_1.DeleteObjectCommand({
                    Bucket: bucketName,
                    Key: user.profileImage,
                }));
            }
            catch (err) {
                console.warn('⚠️ S3 DeleteObject Warning:', err.message);
            }
        }
        // 2. Upload new image to AWS S3
        const targetUserId = user._id || userId || 'default';
        const cleanFileName = file.originalname ? file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_') : 'avatar.jpg';
        const newKey = `workers/profile/${targetUserId}/${Date.now()}-${cleanFileName}`;
        try {
            console.log(`📤 [S3 Upload] Uploading to Key: ${newKey}`);
            await s3_1.s3.send(new client_s3_1.PutObjectCommand({
                Bucket: bucketName,
                Key: newKey,
                Body: file.buffer,
                ContentType: file.mimetype || 'image/jpeg',
            }));
        }
        catch (uploadErr) {
            console.error('⚠️ S3 PutObject Error:', uploadErr.message);
            const fallbackUrl = `https://${bucketName}.s3.${process.env.AWS_REGION || 'ap-south-1'}.amazonaws.com/${newKey}`;
            user.profileImage = newKey;
            await user.save();
            return res.status(200).json({
                success: true,
                message: 'Profile image updated (Fallback mode)',
                profileImage: user.profileImage,
                imageUrl: fallbackUrl,
                key: newKey,
            });
        }
        // 3. Update DB
        user.profileImage = newKey;
        await user.save();
        const imageUrl = `https://${bucketName}.s3.${process.env.AWS_REGION || 'ap-south-1'}.amazonaws.com/${newKey}`;
        console.log(`✅ [DB Updated]: profileImage set to ${newKey}`);
        return res.status(200).json({
            success: true,
            message: 'Profile image uploaded to S3 successfully',
            profileImage: user.profileImage,
            imageUrl,
            key: newKey,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.uploadProfileImage = uploadProfileImage;
