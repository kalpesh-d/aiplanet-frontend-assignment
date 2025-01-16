import { useState, useCallback } from "react";
import { NODE_TYPES } from "../constants/nodeTypes";

export const useWorkflowExecution = (nodes, edges) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getNodeData = useCallback(() => {
    const inputNode = nodes.find((n) => n.type === NODE_TYPES.INPUT);
    const llmNode = nodes.find((n) => n.type === NODE_TYPES.LLM);
    const outputNodes = nodes.filter((n) => n.type === NODE_TYPES.OUTPUT);

    return {
      input: inputNode?.data?.config?.input || "",
      llmConfig: llmNode?.data?.config || {},
      outputIds: outputNodes.map((n) => n.id),
    };
  }, [nodes]);

  const executeWorkflow = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { input, llmConfig, outputIds } = getNodeData();

      // Validate required data
      if (!input) throw new Error("Input text is required");
      if (!llmConfig.apikey) throw new Error("API key is required");
      if (!outputIds.length) throw new Error("No output nodes connected");

      // Make API call to OpenAI
      const response = await fetch(llmConfig.baseurl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${llmConfig.apikey}`,
        },
        body: JSON.stringify({
          model: llmConfig.model,
          messages: [{ role: "user", content: input }],
          temperature: parseFloat(llmConfig.temperature),
          max_tokens: parseInt(llmConfig.maxTokens),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.error?.message || "Failed to get response from OpenAI"
        );
      }

      const data = await response.json();
      const output = data.choices[0]?.message?.content;

      return output;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [getNodeData]);

  return {
    executeWorkflow,
    isLoading,
    error,
  };
};
