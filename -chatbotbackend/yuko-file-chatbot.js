document.addEventListener("DOMContentLoaded", function () {
    const chatLog = document.getElementById("chat-log");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
    const fileInput = document.getElementById("file-input");
    const fileLibrary = document.getElementById("file-library");
    const listenBtn = document.querySelector(".row button"); // Target "Listen" button specifically

    let pdfContent = ""; 
    let uploadedFiles = []; 

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

    fileInput.addEventListener("change", function () {
        const file = fileInput.files[0];
        if (file) {
            if (file.type === "application/pdf") {
                handlePDFFile(file);
            } else if (file.type === "text/plain") {
                handleTextFile(file);
            } else {
                alert("Please upload a PDF or text file.");
            }
            addToFileLibrary(file);
        }
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

    async function handlePDFFile(file) {
        const fileReader = new FileReader();
        fileReader.onload = async function () {
            const typedArray = new Uint8Array(this.result);
            const pdf = await pdfjsLib.getDocument(typedArray).promise;
            pdfContent = "";

            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                const page = await pdf.getPage(pageNum);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join(" ");
                pdfContent += pageText + "\n";
            }

            appendMessage("PDF Content has been loaded.", "bot-message");
        };
        fileReader.readAsArrayBuffer(file);
    }

    function handleTextFile(file) {
        const fileReader = new FileReader();
        fileReader.onload = function () {
            const textContent = this.result;
            pdfContent = textContent;
            appendMessage("Text File Content has been loaded.", "bot-message");
        };
        fileReader.readAsText(file);
    }

    function addToFileLibrary(file) {
        uploadedFiles.push({ name: file.name, type: file.type, size: file.size });

        const fileItem = document.createElement("li");
        fileItem.textContent = `${file.name} (${file.type}, ${Math.round(file.size / 1024)} KB)`;
        fileLibrary.appendChild(fileItem);
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
