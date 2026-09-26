import twilio from 'twilio';

const accountSid = (process.env.TWILIO_ACCOUNT_SID || '').trim();
const authToken = (process.env.TWILIO_AUTH_TOKEN || '').trim();
const verifyServiceSid = (process.env.TWILIO_VERIFY_SERVICE_SID || '').trim();

export const twilioClient = accountSid && authToken && accountSid.startsWith('AC')
  ? twilio(accountSid, authToken)
  : null;

export const TWILIO_VERIFY_SERVICE_SID = verifyServiceSid;

/**
 * Format phone number to E.164 standard (e.g. +919876543210)
 */
export const formatPhoneNumberE164 = (phone: string, defaultCountryCode: string = '+91'): string => {
  const cleaned = phone.replace(/[^0-9+]/g, '');
  if (cleaned.startsWith('+')) {
    return cleaned;
  }
  if (cleaned.length === 10) {
    return `${defaultCountryCode}${cleaned}`;
  }
  return `+${cleaned}`;
};

/**
 * Send OTP via Twilio Verify Service
 */
export async function sendOTP(phoneNumber: string): Promise<string> {
  const formattedPhone = formatPhoneNumberE164(phoneNumber);
  
  if (!twilioClient || !TWILIO_VERIFY_SERVICE_SID) {
    console.log(`[Twilio Warning] Credentials missing in .env. Skipping Twilio call.`);
    return 'pending';
  }

  try {
    const verification = await twilioClient.verify.v2
      .services(TWILIO_VERIFY_SERVICE_SID)
      .verifications.create({
        to: formattedPhone,
        channel: 'sms',
      });

    console.log("OTP sent:", verification.status);
    return verification.status;
  } catch (error: any) {
    console.error("OTP error:", error.message);
    throw error;
  }
}

/**
 * Verify OTP via Twilio Verify Service
 */
export async function verifyOTP(phoneNumber: string, otp: string): Promise<boolean> {
  const formattedPhone = formatPhoneNumberE164(phoneNumber);

  if (!twilioClient || !TWILIO_VERIFY_SERVICE_SID) {
    console.log(`[Twilio Warning] Credentials missing in .env. Falling back to dev verification.`);
    return otp === '123456' || otp === '1234';
  }

  try {
    const result = await twilioClient.verify.v2
      .services(TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks.create({
        to: formattedPhone,
        code: otp,
      });

    console.log("OTP verification status:", result.status);
    return result.status === "approved";
  } catch (error: any) {
    console.error("OTP verification error:", error.message);
    throw error;
  }
}
