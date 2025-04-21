import { API_BASE_URL, getAuthHeader } from './apiConfig';

/**
 * UserApi - Service for user-related API calls
 */
export const UserApi = {
  /**
   * Get the current user's profile
   * @param {string} token - User's auth token
   * @returns {Promise<Object>} - User profile data
   */
  getProfile: async (token) => {
    try {
      const endpoint = API_BASE_URL ? `${API_BASE_URL}/api/me` : '/api/me';
      const response = await fetch(endpoint, {
        headers: getAuthHeader(token),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },

  /**
   * Update the current user's profile
   * @param {string} token - User's auth token
   * @param {Object} profileData - Profile data to update
   * @returns {Promise<Object>} - Updated user profile
   */
  updateProfile: async (token, profileData) => {
    try {
      const endpoint = API_BASE_URL ? `${API_BASE_URL}/api/profile` : '/api/profile';
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: getAuthHeader(token),
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }
};

export default UserApi;