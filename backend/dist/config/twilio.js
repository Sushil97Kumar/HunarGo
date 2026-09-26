"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPhoneNumberE164 = exports.TWILIO_VERIFY_SERVICE_SID = exports.twilioClient = void 0;
exports.sendOTP = sendOTP;
exports.verifyOTP = verifyOTP;
const twilio_1 = __importDefault(require("twilio"));
const accountSid = (process.env.TWILIO_ACCOUNT_SID || '').trim();
const authToken = (process.env.TWILIO_AUTH_TOKEN || '').trim();
const verifyServiceSid = (process.env.TWILIO_VERIFY_SERVICE_SID || '').trim();
exports.twilioClient = accountSid && authToken && accountSid.startsWith('AC')
    ? (0, twilio_1.default)(accountSid, authToken)
    : null;
exports.TWILIO_VERIFY_SERVICE_SID = verifyServiceSid;
/**
 * Format phone number to E.164 standard (e.g. +919876543210)
 */
const formatPhoneNumberE164 = (phone, defaultCountryCode = '+91') => {
    const cleaned = phone.replace(/[^0-9+]/g, '');
    if (cleaned.startsWith('+')) {
        return cleaned;
    }
    if (cleaned.length === 10) {
        return `${defaultCountryCode}${cleaned}`;
    }
    return `+${cleaned}`;
};
exports.formatPhoneNumberE164 = formatPhoneNumberE164;
/**
 * Send OTP via Twilio Verify Service
 */
async function sendOTP(phoneNumber) {
    const formattedPhone = (0, exports.formatPhoneNumberE164)(phoneNumber);
    if (!exports.twilioClient || !exports.TWILIO_VERIFY_SERVICE_SID) {
        console.log(`[Twilio Warning] Credentials missing in .env. Skipping Twilio call.`);
        return 'pending';
    }
    try {
        const verification = await exports.twilioClient.verify.v2
            .services(exports.TWILIO_VERIFY_SERVICE_SID)
            .verifications.create({
            to: formattedPhone,
            channel: 'sms',
        });
        console.log("OTP sent:", verification.status);
        return verification.status;
    }
    catch (error) {
        console.error("OTP error:", error.message);
        throw error;
    }
}
/**
 * Verify OTP via Twilio Verify Service
 */
async function verifyOTP(phoneNumber, otp) {
    const formattedPhone = (0, exports.formatPhoneNumberE164)(phoneNumber);
    if (!exports.twilioClient || !exports.TWILIO_VERIFY_SERVICE_SID) {
        console.log(`[Twilio Warning] Credentials missing in .env. Falling back to dev verification.`);
        return otp === '123456' || otp === '1234';
    }
    try {
        const result = await exports.twilioClient.verify.v2
            .services(exports.TWILIO_VERIFY_SERVICE_SID)
            .verificationChecks.create({
            to: formattedPhone,
            code: otp,
        });
        console.log("OTP verification status:", result.status);
        return result.status === "approved";
    }
    catch (error) {
        console.error("OTP verification error:", error.message);
        throw error;
    }
}
