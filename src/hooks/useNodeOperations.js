import { useCallback } from "react";
import { NODE_TYPES } from "../constants/nodeTypes";

const DEFAULT_NODE_CONFIG = {
  [NODE_TYPES.LLM]: {
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    maxTokens: 256,
    baseurl: "https://api.openai.com/v1/chat/completions",
    apikey: "",
  },
  [NODE_TYPES.INPUT]: {},
  [NODE_TYPES.OUTPUT]: {},
};

export const useNodeOperations = (setNodes, setEdges) => {
  const addNode = useCallback(
    (type, position) => {
      if (!Object.values(NODE_TYPES).includes(type)) {
        throw new Error(`Invalid node type: ${type}`);
      }

      const newNode = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: {
          label: type.toUpperCase(),
          config: DEFAULT_NODE_CONFIG[type],
        },
      };

      setNodes((prev) => [...prev, newNode]);
      return newNode.id;
    },
    [setNodes]
  );

  const updateNodeConfig = useCallback(
    (nodeId, config) => {
      if (!nodeId) {
        throw new Error("Node ID is required for update");
      }

      setNodes((prev) => {
        const nodeIndex = prev.findIndex((node) => node.id === nodeId);
        if (nodeIndex === -1) {
          throw new Error(`Node not found: ${nodeId}`);
        }

        const updatedNodes = [...prev];
        updatedNodes[nodeIndex] = {
          ...updatedNodes[nodeIndex],
          data: {
            ...updatedNodes[nodeIndex].data,
            config: { ...updatedNodes[nodeIndex].data.config, ...config },
          },
        };
        return updatedNodes;
      });
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
      return true;
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

  return {
    addNode,
    updateNodeConfig,
    removeNode,
    addEdge,
    removeEdge,
  };
};
