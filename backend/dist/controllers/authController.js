"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = exports.verifyOtp = exports.verifyOtpAndSignup = exports.sendOtp = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const Otp_1 = __importDefault(require("../models/Otp"));
const twilio_1 = require("../config/twilio");
/**
 * @desc    Send OTP to user phone number via Twilio Verify API
 * @route   POST /api/auth/send-otp
 */
const sendOtp = async (req, res, next) => {
    try {
        const { phoneNumber, role = 'worker', isLogin = false } = req.body;
        if (!phoneNumber) {
            return res.status(400).json({ success: false, message: 'Phone number is required' });
        }
        const formattedPhone = (0, twilio_1.formatPhoneNumberE164)(phoneNumber.toString());
        // Validation for Login Flow: Check if user exists in database
        if (isLogin) {
            const existingUser = await User_1.default.findOne({ phoneNumber: formattedPhone });
            if (!existingUser) {
                console.log(`❌ [sendOtp Login Check]: No user found in DB for ${formattedPhone}`);
                return res.status(404).json({
                    success: false,
                    userNotFound: true,
                    message: "You don't have an account yet. Please sign up first.",
                });
            }
        }
        let twilioStatus = '';
        let twilioSent = false;
        try {
            console.log(`📲 [sendOTP] Triggering Twilio Verify to ${formattedPhone}...`);
            twilioStatus = await (0, twilio_1.sendOTP)(formattedPhone);
            twilioSent = twilioStatus === 'pending' || twilioStatus === 'approved';
        }
        catch (twilioErr) {
            console.error('⚠️ Twilio sendOTP Error:', twilioErr.message);
        }
        // Static fallback OTP for development testing if Twilio fails or is pending
        const defaultOtp = '123456';
        try {
            await Otp_1.default.deleteMany({ phoneNumber: formattedPhone });
            await Otp_1.default.create({ phoneNumber: formattedPhone, otp: defaultOtp });
        }
        catch (err) { }
        console.log(`\n==========================================`);
        console.log(`📲 [Node API sendOtp] Request Processed`);
        console.log(`📱 Raw Phone     : ${phoneNumber}`);
        console.log(`📱 Formatted E164 : ${formattedPhone}`);
        console.log(`👤 Signup Role    : ${role}`);
        console.log(`📡 Twilio Status  : ${twilioSent ? `OTP sent: ${twilioStatus}` : 'Fallback Dev Mode (Static OTP: 123456 / 1234)'}`);
        console.log(`==========================================\n`);
        return res.status(200).json({
            success: true,
            message: twilioSent ? `OTP sent to ${formattedPhone} via Twilio` : 'OTP sent successfully',
            phoneNumber: formattedPhone,
            status: twilioStatus,
            otp: twilioSent ? undefined : defaultOtp,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.sendOtp = sendOtp;
/**
 * @desc    Verify OTP via Twilio and complete Signup / Login for Worker or Customer
 * @route   POST /api/auth/verify-otp or POST /api/auth/signup
 */
const verifyOtpAndSignup = async (req, res, next) => {
    try {
        const { phoneNumber, otp, role = 'worker', fullName } = req.body;
        console.log("req.=========body", req.body);
        if (!phoneNumber || !otp) {
            return res.status(400).json({
                success: false,
                message: 'Phone number and OTP code are required'
            });
        }
        const formattedPhone = (0, twilio_1.formatPhoneNumberE164)(phoneNumber.toString());
        const otpCode = otp.toString().trim();
        const signupRole = role === 'customer' ? 'customer' : 'worker';
        console.log(`\n==========================================`);
        console.log(`🔒 [Node API Signup Flow] Verifying OTP`);
        console.log(`📱 Phone Number : ${formattedPhone}`);
        console.log(`🔑 Entered OTP  : ${otpCode}`);
        console.log(`👤 Target Role  : ${signupRole}`);
        console.log(`==========================================\n`);
        let isApproved = false;
        // STEP 1: VERIFY OTP WITH TWILIO VERIFY SERVICE
        try {
            isApproved = await (0, twilio_1.verifyOTP)(formattedPhone, otpCode);
        }
        catch (twilioErr) {
            console.error('⚠️ Twilio verifyOTP Error:', twilioErr.message);
            // Fallback dev mode check
            if (otpCode === '123456' || otpCode === '1234') {
                isApproved = true;
            }
        }
        // STEP 2: IF OTP IS NOT CORRECT -> SHOW ERROR MESSAGE
        if (!isApproved) {
            console.log(`❌ [OTP Failed]: Entered OTP ${otpCode} is invalid for ${formattedPhone}`);
            return res.status(400).json({
                success: false,
                message: 'OTP is not correct. Please enter the valid code.',
            });
        }
        // STEP 3: IF OTP VERIFIED SUCCESSFULLY -> CREATE WORKER OR CUSTOMER USER IN MONGO DB
        let user;
        let isNewUser = false;
        try {
            user = await User_1.default.findOne({ phoneNumber: formattedPhone });
            if (!user) {
                isNewUser = true;
                const userName = fullName || '';
                user = await User_1.default.create({
                    phoneNumber: formattedPhone,
                    role: signupRole,
                    fullName: userName,
                    email: '',
                    aadhaar: '',
                    profileImage: '',
                    isVerified: true,
                    isAvailable: signupRole === 'worker',
                    professions: [],
                    hourlyRate: signupRole === 'worker' ? 350 : 0,
                    visitingCharge: signupRole === 'worker' ? 150 : 0,
                    location: {
                        address: '',
                        city: '',
                        pincode: '',
                        serviceRadius: 15,
                    },
                });
                console.log(`🎉 [MongoDB Signup Success]: New ${signupRole.toUpperCase()} created for ${formattedPhone}`);
            }
            else {
                // Preserve existing user's role from MongoDB
                if (!user.role) {
                    user.role = signupRole;
                    await user.save();
                }
                console.log(`👤 [MongoDB Login Success]: Existing ${user.role.toUpperCase()} logged in: ${formattedPhone}`);
            }
        }
        catch (err) {
            console.error('⚠️ User DB Error:', err.message);
            user = { _id: 'mock-user-id', phoneNumber: formattedPhone, role: signupRole, fullName: '' };
        }
        // STEP 4: Generate JWT Auth Token
        const token = jsonwebtoken_1.default.sign({ id: user._id, phoneNumber: formattedPhone, role: user.role }, process.env.JWT_SECRET || 'hunargo_super_secret_jwt_key_2026', { expiresIn: '30d' });
        // Check if customer or worker profile steps are fully completed
        const effectiveRole = user.role || signupRole || 'customer';
        const isProfileComplete = effectiveRole === 'customer'
            ? Boolean(!isNewUser && user.fullName && user.fullName.trim().length > 0)
            : Boolean(!isNewUser && user.fullName && user.fullName.trim().length > 0 && Array.isArray(user.professions) && user.professions.length > 0);
        return res.status(200).json({
            success: true,
            token,
            isNewUser,
            isProfileComplete,
            message: isNewUser ? `${signupRole.toUpperCase()} Signup successful!` : 'Login successful!',
            user: {
                id: user._id,
                phoneNumber: user.phoneNumber,
                role: user.role,
                fullName: user.fullName,
                email: user.email || '',
                aadhaar: user.aadhaar || '',
                profileImage: user.profileImage || '',
                location: user.location,
                isVerified: true,
                isAvailable: user.isAvailable,
                professions: user.professions || [],
                isProfileComplete,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.verifyOtpAndSignup = verifyOtpAndSignup;
// Export alias verifyOtp for backward compatibility
exports.verifyOtp = exports.verifyOtpAndSignup;
exports.signup = exports.verifyOtpAndSignup;
