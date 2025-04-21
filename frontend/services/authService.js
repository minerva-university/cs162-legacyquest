import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from 'firebase/auth';
import { auth } from './firebase';

/**
 * Signs in a user with Google and retrieves their role from the backend
 * @returns {Object} - User info, role, and ID token
 */
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const email = user.email;

    // Only allow @uni.minerva.edu emails
    if (!email || !/^[\w.-]+@uni\.minerva\.edu$/.test(email)) {
      await signOut(auth);
      throw new Error('Only Minerva University emails (@uni.minerva.edu) are allowed');
    }

    // Get Firebase ID token
    const idToken = await user.getIdToken();

    // Fetch role and profile info from backend
    // TEMPORARY FIX: Hardcode path to diagnose env var issue
    const res = await fetch(`/api/me`, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      }
    });

    if (!res.ok) {
      throw new Error('Failed to retrieve user data from backend');
    }

    const userData = await res.json();
    const role = userData.role || 'user';

    return {
      user,
      role,
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
