import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, fetchSignInMethodsForEmail, sendPasswordResetEmail } from 'firebase/auth';  // Import Firebase functions
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';

function LogInDesktop() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Add success message state
  const [passwordVisible, setPasswordVisible] = useState(false); // Track password visibility
  const [isPasswordModalVisible, setPasswordModalVisible] = useState(false); // Track visibility of reset password modal
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    // Clear previous messages on new login attempt
    setErrorMessage('');
    setSuccessMessage('');

    if (!email || !password) {
      setErrorMessage('Please enter your Email and Password.');
      return;
    }

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Login successful:', user);

      // Set success message and navigate to the new page
      setSuccessMessage('Login successful!');
      localStorage.setItem('loggedInUserId', user.uid); // Store user ID in localStorage
      navigate('/Yuko');
    } catch (error) {
      console.error("Login failed:", error);
      handleError(error.code); // Handle the error based on the code
    }
  };

  // Custom error handling based on Firebase error codes
  const handleError = (errorCode) => {
    switch (errorCode) {
      case 'auth/invalid-credential':
        setErrorMessage('Invalid credentials. Please check your login details.');
        break;
      default:
        setErrorMessage('An unknown error occurred. Please try again.');
        break;
    }
  };

 // Handle Password Reset
 const handlePasswordReset = async (event) => {
  event.preventDefault();
  const emailForReset = document.getElementById("emailForPasswordReset").value;

  if (emailForReset === "") {
    alert("Please enter your email address.");
    return;
  }

  const authInstance = getAuth();
  
  try {
    // Check if the email is associated with an existing Firebase account
    const signInMethods = await fetchSignInMethodsForEmail(authInstance, emailForReset);

    if (signInMethods.length === 0) {
      // If no methods are found, email is not associated with an account
      document.getElementById("statusMessage").textContent =
        "No account found with this email.";
      document.getElementById("statusMessage").style.color = "red";
      return;
    }

    // Proceed to send the password reset email if the email exists
    await sendPasswordResetEmail(authInstance, emailForReset);
    document.getElementById("statusMessage").textContent =
      "Password reset email sent. Please check your inbox.";
    document.getElementById("statusMessage").style.color = "green";
    document.getElementById("emailForPasswordReset").value = "";
  } catch (error) {
    // Handle other errors such as network issues or invalid email format
    const errorMessage = error.message;
    document.getElementById("statusMessage").textContent =
      "Error: " + errorMessage;
    document.getElementById("statusMessage").style.color = "red";
  }
};

  const showPassword = (event) => {
    event.preventDefault();  // Prevent form submission
    setPasswordVisible(!passwordVisible); // Toggle the password visibility state
  };

  // Handle Enter key press
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // If password reset modal is visible, trigger password reset
      if (isPasswordModalVisible) {
        handlePasswordReset(event);
      } else {
        // Otherwise, trigger login
        handleLogin(event);
      }
    }
  };

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=mail" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=lock" />
      <div className="log-in-container">
        <img className="yuko-logo" src="yuko_logo_full.png" alt="Yuko Logo" />
        <form action="#" className="log-in-form">
          <h2 className="login-title">Log In</h2>

          {/* Display error or success message */}
          {(errorMessage || successMessage) && (
            <p className="error-message" style={{ color: errorMessage ? "red" : "green" }}>
              {errorMessage || successMessage}
            </p>
          )}

          <div className="input-wrapper">
            <input
              className="input-field"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Handle email input change
              onKeyDown={handleKeyPress}  // Listen for Enter key press
              required
            />
            <i className="material-symbols-outlined">mail</i>
          </div>

          <div className="input-wrapper">
            <input
              className="input-field"
              type={passwordVisible ? "text" : "password"} // Toggle between 'text' and 'password'
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Handle password input change
              onKeyDown={handleKeyPress}  // Listen for Enter key press
              required
            />
            <i className="material-symbols-rounded">lock</i>
            <button
              className="show-pass"
              onClick={showPassword} // Toggle password visibility on click
            >
              Show
            </button>
          </div>

          <div className="forgot-password-wrapper">
            <a
              className="forgot-pass-link"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPasswordModalVisible(true);
              }}
            >
              Forgot Password?
            </a>
          </div>

          <button className="log-in-button" onClick={handleLogin}>Log In</button>

          <p className="no-account-text">
            Don't have an account yet?
            <Link to="/Register" className="sign-up-button">Sign Up</Link>
          </p>
        </form>

        {isPasswordModalVisible && (
          <div className='recover-pass-container'>
            <div id="recoverPasswordModal" className='recover-pass'>
              <h2 className='recover-pass-title'>FORGOT YOUR PASSWORD?</h2>
              <p className='recover-pass-desc'>We’ll send you an email to reset your password.</p>

              <p id="statusMessage" className="reset-pass-confirmation"></p>
        
              <input
                className='recover-pass-email'
                type="email"
                id="emailForPasswordReset"
                placeholder="Enter your email"
                onKeyDown={handleKeyPress} // Listen for Enter key press here too
                required
              />
              <i className="material-symbols-outlined">mail</i>
              <div className='recover-pass-buttons'>
                <button
                  className='reset-pass-button'
                  id="forgot-pass-text"
                  type="button"
                  onClick={handlePasswordReset}
                >
                  Send me a password reset link
                </button>
                <button
                  type="button"
                  onClick={() => setPasswordModalVisible(false)}
                  className="close-modal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default LogInDesktop;
