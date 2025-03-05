import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

// Your Firebase configuration
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
const provider = new GoogleAuthProvider();

// Function to sign in with Google
export const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
  
        // Restrict login to @uni.minerva.edu email addresses
        if (!user.email.endsWith("@uni.minerva.edu")) {
          logout();
          alert("Access restricted to @uni.minerva.edu users.");
        } else {
          console.log("User signed in:", user);
        }
      })
      .catch((error) => {
        console.error("Sign-in error:", error);
      });
  };
  

// Function to sign out
export const logout = () => {
  signOut(auth).then(() => {
    console.log("User signed out");
  });
};

export { auth };
