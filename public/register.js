import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"


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

const app = initializeApp(firebaseConfig);

function showMessage(message, divId){
   var messageDiv=document.getElementById(divId);
   messageDiv.style.display="block";
   messageDiv.innerHTML=message;
   messageDiv.style.opacity=1;
   setTimeout(function(){
       messageDiv.style.opacity=0;
   },5000);
}
const signUp=document.getElementById('submitSignUp');
signUp.addEventListener('click', (event)=>{
   event.preventDefault();
   const email=document.getElementById('rEmail').value;
   const password=document.getElementById('rPassword').value;
   const name=document.getElementById('name').value;
   const course=document.getElementById('course').value;
   const studentno=document.getElementById('studentno').value;

   const auth=getAuth();
   const db=getFirestore();

   createUserWithEmailAndPassword(auth, email, password)
   .then((userCredential)=>{
       const user=userCredential.user;
       const userData={
           email: email,
           name: name,
           course: course,
           studentno: studentno
       };
       showMessage('Account Created Successfully', 'signUpMessage');
       const docRef=doc(db, "users", user.uid);
       setDoc(docRef,userData)
       .then(()=>{
           window.location.href='Homepage.html';
       })
       .catch((error)=>{
           console.error("error writing document", error);

       });
   })
   .catch((error)=>{
       const errorCode=error.code;
       if(errorCode=='auth/email-already-in-use'){
           showMessage('Email Address Already Exists !!!', 'signUpMessage');
       }
       else{
           showMessage('unable to create User', 'signUpMessage');
       }
   })
});

const signIn=document.getElementById('submitSignIn');
signIn.addEventListener('click', (event)=>{
   event.preventDefault();
   const email=document.getElementById('email').value;
   const password=document.getElementById('password').value;
   const auth=getAuth();

   signInWithEmailAndPassword(auth, email,password)
   .then((userCredential)=>{
       showMessage('login is successful', 'signInMessage');
       const user=userCredential.user;
       localStorage.setItem('loggedInUserId', user.uid);
       window.location.href='Homepage.html';
   })
   .catch((error)=>{
       const errorCode=error.code;
       if(errorCode==='auth/invalid-credential'){
           showMessage('Incorrect Email or Password', 'signInMessage');
       }
       else{
           showMessage('Account does not Exist', 'signInMessage');
       }
   })
})
// Show the recovery password modal
document.getElementById('recoverPasswordLink').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('recoverPasswordModal').style.display = 'block'; // Show modal
});

// Handle reset password button click
document.getElementById('resetPasswordButton').addEventListener('click', function() {
    var email = document.getElementById('emailForPasswordReset').value;

    // Check if the email input is not empty
    if (email === '') {
        alert('Please enter your email address.');
        return;
    }

    // Get the auth object
    const auth = getAuth();

    // Send password reset email using Firebase Authentication
    sendPasswordResetEmail(auth, email)
        .then(function() {
            // Success
            document.getElementById('statusMessage').textContent = 'Password reset email sent. Please check your inbox.';
            document.getElementById('statusMessage').style.color = 'green';
            document.getElementById('emailForPasswordReset').value = ''; // Clear the input field
        })
        .catch(function(error) {
            // Handle errors
            var errorCode = error.code;
            var errorMessage = error.message;

            if (errorCode === 'auth/invalid-email') {
                document.getElementById('statusMessage').textContent = 'Invalid email address.';
            } else if (errorCode === 'auth/user-not-found') {
                document.getElementById('statusMessage').textContent = 'No user found with this email address.';
            } else {
                document.getElementById('statusMessage').textContent = 'Error: ' + errorMessage;
            }
            document.getElementById('statusMessage').style.color = 'red';
        });
});
