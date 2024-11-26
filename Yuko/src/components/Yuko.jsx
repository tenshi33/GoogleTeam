import React, { useState, useEffect } from 'react';
import yuko from '../../public/yuko2.png';
import { auth, db, doc, getDoc } from '../../firebase/firebase';
import { GrGallery } from "react-icons/gr";
import { FaMicrophoneAlt } from "react-icons/fa";
import { RiSendPlane2Fill } from "react-icons/ri";
import Sidebar from './Sidebar';
import ChatHistory from "./chathistory";
import { GoogleGenerativeAI } from "@google/generative-ai";
import '../styles/Yuko.css';

function Yuko() {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pdfContent, setPdfContent] = useState("");
  const [userName, setUserName] = useState(''); // State to hold the user's name
  const [userId, setUserId] = useState(null);

  // Initialize Gemini API
  const genAI = new GoogleGenerativeAI("api_key");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  useEffect(() => {
    // Listen for authentication state changes (user login)
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid); // Set userId when the user logs in
      } else {
        setUserId(null); // Reset userId when no user is logged in
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  useEffect(() => {
    if (userId) {
      // Fetch user data from Firestore when the userId is available
      const fetchUserData = async () => {
        try {
          // Create a reference to the user document
          const userDocRef = doc(db, 'users', userId); // Reference to the user's document in Firestore
          const userDoc = await getDoc(userDocRef); // Fetch the document

          if (userDoc.exists()) {
            // If the document exists, set the user's name
            setUserName(userDoc.data().fname);
          } else {
            console.log('No such user!');
          }
        } catch (error) {
          console.error('Error getting user data: ', error);
        }
      };

      fetchUserData(); // Call the fetchUserData function
    }
  }, [userId]);

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    setIsLoading(true);
    try {
      const prompt = `
      You are a helpful assistant with access to both a document and general knowledge. When the user's query relates to the document, answer based on the document content. If not, answer with general knowledge.

      Document Content:
      ${pdfContent}

      User Query:
      ${userInput}`;

      // Call Gemini API to get a response
      const result = await model.generateContent(prompt);

      const responseText = result?.response?.text() || "No response received.";
      setChatHistory((prev) => [
        ...prev,
        { type: "user", message: userInput },
        { type: "bot", message: responseText },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setChatHistory((prev) => [
        ...prev,
        { type: "user", message: userInput },
        { type: "bot", message: "Sorry, I encountered an error while responding." },
      ]);
    } finally {
      setUserInput("");
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();  // Prevents new line in input field
      sendMessage();       // Send the message
    }
  };

  const clearChat = () => {
    setChatHistory([]);
  };


  return (
    <div className="yuko-container">
      <Sidebar />
      <div className='main'>
        <div className="main-container">
          <span className="yuko-icon">
            <img src={yuko} alt="" />
          </span>
          <div className='greet'>
                    <p><b><span>Hello, {userName || 'User'}.</span></b></p>
            <p><b>How may I help?</b></p>
          </div>
          <div className='cards'>
            {/*<ChatHistory chatHistory={chatHistory} />*/} {/*I moved it to a different div since it placed the message box in an awkward position*/}
          </div>
          <div className='message'>
            <ChatHistory chatHistory={chatHistory} /> {/*over here!!!*/}
          </div>
          <div>
            <div className='main-bottom'>
              <div className='search-box'>
                <input
                  type="text"
                  placeholder='Talk to Yuko...'
                  value={userInput}
                  onChange={handleUserInput}
                  onKeyDown={handleKeyDown} // Add key down listener
                />
                <div>
                  <GrGallery className='img' />
                  <FaMicrophoneAlt className='img' />
                  <RiSendPlane2Fill
                    className='img'
                    id='send'
                    onClick={sendMessage}
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="bottom-info">
                <p>Yuko is designed to help and guide users to the best of their abilities. Please do not misuse.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Yuko;
