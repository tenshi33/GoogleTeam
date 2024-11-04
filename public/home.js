import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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

/** chat bot codes async function getBotResponse(userInput) {
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
**/