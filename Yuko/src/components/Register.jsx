import React, { useState } from 'react';
import { auth, getAuth, createUserWithEmailAndPassword, getFirestore, doc, setDoc } from '../../firebase/firebase';  // Import auth from firebase.js
import '../styles/register.css';
import { Link, useNavigate } from 'react-router-dom';
function Register(){

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fname, setfName] = useState('');
  const [lname, setlName] = useState('');
  const [course, setCourse] = useState('');
  const [studentno, setStudentNo] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
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
      navigate('/Yuko')
    } catch (error) {
      setLoading(false);
      if (error.code === 'auth/email-already-in-use') {
        setMessage('Email Address Already Exists!');
      } else {
        setMessage('Unable to create user. Please try again.');
      }
    }
  };

  return (
    <> 
      <div className="sign-up-container" id='sign-up'>  
        <img className="sign-up-bg-image" src="background.png" alt="Background Image of Yuko"/>      
        <form action="#" className="sign-up-form">
          <h2 className="signup-title">Sign Up</h2>
          
          <div className="fname-signup-wrapper">
            <input
              className="fname-input-field"
              type="text" 
              id="fname" 
              name="fname"
              placeholder="First Name"
              required
            />
          </div>
          
          <div className="lname-signup-wrapper">
            <input
              className="lname-input-field"
              type="text" 
              id="lname" 
              name="lname"
              placeholder="Last Name"
              required
            />
          </div>

          <div className="studnum-course-wrapper">
            <div className="studnum-signup-wrapper">
              <input
                className="studnum-input-field"
                type="text" 
                id="stdnum" 
                name="stdnum"
                placeholder="Student Number"
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
                required
              />
            </div>
          </div>
          

          <div className="email-signup-wrapper">
            <input
              className="email-input-field"
              type="email"
              placeholder="Email Address"
              required
            />
          </div>

          <div className="pass-signup-wrapper">
            <input
              className="pass-input-field"
              type="password"
              placeholder="Password"
              required
            />
              <button
                className="show-new-user-pass"
              >
                Show
              </button>
          </div>

          <div className="privacy-policy">
            <input
              className="privacy-policy-check"
              type="checkbox" 
              id="priv-policy" 
              name="priv-policy"
              value="Privacy and Policy"
              required
            /> I Agree with privacy and policy
          </div>

          <button className="sign-up-button">Sign Up</button>

          <p className="have-account-text">
            Have an account already?
            <a className="sign-in-button">Sign In</a>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
