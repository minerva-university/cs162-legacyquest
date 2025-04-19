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
      // First, get the user's data to determine their legacy ID
      const res = await fetch(`${API_BASE_URL}/api/me`, {
        method: 'GET',
        headers: getAuthHeader(token),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(`Failed to fetch user data: ${res.status} ${res.statusText} - ${errorData.error || 'Unknown error'}`);
      }

      const userData = await res.json();
      const legacyId = userData.legacy?.legacy_id;
      const legacyName = userData.legacy?.name || 'Unknown Legacy';
      
      if (!legacyId) {
        console.warn('User does not have a legacy ID, cannot fetch legacy members');
        return [];
      }
      
      // Fetch all users with the same legacy ID
      const membersRes = await fetch(`${API_BASE_URL}/api/legacy/${legacyId}/members`, {
        method: 'GET',
        headers: getAuthHeader(token),
      });

      if (!membersRes.ok) {
        // If the endpoint doesn't exist or returns an error, log it and return empty array
        console.warn(`Failed to fetch legacy members: ${membersRes.status} ${membersRes.statusText}`);
        return [];
      }

      const membersData = await membersRes.json();
      
      if (Array.isArray(membersData)) {
        // Map the backend data to the expected format
        const members = membersData.map(member => ({
          name: member.full_name || member.name || 'Unknown',
          cohort: member.cohort?.name || 'Unknown Cohort',
          location: member.location || 'Unknown Location',
          avatarUrl: member.profile_picture_url || 'https://mui.com/static/images/avatar/1.jpg',
          legacy: legacyName
        }));
        return members;
      }
      
      // If we reach here, the endpoint returned invalid data
      console.warn('Legacy members endpoint returned invalid data');
      return [];
    } catch (err) {
      console.error('Error in LegacyApi.getLegacyMembers:', err);
      throw err;
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
        console.warn('Global rankings endpoint returned invalid data format');
        return [];
      }

      return rankings;
    } catch (err) {
      console.error('Error in LegacyApi.getGlobalRanking:', err);
      
      // Fallback to dummy data if the endpoint fails or doesn't exist yet
      console.warn('Using fallback dummy data for global rankings');
      return [
        {name: 'Octagon', points: 999},
        {name: 'Tower', points: 888},
        {name: 'Bridge', points: 777},
        {name: 'Hunter', points: 666},
        {name: 'Chronicle', points: 555},
        {name: 'Pyramid', points: 444},
        {name: 'Vista', points: 333},
        {name: 'Cable', points: 222},
        {name: 'Pulse', points: 111},
        {name: 'Horizon', points: 100},
        {name: 'Pioneer', points: 90},
        {name: 'Eclipse', points: 80},
        {name: 'Quest', points: 70},
        {name: 'Solar', points: 60},
        {name: 'Nova', points: 50},
        {name: 'Galaxy', points: 40},
        {name: 'Orbit', points: 30},
        {name: 'Apex', points: 25},
        {name: 'Nexus', points: 20},
        {name: 'Zenith', points: 15},
        {name: 'Prism', points: 12},
        {name: 'Quantum', points: 9},
        {name: 'Cipher', points: 6},
        {name: 'Vector', points: 3},
        {name: 'Summit', points: 1}
      ];
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
        console.warn('Local rankings endpoint returned invalid data format');
        return [];
      }

      return rankings;
    } catch (err) {
      console.error('Error in LegacyApi.getLocalRanking:', err);
      
      // Fallback to dummy data if the endpoint fails or doesn't exist yet
      console.warn('Using fallback dummy data for local rankings');
      return [
        {name: 'Tower', points: 102},
        {name: 'Octagon', points: 99},
        {name: 'Bridge', points: 77},
        {name: 'Chronicle', points: 68},
        {name: 'Hunter', points: 66},
        {name: 'Pyramid', points: 44},
        {name: 'Vista', points: 33},
        {name: 'Cable', points: 22},
        {name: 'Pulse', points: 11},
        {name: 'Horizon', points: 10},
        {name: 'Pioneer', points: 9},
        {name: 'Eclipse', points: 8},
        {name: 'Quest', points: 7},
        {name: 'Solar', points: 6},
        {name: 'Nova', points: 5},
        {name: 'Galaxy', points: 4},
        {name: 'Orbit', points: 3},
        {name: 'Apex', points: 2.5},
        {name: 'Nexus', points: 2},
        {name: 'Zenith', points: 1.5},
        {name: 'Prism', points: 1},
        {name: 'Quantum', points: 0.8},
        {name: 'Cipher', points: 0.6},
        {name: 'Vector', points: 0.4},
        {name: 'Summit', points: 0.2}
      ];
    }
  }
};

export default LegacyApi;