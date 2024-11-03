// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);

//inputs
const email= document.getElementById('email').value;
const password= document.getElementById('password').value;
//submit
const submit = document.getElementById('submit');
submit.addEventListener("click", function (event) {
    event.preventDefault()
    alert(5)
}) 