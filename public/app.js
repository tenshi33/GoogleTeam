import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, getDocs, doc, collection } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"


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

// Initialize Firestore
const db = getFirestore();

// Function to fetch FAQs
async function fetchFAQs() {
    const faqsSnapshot = await getDocs(collection(db, 'faqs'));
    const faqs = [];

    faqsSnapshot.forEach((doc) => {
        faqs.push({ id: doc.id, ...doc.data() });
    });

    return faqs;
}

// Use the fetched FAQs in your chatbot
fetchFAQs().then(faqs => {
    console.log(faqs); // This will log all FAQs
    // Here you can integrate the FAQs with your chatbot logic
});


async function getBotResponse(userInput) {
    const faqs = await fetchFAQs();

    // Simple matching logic to find an answer
    const matchingFAQ = faqs.find(faq =>
        userInput.toLowerCase().includes(faq.question.toLowerCase())
    );

    return matchingFAQ ? matchingFAQ.answer : "I'm sorry, I don't have an answer for that.";
}

// Example of handling user input
document.getElementById('user-input').addEventListener('submit', async (event) => {
    event.preventDefault();
    const userInput = document.getElementById('input-field').value;
    const botResponse = await getBotResponse(userInput);

    // Display bot response
    console.log('Bot:', botResponse);
});


