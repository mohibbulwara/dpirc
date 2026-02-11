
import { GoogleGenAI } from "@google/genai";

const MODEL_NAME = 'gemini-3-flash-preview';

/**
 * Safely retrieves the API key from WordPress settings or global process polyfill.
 */
const getApiKey = () => {
  // Check WordPress localized settings first
  const wpKey = (window as any).wpSettings?.apiKey;
  if (wpKey && wpKey !== '') return wpKey;

  // Fallback to global process polyfill (defined in index.php/html)
  const processKey = (window as any).process?.env?.API_KEY;
  if (processKey) return processKey;

  return null;
};

export const chatWithAssistant = async (message: string) => {
  const apiKey = getApiKey();
  if (!apiKey) return "CORE_ERROR: API_KEY_MISSING. Please configure in System Settings.";

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: message,
      config: {
        systemInstruction: "You are DPIRC CORE. Address users as Operators. Tone: Elite, technical, futuristic. Keep responses concise.",
      }
    });
    return response.text || "CORE_IDLE: No signal detected.";
  } catch (error) {
    console.error("Neural Signal Error:", error);
    return "ENCRYPTION ERROR: Secure link severed.";
  }
};

export const generateProjectIdea = async (prompt: string) => {
  const apiKey = getApiKey();
  if (!apiKey) return "CORE_ERROR: API_KEY_MISSING.";

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `Generate a creative robotic/AI project idea: ${prompt}`,
      config: {
        systemInstruction: "You are DPIRC CORE. Provide innovative project concepts. Tone: Technically precise.",
      }
    });
    return response.text || "ERROR: Neural synthesis failed.";
  } catch (error) {
    return "ENCRYPTION ERROR: Synthesis bottleneck.";
  }
};

export const optimizeSchematic = async (description: string) => {
  const apiKey = getApiKey();
  if (!apiKey) return "CORE_ERROR: API_KEY_MISSING.";

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `Optimize this technical description: ${description}`,
      config: {
        systemInstruction: "You are the DPIRC Systems Architect. Analyze technical text and suggest optimizations.",
      }
    });
    return response.text || "ERROR: Analysis sequence timeout.";
  } catch (error) {
    return "ENCRYPTION ERROR: Feedback loop in logic gates.";
  }
};
