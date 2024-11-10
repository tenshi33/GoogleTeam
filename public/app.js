import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, getDocs, collection, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyB3el4ddtUczY7yUMfw8lTHeBi3t1oitFQ",
    authDomain: "yukoai-d9c63.firebaseapp.com",
    databaseURL: "https://yukoai-d9c63-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "yukoai-d9c63",
    storageBucket: "yukoai-d9c63.firebasestorage.app",
    messagingSenderId: "503905336199",
    appId: "1:503905336199:web:a4de7ab6f0af65caa5b122",
    measurementId: "G-XHC05QS4QB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

document.addEventListener("DOMContentLoaded", function () {
    const chatLog = document.getElementById("chat-log");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
    const listenBtn = document.querySelector(".row button"); // Target "Listen" button specifically

    let pdfContent = ""; 

    // Function to handle text-to-speech for a given message
    function botVoice(message) {
        if (!message) {
            console.log("No message provided for text-to-speech.");
            return;
        }

        try {
            const speech = new SpeechSynthesisUtterance();
            speech.text = message;
            speech.volume = 1;
            speech.rate = 1;
            speech.pitch = 1;
            window.speechSynthesis.speak(speech);
        } catch (error) {
            console.error("Text-to-speech error:", error);
        }
    }

    // Event listener for the "Listen" button to read the last bot response
    listenBtn.addEventListener("click", () => {
        const botMessages = document.querySelectorAll(".bot-message");

        if (botMessages.length > 0) {
            const lastBotMessage = botMessages[botMessages.length - 1];
            botVoice(lastBotMessage.textContent); // Read the last bot message
        } else {
            console.log("No bot messages found to read.");
        }
    });

    sendBtn.addEventListener("click", function () {
        handleUserInput();
    });

    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            handleUserInput();
        }
    });

    function handleUserInput() {
        const userMessage = userInput.value.trim();
        if (userMessage === "") return;

        appendMessage(userMessage, "user-message");
        userInput.value = "";

        getBotResponse(userMessage).then(botMessage => {
            appendMessage(botMessage, "bot-message");
        });
    }


    function appendMessage(message, className) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", className);
        messageElement.textContent = message;
        chatLog.appendChild(messageElement);
        chatLog.scrollTop = chatLog.scrollHeight;
    }

    async function getBotResponse(userMessage) {
        const apiKey = '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'; // Replace with your actual API key
        const apiUrl = 'https://api.openai.com/v1/chat/completions';

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        };

        const messages = [
            { role: "system", content: "You are a helpful assistant capable of analyzing documents." },
        ];

        if (pdfContent) {
            messages.push({ role: "system", content: `The document content is as follows:\n${pdfContent}\nUse this document to answer any questions related to it.` });
        }

        messages.push({ role: "user", content: userMessage });

        const data = {
            model: "gpt-4-turbo",
            messages: messages,
            max_tokens: 500
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            return result.choices[0].message.content;
        } catch (error) {
            console.error("Error:", error);
            return "Sorry, I couldn't reach the server. Please try again.";
        }
    }
});


const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
        .then(() => {
            window.location.href = 'register.html';
        })
        .catch((error) => {
            console.error('Error Signing out:', error);
        })
})