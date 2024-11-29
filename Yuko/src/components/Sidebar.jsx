import React, { useState } from "react";
import "../styles/Sidebar.css";
import { FaRegMessage } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import menu from "../../public/menu2.png";
import newchat from "../../public/new-chat2.png";
import yukotext from "../../public/yuko-icon2.png";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ clearChat }) => {
  const [extended, setExtended] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("User logged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div className="sidebar-container">
      {/* Menu Icon (Collapsed State) */}
      {!extended && (
        <span
          onClick={() => setExtended(true)}
          className="pv-menu-icon-container"
        >
          <img src={menu} alt="Menu" />
        </span>
      )}

      {/* Sidebar (Extended State) */}
      {extended && (
        <div className="pv-sidebar">
          {/* Top Section */}
          <div className="top">
            {/* Collapse Icon */}
            <span
              onClick={() => setExtended(false)}
              className="in-menu-icon-container"
            >
              <img src={menu} alt="Collapse Menu" />
            </span>

            {/* Icons */}
            <span className="icon-container">
              <img
                className="new-chat"
                onClick={clearChat}
                src={newchat}
                alt="New Chat"
              />
            </span>
            <span className="icon-container">
              <img className="textyuko" src={yukotext} alt="Yuko Logo" />
            </span>

            {/* Chat History */}
            <div className="recent">
              <p className="recent-title">
                <b>Chat History</b>
              </p>
              {["What is Yuko...", "What does Yuko do...", "How helpful is Yuko...", "How can Yuko help me..."].map(
                (item, index) => (
                  <div key={index} className="recent-entry">
                    <FaRegMessage />
                    <p>{item}</p>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="bottom">
            <button onClick={handleLogout} className="log-out">
              <p>Log Out</p>
            </button>
            {/* Add profile and settings here if needed */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
