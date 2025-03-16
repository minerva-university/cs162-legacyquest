// Firebase configuration file
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQV5sPmbeRKiQ8UDQuR2Fl9r20f-pkEvY",
  authDomain: "legacy-quest.firebaseapp.com",
  projectId: "legacy-quest",
  storageBucket: "legacy-quest.firebasestorage.app",
  messagingSenderId: "690645621314",
  appId: "1:690645621314:web:29e155aee0524010c86bdb",
  measurementId: "G-G42N3DL74Q",
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