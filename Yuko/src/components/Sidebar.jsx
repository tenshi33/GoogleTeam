import React, { useState } from 'react'
import '../styles/Sidebar.css';
import { FaRegMessage } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import menu from '../../public/menu2.png';
import newchat from '../../public/new-chat2.png';
import yukotext from '../../public/yuko-icon2.png';

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
                {extended? <span className='icon-container'>
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

export default Sidebar