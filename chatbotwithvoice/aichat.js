// Import dotenv to load environment variables
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });  // Load environment variables from .env.local

import readline from "readline";
import { GoogleGenerativeAI } from "@google/generative-ai";
import say from "say";  // Import the say library for text-to-speech

const apiKey = process.env.API_KEY;

// Initialize the GoogleGenerativeAI client
const genAI = new GoogleGenerativeAI(apiKey);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

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

                    // Use text-to-speech to read the entire response
                    say.speak(text, "Yuko", 1.0, (err) => {
                        if (err) {
                            console.error("Error with TTS:", err);
                        }
                    });

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
