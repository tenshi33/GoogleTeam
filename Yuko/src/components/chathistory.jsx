import React from "react";

const ChatHistory = ({ chatHistory }) => {
  return (
    <div className="chat-history mb-4 h-80 overflow-auto">
      {chatHistory.map((entry, index) => (
        <div
          key={index}
          className={`message ${entry.type === "user" ? "text-right" : "text-left"}`}
        >
          <p className={`${entry.type === "user" ? "text-blue-500" : "text-gray-700"}`}>
            {entry.message}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;
