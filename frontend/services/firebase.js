// Firebase configuration file
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// =============================================================================
// !! IMPORTANT !! Verify this is the correct Firebase project configuration !!
// =============================================================================
// Your web app's Firebase configuration for cs162-legacyquest (Chosen from Adam branch)
const firebaseConfig = {
  apiKey: "AIzaSyCsewJGS8R2e-_5vBLOz2ZNaZwOH5GXJGA", // Verify Key
  authDomain: "cs162-legacyquest.firebaseapp.com",   // Verify Domain
  projectId: "cs162-legacyquest",                  // Verify Project ID
  storageBucket: "cs162-legacyquest.appspot.com", // Standard bucket format usually ends with .appspot.com
  messagingSenderId: "1000411201391",             // Verify Sender ID
  appId: "1:1000411201391:web:8dadcd620acbca50d3329a", // Verify App ID
  measurementId: "G-L7Y0C1BM9F"                    // Verify Measurement ID
};
// =============================================================================

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Note: Firestore is still initialized here. Ensure you have Firestore enabled and
// configured security rules in the cs162-legacyquest project if you intend to use it directly
// from the frontend for anything, otherwise this db export might be unused.
const db = getFirestore(app);

// Initialize Analytics (only in browser environment)
let analytics = null;
if (typeof window !== 'undefined') {
  // Check if getAnalytics is imported before calling it
  if (typeof getAnalytics === 'function') {
    try {
      analytics = getAnalytics(app);
    } catch (error) {
        console.warn("Firebase Analytics initialization failed:", error);
    }
  } else {
      console.warn("getAnalytics function not available.");
  }
}

// Export auth (used for login/token) and potentially db/analytics if needed elsewhere
export { auth, db, analytics };