import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB2AEYgfYITZWk7dt7CUe8t2Ok0YR5DWaE",
  authDomain: "projauth-58fe4.firebaseapp.com",
  projectId: "projauth-58fe4",
  storageBucket: "projauth-58fe4.firebasestorage.app",
  messagingSenderId: "723603074912",
  appId: "1:723603074912:web:2376b1daff5407155b7805",
  measurementId: "G-4NNV958GB6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  console.error('Firebase persistence error:', err);
  if (err.code === 'failed-precondition') {
    console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
  } else if (err.code === 'unimplemented') {
    console.warn('The current browser does not support persistence.');
  }
});