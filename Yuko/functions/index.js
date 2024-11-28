const functions = require("firebase-functions");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require("cors");

const geminiApiKey = functions.config().gemini.apikey;
const genAI = new GoogleGenerativeAI(geminiApiKey);
const model = genAI.getGenerativeModel({ model: "tunedModels/introductionchat-qke62kuk7mst" });
// Initialize CORS middleware
const corsOptions = {
  origin: '*', // Allow all origins; you can replace `true` with specific URLs if needed
  methods: ["GET", "POST"], // Allow the necessary HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Add any custom headers you may use
};
const corsMiddleware = cors(corsOptions);

exports.getAIResponse = functions.https.onRequest(async (req, res) => {
  corsMiddleware(req, res, async () => { 
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173/Yuko');

    const userQuery = req.body.query;
    const pdfContent = req.body.pdfContent;

    if (!userQuery) {
      return res.status(400).send('Query is required.');
    }

    try {
      const prompt = `
        You are a helpful assistant with access to both a document and general knowledge. 
        When the user's query relates to the document, answer based on the document content. 
        If not, answer with general knowledge.

        Document Content:
        ${pdfContent}

        User Query:
        ${userQuery}`;

      const result = await model.generateContent(prompt);
      res.status(200).send(result?.response?.text() || "No response received.");
    } catch (error) {
      console.error("Error fetching AI response:", error);
      res.status(500).send("Internal server error.");
    }
  });
});
