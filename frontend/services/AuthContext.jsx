import { createContext, useContext, useState, useEffect } from 'react';
import { onIdTokenChanged } from 'firebase/auth';
import { auth } from './firebase';

const AuthContext = createContext();

// Hook for components to access auth context easily
export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [idToken, setIdToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        try {
          const token = await user.getIdToken();
          setIdToken(token);

          // Fetch role from backend via /api/me
          const res = await fetch(`${import.meta.env.VITE_API_URL}/api/me`, {
            headers: { Authorization: `Bearer ${token}` }
          });

          if (!res.ok) {
            throw new Error('Failed to fetch user profile from backend');
          }

          const data = await res.json();
          setUserRole(data.role || 'user');
        } catch (err) {
          console.error('Error retrieving user role:', err);
          setIdToken(null);
          setUserRole(null);
          setCurrentUser(null);
        }
      } else {
        setIdToken(null);
        setUserRole(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    idToken,
    userRole,
    isAdmin: userRole === 'admin',
    isUser: userRole === 'user',
    isAuthenticated: !!currentUser && !!idToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
