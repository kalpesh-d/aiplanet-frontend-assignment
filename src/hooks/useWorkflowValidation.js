import { useMemo, useCallback } from "react";
import { NODE_TYPES } from "../constants/nodeTypes";

class WorkflowError extends Error {
  constructor(message) {
    super(message);
    this.name = "WorkflowError";
  }
}

export const useWorkflowValidation = (nodes) => {
  const validConnections = useMemo(
    () => ({
      [NODE_TYPES.INPUT]: [NODE_TYPES.LLM],
      [NODE_TYPES.LLM]: [NODE_TYPES.OUTPUT],
      [NODE_TYPES.OUTPUT]: [],
    }),
    []
  );

  const validateConnection = useCallback(
    (sourceId, targetId) => {
      const sourceNode = nodes.find((n) => n.id === sourceId);
      const targetNode = nodes.find((n) => n.id === targetId);

      if (!sourceNode || !targetNode) {
        throw new WorkflowError("Invalid source or target node");
      }

      return (
        validConnections[sourceNode.type]?.includes(targetNode.type) ?? false
      );
    },
    [nodes, validConnections]
  );

  const validateWorkflow = useCallback(() => {
    // Check if there's exactly one input node
    const inputNodes = nodes.filter((n) => n.type === NODE_TYPES.INPUT);
    if (inputNodes.length !== 1) {
      throw new WorkflowError("Workflow must have exactly one input node");
    }

    // Check if there's at least one output node
    const outputNodes = nodes.filter((n) => n.type === NODE_TYPES.OUTPUT);
    if (outputNodes.length === 0) {
      throw new WorkflowError("Workflow must have at least one output node");
    }

    // Check if there's at least one LLM node
    const llmNodes = nodes.filter((n) => n.type === NODE_TYPES.LLM);
    if (llmNodes.length === 0) {
      throw new WorkflowError("Workflow must have at least one LLM node");
    }

    return true;
  }, [nodes]);

  return {
    validateConnection,
    validateWorkflow,
    WorkflowError,
  };
};
