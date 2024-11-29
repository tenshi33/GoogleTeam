import React, { useState, useEffect } from 'react';
import yuko from '../../public/yuko2.png';
import { auth, db, doc, getDoc, collection, addDoc } from '../../firebase/firebase';
import { GrGallery } from "react-icons/gr";
import { FaMicrophoneAlt } from "react-icons/fa";
import { RiSendPlane2Fill } from "react-icons/ri";
import menuicon from '../../public/brmenu.png';
import Sidebar from './Sidebar';
import ChatHistory from "./chathistory";
import * as pdfjsLib from "pdfjs-dist"; // Import pdfjs
import '../styles/Yuko.css';

// Set the workerSrc to the correct path
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.mjs",
  import.meta.url
).toString();

function Yuko() {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pdfContent, setPdfContent] = useState("");
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState(null);

  // Use effect to load PDF content
  useEffect(() => {
    const loadPdf = async () => {
      try {
        const pdfUrl = "/info.pdf";
        const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
        const numPages = pdf.numPages;

        let pdfText = "";
        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent();
          pdfText += textContent.items.map((item) => item.str).join(" ") + " ";
        }

        setPdfContent(pdfText); // Store extracted content
      } catch (error) {
        console.error("Error loading PDF:", error);
        setPdfContent("Failed to load PDF content.");
      }
    };

    loadPdf(); // Load PDF when the component mounts
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          const userDocRef = doc(db, 'users', userId);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUserName(userDoc.data().fname);
          } else {
            console.log('No such user!');
          }
        } catch (error) {
          console.error('Error getting user data: ', error);
        }
      };

      fetchUserData();
    }
  }, [userId]);

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    setIsLoading(true);
    try {
      // Send a request to the Firebase Cloud Function
      const response = await fetch('https://yukoai-d9c63.cloudfunctions.net/getAIResponse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: userInput,
          pdfContent: pdfContent
        }),
      });

      const data = await response.json();
      const responseText = data.text || "No response received.";

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
      e.preventDefault();
      sendMessage();
    }
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
              <div className='message-container'>
                <div className='message'>
                  <ChatHistory chatHistory={chatHistory} /> {/*over here!!!*/}
                </div>
              </div>
              <div>
                <div className='main-bottom'>
                  <div className='search-box-container'>
                    <div className='search-box'>
                      <input
                        type="text"
                        placeholder='Talk to Yuko...'
                        value={userInput}
                        onChange={handleUserInput}
                        onKeyDown={handleKeyDown}
                      />
                      <div>
                        {/*gallery icon here*/}
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
        </div>
        
  );
}

export default Yuko;
