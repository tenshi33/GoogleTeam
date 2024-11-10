const functions = require('firebase-functions');
const axios = require('axios');  // You can use axios or any HTTP client
const admin = require('firebase-admin');
admin.initializeApp();

// Gemini API Key (should be stored securely in Firebase Environment Variables)
const GEMINI_API_KEY = functions.config().gemini.apikey;

exports.sendMessageToGemini = functions.https.onRequest(async (req, res) => {
  // Ensure only POST requests are accepted
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const message = req.body.message;
  if (!message) {
    return res.status(400).send('Message is required');
  }

  try {
    const response = await axios.post('https://api.gemini.com/v1/send', {
      message,
    }, {
      headers: {
        'Authorization': `Bearer ${GEMINI_API_KEY}`,
      },
    });

    // Send response back to client
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error making request to Gemini:', error);
    return res.status(500).send('Error processing request');
  }
});
