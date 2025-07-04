
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT, userPromptTemplate } from '../constants';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("VITE_GEMINI_API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey });

declare global {
  interface ImportMeta {
    env: {
      VITE_GEMINI_API_KEY: string;
    };
  }
}

export async function* getAiResponseStream(
  prompt: string, 
): AsyncGenerator<string, void, unknown> {
  
  const userContent = userPromptTemplate(prompt);
  
  try {
    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash-preview-04-17',
      contents: userContent,
      config: {
        systemInstruction: SYSTEM_PROMPT,
      }
    });

    for await (const chunk of responseStream) {
      if (chunk && chunk.text) {
        yield chunk.text;
      }
    }
  } catch (error) {
    console.error("Gemini API call failed:", error);
    if (error instanceof Error) {
        throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the AI.");
  }
}