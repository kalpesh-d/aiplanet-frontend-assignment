import { groqService } from "./groqService";
import { openaiService } from "./openaiService";
import { NODE_TYPES } from "../constants/nodeTypes";

class WorkflowService {
  validateWorkflow(nodes, edges) {
    const inputNode = nodes.find((n) => n.type === NODE_TYPES.INPUT);
    const llmNode = nodes.find((n) => n.type === NODE_TYPES.LLM);
    const outputNode = nodes.find((n) => n.type === NODE_TYPES.OUTPUT);

    if (!inputNode || !llmNode || !outputNode) {
      throw new Error("Workflow must contain Input, LLM, and Output nodes");
    }

    const inputToLLM = edges.some(
      (e) => e.source === inputNode.id && e.target === llmNode.id
    );
    const llmToOutput = edges.some(
      (e) => e.source === llmNode.id && e.target === outputNode.id
    );

    if (!inputToLLM || !llmToOutput) {
      throw new Error("Nodes must be properly connected: Input → LLM → Output");
    }
  }

  async executeModelCompletion(config, input) {
    const service = config.model.includes("gpt") ? openaiService : groqService;
    service.setApiKey(config.apikey);

    return await service.createCompletion(
      config.model,
      [{ role: "user", content: input }],
      config.temperature,
      config.maxTokens
    );
  }

  async executeWorkflow(nodes, edges, llmConfig, inputText) {
    // Validate inputs
    if (!inputText.trim()) {
      throw new Error("Input text is required");
    }
    if (!llmConfig.apikey) {
      throw new Error("API key is required");
    }

    // Validate workflow structure
    this.validateWorkflow(nodes, edges);

    // Execute the model
    const response = await this.executeModelCompletion(llmConfig, inputText);
    const output = response.choices[0]?.message?.content;

    if (!output) {
      throw new Error("No output generated from the model");
    }

    return output;
  }
}

export const workflowService = new WorkflowService();
