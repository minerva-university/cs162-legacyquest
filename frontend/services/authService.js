import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from 'firebase/auth';
import { auth } from './firebase';

// List of admin emails
const ADMIN_EMAILS = [
  'admin@uni.minerva.edu',
  // 'yuan@uni.minerva.edu'
  'kim@uni.minerva.edu'
];

/**
 * Signs in a user with Google and determines their role
 * @returns {Object} - User info, role, and ID token
 */
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const email = user.email;

    // Improved Minerva email validation - check domain exactly
    if (!email || !/^[\w.-]+@uni\.minerva\.edu$/.test(email)) {
      await signOut(auth);
      throw new Error('Only Minerva University emails (@uni.minerva.edu) are allowed');
    }

    // Get the Firebase ID token
    const idToken = await user.getIdToken();

    // Determine if user is admin based on email
    const isAdmin = ADMIN_EMAILS.includes(email.toLowerCase());
    const role = isAdmin ? 'admin' : 'user';

    // Return user, role, and token
    return {
      user: user,
      role: role,
      token: idToken
    };
  } catch (error) {
    console.error("Error during Google sign-in:", error);
    throw error;
  }
};

/**
 * Signs out the current user
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.error('Error signing out:', error);
    return false;
  }
};

/**
 * Gets the user's role based on email
 * (Note: This is also used by the AuthContext)
 */
export const getUserRole = (email) => {
  if (!email) return null;
  return ADMIN_EMAILS.includes(email.toLowerCase()) ? 'admin' : 'user';
};