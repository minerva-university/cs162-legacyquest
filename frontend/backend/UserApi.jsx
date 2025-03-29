const UserApi = {
  // Simulate retrieving a user's cohort name from the server. The return format is the user's cohort name (string).
  // E.g., 'M24'
  getCohort: async () => {
    // A fake delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return 'M24';
  },

  // Simulate retrieving a user's location from the server. The return format is a city name (string).
  // E.g., 'San Francisco'
  getUserLocation: async () => {
      // A fake delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return 'San Francisco';
  },
};

export default UserApi;