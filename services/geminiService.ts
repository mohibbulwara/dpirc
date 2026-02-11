
import { GoogleGenAI } from "@google/genai";

// Lazy-initialize the AI client to ensure process.env is accessible when called
let aiInstance: any = null;

const getAI = () => {
  if (!aiInstance) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.warn("API_KEY is missing. Neural link in standby mode.");
    }
    aiInstance = new GoogleGenAI({ apiKey: apiKey || 'dummy-key' });
  }
  return aiInstance;
};

export const generateProjectIdea = async (tags: string[]) => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `System Request: Generate a high-precision robotics schematic for DPIRC involving ${tags.join(', ')}. Format as: "CODENAME: [Title] | VECTOR: [2-sentence ultra-technical overview]".`,
    });
    return response.text || "SCHEMATIC_EMPTY: Vector not found.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "OFFLINE: Neural link interrupted.";
  }
};

export const chatWithAssistant = async (message: string) => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: "You are DPIRC CORE, the central neural intelligence of the Digital Prototype & Intelligent Robotics Collective. Your tone is elite, technical, and precise. Address users as 'Operators'. Use terms like 'high-torque actuators', 'quantum-entangled sensors', and 'neural-map synchronization'. Maintain a high-end futuristic persona.",
      }
    });
    return response.text || "CORE_IDLE: No data received.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "ENCRYPTION ERROR: Signal lost.";
  }
};

export const optimizeSchematic = async (description: string) => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Perform a diagnostic on this project and suggest 3 high-tier industrial optimizations: ${description}`,
    });
    return response.text || "DIAGNOSTIC_COMPLETE: No optimizations required.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "DIAGNOSTIC FAILED.";
  }
};
