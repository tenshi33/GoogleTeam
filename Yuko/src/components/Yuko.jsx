import React, { useState, useEffect } from 'react'
import '../styles/Yuko.css';
import { FaDivide } from 'react-icons/fa'
import Sidebar from './Yuko_sidebar';
import { auth, db, doc, getDoc } from '../../firebase/firebase'

function Yuko() {
    const [userName, setUserName] = useState(''); // State to hold the user's name
  const [userId, setUserId] = useState(null); // State to hold the logged-in user's ID

  useEffect(() => {
    // Listen for authentication state changes (user login)
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid); // Set userId when the user logs in
      } else {
        setUserId(null); // Reset userId when no user is logged in
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  useEffect(() => {
    if (userId) {
      // Fetch user data from Firestore when the userId is available
      const fetchUserData = async () => {
        try {
          // Create a reference to the user document
          const userDocRef = doc(db, 'users', userId); // Reference to the user's document in Firestore
          const userDoc = await getDoc(userDocRef); // Fetch the document

          if (userDoc.exists()) {
            // If the document exists, set the user's name
            setUserName(userDoc.data().name);
          } else {
            console.log('No such user!');
          }
        } catch (error) {
          console.error('Error getting user data: ', error);
        }
      };

      fetchUserData(); // Call the fetchUserData function
    }
  }, [userId]);
  return (
    <>
    <div className="yuko-container">
      <Sidebar /></div>
    <div className='main'>
        <div className='nav'>
            <p><b>YUKO</b></p>
        </div>
            <div className="main-container">
                <div className='greet'>
                    <p><b><span>Hello, {userName || 'User'}.</span></b></p>
                    <p><b>How may I help?</b></p>
                </div>
                    <div className='cards'>
                        <div className='card'>
                            <p><b>Prompt 1</b></p>
                        </div>
                        <div className='card'>
                            <p><b>Prompt 2</b></p>
                        </div>
                        <div className='card'>
                            <p><b>Prompt 3</b></p>
                        </div>
                    </div>
                    <div>
                        <div className='main-bottom'>
                            <div className='search-box'>
                                <input type="text" placeholder='Talk to Yuko'/>
                            </div>
                        </div>
                    </div>
            </div>
    </div>
    </>
  )
}

export default Yuko