// Import the functions you need from Firebase SDK
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, addDoc  } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB3el4ddtUczY7yUMfw8lTHeBi3t1oitFQ",
    authDomain: "yukoai-d9c63.firebaseapp.com",
    databaseURL: "https://yukoai-d9c63-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "yukoai-d9c63",
    storageBucket: "yukoai-d9c63.firebasestorage.app",
    messagingSenderId: "503905336199",
    appId: "1:503905336199:web:a4de7ab6f0af65caa5b122",
    measurementId: "G-XHC05QS4QB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services to use in other files
const auth = getAuth(app);
const db = getFirestore(app);
export default app;
export { auth, db,  getAuth, collection, addDoc, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, getFirestore, doc, setDoc, getDoc }
