import { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import "../styles/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPasswordModalVisible, setPasswordModalVisible] = useState(false); // Track modal visibility

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Login successful:", user);
      localStorage.setItem("loggedInUserId", user.uid);
      //insert here index.html
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
      <section className="log-in-section" id="Log-In">
        <div className="yuko-logo">
          <img className="logo" src="./yuko_logo2.png" alt="Yuko Logo" />
        </div>
        <img
          className="desktop-bg"
          src="./background.png"
          alt="Background Image"
        />
        <div className="log-in">
          <h1 className="log-in-text">Log In</h1>
          <input
            className="email-address-button"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="password-button"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="recover">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPasswordModalVisible(true);
              }}
            >
              Forgot Password?
            </a>
          </p>

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

          <button className="log-in-button" onClick={handleLogin}>
            Log In
          </button>

          {errorMessage && (
            <p className="error-message" style={{ color: "red" }}>
              {errorMessage}
            </p>
          )}

          <p className="no-account-text">
            Don’t have an account yet?
            <a className="sign-up-button" href="#">
              Sign Up
            </a>
          </p>
        </div>
      </section>
    </>
  );
}



export default Login;
