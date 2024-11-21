import React from 'react'
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
  return (
    <div className='main'>
        <span className='nav'>
        <img src={yukotext} alt="Description" />
        </span>
            <div className="main-container">
                <span className="yuko-icon">
                    <img src={yuko} alt="" />
                </span>
                <div className='greet'>
                    <p><b><span>Hello User,</span></b></p>
                    <p><b><span>How may I help?</span></b></p>
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


export default Main