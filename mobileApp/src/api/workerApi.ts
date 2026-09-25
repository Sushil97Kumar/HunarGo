import { API_BASE_URL, ENDPOINTS, defaultHeaders } from './apiConfig';

export interface CompleteProfilePayload {
  fullName: string;
  gender: string;
  dob: string;
  referralCode?: string;
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
   * Save worker complete profile details
   */
  async updateProfile(payload: CompleteProfilePayload) {
    try {
      console.log('API [updateProfile]:', payload);
      return { success: true, message: 'Profile updated successfully' };
    } catch (error) {
      console.error('Error in updateProfile:', error);
      throw error;
    }
  },

  /**
   * Save location & service radius
   */
  async updateLocationAndDistance(payload: LocationDistancePayload) {
    try {
      console.log('API [updateLocationAndDistance]:', payload);
      return { success: true, message: 'Location settings saved' };
    } catch (error) {
      console.error('Error in updateLocationAndDistance:', error);
      throw error;
    }
  },

  /**
   * Save worker selected professions/skills
   */
  async updateProfessions(professions: string[]) {
    try {
      console.log('API [updateProfessions]:', professions);
      return { success: true, message: 'Professions updated successfully' };
    } catch (error) {
      console.error('Error in updateProfessions:', error);
      throw error;
    }
  },

  /**
   * Toggle worker Online/Offline status
   */
  async toggleAvailability(isAvailable: boolean) {
    try {
      console.log('API [toggleAvailability]:', isAvailable);
      return { success: true, isAvailable };
    } catch (error) {
      console.error('Error in toggleAvailability:', error);
      throw error;
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
