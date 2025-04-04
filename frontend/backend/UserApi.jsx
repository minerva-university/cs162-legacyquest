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
        console.log("Found photoURL:", currentUser.photoURL); // Debugging log
        return currentUser.photoURL;
      }
      
      // If using Firebase Auth with Google, try to get from providerData
      if (currentUser.providerData && currentUser.providerData.length > 0) {
        const googleProvider = currentUser.providerData.find(
          provider => provider.providerId === 'google.com'
        );
        
        if (googleProvider && googleProvider.photoURL) {
          console.log("Found provider photoURL:", googleProvider.photoURL); // Debugging log
          return googleProvider.photoURL;
        }
      }
    }
    
    // Fallback to a default avatar if no photo is available
    console.log("No photo found, using default"); // Debugging log
    return 'https://mui.com/static/images/avatar/1.jpg';
  }
};

export default UserApi;