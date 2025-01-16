import { useCallback } from "react";
import { NODE_TYPES } from "../constants/nodeTypes";

const DEFAULT_CONFIG = {
  model: "gpt-3.5-turbo",
  temperature: 0.7,
  maxTokens: 256,
  apikey: "",
  baseurl: "https://api.openai.com/v1/chat/completions",
};

export const useNodeOperations = (setNodes, setEdges) => {
  const addNode = useCallback(
    (type, position) => {
      const newNode = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: {
          label: type.toUpperCase(),
          config: type === NODE_TYPES.LLM ? DEFAULT_CONFIG : {},
        },
      };
      setNodes((prev) => [...prev, newNode]);
      return newNode.id;
    },
    [setNodes]
  );

  const updateNodeConfig = useCallback(
    (nodeId, config) => {
      setNodes((prev) =>
        prev.map((node) =>
          node.id === nodeId
            ? {
                ...node,
                data: {
                  ...node.data,
                  config: { ...node.data.config, ...config },
                },
              }
            : node
        )
      );
    },
    [setNodes]
  );

  const removeNode = useCallback(
    (id) => {
      if (!id) return;
      setNodes((prev) => prev.filter((node) => node.id !== id));
      setEdges((prev) =>
        prev.filter((edge) => edge.source !== id && edge.target !== id)
      );
    },
    [setNodes, setEdges]
  );

  const addEdge = useCallback(
    (sourceId, targetId) => {
      const newEdge = {
        id: `${sourceId}-${targetId}`,
        source: sourceId,
        target: targetId,
      };
      setEdges((prev) => [...prev, newEdge]);
    },
    [setEdges]
  );

  const removeEdge = useCallback(
    (id) => {
      if (!id) return;
      setEdges((prev) => prev.filter((edge) => edge.id !== id));
    },
    [setEdges]
  );

  return { addNode, updateNodeConfig, removeNode, addEdge, removeEdge };
};
