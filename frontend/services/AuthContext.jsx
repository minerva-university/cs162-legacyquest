// =============================================================================
// Authentication Context for LegacyQuest Frontend
// =============================================================================
// This context provider manages the application's authentication state using Firebase.
// It tracks the current Firebase user, their ID token (for backend API calls),
// and their assigned role within the application (admin/user).
// =============================================================================

import { createContext, useContext, useState, useEffect } from 'react';
// onIdTokenChanged: Firebase listener that triggers when the user logs in,
// logs out, OR when the ID token automatically refreshes in the background.
import { onIdTokenChanged } from 'firebase/auth';
import { auth } from './firebase'; // Firebase auth instance
import { getUserRole } from './authService'; // Helper to determine role based on email

// Create the React Context object.
const AuthContext = createContext();

// Custom Hook: useAuth()
// Provides an easy way for components to access the authentication context value.
// Usage: const { currentUser, idToken, isAdmin, isAuthenticated } = useAuth();
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider Component
// Wraps the application (typically in App.jsx or main.jsx) to make the
// authentication state available throughout the component tree.
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null); // Stores the Firebase user object
  const [userRole, setUserRole] = useState(null); // Stores app-specific role ('admin', 'user', etc.)
  const [idToken, setIdToken] = useState(null); // Stores the Firebase ID Token JWT string
  const [loading, setLoading] = useState(true); // Tracks initial authentication state loading

  // useEffect Hook: Sets up the Firebase auth state listener when the provider mounts.
  useEffect(() => {
    // onIdTokenChanged is the recommended listener for managing auth state and tokens.
    // It provides the user object and ensures the ID token state is updated upon refresh.
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      setCurrentUser(user); // Update the current Firebase user state

      if (user) {
        // User is signed in or token refreshed
        try {
          // Get the latest Firebase ID token. Crucial for backend API calls.
          const token = await user.getIdToken();
          setIdToken(token);
          // Determine and set the user's role within this application.
          const role = getUserRole(user.email);
          setUserRole(role);
        } catch (error) {
          // Handle errors during token retrieval (e.g., network issues)
          console.error("Error getting ID token:", error);
          // Clear auth state if token cannot be retrieved
          setIdToken(null);
          setUserRole(null);
          setCurrentUser(null);
        }
      } else {
        // User is signed out
        setIdToken(null); // Clear the token
        setUserRole(null); // Clear the role
      }

      // Mark loading as complete once the initial state check is done.
      setLoading(false);
    });

    // Cleanup function: Unsubscribe from the listener when the component unmounts
    // to prevent memory leaks.
    return () => unsubscribe();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Context Value: The object provided to consuming components via useAuth().
  const value = {
    currentUser, // The Firebase user object (or null)
    userRole, // The application-specific role string (or null)
    idToken, // The Firebase ID Token JWT string (or null)
    isAdmin: userRole === 'admin', // Convenience boolean for admin checks
    isUser: userRole === 'user', // Convenience boolean for regular user checks (consider renaming role if needed)
    isAuthenticated: !!currentUser && !!idToken, // True if user object and token exist
  };

  // Render children only when the initial auth state loading is complete.
  // This prevents rendering protected components before auth state is determined.
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}