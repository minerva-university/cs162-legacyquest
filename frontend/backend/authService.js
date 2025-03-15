import { 
  signInWithPopup, 
  GoogleAuthProvider,
  signOut
} from 'firebase/auth';
import { auth } from './firebase';

// List of admin emails
const ADMIN_EMAILS = [
  'admin@uni.minerva.edu',
];

/**
 * Signs in a user with Google and determines their role
 * @returns {Object} - User info and role
 */
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const email = result.user.email;
    
    // Check if it's a Minerva email
    if (!email.endsWith('@uni.minerva.edu')) {
      await signOut(auth);
      throw new Error('Only Minerva University emails (@uni.minerva.edu) are allowed');
    }
    
    // Determine if user is admin based on email
    const isAdmin = ADMIN_EMAILS.includes(email.toLowerCase());
    const role = isAdmin ? 'admin' : 'user';
    
    return { 
      user: result.user,
      role
    };
  } catch (error) {
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
 */
export const getUserRole = (email) => {
  if (!email) return null;
  return ADMIN_EMAILS.includes(email.toLowerCase()) ? 'admin' : 'user';
};