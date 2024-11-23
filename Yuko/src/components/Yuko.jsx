import React, { useState, useEffect } from 'react'
import '../styles/Yuko.css';
import { GrGallery } from "react-icons/gr";
import { FaMicrophoneAlt } from "react-icons/fa";
import { RiSendPlane2Fill } from "react-icons/ri";
import yukotext from '../../public/yuko-icon2.png';
import yuko from '../../public/yuko2.png';
import { FaRegMessage } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import menu from '../../public/menu2.png';
import newchat from '../../public/new-chat2.png';

const Yuko = () => {
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
        <span className='nav'>
        <img src={yukotext} alt="Description" />
        </span>
            <div className="main-container">
                <span className="yuko-icon">
                    <img src={yuko} alt="" />
                </span>
                <div className='greet'>
                    <p><b><span>Hello, {userName || 'User'}.</span></b></p>
                    <p><b>How may I help?</b></p>
                </div>
                    <div className='cards'>
                        <div className='card'>
                            <p><b>Lorem impus</b></p>
                        </div>
                        <div className='card'>
                            <p><b>Lorem impus</b></p>
                        </div>
                        <div className='card'>
                            <p><b>Lorem impus</b></p>
                        </div>
                    </div>
                    <div>
                        <div className='main-bottom'>
                            <div className='search-box'>
                                <input type="text" placeholder='Talk to Yuko...'/>
                                <div>
                            <GrGallery className='img' />
                            <FaMicrophoneAlt className='img' />
                            <RiSendPlane2Fill className='img' id='send' />
                            </div>
                            </div>
                            <div className="bottom-info" >
                                <p>Yuko is designed to help and guide users to the best of their abilities. Please do not misuse.</p>
                            </div>
                        </div>
                    </div>
            </div>
    </div>
    
  )
}

const Sidebar = () => {

    const [extended, setExtended] = useState(false)
    return (
        <div className='sidebar'>
            <div className='top'>
                <span onClick={()=>setExtended(prev=>!prev)} className='icon-container'>
                <img src={menu} alt="Description" />
                </span>
                {extended? <span className='icon-container'>
                    <img className='new-chat' src={newchat} alt="Description" />
                </span> : null}
                {extended ? <div className="recent">
                    <p className="recent-title"><b>Chat History</b></p>
                    <div className="recent-entry">
                        <FaRegMessage />
                        <p>What is Yuko...</p>
                    </div>
                    <div className="recent-entry">
                        <FaRegMessage />
                        <p>What does Yuko do...</p>
                    </div>
                    <div className="recent-entry">
                        <FaRegMessage />
                        <p>How helpful is Yuko...</p>
                    </div>
                    <div className="recent-entry">
                        <FaRegMessage />
                        <p>How can yuko help me...</p>
                    </div>
                </div> : null}
            </div>
            <div className='bottom'>
                <div className="bottom-item">
                    <IoIosSettings />
                    {extended ? <p>Settings</p> : null}
                </div>
                <div className="bottom-item">
                    <CgProfile />
                    {extended ? <p>Profile</p> : null}
                </div>
            </div>
        </div>
    )
}


const Sidebar = () => {

    const [extended, setExtended] = useState(false)
    return (
        <div className='sidebar'>
            <div className='top'>
                <span onClick={()=>setExtended(prev=>!prev)} className='icon-container'>
                <img src={menu} alt="Description" />
                </span>
                {extended? <span className='icon-container'>
                    <img className='new-chat' src={newchat} alt="Description" />
                </span> : null}
                {extended ? <div className="recent">
                    <p className="recent-title"><b>Chat History</b></p>
                    <div className="recent-entry">
                        <FaRegMessage />
                        <p>What is Yuko...</p>
                    </div>
                    <div className="recent-entry">
                        <FaRegMessage />
                        <p>What does Yuko do...</p>
                    </div>
                    <div className="recent-entry">
                        <FaRegMessage />
                        <p>How helpful is Yuko...</p>
                    </div>
                    <div className="recent-entry">
                        <FaRegMessage />
                        <p>How can yuko help me...</p>
                    </div>
                </div> : null}
            </div>
            <div className='bottom'>
                <div className="bottom-item">
                    <IoIosSettings />
                    {extended ? <p>Settings</p> : null}
                </div>
                <div className="bottom-item">
                    <CgProfile />
                    {extended ? <p>Profile</p> : null}
                </div>
            </div>
        </div>
    )
}


export default Yuko