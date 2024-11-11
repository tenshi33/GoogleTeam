import express from 'express';
import cors from 'cors';  // Import CORS middleware
import fetch from 'node-fetch';  // To make HTTP requests
import dotenv from 'dotenv';

const app = express();
const port = 3000;
dotenv.config();

// Enable CORS for all origins
app.use(cors());  // Allow all origins, or you can specify specific origins like ['http://127.0.0.1:5500']



// Firebase configuration (if needed)
const firebaseConfig = {
    apiKey: "AIzaSyB3el4ddtUczY7yUMfw8lTHeBi3t1oitFQ",
    authDomain: "yukoai-d9c63.firebaseapp.com",
    projectId: "yukoai-d9c63",
    storageBucket: "yukoai-d9c63.firebasestorage.app",
    messagingSenderId: "503905336199",
    appId: "1:503905336199:web:a4de7ab6f0af65caa5b122",
    measurementId: "G-XHC05QS4QB"
};

// Proxy endpoint to communicate with Gemini API
app.post('/api/gemini', async (req, res) => {
    const { prompt } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;  // Securely use the API key

    try {
        const response = await fetch('https://generativeai.googleapis.com/v1beta2/models/gemini-1.5-chat:predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,  // Authentication header
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
        res.json(data.predictions[0]);  // Send Gemini's prediction back to frontend
    } catch (error) {
        console.error('Error with Gemini API:', error);
        res.status(500).json({ error: 'Failed to generate response' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
