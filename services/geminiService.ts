
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  // This is a placeholder check. In a real environment, the API key would be set.
  // For this application, we'll proceed, but API calls will fail without a key.
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generateBookSummary = async (description: string): Promise<string> => {
  try {
    const prompt = `Summarize the following book description in a single, engaging paragraph of about 3-4 sentences. Focus on the core premise and hook for a potential buyer. Do not use lists or bullet points. Here is the description: "${description}"`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating book summary:", error);
    throw new Error("Failed to generate AI summary. The API key might be missing or invalid.");
  }
};
