import { Platform } from 'react-native';
import { API_BASE_URL, ENDPOINTS, defaultHeaders, getAuthHeaders } from './apiConfig';

export interface CompleteProfilePayload {
  fullName: string;
  email?: string;
  aadhaar?: string;
  gender?: string;
  dob?: string;
  referralCode?: string;
  phoneNumber?: string;
  profileImageUri?: string | null;
}

export interface LocationDistancePayload {
  address: string;
  city: string;
  pincode: string;
  maxDistanceKm: number;
}

export const workerApi = {
  /**
   * Upload Profile Image file to Node Express API -> AWS S3 Bucket
   */
  async uploadProfileImage(imageUri: string, userId?: string) {
    try {
      console.log('🚀 [workerApi.uploadProfileImage] Uploading:', imageUri);
      const formData = new FormData();
      const fileName = imageUri.split('/').pop() || `profile_${Date.now()}.jpg`;
      const match = /\.(\w+)$/.exec(fileName);
      const type = match ? `image/${match[1]}` : 'image/jpeg';

      formData.append('profileImage', {
        uri: Platform.OS === 'android' ? imageUri : imageUri.replace('file://', ''),
        name: fileName,
        type,
      } as any);

      if (userId) {
        formData.append('userId', userId);
      }

      const headers = getAuthHeaders();
      delete headers['Content-Type']; // Multipart boundary set automatically by fetch

      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.WORKER_UPLOAD_IMAGE}`, {
        method: 'POST',
        headers,
        body: formData,
      });

      const data = await response.json();
      console.log('✅ [workerApi.uploadProfileImage] Server Response:', data);
      return data;
    } catch (error) {
      console.error('❌ Error in uploadProfileImage:', error);
      return { success: false, message: 'Failed to upload profile image to server' };
    }
  },

  /**
   * Get worker complete profile details from DB
   */
  async getProfile() {
    try {
      console.log('🚀 [workerApi.getProfile] Fetching profile details from DB...');
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.WORKER_PROFILE}`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      console.log('✅ [workerApi.getProfile] Response:', data);
      return data;
    } catch (error) {
      console.error('❌ Error in getProfile:', error);
      return { success: false, worker: null };
    }
  },

  /**
   * Save worker complete profile details (fullName, email, aadhaar, etc.)
   */
  async updateProfile(payload: CompleteProfilePayload) {
    try {
      console.log('🚀 API [updateProfile]:', payload);
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.WORKER_PROFILE}`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log('✅ [workerApi.updateProfile] Server Response:', data);
      return data;
    } catch (error) {
      console.error('❌ Error in updateProfile:', error);
      return { success: false, message: 'Failed to update profile' };
    }
  },

  /**
   * Save location & service radius
   */
  async updateLocationAndDistance(payload: LocationDistancePayload) {
    try {
      console.log('🚀 API [updateLocationAndDistance]:', payload);
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.WORKER_LOCATION}`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log('✅ [workerApi.updateLocationAndDistance] Response:', data);
      return data;
    } catch (error) {
      console.error('❌ Error in updateLocationAndDistance:', error);
      return { success: false, message: 'Failed to update location' };
    }
  },

  /**
   * Get location & service radius
   */
  async getLocation() {
    try {
      console.log('🚀 API [getLocation]');
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.WORKER_LOCATION}`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      console.log('✅ [workerApi.getLocation] Response:', data);
      return data;
    } catch (error) {
      console.error('❌ Error in getLocation:', error);
      return { success: false, location: null };
    }
  },

  /**
   * Save worker selected professions/skills
   */
  async updateProfessions(professions: string[]) {
    try {
      console.log('🚀 API [updateProfessions]:', professions);
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.WORKER_PROFESSIONS}`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ professions }),
      });
      const data = await response.json();
      console.log('✅ [workerApi.updateProfessions] Response:', data);
      return data;
    } catch (error) {
      console.error('❌ Error in updateProfessions:', error);
      return { success: false, message: 'Failed to update professions' };
    }
  },

  /**
   * Get worker selected professions/skills
   */
  async getProfessions() {
    try {
      console.log('🚀 API [getProfessions]');
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.WORKER_PROFESSIONS}`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      console.log('✅ [workerApi.getProfessions] Response:', data);
      return data;
    } catch (error) {
      console.error('❌ Error in getProfessions:', error);
      return { success: false, professions: [] };
    }
  },

  /**
   * Toggle worker Online/Offline status
   */
  async toggleAvailability(isAvailable: boolean) {
    try {
      console.log('🚀 API [toggleAvailability]:', isAvailable);
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.WORKER_AVAILABILITY}`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ isAvailable }),
      });
      const data = await response.json();
      console.log('✅ [workerApi.toggleAvailability] Response:', data);
      return data;
    } catch (error) {
      console.error('❌ Error in toggleAvailability:', error);
      return { success: false, isAvailable };
    }
  },

  /**
   * Fetch worker dashboard summary & calls
   */
  async getDashboardData() {
    try {
      console.log('API [getDashboardData]');
      return {
        success: true,
        stats: {
          profileViews: 124,
          callsReceived: 18,
          walletBalance: 450,
          isAvailable: true,
        },
      };
    } catch (error) {
      console.error('Error in getDashboardData:', error);
      throw error;
    }
  },

  /**
   * Fetch Customer Calls list for Worker
   */
  async getCustomerCalls() {
    try {
      console.log('API [getCustomerCalls]');
      return {
        success: true,
        calls: [
          { id: '1', customerName: 'Rajesh Kumar', service: 'AC Service', time: '10 mins ago', status: 'Missed', location: 'Sector 62, Noida' },
          { id: '2', customerName: 'Priya Sharma', service: 'Plumbing', time: '1 hour ago', status: 'Completed', location: 'Indirapuram' },
          { id: '3', customerName: 'Amit Verma', service: 'Electrical Repair', time: 'Yesterday', status: 'Received', location: 'Vaishali' },
        ],
      };
    } catch (error) {
      console.error('Error in getCustomerCalls:', error);
      throw error;
    }
  },
};
