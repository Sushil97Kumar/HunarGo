import { API_BASE_URL, ENDPOINTS, defaultHeaders } from './apiConfig';

export interface SendOtpPayload {
  phoneNumber: string;
  role?: string;
}

export interface VerifyOtpPayload {
  phoneNumber: string;
  otp: string;
}

export const authApi = {
  /**
   * Request OTP for login
   */
  async sendOtp(payload: SendOtpPayload) {
    try {
      // Plug your API call here:
      // const response = await fetch(`${API_BASE_URL}${ENDPOINTS.SEND_OTP}`, {
      //   method: 'POST',
      //   headers: defaultHeaders,
      //   body: JSON.stringify(payload),
      // });
      // return await response.json();
      
      console.log('API [sendOtp]:', payload);
      return { success: true, message: 'OTP sent successfully' };
    } catch (error) {
      console.error('Error in sendOtp:', error);
      throw error;
    }
  },

  /**
   * Verify entered 4-digit OTP
   */
  async verifyOtp(payload: VerifyOtpPayload) {
    try {
      // Plug your API call here:
      // const response = await fetch(`${API_BASE_URL}${ENDPOINTS.VERIFY_OTP}`, {
      //   method: 'POST',
      //   headers: defaultHeaders,
      //   body: JSON.stringify(payload),
      // });
      // return await response.json();

      console.log('API [verifyOtp]:', payload);
      return { success: true, token: 'mock-jwt-token-12345', message: 'OTP Verified' };
    } catch (error) {
      console.error('Error in verifyOtp:', error);
      throw error;
    }
  },
};
