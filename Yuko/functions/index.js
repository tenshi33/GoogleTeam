const functions = require("firebase-functions");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = functions.config().google.api_key;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

exports.getAIResponse = functions.https.onRequest(async (req, res) => {
  const userQuery = req.body.query;
  const pdfContent = req.body.pdfContent; // Content of PDF passed in the request

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
