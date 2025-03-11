// Firebase configuration file
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsewJGS8R2e-_5vBLOz2ZNaZwOH5GXJGA",
  authDomain: "cs162-legacyquest.firebaseapp.com",
  projectId: "cs162-legacyquest",
  storageBucket: "cs162-legacyquest.firebasestorage.app",
  messagingSenderId: "1000411201391",
  appId: "1:1000411201391:web:8dadcd620acbca50d3329a",
  measurementId: "G-L7Y0C1BM9F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize Analytics (only in browser environment)
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { auth, db, analytics }; 