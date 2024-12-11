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

             {/* Privacy Modal */}
      {isPrivacyModalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close"
              onClick={() => setPrivacyModalVisible(false)}
            >
              &times;
            </span>
            <h2 className='privacy-policy-title'>Privacy Policy</h2>
            <p className='privacy-policy-desc'> We do not sell or rent your personal information to third parties. However, we may share your data with trusted third-party service providers who assist in operating the website, provided that they comply with our privacy standards.</p>
          </div>
        </div>
      )}
      

      {/* Policy Modal */}
      {isPolicyModalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close"
              onClick={() => setPolicyModalVisible(false)} 
            >
              &times;
            </span>
            <h2 className='policy-title'>Terms of Service</h2>
            <p className='policy-desc'> <span className='policy-desc-top'>We may use Personal Data for the following purposes:</span> <br/>
            <br/>

To provide analyze, and maintain our Services, for example to respond to your questions for ChatGPT; <br/>
<br/>

To improve and develop our Services and conduct research, for example to develop new product features; <br/>
<br/>

To communicate with you, including to send you information about our Services and events, for example about changes or improvements to the Services; <br/>
<br/>

To prevent fraud, illegal activity, or misuses of our Services, and to protect the security of our systems and Services; <br/>
<br/>

To comply with legal obligations and to protect the rights, privacy, safety, or property of our users, OpenAI, or third parties.
</p>
          </div>
        </div>
      )}


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
