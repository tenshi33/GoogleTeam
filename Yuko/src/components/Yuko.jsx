import React, { useState, useEffect } from 'react';
import yuko from '../../public/yuko2.png';
import { auth, db, doc, getDoc } from '../../firebase/firebase';
import { GrGallery } from "react-icons/gr";
import { FaMicrophoneAlt } from "react-icons/fa";
import { RiSendPlane2Fill } from "react-icons/ri";
import Sidebar from './Sidebar';
import ChatHistory from "./chathistory";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as pdfjsLib from "pdfjs-dist"; // Import pdfjs
import '../styles/Yuko.css';

// Set the workerSrc to the correct path
// Set the workerSrc manually to work with Vite
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

  // Initialize Gemini API
  const genAI = new GoogleGenerativeAI("api_key");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Load PDF content
  const loadPdf = async () => {
    try {
      const pdfUrl = "/info.pdf"; // Path to your PDF file
      const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
      const numPages = pdf.numPages;

      // Extract text from all pages
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

  useEffect(() => {
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
      const prompt = `
      You are a helpful assistant with access to both a document and general knowledge. When the user's query relates to the document, answer based on the document content. If not, answer with general knowledge.

      Document Content:
      ${pdfContent}

      User Query:
      ${userInput}`;

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
      e.preventDefault();
      sendMessage();
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
            <ChatHistory chatHistory={chatHistory} />
          </div>
          <div>
            <div className='main-bottom'>
              <div className='search-box'>
                <input
                  type="text"
                  placeholder='Talk to Yuko...'
                  value={userInput}
                  onChange={handleUserInput}
                  onKeyDown={handleKeyDown}
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
