import { NODE_TYPES } from "../constants/nodeTypes";

const VALID_CONNECTIONS = {
  [NODE_TYPES.INPUT]: [NODE_TYPES.LLM],
  [NODE_TYPES.LLM]: [NODE_TYPES.OUTPUT],
  [NODE_TYPES.OUTPUT]: [],
};

export const useWorkflowValidation = (nodes) => {
  const validateConnection = (sourceId, targetId) => {
    const sourceNode = nodes.find((n) => n.id === sourceId);
    const targetNode = nodes.find((n) => n.id === targetId);
    return (
      sourceNode &&
      targetNode &&
      VALID_CONNECTIONS[sourceNode.type]?.includes(targetNode.type)
    );
  };

  const validateWorkflow = () => {
    const hasInput = nodes.some((n) => n.type === NODE_TYPES.INPUT);
    const hasOutput = nodes.some((n) => n.type === NODE_TYPES.OUTPUT);
    const hasLLM = nodes.some((n) => n.type === NODE_TYPES.LLM);
    return hasInput && hasOutput && hasLLM;
  };

  return {
    validateConnection,
    validateWorkflow,
  };
};
