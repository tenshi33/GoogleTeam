import { firebase } from "./firebase/firebase";



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

const logIn=document.getElementById('login');
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
