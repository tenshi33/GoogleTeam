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
    <div className="register-container">
  <img className="bg-image" src="background.png" alt="Background Image of Yuko" />
  <h2 className="register">Register</h2>
  {message && <div className="message">{message}</div>}
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <input
        className="studentno"
        type="text"
        id="studentno"
        placeholder="Student No."
        value={studentno}
        onChange={(e) => setStudentNo(e.target.value)}
        required
      />

      <div className="name-container">
        <input
          className="name-first-name"
          type="text"
          id="fname"
          placeholder="First Name"
          value={fname}
          onChange={(e) => setfName(e.target.value)}
          required
        />

        <input
          className="name-last-name"
          type="text"
          id="lname"
          placeholder="Last Name"
          value={lname}
          onChange={(e) => setlName(e.target.value)}
          required
        />
      </div>

      <input
        className="course"
        type="text"
        id="course"
        placeholder="Course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        required
      />

      <input
        className="email"
        type="email"
        id="rEmail"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        className="password"
        type="password"
        id="rPassword"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </div>


        <div className="remember-forgot">
              <label><input type='checkbox' required />I agree with Privacy and Policy</label>
            </div>

        <button className='button' type="submit" disabled={loading}>
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>


        <p className='signup'>Already have an account? <Link className='href' to="/Login">Click here</Link></p>

      </form>

      
    </div>
  );
};

export default Register;
