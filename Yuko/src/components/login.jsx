import React, { useState } from 'react';
import { auth } from '../../firebase/firebase';  // Import auth from firebase.js
import { signInWithEmailAndPassword } from 'firebase/auth';  // Import login function
import '../styles/login.css';

function LogInDesktop() {
  // Define state variables for email, password, and error message
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle the login process
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // Try logging in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log('Login successful:', user);
      localStorage.setItem('loggedInUserId', user.uid); // Store user ID in localStorage

      
      window.location.href = '/index';  
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage(error.message); // Set error message to display
    }
  };

  return (
    <>
      <section className="log-in-section" id="Log-In">
      <div className="yuko-logo">
      <img className="logo" src="/images/YUKO-LOGO-FULL.png" alt="Yuko Logo" />
    </div>

    <img className="desktop-bg" src="/images/Desktop_without_ic.png" alt="Background Image" />

        <div className="log-in">
          <h1 className="log-in-text">Log In</h1>
          <input
            className="email-address-button"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Handle email input change
          />
          <input
            className="password-button"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Handle password input change
          />
          <a className="forgot-pass-text" href="#" target="_self">Forgot Password?</a>
          <button className="log-in-button" onClick={handleLogin}>Log In</button>

          {/* Show error message if any */}
          {errorMessage && <p className="error-message" style={{ color: 'red' }}>{errorMessage}</p>}

          <p className="no-account-text">
            Don’t have an account yet?
            <a className="sign-up-button" href="#">Sign Up</a>
          </p>
        </div>
      </section>
    </>
  );
}

export default LogInDesktop;
