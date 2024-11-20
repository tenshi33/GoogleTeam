import React, { useState } from 'react'
import './Sidebar.css'
import { RiMenuFill } from "react-icons/ri";
import { RiChatNewLine } from "react-icons/ri";
import { FaRegMessage } from "react-icons/fa6";
import { FaQuestion } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";


const Sidebar = () => {

    const [extended, setExtended] = useState(false)
    return (
        <div className='sidebar'>
            <div className='top'>
                <span onClick={()=>setExtended(prev=>!prev)} className='icon-container'>
                <RiMenuFill />
                </span>
                {extended? <span className='icon-container'>
                    <RiChatNewLine className='new-chat' />
                </span> : null}
                {extended ? <div className="recent">
                    <p className="recent-title"><b>Chat History</b></p>
                    <div className="recent-entry">
                        <FaRegMessage />
                        <p>What is React...</p>
                    </div>
                    <div className="recent-entry">
                        <FaRegMessage />
                        <p>What is Love...</p>
                    </div>
                    <div className="recent-entry">
                        <FaRegMessage />
                        <p>Baby, Don't hurt me...</p>
                    </div>
                    <div className="recent-entry">
                        <FaRegMessage />
                        <p>The whole bee movie script...</p>
                    </div>
                </div> : null}
            </div>
            <div className='bottom'>
                <div className="bottom-item">
                    <FaQuestion />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="bottom-item">
                    <FaHistory />
                    {extended ? <p>Activity</p> : null}
                </div>
                <div className="bottom-item">
                    <IoIosSettings />
                    {extended ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    )
}

export default Sidebar