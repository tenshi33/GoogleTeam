import React, { useEffect, useState, useRef } from "react";
import "../styles/chathistory.css";
import { PiUserCircle } from "react-icons/pi";
import yuko from "../../public/yuko2.png"; 

const ChatHistory = ({ chatHistory }) => {
  const [visibleMessages, setVisibleMessages] = useState([]);
  const chatHistoryRef = useRef(null);

  useEffect(() => {
    const updatedMessages = [...chatHistory];
    setVisibleMessages(updatedMessages);

    const lastMessage = updatedMessages[updatedMessages.length - 1];
    
    if (lastMessage && lastMessage.type === "bot") {
      const typingMessage = lastMessage.message;
      let i = 0;

      // Temporarily remove the message so it can be replaced letter by letter
      setVisibleMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        { ...lastMessage, message: "" }
      ]);

      // Start the typing animation by revealing one letter at a time
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
      }, 30); 
    }
  }, [chatHistory]);

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
