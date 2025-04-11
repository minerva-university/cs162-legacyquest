// Firebase configuration file
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration for cs162-legacyquest
const firebaseConfig = {
  apiKey: "AIzaSyCsewJGS8R2e-_5vBLOz2ZNaZwOH5GXJGA",
  authDomain: "cs162-legacyquest.firebaseapp.com",
  projectId: "cs162-legacyquest",
  storageBucket: "cs162-legacyquest.firebasestorage.app", // Corrected bucket name if needed
  messagingSenderId: "1000411201391",
  appId: "1:1000411201391:web:8dadcd620acbca50d3329a",
  measurementId: "G-L7Y0C1BM9F"
};

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