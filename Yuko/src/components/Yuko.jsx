import React, { useState, useEffect, useRef } from "react";
import yuko from "../../public/yuko2.png";
import { auth, db, doc, getDoc, arrayUnion, updateDoc } from "../../firebase/firebase";
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
  const [loading, setLoading] = useState(false);
  const [pdfContent, setPdfContent] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState(null);
  const chatHistoryRef = useRef(null);
  const [isConversationStarted, setIsConversationStarted] = useState(false);
  const [botResponse, setBotResponse] = useState("");

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

  // Text-to-Speech function
  const handleSpeech = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US"; // You can customize this to other languages
    window.speechSynthesis.speak(speech);
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

  // Handle user input and send message
  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    setIsLoading(true);

    try {
      const fineTunedResponse = getFineTunedResponse(userInput);

      let responseText = "";
      if (fineTunedResponse) {
        responseText = fineTunedResponse;
      } else {
        const prompt = `
          You are a helpful assistant with access to both a document and general knowledge. When the user's query relates to the document, answer based on the document content. If not, answer with general knowledge.
          
          Document Content:
          ${pdfContent}
          
          User Query:
          ${userInput}
        `;

        const model = await genAI.getGenerativeModel({
          model: "tunedModels/introductionchat-qke62kuk7mst",
        });

        const result = await model.startChat({
          prompt,
          history: [],
          generationConfig: {
            maxOutputTokens: 500,
          },
        });

        const chatResponse = await result.sendMessageStream(userInput);
        responseText = "";
        for await (const chunk of chatResponse.stream) {
          const chunkText = await chunk.text();
          responseText += chunkText;
        }
      }

      // Update chat history
      setChatHistory((prev) => [
        ...prev,
        { type: "user", message: userInput },
        { type: "bot", message: responseText, typing: true },
      ]);

      setBotResponse(responseText);
      setIsConversationStarted(true);

      // Save conversation to Firestore
      if (userId) {
        const convRef = doc(db, "conversations", userId);
        await updateDoc(convRef, {
          messages: arrayUnion(
            { type: "user", message: userInput },
            { type: "bot", message: responseText }
          ),
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setChatHistory((prev) => [
        ...prev,
        { type: "user", message: userInput },
        {
          type: "bot",
          message: "Sorry, I encountered an error while responding.",
        },
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

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const clearChat = () => {
    setChatHistory([]);
    setIsConversationStarted(false);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        setChatHistory([]);
      } else {
        setUserId(null);
        setChatHistory([]);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="yuko-container">
      <Sidebar clearChat={clearChat} />
      <div className="main">
        <div className="main-container">
          {!isConversationStarted && (
            <div>
              <span className="yuko-icon">
                <img src={yuko} alt="Yuko logo" />
              </span>
              <div className="greet">
                <p>
                  <b>
                    <span>Hello, {userName || ".."}.</span>
                  </b>
                </p>
                <p>
                  <b>How may I help?</b>
                </p>
              </div>
            </div>
          )}
          <div className="cards">{/* Prompt cards here */}</div>
          <div className="message-container">
            <ChatHistory chatHistory={chatHistory} />
          </div>
          <div>
            <div className="main-bottom">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Talk to Yuko..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <div
                  className="send-button"
                  type="button"
                  onClick={sendMessage}
                  disabled={loading || isLoading}
                >
                  {loading || isLoading ? (
                    <span>Loading...</span>
                  ) : (
                    <>
                      <HiSpeakerWave
                        className="img"
                        onClick={() => handleSpeech(botResponse)} // Trigger speech
                      />
                      <RiSendPlane2Fill className="img" id="send" />
                    </>
                  )}
                </div>
              </div>
              <div className="bottom-info">
                <p>
                  Yuko is designed to help and guide users to the best of their abilities. Please do not misuse.
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