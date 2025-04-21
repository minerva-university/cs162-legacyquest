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

    // Construct the API URL robustly
    const API_BASE_URL = import.meta.env.VITE_API_URL || ''; // Default to empty string if not set
    const apiUrl = `${API_BASE_URL}/api/me`; // Should result in '/api/me' if VITE_API_URL is unset

    console.log("Attempting to fetch from API URL:", apiUrl); // Log the URL

    // Fetch role and profile info from backend
    const res = await fetch(apiUrl, { // Use the constructed apiUrl
      headers: {
        Authorization: `Bearer ${idToken}`,
      }
    });

    if (!res.ok) {
       // Check if the response is HTML (indicating wrong route)
       const responseText = await res.text();
       if (responseText.trim().startsWith('<!doctype html')) {
           console.error('Error: API fetch received HTML instead of JSON. Check VITE_API_URL and routing.');
           throw new Error('API endpoint not found or misconfigured.');
       }
       // Try parsing as JSON if it wasn't HTML, for other errors
       let errorData;
       try {
           errorData = JSON.parse(responseText);
       } catch (e) {
           errorData = { message: responseText };
       }
      throw new Error(`Failed to retrieve user data from backend (${res.status}): ${errorData?.message || res.statusText}`);
    }

    const userData = await res.json();
    const role = userData.role || 'user';

    return { user, role, token: idToken };
  } catch (error) {
    console.error("Error during Google sign-in or profile fetch:", error);
    // Display a more user-friendly error maybe?
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
