import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

/**
 * A wrapper for routes that require authentication
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The child components to render
 * @param {string} props.requiredRole - The role required to access this route ('admin' or 'user')
 * @param {string} props.redirectPath - The path to redirect to if not authenticated
 * @returns {React.ReactNode} - The protected component or a redirect
 */
export default function ProtectedRoute({ 
  children, 
  requiredRole = null, 
  redirectPath = '/sign-up' 
}) {
  const { currentUser, userRole, isAuthenticated } = useAuth();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  // If a specific role is required and the user doesn't have it, redirect
  if (requiredRole && userRole !== requiredRole) {
    // Redirect admin to admin dashboard, users to user dashboard
    const redirectTo = userRole === 'admin' ? '/admin' : '/';
    return <Navigate to={redirectTo} replace />;
  }

  // If authenticated and has the required role (or no specific role is required), render the children
  return children;
} 