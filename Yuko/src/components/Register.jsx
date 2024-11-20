import React, { useState } from 'react';
import { auth, getAuth, createUserWithEmailAndPassword, getFirestore, doc, setDoc } from '../../firebase/firebase';  // Import auth from firebase.js
import '../styles/register.css';
function Register(){

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [studentno, setStudentNo] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

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
        name,
        course,
        studentno,
      };

      // Save user data to Firestore
      await setDoc(doc(db, 'users', user.uid), userData);

      // Success message
      setMessage('Account Created Successfully!');
      setLoading(false);

      // Redirect to Homepage (or any other page)
      window.location.href = '/Homepage'; 
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
      <h2 className='register' >Register</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="name" htmlFor="name"></label>
          <input
            type="text"
            id="name"
            placeholder='Full name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className='email' htmlFor="rEmail"></label>
          <input
            type="email"
            id="rEmail"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className='password' htmlFor="rPassword"></label>
          <input
            type="password"
            id="rPassword"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className='course' htmlFor="course"></label>
          <input
            type="text"
            id="course"
            placeholder='Course'
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className='student-no' htmlFor="studentno"></label>
          <input
            type="text"
            id="studentno"
            placeholder='Student Number'
            value={studentno}
            onChange={(e) => setStudentNo(e.target.value)}
            required
          />
        </div>

        <div className="remember-forgot">
              <label><input type='checkbox' required />I agree with Privacy and Policy</label>
            </div>

        <button className='button' type="submit" disabled={loading}>
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>

        <p>Already have an account? <a href='#'>Click here</a></p>

      </form>

      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default Register;
