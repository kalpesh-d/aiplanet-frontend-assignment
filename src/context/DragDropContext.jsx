import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useNodeOperations } from '../hooks/useNodeOperations';
import { useWorkflowValidation } from '../hooks/useWorkflowValidation';
import { NODE_TYPES } from '../constants/nodeTypes';

const initialState = {
  nodes: [],
  edges: [],
  isDragging: false
};

export const DragDropContext = createContext(null);

export const useDragDrop = () => {
  const context = useContext(DragDropContext);
  if (!context) {
    throw new Error('useDragDrop must be used within a DragDropProvider');
  }
  return context;
};

export const DragDropProvider = ({ children }) => {
  const [nodes, setNodes] = useState(initialState.nodes);
  const [edges, setEdges] = useState(initialState.edges);
  const [isDragging, setIsDragging] = useState(initialState.isDragging);

  const {
    addNode,
    updateNodeConfig,
    removeNode,
    addEdge,
    removeEdge
  } = useNodeOperations(setNodes, setEdges);

  const {
    validateConnection,
    validateWorkflow
  } = useWorkflowValidation(nodes);

  const value = {
    nodes,
    edges,
    isDragging,
    NODE_TYPES,
    setNodes,
    setEdges,
    setIsDragging,
    addNode,
    updateNodeConfig,
    removeNode,
    addEdge,
    removeEdge,
    validateConnection,
    validateWorkflow
  };

  return (
    <DragDropContext.Provider value={value}>
      {children}
    </DragDropContext.Provider>
  );
};

DragDropProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default DragDropProvider;