import React, { useState, useEffect, useRef } from "react";
import yuko from "../../public/yuko2.png";
import { auth, db, doc, getDoc, setDoc, arrayUnion, updateDoc, Timestamp } from "../../firebase/firebase";
import { GrGallery } from "react-icons/gr";
import { HiSpeakerWave } from "react-icons/hi2";
import { FaMicrophoneAlt } from "react-icons/fa";
import { RiSendPlane2Fill } from "react-icons/ri";
import Sidebar from "./Sidebar";
import ChatHistory from "./chathistory";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as pdfjsLib from "pdfjs-dist";
import "../styles/Yuko.css";
import fineTunedData from "../../public/yuko_data.json"; 

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
    speech.lang = "en-US"; 
    window.speechSynthesis.speak(speech);
  };

  // Load PDF content
  const loadPdf = async () => {
    try {
      const pdfUrl = "/info.pdf"; 
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
    loadPdf();
  }, []);

// Handle user input and send message
const sendMessage = async (messageInput) => {
  
  const input = messageInput.trim();
  
  if (input === "") return;

  // Check if the input is one of the FAQ items
  const faqItems = [
    "What is Yuko?",
    "What does Yuko do?",
    "How helpful is Yuko?",
    "How can Yuko help me?"
  ];
  const isFAQItem = faqItems.includes(input);

  let responseText = "";

  // Prevent sending message while loading or processing another request
  if (loading || isLoading) return;

  setIsLoading(true);

  try {
      if (isFAQItem) {
          // Handle FAQ items
          const fineTunedResponse = getFineTunedResponse(input);
          if (fineTunedResponse) {
              responseText = fineTunedResponse;
          } else {
              // If no fine-tuned response, use the general AI model
              const prompt = `
                  You are a helpful assistant. The user is asking about the following FAQ question:

                  FAQ Question: "${input}"

                  Provide a helpful, concise response to this FAQ.
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

              const chatResponse = await result.sendMessageStream(input);
              responseText = "";
              for await (const chunk of chatResponse.stream) {
                  const chunkText = await chunk.text();
                  responseText += chunkText;
              }
          }
      } else {
          // Regular user input handling (non-FAQ)
          const fineTunedResponse = getFineTunedResponse(input);

          if (fineTunedResponse) {
              responseText = fineTunedResponse; 
          } else {
              
              const prompt = `
                  You are a helpful assistant with access to both a document and general knowledge. When the user's query relates to the document, answer based on the document content. If not, answer with general knowledge.

                  Document Content:
                  ${pdfContent}

                  User Query:
                  ${input}
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

              const chatResponse = await result.sendMessageStream(input);
              responseText = "";
              for await (const chunk of chatResponse.stream) {
                  const chunkText = await chunk.text();
                  responseText += chunkText;
              }
          }
      }

      // Update chat history for both FAQ and general user inputs
      setChatHistory((prev) => [
          ...prev,
          { type: "user", message: input },
          { type: "bot", message: responseText },
      ]);
      setBotResponse(responseText);  

      // Mark conversation as started
      setIsConversationStarted(true);

      // Save conversation to Firestore for both FAQ and general user queries
      if (userId) {
          const convRef = doc(db, "conversations", userId); 
          await setDoc(convRef, { 
              createdAt: Timestamp.now(),
              lastUpdated: Timestamp.now(),
              messages: arrayUnion(
                  { type: "user", message: input },
                  { type: "bot", message: responseText }
              ),
          }, { merge: true }); 
      }
  } catch (error) {
      console.error("Error while handling the message:", error);
  } finally {
      setUserInput(""); // Clear user input after response
      setIsLoading(false); // Reset loading state
  }
};

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage(userInput);
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

  return (
    <div className="yuko-container">
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2565346911167424"
     crossorigin="anonymous"></script>
      <Sidebar clearChat={clearChat} sendMessage={sendMessage} />
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
                  disabled={loading || isLoading}
                />
                <div
                  className="send-button"
                  type="button"
                  onClick={() => sendMessage(userInput)}
                  disabled={loading || isLoading}
                >
                  {loading || isLoading ? (
                    <p>Loading...</p>
                  ) : (
                    <>
                      <HiSpeakerWave
                        className="img"
                        onClick={() => handleSpeech(botResponse)} 
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
