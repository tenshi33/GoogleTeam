import React, { useState } from 'react';
import { auth, getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from '../../firebase/firebase';  // Import auth from firebase.js
import { Link } from 'react-router-dom';
import '../styles/login.css';

function LogInDesktop() {
  // Define state variables for email, password, and error message
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isPasswordModalVisible, setPasswordModalVisible] = useState(false); // Track modal visibility

  // Handle the login process
  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setErrorMessage('Please enter Email or Password');
      return;
    }

    try {
      // Try logging in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log('Login successful:', user);
      localStorage.setItem('loggedInUserId', user.uid); // Store user ID in localStorage

      
      window.location.href = '/Yuko';  
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage(error.message);
    }
  };

  const handlePasswordReset = async (event) => {
    event.preventDefault();
    const emailForReset = document.getElementById(
      "emailForPasswordReset"
    ).value;

    if (emailForReset === "") {
      alert("Please enter your email address.");
      return;
    }

    const authInstance = getAuth();
    try {
      await sendPasswordResetEmail(authInstance, emailForReset);
      document.getElementById("statusMessage").textContent =
        "Password reset email sent. Please check your inbox.";
      document.getElementById("statusMessage").style.color = "green";
      document.getElementById("emailForPasswordReset").value = "";
    } catch (error) {
      const errorMessage = error.message;
      document.getElementById("statusMessage").textContent =
        "Error: " + errorMessage;
      document.getElementById("statusMessage").style.color = "red";
    }
  };

  return (
    <>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=mail" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=lock" />
    <div className="log-in-container">
      <img className="yuko-logo" src="yuko_logo_full.png" alt="Yuko Logo"/>

      
      <form action="#" className="log-in-form">
        <h2 className="login-title">Log In</h2>

        <div className="input-wrapper">
          <input 
            className="input-field" 
            type="email" 
            placeholder="Email Address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Handle email input change
            required
          />
          <i className="material-symbols-outlined">mail</i>
        </div>

        <div className="input-wrapper">
          <input 
            className="input-field" 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Handle password input change
            required
          />
          <i className="material-symbols-rounded">lock</i>
          <button className="show-pass">Show</button>
        </div>
        
        <div className="forgot-password-wrapper">
          <a 
            className="forgot-pass-link" 
            href="#" 
            target="_self" 
            onClick={(e) => {
              e.preventDefault();
              setPasswordModalVisible(true);
            }}>
              Forgot Password?
          </a>
        </div>

        {isPasswordModalVisible && (
            <div id="recoverPasswordModal">
              <input
                type="email"
                id="emailForPasswordReset"
                placeholder="Enter your email"
                required
              />
              <button id="forgot-pass-text" type="button" onClick={handlePasswordReset}>
                Reset Password
              </button>
              <p id="statusMessage"></p>
              <button
                type="button"
                onClick={() => setPasswordModalVisible(false)}
                className="close-modal"
              >
                Close
              </button>
            </div>
          )}

        <button className="log-in-button" onClick={handleLogin}>Log In</button>

        {errorMessage && (
            <p className="error-message" style={{ color: "red" }}>
              {errorMessage}
            </p>
          )}

          <p className="no-account-text">
            Don’t have an account yet?
            <Link to="/Register" className="sign-up-button">Sign Up</Link>
          </p>
        </div>
      </section>
    </>
  );
}

export default LogInDesktop;