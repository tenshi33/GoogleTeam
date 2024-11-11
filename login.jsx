import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore, setDoc, doc } from 'firebase/firestore';


// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB3el4ddtUczY7yUMfw8lTHeBi3t1oitFQ',
  authDomain: 'yukoai-d9c63.firebaseapp.com',
  databaseURL: 'https://yukoai-d9c63-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'yukoai-d9c63',
  storageBucket: 'yukoai-d9c63.firebasestorage.app',
  messagingSenderId: '503905336199',
  appId: '1:503905336199:web:a4de7ab6f0af65caa5b122',
  measurementId: 'G-XHC05QS4QB',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

const AuthApp = () => {
  // State for form inputs and messages
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [studentno, setStudentNo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [emailForPasswordReset, setEmailForPasswordReset] = useState('');

  const showMessage = (message, isError = false) => {
    setStatusMessage(message);
    if (isError) {
      setErrorMessage(message);
    }
    setTimeout(() => {
      setStatusMessage('');
      setErrorMessage('');
    }, 5000);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user info to Firestore
      const userData = { email, name, course, studentno };
      await setDoc(doc(db, 'users', user.uid), userData);

      showMessage('Account Created Successfully');
      localStorage.setItem('loggedInUserId', user.uid);
      window.location.href = 'Homepage.html';
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        showMessage('Email Address Already Exists !!!', true);
      } else {
        showMessage('Unable to create User', true);
      }
    }
  };

  const handleSignIn = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      showMessage('Login is successful');
      localStorage.setItem('loggedInUserId', user.uid);
      window.location.href = 'Homepage.html';
    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        showMessage('Incorrect Email or Password', true);
      } else {
        showMessage('Account does not Exist', true);
      }
    }
  };

  const handlePasswordReset = async () => {
    if (!emailForPasswordReset) {
      alert('Please enter your email address.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, emailForPasswordReset);
      setStatusMessage('Password reset email sent. Please check your inbox.');
      setEmailForPasswordReset('');
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        setStatusMessage('Invalid email address.', true);
      } else if (error.code === 'auth/user-not-found') {
        setStatusMessage('No user found with this email address.', true);
      } else {
        setStatusMessage(`Error: ${error.message}`, true);
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up / Sign In</h2>

      {/* Sign Up Form */}
      <form onSubmit={handleSignUp}>
        <div>
          <label htmlFor="rEmail">Email:</label>
          <input
            type="email"
            id="rEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="rPassword">Password:</label>
          <input
            type="password"
            id="rPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="course">Course:</label>
          <input
            type="text"
            id="course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="studentno">Student No:</label>
          <input
            type="text"
            id="studentno"
            value={studentno}
            onChange={(e) => setStudentNo(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>

      {/* Sign In Form */}
      <form onSubmit={handleSignIn}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>

      {/* Password Reset Modal */}
      <div>
        <button onClick={() => setShowPasswordModal(true)} id="recoverPasswordLink">
          Forgot Password?
        </button>

        {showPasswordModal && (
          <div id="recoverPasswordModal">
            <h3>Reset Password</h3>
            <input
              type="email"
              id="emailForPasswordReset"
              value={emailForPasswordReset}
              onChange={(e) => setEmailForPasswordReset(e.target.value)}
              placeholder="Enter your email"
            />
            <button onClick={handlePasswordReset} id="resetPasswordButton">
              Reset Password
            </button>
          </div>
        )}
      </div>

      {/* Error and Status Messages */}
      {statusMessage && <div style={{ color: 'green' }}>{statusMessage}</div>}
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </div>
  );
};

export default AuthApp;
