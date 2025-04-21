const API_BASE_URL = import.meta.env.VITE_API_URL;

// Adds token and content headers for authenticated requests
const getAuthHeader = (token) => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
});

const UserApi = {
  // NEW function to fetch the full user object from /api/me
  getMe: async (token) => {
    if (!token) throw new Error('Authentication token is required for getMe.');
    
    try {
      const res = await fetch(`${API_BASE_URL}/api/me`, {
        method: 'GET',
        headers: getAuthHeader(token),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error(`Failed to fetch user data: ${res.status} ${res.statusText}`, errorData);
        throw new Error(`Failed to fetch user data: ${res.status} ${res.statusText} - ${errorData.error || 'Unknown error'}`);
      }

      const userData = await res.json();
      // Returns the full object, including nested legacy and cohort details
      // Example: { user_id: 1, email: '...', ..., legacy: { legacy_id: 5, name: 'Ocean SF', ... }, cohort: { cohort_id: 2, name: 'M24' } }
      return userData;
    } catch (err) {
      console.error('Error in UserApi.getMe:', err);
      // Re-throw the error so the calling component can handle it
      throw err; 
    }
  },

  // Retrieve a user's cohort name from the server. The return format is the user's cohort name (string).
  // E.g., 'M24'
  getCohort: async (token) => {
    if (!token) throw new Error('Authentication token is required for getCohort.');
    
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
      return userData.cohort?.name || 'Unknown Cohort';
    } catch (err) {
      console.error('Error in UserApi.getCohort:', err);
      throw err;
    }
  },
  
  // Retrieve a user's legacy name from the server. The return format is the legacy name (string).
  // E.g., 'Turing'
  getLegacy: async (token) => {
    if (!token) throw new Error('Authentication token is required for getLegacy.');
    
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
      console.error('Error in UserApi.getLegacy:', err);
      throw err;
    }
  },

  // Retrieve a user's location from the server. The return format is a city name (string).
  // E.g., 'San Francisco'
  getUserLocation: async (token) => {
    if (!token) throw new Error('Authentication token is required for getUserLocation.');
    
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
      
      // Check if legacy data exists and has a location_filter property
      if (userData.legacy && userData.legacy.location_filter) {
        return userData.legacy.location_filter;
      }
      
      return 'Unknown Location';
    } catch (err) {
      console.error('Error in UserApi.getUserLocation:', err);
      throw err;
    }
  },

  // Get username from current user data
  getUserName: (currentUser) => {
    if (currentUser) {
      if (currentUser.displayName) {
        return currentUser.displayName;
      } else if (currentUser.email) {
        // Extract the name part from the email (before @)
        const emailName = currentUser.email.split('@')[0];
        // Convert to title case (first letter capitalized)
        return emailName.charAt(0).toUpperCase() + emailName.slice(1);
      }
    }
    return "User";
  },

  // Get profile photo URL from current user
  getProfilePhoto: (currentUser) => {
    if (currentUser) {
      // Check for photoURL from Google account
      if (currentUser.photoURL) {
        return currentUser.photoURL;
      }
      
      // If using Firebase Auth with Google, try to get from providerData
      if (currentUser.providerData && currentUser.providerData.length > 0) {
        const googleProvider = currentUser.providerData.find(
          provider => provider.providerId === 'google.com'
        );
        
        if (googleProvider && googleProvider.photoURL) {
          return googleProvider.photoURL;
        }
      }
    }
    
    // Fallback to a default avatar if no photo is available
    return 'https://img.icons8.com/?size=100&id=114140&format=png&color=000000';
  }
};

export default UserApi;