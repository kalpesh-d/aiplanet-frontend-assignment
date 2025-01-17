import axios from "axios";

const GROQ_API_URL = "https://api.groq.com/openai/v1";

class GroqService {
  constructor() {
    this.client = axios.create({
      baseURL: GROQ_API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  setApiKey(apiKey) {
    this.client.defaults.headers.common["Authorization"] = `Bearer ${apiKey}`;
  }

  async fetchModels() {
    try {
      const response = await this.client.get("/models");
      return response.data.data;
    } catch (error) {
      console.error("Failed to fetch models:", error);
      throw new Error("Failed to load models. Please check your API key.");
    }
  }

  async createCompletion(model, messages, temperature = 0.7, maxTokens = 256) {
    try {
      const response = await this.client.post("/chat/completions", {
        model,
        messages,
        temperature,
        max_tokens: maxTokens,
      });
      return response.data;
    } catch (error) {
      console.error("Failed to create completion:", error);
      throw error;
    }
  }
}

export const groqService = new GroqService();
