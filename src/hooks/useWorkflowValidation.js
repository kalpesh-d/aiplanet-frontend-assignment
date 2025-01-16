import { useMemo } from "react";
import { NODE_TYPES } from "../constants/nodeTypes";

export const useWorkflowValidation = (nodes) => {
  const validConnections = useMemo(
    () => ({
      [NODE_TYPES.INPUT]: [NODE_TYPES.LLM],
      [NODE_TYPES.LLM]: [NODE_TYPES.OUTPUT],
      [NODE_TYPES.OUTPUT]: [],
    }),
    []
  );

  const validateConnection = (sourceId, targetId) => {
    const sourceNode = nodes.find((n) => n.id === sourceId);
    const targetNode = nodes.find((n) => n.id === targetId);

    if (!sourceNode || !targetNode) return false;
    return (
      validConnections[sourceNode.type]?.includes(targetNode.type) ?? false
    );
  };

  const validateWorkflow = () => {
    const inputNodes = nodes.filter((n) => n.type === NODE_TYPES.INPUT);
    const outputNodes = nodes.filter((n) => n.type === NODE_TYPES.OUTPUT);
    const llmNodes = nodes.filter((n) => n.type === NODE_TYPES.LLM);

    return (
      inputNodes.length === 1 && outputNodes.length > 0 && llmNodes.length > 0
    );
  };

  return {
    validateConnection,
    validateWorkflow,
  };
};
