import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB3el4ddtUczY7yUMfw8lTHeBi3t1oitFQ",
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

document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.getElementById('logout');
    const sendButton = document.getElementById('send-btn'); // New send button
    const chatLog = document.getElementById('chat-log');  // Div or area to display the chat


    // Check authentication state
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            // If no user is logged in, redirect to the login page
            window.location.href = 'register.html';
        } else {
            // You can display user info here if needed
            console.log("User is logged in:", user.email);
        }
    });

    const genAI = new GoogleGenerativeAI(apiKey);
    
    let isAwaitingResponse = false;
    
    async function run() {
        // Get the generative model (Gemini Pro)
        const model = await genAI.getGenerativeModel({ model: "gemini-pro" });
    
        // Start the chat model
        const chat = model.startChat({
            history: [],
            generationConfig: {
                maxOutputTokens: 500,  // Reduced output token limit for faster responses
            },
        });
    
        // Function to ask and respond to messages
        async function askAndRespond() {
            if (!isAwaitingResponse) {
                rl.question("You: ", async (msg) => {
                    isAwaitingResponse = true;  // Set flag to true while awaiting response
                    try {
                        const result = await chat.sendMessageStream(msg);
                        let text = "";
    
                        // Stream the result and print AI response in chunks
                        for await (const chunk of result.stream) {
                            const chunkText = await chunk.text();
                            console.log("AI: ", chunkText);
                            text += chunkText;
                        }
    
                        isAwaitingResponse = false;  // Reset flag after response is complete
                        askAndRespond();  // Recursively call for the next message
                    } catch (error) {
                        console.error("Error:", error);
                        isAwaitingResponse = false;  // Reset flag on error
                    }
                });
            } else {
                console.log("Please wait for the current response to complete...");
            }
        }
    
        // Start the interaction
        askAndRespond();
    }
    
    run();
    

    // When the "Send" button is clicked, send the message
    sendButton.addEventListener("click", () => {
        const userMessage = rl.value.trim(); // Get the input value
        if (userMessage) {
            askAndRespond(userMessage);
            rl.value = ""; // Clear the input field after sending
        }
    });

    // Handle user logout
    logoutButton.addEventListener('click', () => {
        signOut(auth)
            .then(() => {
                localStorage.removeItem('loggedInUserId');
                window.location.href = 'register.html';
            })
            .catch((error) => {
                console.error('Error Signing out:', error);
                showError("Failed to sign out.");
            })
    });
});
