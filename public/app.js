import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js';
import { getAuth, signOut } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyB3el4ddtUczY7yUMfw8lTHeBi3t1oitFQ",  // Firebase API key (for Firebase usage, not Gemini)
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

const logoutButton = document.getElementById('logout');
document.addEventListener("DOMContentLoaded", function () {
    const userInput = document.getElementById('user-input');
    const chatLog = document.getElementById('chat-log');

    // Send button click event
    document.getElementById('send-btn').addEventListener('click', async () => {
        await sendMessage();
    });

    // Keypress event listener for Enter key
    userInput.addEventListener('keydown', async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();  // Prevent form submission (if applicable)
            await sendMessage();     // Call sendMessage function
        }
    });

    // Function to send message to backend and display bot response
    async function sendMessage() {
        const userMessage = userInput.value.trim();
    
        if (!userMessage) {
            alert("Please enter a message.");
            return;
        }
    
        chatLog.innerHTML = "<li>Thinking...</li>";  // Show thinking message while awaiting response
        
        try {
            const apiKey = "AIzaSyBneZnBAmXTajQS5cDt_qrNxC3AUYS6t5I";  // Hardcoded Gemini API key for testing
    
            // Replace with your Gemini API endpoint URL if needed
            const apiEndpoint = "https://gemini.googleapis.com/v1/gemini";  // Replace with Gemini API URL
            
            // Direct call to Gemini API
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`  // Add API key as Authorization header
                },
                body: JSON.stringify({
                    prompt: userMessage,
                    // Include other parameters here as per the Gemini API specification
                }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch response from Gemini API');
            }
    
            const data = await response.json();
            const botMessage = data.text || 'Sorry, something went wrong!';
            chatLog.innerHTML = `<li><strong>AI:</strong> ${botMessage}</li>`;
        } catch (error) {
            console.error('Error with Gemini API:', error);
            chatLog.innerHTML = '<li>Sorry, I encountered an error while generating a response.</li>';
        }
    }
    

    // Handle logout functionality
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('loggedInUserId');
        signOut(auth)
            .then(() => {
                window.location.href = 'register.html';
            })
            .catch((error) => {
                console.error('Error Signing out:', error);
            });
    });
});
