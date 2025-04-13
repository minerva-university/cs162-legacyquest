// Firebase configuration file
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration for cs162-legacyquest
// TEMPORARY: Using hardcoded values for testing, will revert to env vars when verified working
const firebaseConfig = {
  apiKey: "AIzaSyCsewJGS8R2e-_5vBLOz2ZNaZwOH5GXJGA",
  authDomain: "cs162-legacyquest.firebaseapp.com",
  projectId: "cs162-legacyquest",
  storageBucket: "cs162-legacyquest.firebasestorage.app", // Corrected bucket name if needed
  messagingSenderId: "1000411201391",
  appId: "1:1000411201391:web:8dadcd620acbca50d3329a",
  measurementId: "G-L7Y0C1BM9F"
};

/* 
// Environment variable version - uncomment after testing
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};
*/

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