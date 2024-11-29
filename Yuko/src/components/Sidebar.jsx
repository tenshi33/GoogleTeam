import React, { useState } from 'react'
import '../styles/Sidebar.css';
import { FaRegMessage } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import menuicon from '../../public/brmenu.png';
import menu from '../../public/menu2.png';
import newchat from '../../public/new-chat2.png';
import yukotext from '../../public/yuko-icon2.png';
import { auth } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
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
    const [extended, setExtended] = useState(false)

    const clearChat = () => {
        setChatHistory([]);
      };

    return (

            <div className='sidebar-container'>
                    <span onClick={() => setExtended(prev => !prev)} className={`pv-menu-icon-container ${extended ? "hidden" : ""}`}>
                        <img src={menuicon} alt="Description" />
                    </span>
                   {extended ? <div className='pv-sidebar'>
                <div className='top'>
                    <span onClick={() => setExtended(prev => !prev)} className='in-menu-icon-container'>
                        <img src={menu} alt="Description" />
                    </span>
                    {extended ? <span className='icon-container'>
                        <img className='new-chat' onClick={clearChat} src={newchat} alt="Description" />
                    </span> : null}
                    {extended ? <span className='icon-container'>
                        <img className='textyuko' src={yukotext} alt="Description" />
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
                {extended ? <div className='bottom'>
                    <button onClick={handleLogout} className='log-out'>
                        <p>Log Out</p>
                    </button>
                    {/* profile and settings */}
                </div> : null}
            </div> : null}
                    {/*v v vWeb version of sidebar v v v*/}
                    <span onClick={() => setExtended(prev => !prev)} className='menu-icon-container'>
                        <img src={menu} alt="Description" />
                    </span>
                <div className='sidebar'>
                <div className='top'>
                    <span onClick={() => setExtended(prev => !prev)} className='in-menu-icon-container'>
                        <img src={menu} alt="Description" />
                    </span>
                    {extended ? <span className='icon-container'>
                        <img className='new-chat' onClick={clearChat} src={newchat} alt="Description" />
                    </span> : null}
                    {extended ? <span className='icon-container'>
                        <img className='textyuko' src={yukotext} alt="Description" />
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
                {extended ? <div className='bottom'>
                    <button onClick={handleLogout} className='log-out'>
                        <p>Log Out</p>
                    </button>
                    {/* profile and settings */}
                </div> : null}
            </div>
            </div>
            

    )
}

export default Sidebar