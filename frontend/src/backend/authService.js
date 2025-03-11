import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  signOut
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

// List of admin emails
const ADMIN_EMAILS = [
  'admin@uni.minerva.edu',
  // Add more admin emails as needed
];

/**
 * Validates if the email is from Minerva University
 * @param {string} email - The email to validate
 * @returns {boolean} - True if the email is valid
 */
const isValidMinervaEmail = (email) => {
  return email.endsWith('@uni.minerva.edu');
};

/**
 * Checks if the email belongs to an admin
 * @param {string} email - The email to check
 * @returns {boolean} - True if the email belongs to an admin
 */
const isAdminEmail = (email) => {
  return ADMIN_EMAILS.includes(email.toLowerCase());
};

/**
 * Determines the user role based on email
 * @param {string} email - The user's email
 * @returns {string} - 'admin' or 'user'
 */
const getUserRole = (email) => {
  return isAdminEmail(email) ? 'admin' : 'user';
};

/**
 * Creates a new user in Firestore with role information
 * @param {string} uid - The user's UID
 * @param {string} email - The user's email
 * @param {string} role - The user's role
 */
const createUserInFirestore = async (uid, email, role) => {
  try {
    await setDoc(doc(db, 'users', uid), {
      email,
      role,
      createdAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error('Error creating user in Firestore:', error);
    return false;
  }
};

/**
 * Registers a new user with email and password
 * @param {string} email - The user's email
 * @param {string} password - The user's password
 * @returns {Object} - The user credentials and role
 */
export const registerWithEmailAndPassword = async (email, password) => {
  if (!isValidMinervaEmail(email)) {
    throw new Error('Only Minerva University emails (@uni.minerva.edu) are allowed');
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const role = getUserRole(email);
    
    // Create user in Firestore with role
    await createUserInFirestore(userCredential.user.uid, email, role);
    
    return {
      user: userCredential.user,
      role
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Signs in a user with email and password
 * @param {string} email - The user's email
 * @param {string} password - The user's password
 * @returns {Object} - The user credentials and role
 */
export const loginWithEmailAndPassword = async (email, password) => {
  if (!isValidMinervaEmail(email)) {
    throw new Error('Only Minerva University emails (@uni.minerva.edu) are allowed');
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Get user role from Firestore
    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
    let role;
    
    if (userDoc.exists()) {
      role = userDoc.data().role;
    } else {
      // If user doesn't exist in Firestore yet, create them
      role = getUserRole(email);
      await createUserInFirestore(userCredential.user.uid, email, role);
    }
    
    return {
      user: userCredential.user,
      role
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Signs in a user with Google
 * @returns {Object} - The user credentials and role
 */
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const email = userCredential.user.email;
    
    if (!isValidMinervaEmail(email)) {
      // Sign out the user if they don't have a Minerva email
      await signOut(auth);
      throw new Error('Only Minerva University emails (@uni.minerva.edu) are allowed');
    }
    
    // Get user role from Firestore
    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
    let role;
    
    if (userDoc.exists()) {
      role = userDoc.data().role;
    } else {
      // If user doesn't exist in Firestore yet, create them
      role = getUserRole(email);
      await createUserInFirestore(userCredential.user.uid, email, role);
    }
    
    return {
      user: userCredential.user,
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
 * Gets the current user's role
 * @param {string} uid - The user's UID
 * @returns {string} - The user's role
 */
export const getCurrentUserRole = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    
    if (userDoc.exists()) {
      return userDoc.data().role;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting user role:', error);
    return null;
  }
}; 