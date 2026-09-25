/**
 * HunarGo API Configuration
 * Update BASE_URL with your actual backend server endpoint
 */
export const API_BASE_URL = 'http://10.0.2.2:5000/api'; // Default Android Emulator localhost API

export const ENDPOINTS = {
  // Auth & OTP
  SEND_OTP: '/auth/send-otp',
  VERIFY_OTP: '/auth/verify-otp',
  
  // Worker Flow
  WORKER_PROFILE: '/worker/profile',
  WORKER_LOCATION: '/worker/location',
  WORKER_PROFESSIONS: '/worker/professions',
  WORKER_TOGGLE_AVAILABILITY: '/worker/availability',
  WORKER_DASHBOARD_STATS: '/worker/dashboard-stats',
  WORKER_CUSTOMER_CALLS: '/worker/customer-calls',
  WORKER_WALLET: '/worker/wallet',
  
  // Customer Flow
  SEARCH_WORKERS: '/customer/search-workers',
  CUSTOMER_CALLS: '/customer/calls',
  CALL_WORKER: '/customer/call-worker',
};

export const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};
