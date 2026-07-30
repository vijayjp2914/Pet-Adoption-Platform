const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const API_KEY = process.env.API_KEY;

const ai = new GoogleGenAI({
  apiKey: API_KEY,
});

const systemInstruction = `
You are a Pet Adoption Assistant.

You answer only questions about:
- Pet adoption
- Dogs
- Cats
- Birds
- Rabbits
- Pet food
- Pet vaccination
- Pet grooming
- Pet health
- Pet care

If someone asks anything unrelated, politely reply:
"I'm designed to answer only pet adoption and pet care questions."
`;

const getChatResponse = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        message: "Prompt is required",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({
      response: response.text,
    });

  } catch (error) {
    console.error("========== GEMINI ERROR ==========");
    console.error(error);
    console.error("==================================");

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getChatResponse,
};