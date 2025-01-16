import { useCallback } from "react";
import { NODE_TYPES } from "../constants/nodeTypes";

const DEFAULT_CONFIG = {
  model: "gpt-3.5-turbo",
  temperature: 0.7,
  maxTokens: 256,
  apikey: "",
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
      setNodes((prev) => {
        const nodeIndex = prev.findIndex((node) => node.id === nodeId);
        if (nodeIndex === -1) return prev;

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
