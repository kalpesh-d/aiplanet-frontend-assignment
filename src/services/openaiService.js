import axios from "axios";

const OPENAI_API_URL = "https://api.openai.com/v1";

class OpenAIService {
  constructor() {
    this.client = axios.create({
      baseURL: OPENAI_API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  setApiKey(apiKey) {
    this.client.defaults.headers.common["Authorization"] = `Bearer ${apiKey}`;
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

export const openaiService = new OpenAIService();
