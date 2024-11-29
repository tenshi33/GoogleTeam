import React, { useState } from 'react';
import '../styles/Sidebar.css';
import { FaRegMessage } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import menu from '../../public/menu2.png';
import newchat from '../../public/new-chat2.png';
import yukotext from '../../public/yuko-icon2.png';
import { auth } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ clearChat }) => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
          await auth.signOut(); // Signs out the user
          console.log("User logged out successfully");
          navigate('/');
        } catch (error) {
          console.error("Error logging out:", error.message);
        }
    };

    const [extended, setExtended] = useState(false);

    return (
        <div className='sidebar'>
            <div className='top'>
                <span onClick={() => setExtended(prev => !prev)} className='menu-icon-container'>
                    <img src={menu} alt="Description" />
                </span>
                {extended ? <span className='icon-container'>
                    <img className='new-chat' onClick={clearChat} src={newchat} alt="Description" />
                </span> : null}
                {extended ? <span className='icon-container'>
                    <img className='textyuko' src={yukotext} alt="Description" />
                </span> : null}
            </div>
            {extended ? <div className='bottom'>
                <button onClick={handleLogout} className='log-out'>
                    <p>Log Out</p>
                </button>
            </div> : null}
        </div>
    );
};

export default Sidebar;
