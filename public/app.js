import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, getDocs, collection } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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

// Initialize Firebase Auth and Firestore
const auth = getAuth();
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

// Simple chatbot response function
async function getBotResponse(userInput) {
    const faqs = await fetchFAQs();
    const matchingFAQ = faqs.find(faq =>
        userInput.toLowerCase().includes(faq.question.toLowerCase())
    );
    return matchingFAQ ? matchingFAQ.answer : "I'm sorry, I don't have an answer for that.";
}

// Event listener for user input
document.getElementById('user-input').addEventListener('submit', async (event) => {
    event.preventDefault();
    const userInput = document.getElementById('input-field').value;
    const botResponse = await getBotResponse(userInput);
    console.log('Bot:', botResponse);
});

// Handle logout function
function logout() {
    const user = auth.currentUser;  // Check if there is a logged-in user
    if (user) {
        console.log("Logging out user:", user.email); // Debugging log

        signOut(auth).then(() => {
            console.log("User signed out successfully.");
            window.location.href = "/register.html"; // Redirect to login page after logout
        }).catch((error) => {
            console.error("Error signing out:", error);
        });
    } else {
        console.log("No user is logged in."); // Debugging log for case no user is logged in
    }
}

// Add event listener for logout button
document.getElementById('logout-button').addEventListener('click', () => {
    console.log("Logout button clicked"); // Debugging log
    logout();
});

// Check authentication state (optional)
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is logged in:", user.email); // Debugging log
    } else {
        console.log("No user is logged in.");
    }
});
