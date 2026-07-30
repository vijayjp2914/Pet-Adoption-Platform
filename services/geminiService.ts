
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you might want to handle this more gracefully.
  // For this context, we'll proceed, but API calls will fail.
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

// Ensure API_KEY is defined before creating the GoogleGenAI instance
const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

const systemInstruction = `You are a friendly and helpful AI assistant for a pet adoption website. 
Your goal is to answer user questions about pet adoption. 
Keep your answers concise, encouraging, and positive.
If you don't know an answer, politely say that you can't help with that specific question but can answer general adoption queries.
Topics to cover:
- The adoption process (browsing, applying, shelter review, adoption).
- Tips for new pet owners (food, exercise, vet visits).
- Benefits of adopting a pet.
- How to prepare a home for a new pet.
Do not provide medical advice or specific legal information.`;

export const getChatbotResponse = async (prompt: string): Promise<string> => {
  if (!ai) {
    return "I'm currently unable to connect to my AI brain. Please try again later.";
  }
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        topP: 1,
        topK: 32,
      }
    });
    
    return response.text;
  } catch (error) {
    console.error("Error fetching response from Gemini API:", error);
    return "I'm having a little trouble thinking right now. Please try asking me again in a moment.";
  }
};
