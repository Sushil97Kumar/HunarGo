import { API_BASE_URL, ENDPOINTS, defaultHeaders } from './apiConfig';

export const customerApi = {
  /**
   * Search nearby workers by category / profession
   */
  async searchWorkers(category?: string, query?: string) {
    try {
      console.log('API [searchWorkers]:', { category, query });
      return {
        success: true,
        workers: [
          { id: 'w1', name: 'Sushil Kumar', profession: 'Electrician', rating: 4.9, distance: '1.2 km', phone: '+919876543210' },
          { id: 'w2', name: 'Ramesh Singh', profession: 'Plumber', rating: 4.7, distance: '2.5 km', phone: '+919876543211' },
        ],
      };
    } catch (error) {
      console.error('Error in searchWorkers:', error);
      throw error;
    }
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
   * Fetch current customer profile from backend
   */
  async getCustomerProfile() {
    try {
      console.log('API [getCustomerProfile]');
      return {
        success: true,
        profile: {
          id: 'c1',
          fullName: 'Sushil Kumar',
          phoneNumber: '+91 98765 43210',
          email: 'sushil.kumar@hunargo.com',
          gender: 'Male',
          dob: '15 Aug 1995',
          profileImage: '',
          location: {
            address: 'Zirakpur, Punjab',
            city: 'Zirakpur',
            pincode: '140603',
          },
        },
      };
    } catch (error) {
      console.error('Error in getCustomerProfile:', error);
      throw error;
    }
  },
};
