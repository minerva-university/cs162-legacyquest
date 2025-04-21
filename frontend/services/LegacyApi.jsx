const API_BASE_URL = import.meta.env.VITE_API_URL;

// Adds token and content headers for authenticated requests
const getAuthHeader = (token) => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
});

const LegacyApi = {
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
  getLegacyMembers: async (token) => {
    if (!token) throw new Error('Authentication token is required for getLegacyMembers.');
    
    try {
      // First, get the user's legacy name
      const res = await fetch(`${API_BASE_URL}/api/me`, {
        method: 'GET',
        headers: getAuthHeader(token),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(`Failed to fetch user data: ${res.status} ${res.statusText} - ${errorData.error || 'Unknown error'}`);
      }

      const userData = await res.json();
      const legacyName = userData.legacy?.name || 'Unknown Legacy';
      
      // Extract base legacy name (first word)
      const baseLegacyName = legacyName.split(' ')[0];
      
      if (!baseLegacyName) {
        console.warn('Could not determine base legacy name');
        return [];
      }
      
      // Use the new endpoint
      const membersRes = await fetch(`${API_BASE_URL}/api/legacy/byname/${baseLegacyName}/members`, {
        method: 'GET',
        headers: getAuthHeader(token),
      });

      if (!membersRes.ok) {
        console.warn(`Failed to fetch legacy members: ${membersRes.status} ${membersRes.statusText}`);
        return [];
      }

      const membersData = await membersRes.json();
      
      console.log("Members data from API:", membersData);
      
      if (Array.isArray(membersData)) {
        return membersData.map(member => ({
          name: member.name || 'Unknown',
          cohort: member.cohort || 'Unknown Cohort',
          location: member.location || 'Unknown Location',
          avatarUrl: member.profile_picture_url || 'https://mui.com/static/images/avatar/1.jpg',
          legacy: member.legacy || legacyName
        }));
      }
      
      console.warn('Legacy members endpoint returned invalid data');
      return [];
    } catch (err) {
      console.error('Error in LegacyApi.getLegacyMembers:', err);
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
  }
};

export default LegacyApi;