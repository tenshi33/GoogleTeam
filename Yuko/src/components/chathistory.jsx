import React, { useEffect, useState, useRef } from "react";
import "../styles/chathistory.css";
import { PiUserCircle } from "react-icons/pi"; 
import yuko from "../../public/yuko2.png"; 

const ChatHistory = ({ chatHistory }) => {
  const [visibleMessages, setVisibleMessages] = useState([]);
  const chatHistoryRef = useRef(null);

  useEffect(() => {
    const lastMessage = chatHistory[chatHistory.length - 1];
    if (lastMessage && lastMessage.type === "bot" && lastMessage.typing) {
      let i = 0;
      const typingMessage = lastMessage.message;
      setVisibleMessages([ ...chatHistory.slice(0, -1), { ...lastMessage, message: "" } ]);

      const typingInterval = setInterval(() => {
        if (i < typingMessage.length) {
          setVisibleMessages((prevMessages) => [
            ...prevMessages.slice(0, -1),
            { ...lastMessage, message: typingMessage.slice(0, i + 1) }
          ]);
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, 30); // Adjust speed here for typing animation
    }
  }, [chatHistory]);

  useEffect(() => {
    // Whenever chatHistory updates, manage the display of typing animations
    const updatedMessages = [...chatHistory];
    setVisibleMessages(updatedMessages);
  }, [chatHistory]); // Re-run this effect when the chat history changes

  return (
    <div className="chat-history mb-4 h-80 overflow-auto" ref={chatHistoryRef}>
      {visibleMessages.map((entry, index) => (
        <div
          key={index}
          className={`message ${entry.type === "user" ? "text-right" : "text-left"}`}
          aria-label={entry.type === "user" ? "User message" : "Bot message"}
        >
          <div className="message-icon">
           
            {entry.type === "user" ? (
              <PiUserCircle className="message-avatar" />
            ) : (
              <img
                src={yuko}
                alt="Yuko"
                className="yuko-avatar"
              />
            )}
          </div>
          <p className={`${entry.type === "user" ? "text-blue-500" : "text-gray-700"}`}>
            {entry.message}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;
