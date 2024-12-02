import React, { useState } from 'react';
import { auth, getAuth, createUserWithEmailAndPassword, getFirestore, doc, setDoc } from '../../firebase/firebase';  // Import auth from firebase.js
import '../styles/register.css';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fname, setfName] = useState('');
  const [lname, setlName] = useState('');
  const [course, setCourse] = useState('');
  const [studentno, setStudentNo] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);  // Use passwordVisible for toggling visibility
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const auth = getAuth();
    const db = getFirestore();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // User data to be saved in Firestore
      const userData = {
        email,
        fname,
        lname,
        course,
        studentno,
      };

      // Save user data to Firestore
      await setDoc(doc(db, 'users', user.uid), userData);

      // Success message
      setMessage('Account Created Successfully!');
      setLoading(false);

      // Redirect to Homepage (or any other page)
      navigate('/Yuko');
    } catch (error) {
      setLoading(false);
      if (error.code === 'auth/email-already-in-use') {
        setMessage('Email Address Already Exists!');
      } else {
        setMessage('Unable to create user. Please try again.');
      }
    }
  };

  // Toggle password visibility
  const showPassword = (event) => {
    event.preventDefault();  // Prevent form submission
    setPasswordVisible(!passwordVisible);  // Toggle the password visibility state
  };

  return (
    <div className="sign-up-container" id="sign-up">
      <img className="sign-up-bg-image" src="background.png" alt="Background Image of Yuko" />
      <form onSubmit={handleSubmit} className="sign-up-form">
        <h2 className="signup-title">Sign Up</h2>

        {/* First Name Input */}
        <div className="fname-signup-wrapper">
          <input
            className="fname-input-field"
            type="text"
            id="fname"
            name="fname"
            placeholder="First Name"
            value={fname}
            onChange={(e) => setfName(e.target.value)}  // Binding the input value to state
            required
          />
        </div>

        {/* Last Name Input */}
        <div className="lname-signup-wrapper">
          <input
            className="lname-input-field"
            type="text"
            id="lname"
            name="lname"
            placeholder="Last Name"
            value={lname}
            onChange={(e) => setlName(e.target.value)}  // Binding the input value to state
            required
          />
        </div>

        {/* Student Number and Course Inputs */}
        <div className="studnum-course-wrapper">
          <div className="studnum-signup-wrapper">
            <input
              className="studnum-input-field"
              type="text"
              id="stdnum"
              name="stdnum"
              placeholder="Student Number"
              value={studentno}
              onChange={(e) => setStudentNo(e.target.value)}  // Binding the input value to state
              required
            />
          </div>

          <div className="course-signup-wrapper">
            <input
              className="course-input-field"
              type="text"
              id="course"
              name="course"
              placeholder="Course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}  // Binding the input value to state
              required
            />
          </div>
        </div>

        {/* Email Input */}
        <div className="email-signup-wrapper">
          <input
            className="email-input-field"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}  // Binding the input value to state
            required
          />
        </div>

        {/* Password Input */}
        <div className="pass-signup-wrapper">
          <input
            className="pass-input-field"
            type={passwordVisible ? 'text' : 'password'}  // Toggle input type based on passwordVisible state
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}  // Binding the input value to state
            required
          />
          <button
            className="show-new-user-pass"
            type="button"
            onClick={showPassword}  // Call showPassword to toggle visibility
          >
            {passwordVisible ? 'Show' : 'Show'}
          </button>
        </div>

        {/* Privacy Policy Checkbox */}
        <div className="privacy-policy">
          <input
            className="privacy-policy-check"
            type="checkbox"
            id="priv-policy"
            name="priv-policy"
            value="Privacy and Policy"
            required
          />
          I Agree with <p className='privacy'> privacy </p>and <p className='policy'> policy</p>
        </div>

        {/* Submit Button */}
        <button className="signup-button" type="submit" disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>

        {/* Message */}
        {message && <p className="message">{message}</p>}

        {/* Sign In Link */}
        <p className="have-account-text">
          Have an account already?
          <Link to="/Login" className="sign-in-button">Sign In</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
