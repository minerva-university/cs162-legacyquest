import { API_BASE_URL, getAuthHeader } from './apiConfig';

/**
 * LegacyApi - Service for legacy-related API calls
 */
export const LegacyApi = {
  /**
   * Get all legacies
   * @param {string} token - User's auth token
   * @returns {Promise<Array>} - Array of legacies
   */
  getLegacies: async (token) => {
    try {
      const endpoint = API_BASE_URL ? `${API_BASE_URL}/api/legacies` : '/api/legacies';
      const response = await fetch(endpoint, {
        headers: getAuthHeader(token),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch legacies');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching legacies:', error);
      throw error;
    }
  },

  /**
   * Get a specific legacy by ID
   * @param {string} token - User's auth token
   * @param {string} legacyId - ID of the legacy to fetch
   * @returns {Promise<Object>} - Legacy details
   */
  getLegacyById: async (token, legacyId) => {
    try {
      const endpoint = API_BASE_URL ? `${API_BASE_URL}/api/legacies/${legacyId}` : `/api/legacies/${legacyId}`;
      const response = await fetch(endpoint, {
        headers: getAuthHeader(token),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch legacy');
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching legacy ${legacyId}:`, error);
      throw error;
    }
  },

  /**
   * Join a legacy
   * @param {string} token - User's auth token
   * @param {string} legacyId - ID of the legacy to join
   * @returns {Promise<Object>} - Updated user profile with legacy info
   */
  joinLegacy: async (token, legacyId) => {
    try {
      const endpoint = API_BASE_URL ? `${API_BASE_URL}/api/legacies/${legacyId}/join` : `/api/legacies/${legacyId}/join`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: getAuthHeader(token),
      });

      if (!response.ok) {
        throw new Error('Failed to join legacy');
      }

      return await response.json();
    } catch (error) {
      console.error('Error joining legacy:', error);
      throw error;
    }
  },

  /**
   * Get legacy rankings
   * @param {string} token - User's auth token
   * @returns {Promise<Array>} - Array of legacies with rank info
   */
  getLegacyRankings: async (token) => {
    try {
      const endpoint = API_BASE_URL ? `${API_BASE_URL}/api/legacies/rankings` : '/api/legacies/rankings';
      const response = await fetch(endpoint, {
        headers: getAuthHeader(token),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch legacy rankings');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching legacy rankings:', error);
      throw error;
    }
  },

  // Retrieve a user's legacy name from the server. The return format is a the user's legacy name (string).
  // E.g., 'Vista'
  getLegacyName: async (token) => {
    if (!token) throw new Error('Authentication token is required for getLegacyName.');
    
    try {
      const res = await fetch(`${API_BASE_URL}/api/me`, {
        method: 'GET',
        headers: getAuthHeader(token),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(`Failed to fetch user data: ${res.status} ${res.statusText} - ${errorData.error || 'Unknown error'}`);
      }

      const userData = await res.json();
      return userData.legacy?.name || 'Unknown Legacy';
    } catch (err) {
      console.error('Error in LegacyApi.getLegacyName:', err);
      throw err;
    }
  },
  
  // Retrieve a list of legacy members from the server. The return format is an array of objects, each containing:
  // - name (string): The name of the member
  // - cohort (string): The cohort of the member
  // - location (string): The location of the member
  // - avatarUrl (string): The URL of the member's avatar image
  // The data doesn't need to be sorted.
  getLegacyMembers: async (token, baseLegacyName) => {
    if (!token) throw new Error('Authentication token is required for getLegacyMembers.');
    if (!baseLegacyName) throw new Error('Base legacy name is required for getLegacyMembers.');
    
    try {
      // Directly use the provided baseLegacyName for the endpoint
      const membersRes = await fetch(`${API_BASE_URL}/api/legacy/byname/${baseLegacyName}/members`, {
        method: 'GET',
        headers: getAuthHeader(token),
      });

      if (!membersRes.ok) {
        const errorData = await membersRes.json().catch(() => ({})); // Try to get error details
        console.warn(`Failed to fetch legacy members for ${baseLegacyName}: ${membersRes.status} ${membersRes.statusText} - ${errorData.error || 'Unknown error'}`);
        return []; // Return empty array on failure
      }

      const membersData = await membersRes.json();
      
      console.log(`Members data for ${baseLegacyName} from API:`, membersData);
      
      // Ensure the data is an array before mapping
      if (Array.isArray(membersData)) {
        return membersData.map(member => ({
          name: member.name || 'Unknown',
          cohort: member.cohort || 'Unknown Cohort',
          avatarUrl: member.profile_picture_url || 'https://mui.com/static/images/avatar/1.jpg', // Default avatar
        }));
      } else {
        console.warn('Legacy members endpoint returned non-array data:', membersData);
        return []; // Return empty array if data format is incorrect
      }
    } catch (err) {
      console.error(`Error in LegacyApi.getLegacyMembers for ${baseLegacyName}:`, err);
      return []; // Return empty array on exception
    }
  },

  // NEW function to fetch members of a specific cohort and legacy
  getSpecificCohortMembers: async (token, legacyId, cohortId) => {
    if (!token) throw new Error('Authentication token is required.');
    if (legacyId == null || cohortId == null) throw new Error('Legacy ID and Cohort ID are required.');

    try {
      const res = await fetch(`${API_BASE_URL}/api/legacy/${legacyId}/cohort/${cohortId}/members`, {
        method: 'GET',
        headers: getAuthHeader(token),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.warn(`Failed to fetch specific cohort members: ${res.status} ${res.statusText} - ${errorData.error || 'Unknown error'}`);
        return [];
      }

      const membersData = await res.json();

      if (Array.isArray(membersData)) {
        // Map to the format expected by the component (name, avatarUrl, cohort)
        return membersData.map(member => ({
          name: member.name || 'Unknown',
          cohort: member.cohort || 'Unknown Cohort',
          avatarUrl: member.profile_picture_url || 'https://mui.com/static/images/avatar/1.jpg',
        }));
      } else {
        console.warn('Specific cohort members endpoint returned non-array data:', membersData);
        return [];
      }
    } catch (err) {
      console.error(`Error in LegacyApi.getSpecificCohortMembers for legacy ${legacyId}, cohort ${cohortId}:`, err);
      return [];
    }
  },

  // Updated to fetch real global ranking data from the server.
  getGlobalRanking: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/legacies/rankings/global`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(`Failed to fetch global rankings: ${res.status} ${res.statusText} - ${errorData.error || 'Unknown error'}`);
      }

      const rankings = await res.json();
      
      // Ensure we have the expected format
      if (!Array.isArray(rankings)) {
        throw new Error('Global rankings endpoint returned invalid data format');
      }

      return rankings;
    } catch (err) {
      console.error('Error in LegacyApi.getGlobalRanking:', err);
      throw err; // Re-throw the error instead of using fallback data
    }
  },

  // Updated to fetch real local ranking data from the server.
  getLocalRanking: async (cityName) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/legacies/rankings/local/${encodeURIComponent(cityName)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(`Failed to fetch local rankings: ${res.status} ${res.statusText} - ${errorData.error || 'Unknown error'}`);
      }

      const rankings = await res.json();
      
      // Ensure we have the expected format
      if (!Array.isArray(rankings)) {
        throw new Error('Local rankings endpoint returned invalid data format');
      }

      return rankings;
    } catch (err) {
      console.error('Error in LegacyApi.getLocalRanking:', err);
      throw err; // Re-throw the error instead of using fallback data
    }
  },

  /**
   * Get legacy data by name
   * @param {string} token - User's auth token
   * @param {string} name - Name of the legacy to fetch
   * @returns {Promise<Object>} - Legacy details
   */
  getLegacy: async (token, name) => {
    try {
      if (!token) throw new Error('Authentication token is required');
      if (!name) throw new Error('Legacy name is required');
      
      const endpoint = API_BASE_URL 
        ? `${API_BASE_URL}/api/legacy/byname/${encodeURIComponent(name)}` 
        : `/api/legacy/byname/${encodeURIComponent(name)}`;
      
      const response = await fetch(endpoint, {
        headers: getAuthHeader(token),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error(`Failed to fetch legacy by name (${name}):`, errorData.error || response.statusText);
        throw new Error('Failed to fetch legacy');
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching legacy by name (${name}):`, error);
      return { name: name, icon_url: null }; // Return minimal data to prevent UI errors
    }
  }
};

export default LegacyApi;