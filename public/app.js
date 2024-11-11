import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import say from "say";  // Import the say library for text-to-speech

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB3el4ddtUczY7yUMfw8lTHeBi3t1oitFQ",  // Ensure to use the correct API key
    authDomain: "yukoai-d9c63.firebaseapp.com",
    projectId: "yukoai-d9c63",
    storageBucket: "yukoai-d9c63.firebasestorage.app",
    messagingSenderId: "503905336199",
    appId: "1:503905336199:web:a4de7ab6f0af65caa5b122",
    measurementId: "G-XHC05QS4QB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const logoutButton=document.getElementById('logout');


document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.getElementById('logout');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-btn');
    const chatLog = document.getElementById('chat-log');

    console.log("DOM content loaded");

    // Ensure buttons are available
    if (!logoutButton || !sendButton || !userInput) {
        console.error("Required elements not found: logout, send button, or user input field.");
        return;
    } else {
        console.log("Buttons and input field are ready!");
    }

    // Initialize the Google Generative AI
    const apiKey = "AIzaSyBneZnBAmXTajQS5cDt_qrNxC3AUYS6t5I";  // Replace with your API Key
    const genAI = new GoogleGenerativeAI(apiKey);

    // Function to update the chat log with AI's response
    function displayChatMessage(message, sender) {
        const messageElement = document.createElement('li');
        messageElement.classList.add('chat-message', sender);
        messageElement.textContent = message;
        chatLog.appendChild(messageElement);
    }

    // Function to process the user's message
    async function processMessage(userMessage) {
        displayChatMessage(userMessage, 'user-input');
        
        try {
            // Get the generative model (Gemini Pro)
            const model = await genAI.getGenerativeModel({ model: "gemini-pro" });

            // Start the chat model
            const chat = model.startChat({
                history: [],
                generationConfig: {
                    maxOutputTokens: 500,  // Max tokens for response
                },
            });

            const result = await chat.sendMessageStream(userMessage);
            let text = "";

            // Stream the result and build the AI's response text
            for await (const chunk of result.stream) {
                const chunkText = await chunk.text();
                text += chunkText;
            }

            // Display AI's response in the chat log
            displayChatMessage(text, 'chat-log');

            // Use text-to-speech to read the entire response
            say.speak(text, "Yuko", 1.0, (err) => {
                if (err) {
                    console.error("Error with TTS:", err);
                }
            });

        } catch (error) {
            console.error("Error during AI response:", error);
            displayChatMessage("Sorry, I couldn't process your message at the moment.", 'chat-log');
        }
    }

    // Event listener for sending user input
    sendButton.addEventListener('click', () => {
        const userMessage = userInput.value.trim();
        if (userMessage) {
            userInput.value = ''; // Clear input field after sending
            processMessage(userMessage);
        }
    });

logoutButton.addEventListener('click',()=>{
  localStorage.removeItem('loggedInUserId');
  signOut(auth)
  .then(()=>{
      window.location.href='register.html';
  })
  .catch((error)=>{
      console.error('Error Signing out:', error);
  })
})
});