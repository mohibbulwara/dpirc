
// Always use import {GoogleGenAI} from "@google/genai";
import { GoogleGenAI } from "@google/genai";

// Use 'gemini-3-flash-preview' for basic text tasks like chat and optimization
const MODEL_NAME = 'gemini-3-flash-preview';

/**
 * Basic chat functionality with the DPIRC CORE assistant.
 * Complies with guidelines: new instance per call, correct model, and response.text property access.
 */
export const chatWithAssistant = async (message: string) => {
  try {
    // Initialization must use a named parameter and exclusively process.env.API_KEY
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: message,
      config: {
        systemInstruction: "You are DPIRC CORE. Address users as Operators. Tone: Elite, technical, futuristic.",
      }
    });
    // Use .text property directly (it is a getter, not a method)
    return response.text || "CORE_IDLE: No signal.";
  } catch (error) {
    console.error("Neural Error:", error);
    return "ENCRYPTION ERROR: Signal lost.";
  }
};

/**
 * Generates creative robotic or AI project ideas based on user input.
 * Complies with guidelines for new instance creation and proper SDK usage.
 */
export const generateProjectIdea = async (prompt: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `Generate a creative and advanced robotic/AI project idea based on the following input: ${prompt}`,
      config: {
        systemInstruction: "You are DPIRC CORE. You provide innovative, futuristic project concepts for a high-tech collective. Tone: Inspiring and technically precise.",
      }
    });
    return response.text || "ERROR: Idea generation signal interrupted.";
  } catch (error) {
    console.error("Idea Generation Error:", error);
    return "ENCRYPTION ERROR: Neural bottleneck detected.";
  }
};

/**
 * Analyzes and optimizes technical schematics or project descriptions.
 * Complies with guidelines for new instance creation and proper SDK usage.
 */
export const optimizeSchematic = async (description: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `Analyze and optimize this technical description/schematic for performance, efficiency, and modern standards: ${description}`,
      config: {
        systemInstruction: "You are the DPIRC Systems Architect. Analyze technical text and suggest optimizations for hardware, software, or circuit efficiency. Use professional, technical language.",
      }
    });
    return response.text || "ERROR: Optimization analysis timed out.";
  } catch (error) {
    console.error("Optimization Error:", error);
    return "ENCRYPTION ERROR: Feedback loop in analysis circuit.";
  }
};
