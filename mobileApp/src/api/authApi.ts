import { API_BASE_URL, ENDPOINTS, defaultHeaders, setAuthToken, setActiveUserPhone } from './apiConfig';

export interface SendOtpPayload {
  phoneNumber: string;
  role?: string;
  isLogin?: boolean;
}

export interface VerifyOtpPayload {
  phoneNumber: string;
  otp: string;
  role?: string;
}

export const authApi = {
  /**
   * Request OTP for login from Node Express API
   */
  async sendOtp(payload: SendOtpPayload) {
    try {
      if (payload.phoneNumber) {
        setActiveUserPhone(payload.phoneNumber);
      }
      console.log('🚀 [API sendOtp] Requesting:', `${API_BASE_URL}${ENDPOINTS.SEND_OTP}`, payload);
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.SEND_OTP}`, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log('✅ [API sendOtp] Server Response:', data);
      return data;
    } catch (error) {
      console.error('❌ Error in sendOtp:', error);
      return { success: false, message: 'Unable to connect to backend server' };
    }
  },

  /**
   * Verify entered 4-digit or 6-digit OTP with Node Express API
   */
  async verifyOtp(payload: VerifyOtpPayload) {
    try {
      if (payload.phoneNumber) {
        setActiveUserPhone(payload.phoneNumber);
      }
      console.log('🚀 [API verifyOtp] Requesting:', `${API_BASE_URL}${ENDPOINTS.VERIFY_OTP}`, payload);
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.VERIFY_OTP}`, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log('✅ [API verifyOtp] Server Response:', data);
      if (data && data.success) {
        if (data.token) {
          setAuthToken(data.token);
        }
        if (data.user?.phoneNumber) {
          setActiveUserPhone(data.user.phoneNumber);
        } else if (payload.phoneNumber) {
          setActiveUserPhone(payload.phoneNumber);
        }
      }
      return data;
    } catch (error) {
      console.error('❌ Error in verifyOtp:', error);
      return { success: false, message: 'Unable to connect to backend server' };
    }
  },
};
