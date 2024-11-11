import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { GoogleGenerativeAI } from '@google/generative-ai';
import say from 'say';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB3el4ddtUczY7yUMfw8lTHeBi3t1oitFQ',
  authDomain: 'yukoai-d9c63.firebaseapp.com',
  projectId: 'yukoai-d9c63',
  storageBucket: 'yukoai-d9c63.firebasestorage.app',
  messagingSenderId: '503905336199',
  appId: '1:503905336199:web:a4de7ab6f0af65caa5b122',
  measurementId: 'G-XHC05QS4QB',
};

const apiKey = 'AIzaSyBneZnBAmXTajQS5cDt_qrNxC3AUYS6t5I'; // Replace with your own key

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

const ChatApp = () => {
  const [userMessage, setUserMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Assuming the user is logged in initially

  useEffect(() => {
    // Check localStorage for logged in status
    const userId = localStorage.getItem('loggedInUserId');
    if (!userId) {
      setIsLoggedIn(false);
    }
  }, []);

  const handleMessageChange = (e) => {
    setUserMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (userMessage.trim()) {
      setChatLog([...chatLog, { sender: 'user', message: userMessage }]);
      setUserMessage('');
      await processMessage(userMessage);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('loggedInUserId');
      window.location.href = 'register.html';
    } catch (error) {
      console.error('Error Signing out:', error);
    }
  };

  // Initialize Google Generative AI client
  const genAI = new GoogleGenerativeAI(apiKey);

  const displayChatMessage = (message, sender) => {
    setChatLog((prevChatLog) => [...prevChatLog, { sender, message }]);
  };

  const processMessage = async (message) => {
    try {
      const model = await genAI.getGenerativeModel({ model: 'gemini-pro' });
      const chat = model.startChat({
        history: [],
        generationConfig: {
          maxOutputTokens: 500,
        },
      });

      const result = await chat.sendMessageStream(message);
      let text = '';

      // Stream the result and build the AI's response text
      for await (const chunk of result.stream) {
        const chunkText = await chunk.text();
        text += chunkText;
      }

      displayChatMessage(text, 'chat-log');

      // Use text-to-speech to read the entire response
      say.speak(text, 'Yuko', 1.0, (err) => {
        if (err) {
          console.error('Error with TTS:', err);
        }
      });
    } catch (error) {
      console.error('Error during AI response:', error);
      displayChatMessage("Sorry, I couldn't process your message at the moment.", 'chat-log');
    }
  };

  if (!isLoggedIn) {
    return <div>You are not logged in. Please log in to continue.</div>;
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat with AI</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <ul id="chat-log">
        {chatLog.map((chat, index) => (
          <li key={index} className={`chat-message ${chat.sender}`}>
            {chat.message}
          </li>
        ))}
      </ul>
      <div className="input-area">
        <input
          type="text"
          id="user-input"
          value={userMessage}
          onChange={handleMessageChange}
          placeholder="Type a message"
        />
        <button id="send-btn" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatApp;
