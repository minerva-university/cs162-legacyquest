# Frontend Integration Guide for Authentication System

This document provides step-by-step instructions for the frontend team to integrate with the backend authentication system. The backend has implemented Firebase authentication with Minerva email validation and role-based routing.

## Overview

The backend has implemented:
1. Firebase authentication with email validation for @uni.minerva.edu addresses
2. Role-based access control (admin vs. user)
3. User data storage in Firestore
4. Authentication context and protected routes

## Integration Steps

### 1. Install Required Dependencies

Add Firebase to your frontend dependencies:

```bash
npm install firebase
```

### 2. Import Backend Authentication Services

Import the authentication services in your components:

```javascript
import { 
  loginWithEmailAndPassword, 
  signInWithGoogle, 
  registerWithEmailAndPassword,
  logoutUser
} from '../../backend/authService';

import { useAuth } from '../../backend/AuthContext';
import ProtectedRoute from '../../backend/ProtectedRoute';
```

### 3. Wrap Your App with AuthProvider

In your main App component:

```javascript
import { AuthProvider } from '../../backend/AuthContext';

function App() {
  return (
    <AuthProvider>
      {/* Your app components */}
    </AuthProvider>
  );
}
```

### 4. Update Your Login/Signup Page

Your login page should:
- Accept email and password inputs
- Validate for Minerva emails
- Call the authentication functions
- Redirect based on user role

Example implementation:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  
  try {
    let result;
    
    if (isSignUp) {
      // Register new user
      result = await registerWithEmailAndPassword(email, password);
    } else {
      // Login existing user
      result = await loginWithEmailAndPassword(email, password);
    }
    
    // Redirect based on user role
    if (result.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  } catch (error) {
    console.error('Authentication error:', error);
    setError(error.message);
  } finally {
    setLoading(false);
  }
};
```

### 5. Create an Admin Dashboard Page

Create a page that's only accessible to admins:

```javascript
function AdminDashboardPage() {
  const { currentUser, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not an admin (backup to ProtectedRoute)
  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);
  
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {currentUser?.email}</p>
      {/* Admin-specific UI */}
    </div>
  );
}
```

### 6. Set Up Protected Routes

In your routing configuration:

```javascript
<Routes>
  {/* Public routes */}
  <Route path='/sign-up' element={<LoginPage />} />
  
  {/* Protected routes */}
  <Route 
    path='/' 
    element={
      <ProtectedRoute requiredRole="user">
        <DashboardPage />
      </ProtectedRoute>
    } 
  />
  
  {/* Admin routes */}
  <Route 
    path='/admin' 
    element={
      <ProtectedRoute requiredRole="admin">
        <AdminDashboardPage />
      </ProtectedRoute>
    } 
  />
</Routes>
```

## Key Components to Implement

### 1. Login/Signup Form

- Email input with validation for @uni.minerva.edu
- Password input
- Google Sign-In button
- Error handling for invalid emails
- Loading states during authentication
- Redirection logic based on user role

### 2. Admin Dashboard

- Admin-specific UI and functionality
- Protected access (only for admin role)
- Logout functionality

### 3. User Dashboard

- Regular user UI
- Protected access (only for user role)
- Logout functionality

## Using the Auth Context

The `useAuth()` hook provides:

```javascript
const { 
  currentUser,  // The Firebase user object
  userRole,     // 'admin' or 'user'
  isAdmin,      // Boolean: true if admin
  isUser,       // Boolean: true if regular user
  isAuthenticated // Boolean: true if logged in
} = useAuth();
```

Use these values to conditionally render UI elements or redirect users.

## Why This Approach?

1. **Separation of Concerns**: Authentication logic is handled by the backend, UI by the frontend
2. **Security**: Email validation and role assignment happens server-side
3. **Maintainability**: Changes to authentication rules only need to be made in one place
4. **User Experience**: Single login page with automatic routing based on role

## Important Notes

1. Only users with @uni.minerva.edu emails can register/login
2. Admin status is determined by the email address (configured in the backend)
3. All authentication state is managed through the AuthContext
4. Protected routes handle redirections automatically

By following this guide, you'll create a frontend that seamlessly integrates with the backend authentication system while maintaining a clean separation of concerns. 