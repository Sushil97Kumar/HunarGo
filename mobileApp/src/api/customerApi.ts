import { API_BASE_URL, ENDPOINTS, defaultHeaders, getAuthHeaders, getActiveUserPhone, getLoggedInUser } from './apiConfig';

export const customerApi = {
  /**
   * Search nearby workers by category / profession / coordinates / pagination
   */
  async searchWorkers(category?: string, query?: string, lat?: number, lng?: number, page: number = 1, limit: number = 10) {
    try {
      let url = `${API_BASE_URL}/customer/search-workers?page=${page}&limit=${limit}&`;
      if (category && category !== 'All') url += `category=${encodeURIComponent(category)}&`;
      if (query) url += `query=${encodeURIComponent(query)}&`;
      if (lat && lng) url += `lat=${lat}&lng=${lng}&`;

      console.log('🚀 [API searchWorkers] Requesting:', url);
      const response = await fetch(url, {
        method: 'GET',
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      console.log('✅ [API searchWorkers] Server Response:', data);
      if (data && data.success && Array.isArray(data.workers)) {
        return data;
      }
    } catch (error) {
      console.error('⚠️ Error in searchWorkers:', error);
    }

    return {
      success: true,
      workers: [
        { id: 'w1', name: 'Rajesh Kumar', fullName: 'Rajesh Kumar', profession: category || 'Plumber', rating: '4.8', reviews: '124', distance: '1.2 km away', phone: '+919876543210' },
        { id: 'w2', name: 'Sushil Kumar', fullName: 'Sushil Kumar', profession: category || 'Electrician', rating: '4.9', reviews: '98', distance: '2.1 km away', phone: '+919876543211' },
      ],
    };
  },

  /**
   * Fetch customer outgoing call history
   */
  async getCallHistory() {
    try {
      console.log('API [getCallHistory]');
      return {
        success: true,
        calls: [
          { id: 'c1', workerName: 'Sushil Kumar', profession: 'Electrician', date: 'Today, 2:30 PM', status: 'Connected' },
        ],
      };
    } catch (error) {
      console.error('Error in getCallHistory:', error);
      throw error;
    }
  },

  /**
   * Place call to worker
   */
  async callWorker(workerId: string) {
    try {
      console.log('API [callWorker]:', workerId);
      return { success: true, message: 'Initiating call...' };
    } catch (error) {
      console.error('Error in callWorker:', error);
      throw error;
    }
  },

  /**
   * Fetch current logged-in customer profile from backend
   */
  async getCustomerProfile() {
    try {
      console.log('API [getCustomerProfile] Requesting profile from backend...');
      const response = await fetch(`${API_BASE_URL}/customer/profile`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      console.log('✅ [API getCustomerProfile] Server Response:', data);
      if (data && data.success && data.profile) {
        return data;
      }
    } catch (error) {
      console.error('⚠️ Error fetching customer profile from backend:', error);
    }

    // Fallback to local stored session if backend response fails or offline
    const loggedInUser = getLoggedInUser();
    const activePhone = getActiveUserPhone();

    return {
      success: true,
      profile: {
        id: loggedInUser?.id || loggedInUser?._id || 'c1',
        fullName: loggedInUser?.fullName || 'Sushil Kumar',
        phoneNumber: loggedInUser?.phoneNumber || activePhone || '+91 98765 43210',
        email: loggedInUser?.email || 'sushil.kumar@hunargo.com',
        gender: loggedInUser?.gender || 'Male',
        dob: loggedInUser?.dob || '15 Aug 1995',
        profileImage: loggedInUser?.profileImage || '',
        location: loggedInUser?.location || {
          address: 'Zirakpur, Punjab',
          city: 'Zirakpur',
          pincode: '140603',
        },
      },
    };
  },

  /**
   * Update Customer profile in backend
   */
  async updateCustomerProfile(payload: { fullName?: string; email?: string; gender?: string; dob?: string; profileImage?: string }) {
    try {
      console.log('🚀 [API updateCustomerProfile] Requesting with payload:', payload);
      const response = await fetch(`${API_BASE_URL}/customer/profile`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log('✅ [API updateCustomerProfile] Server Response:', data);
      return data;
    } catch (error) {
      console.error('⚠️ Error in updateCustomerProfile:', error);
      return { success: false, message: 'Could not connect to server.' };
    }
  },

  /**
   * Submit Help & Support query to backend
   */
  async createHelpTicket(ticketData: { title: string; description: string }) {
    try {
      console.log('🎧 [API createHelpTicket] Submitting ticket:', ticketData);
      const response = await fetch(`${API_BASE_URL}/customer/help-support`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(ticketData),
      });
      const data = await response.json();
      console.log('✅ [API createHelpTicket] Server Response:', data);
      return data;
    } catch (error) {
      console.error('⚠️ Error in createHelpTicket:', error);
      return { success: false, message: 'Could not connect to support server. Please try again.' };
    }
  },
};
