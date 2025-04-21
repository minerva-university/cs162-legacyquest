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
  },

  /**
   * Get cohort information for the current user
   * @param {string} token - User's auth token
   * @returns {Promise<string>} - User's cohort name
   */
  getCohort: async (token) => {
    try {
      const userData = await UserApi.getProfile(token);
      
      // Handle different response formats
      if (!userData) return 'Unknown Cohort';
      
      // If cohort is an object with a name property
      if (userData.cohort && typeof userData.cohort === 'object' && userData.cohort.name) {
        return userData.cohort.name;
      }
      
      // If cohort is just a string
      if (typeof userData.cohort === 'string') {
        return userData.cohort;
      }
      
      return 'Unknown Cohort';
    } catch (error) {
      console.error('Error fetching user cohort:', error);
      return 'Unknown Cohort';
    }
  },

  /**
   * Get the user's current location
   * @param {string} token - User's auth token
   * @returns {Promise<string>} - User's location
   */
  getUserLocation: async (token) => {
    try {
      const userData = await UserApi.getProfile(token);
      
      // Check if user data exists and has location information
      if (!userData) return 'Global';
      
      // Return the user's location or a default value
      return userData.location || userData.city || 'Global';
    } catch (error) {
      console.error('Error fetching user location:', error);
      return 'Global'; // Default to global if error occurs
    }
  },

  /**
   * Get profile photo URL from user object
   * @param {Object} user - Firebase user object
   * @returns {string} - URL of profile photo
   */
  getProfilePhoto: (user) => {
    if (!user) return 'https://mui.com/static/images/avatar/1.jpg'; // Default avatar
    return user.photoURL || 'https://mui.com/static/images/avatar/1.jpg';
  },

  /**
   * Get display name from user object
   * @param {Object} user - Firebase user object
   * @returns {string} - User's display name
   */
  getUserName: (user) => {
    if (!user) return 'Guest User';
    // Extract first name from email if no display name
    if (!user.displayName && user.email) {
      const emailName = user.email.split('@')[0];
      return emailName.charAt(0).toUpperCase() + emailName.slice(1);
    }
    return user.displayName || 'Anonymous User';
  }
};

export default UserApi;