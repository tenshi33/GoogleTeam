import React, { useState, useEffect } from 'react';
import yuko from '../../public/yuko2.png';
import { auth, db, doc, getDoc, arrayUnion, updateDoc, setDoc } from '../../firebase/firebase';
import { GrGallery } from "react-icons/gr";
import { HiSpeakerWave } from "react-icons/hi2";
import { FaMicrophoneAlt } from "react-icons/fa";
import { RiSendPlane2Fill } from "react-icons/ri";
import Sidebar from "./Sidebar";
import ChatHistory from "./chathistory";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as pdfjsLib from "pdfjs-dist";
import "../styles/Yuko.css";
import fineTunedData from "../../public/yuko_data.json"; // Ensure this file exists

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.mjs",
  import.meta.url
).toString();

function Yuko() {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pdfContent, setPdfContent] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState(null);

  // Initialize Gemini API
  const apiKey = "AIzaSyBiurl2_jlPahPRYP1ht97oRGv7WNq0cT0"; 
  const genAI = new GoogleGenerativeAI(apiKey);

  
  const getFineTunedResponse = (input) => {
    try {
      const entry = fineTunedData.find(
        (item) => item.input.toLowerCase() === input.toLowerCase()
      );
      return entry ? entry.output : null;
    } catch (error) {
      console.error("Error reading fine-tuned dataset:", error);
      return null;
    }
  };

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
          const userDocRef = doc(db, "users", userId);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUserName(userDoc.data().fname);
          } else {
            console.log("No such user!");
          }
        } catch (error) {
          console.error("Error getting user data: ", error);
        }
      };

      fetchUserData();
    }
  }, [userId]);

  // Fetch conversation history from Firestore
  const fetchConversationHistory = async () => {
    if (!userId) return;
    
    try {
      const convRef = doc(db, 'conversations', userId);
      const convDoc = await getDoc(convRef);
      
      if (convDoc.exists()) {
        const storedMessages = convDoc.data().messages || [];
        setChatHistory(storedMessages);
      }
    } catch (error) {
      console.error("Error fetching conversation history:", error);
    }
  };

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const sendMessage = async () => {
    if (userInput.trim() === "") return;
  
    setIsLoading(true);  // Show loading indicator
  
    try {
      // Check if there is a fine-tuned response for the user input
      const fineTunedResponse = getFineTunedResponse(userInput);
  
      let botResponse = "";
      if (fineTunedResponse) {
        // If a fine-tuned response exists, use it
        botResponse = fineTunedResponse;
      } else {
        // Otherwise, call the generative AI model
        const model = await genAI.getGenerativeModel({
          model: "tunedModels/introductionchat-qke62kuk7mst",
        });
  
        const result = await model.startChat({
          history: [],
          generationConfig: {
            maxOutputTokens: 500,
          },
        });
  
        const chatResponse = await result.sendMessageStream(userInput);
        let responseText = "";
  
        for await (const chunk of chatResponse.stream) {
          const chunkText = await chunk.text();
          responseText += chunkText;
        }
  
        botResponse = responseText;
      }
  
      // Update the chat history in React state
      setChatHistory((prev) => [
        ...prev,
        { type: "user", message: userInput },
        { type: "bot", message: botResponse },
      ]);
  
      // Save the conversation to Firestore
      if (userId) {
        const convRef = doc(db, 'conversations', userId);
  
        // Use updateDoc to append messages to the Firestore document
        await updateDoc(convRef, {
          messages: arrayUnion(
            { type: "user", message: userInput },
            { type: "bot", message: botResponse }
          ),
        });
      }
  
    } catch (error) {
      console.error("Error sending message:", error);
      setChatHistory(prev => [
        ...prev,
        { type: "user", message: userInput },
        {
          type: "bot",
          message: "Sorry, I encountered an error while responding.",
        },
      ]);
    } finally {
      // Clear input field and stop loading
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
    if (userId) {
      const convRef = doc(db, 'conversations', userId);
      setDoc(convRef, { messages: [] }, { merge: true });
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        setChatHistory([]);  // Clear the chat UI when the user logs in
      } else {
        setUserId(null);
        setChatHistory([]);  // Clear chat UI if the user logs out
      }
    });
  
    return () => unsubscribe();
  }, []);
    

  return (
    <div className="yuko-container">
      <Sidebar clearChat={clearChat} />
      <div className='main'>
        <div className="main-container">
          <span className="yuko-icon">
            <img src={yuko} alt="" />
          </span>
          <div className='greet'>
            <p><b><span>Hello, {userName || '..'}.</span></b></p>
            <p><b>How may I help?</b></p>
          </div>
          <div className="cards">
            {/*Prompt cards here */}
          </div>
          <div className='message-container'>
          <ChatHistory chatHistory={chatHistory} />
          </div>
          <div>
            <div className="main-bottom">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Talk to Yuko..."
                  value={userInput}
                  onChange={handleUserInput}
                  onKeyDown={handleKeyDown}
                />
                <div>
                  <HiSpeakerWave className="img" />
                  <RiSendPlane2Fill
                    className="img"
                    id="send"
                    onClick={sendMessage}
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="bottom-info">
                <p>
                  Yuko is designed to help and guide users to the best of their
                  abilities. Please do not misuse.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Yuko;
