import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";


function register() {
  const signUp = document.getElementById("submitSignUp");
  signUp.addEventListener("click", (event) => {
    event.preventDefault();
    const email = document.getElementById("rEmail").value;
    const password = document.getElementById("rPassword").value;
    const name = document.getElementById("name").value;
    const course = document.getElementById("course").value;
    const studentno = document.getElementById("studentno").value;

    const auth = getAuth();
    const db = getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userData = {
          email: email,
          name: name,
          course: course,
          studentno: studentno,
        };
        showMessage("Account Created Successfully", "signUpMessage");
        const docRef = doc(db, "users", user.uid);
        setDoc(docRef, userData)
          .then(() => {
            window.location.href = "Homepage.html";
          })
          .catch((error) => {
            console.error("error writing document", error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode == "auth/email-already-in-use") {
          showMessage("Email Address Already Exists !!!", "signUpMessage");
        } else {
          showMessage("unable to create User", "signUpMessage");
        }
      });
  });

  const logIn = document.getElementById("login");
  signIn.addEventListener("click", (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        showMessage("login is successful", "signInMessage");
        const user = userCredential.user;
        localStorage.setItem("loggedInUserId", user.uid);
        window.location.href = "Homepage.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/invalid-credential") {
          showMessage("Incorrect Email or Password", "signInMessage");
        } else {
          showMessage("Account does not Exist", "signInMessage");
        }
      });
  });
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
            Already have an account?
            <a className="log-in-page" href="#">
              Log In
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
export default register;
