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
  const [passwordVisible, setPasswordVisible] = useState(false); 
  const [isPrivacyModalVisible, setPrivacyModalVisible] = useState(false); 
  const [isPolicyModalVisible, setPolicyModalVisible] = useState(false); 
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
        setMessage(<span className='error-exist'>Email Address Already Exists!</span>);
      } else {
        setMessage(<span className='error-exist'>Unable to create user. Please try again.</span>);
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
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2565346911167424"
     crossorigin="anonymous"></script>
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

        {/* Course Inputs */}
        <div className="course-signup-wrapper">
          <input
            className="course-input-field"
            type="text"
            id="course"
            placeholder="Course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}  // Binding the input value to state
            required
          />
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
            {passwordVisible ? 'Hide' : 'Show'}
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
          I Agree with <p className='privacy' 
            onClick={(e) => {
                e.preventDefault();
                setPrivacyModalVisible(true);
              }}> privacy </p>and <p className='policy' 
              onClick={(e) => {
                e.preventDefault();
                setPolicyModalVisible(true);
              }}> policy</p>
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
        {/* Privacy Modal */}
  {isPrivacyModalVisible && (
  <div className="modal1">
    <div className="modal-content1">
      <span
        className="close"
        onClick={() => setPrivacyModalVisible(false)}
      >
        &times;
      </span>
      <h2 className='privacy-policy-title'>Privacy Policy</h2>
      <p className='privacy-policy-desc'> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
    </div>
  </div>
  )}


  {/* Policy Modal */}
  {isPolicyModalVisible && (
  <div className="modal2">
    <div className="modal-content2">
      <span
        className="close"
        onClick={() => setPolicyModalVisible(false)} 
      >
        &times;
      </span>
      <h2 className='policy-title'>Terms of Service</h2>
      <p className='policy-desc'> <span className='policy-desc-top'>What is Lorem Ipsum?</span> <br/>
      <br/>
      It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.  <br/>
      <br/>

      The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.<br/>
      <br/>

      Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).<br/>
      <br/>

      It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.<br/>
      <br/>

      If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.
      </p>
    </div>
  </div>
  )}
      </div>
  );
}

export default Register;
