import functions from 'firebase-functions';
import fetch from 'node-fetch';
import cors from 'cors';

const app = require('express')();

// Set CORS headers - Allow all origins or specify allowed origins
app.use(cors({ origin: 'http://127.0.0.1:5500' })); 

app.post('/api/gemini', async (req, res) => {
    const { prompt } = req.body;

    try {
        const geminiApiKey = functions.config().gemini.apikey;  // Get the API key from Firebase environment

        const response = await fetch('https://generativeai.googleapis.com/v1beta2/models/gemini-1.5-chat:predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${geminiApiKey}`, // API key securely stored in Firebase Functions environment variables
            },
            body: JSON.stringify({
                prompt: prompt,
                max_output_tokens: 150,
                temperature: 0.7,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch response from Gemini API');
        }

        const data = await response.json();
        res.json(data.predictions[0]);  // Send Gemini's prediction back to the frontend
    } catch (error) {
        console.error('Error with Gemini API:', error);
        res.status(500).json({ error: 'Failed to generate response' });
    }
});

// Expose this function via HTTP
exports.api = functions.https.onRequest(app);
