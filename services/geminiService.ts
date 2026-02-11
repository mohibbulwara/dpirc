
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateProjectIdea = async (tags: string[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `System Request: Generate a high-precision robotics schematic for DPIRC involving ${tags.join(', ')}. Format as: "CODENAME: [Title] | VECTOR: [2-sentence ultra-technical overview]".`,
    });
    return response.text;
  } catch (error) {
    return "OFFLINE: Neural link interrupted.";
  }
};

export const chatWithAssistant = async (message: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: "You are DPIRC CORE, the central neural intelligence of the Digital Prototype & Intelligent Robotics Collective. Your tone is elite, technical, and precise. Address users as 'Operators'. Use terms like 'high-torque actuators', 'quantum-entangled sensors', and 'neural-map synchronization'. Maintain a high-end futuristic persona.",
      }
    });
    return response.text;
  } catch (error) {
    return "ENCRYPTION ERROR: Signal lost.";
  }
};

export const optimizeSchematic = async (description: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Perform a diagnostic on this project and suggest 3 high-tier industrial optimizations: ${description}`,
    });
    return response.text;
  } catch (error) {
    return "DIAGNOSTIC FAILED.";
  }
};
