import React, { useState } from 'react';
import { auth, getAuth, createUserWithEmailAndPassword, getFirestore, doc, setDoc } from '../../firebase/firebase';  // Import auth from firebase.js

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
      <h2>Register</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="rEmail">Email:</label>
          <input
            type="email"
            id="rEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="rPassword">Password:</label>
          <input
            type="password"
            id="rPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="course">Course:</label>
          <input
            type="text"
            id="course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="studentno">Student Number:</label>
          <input
            type="text"
            id="studentno"
            value={studentno}
            onChange={(e) => setStudentNo(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default Register;
