import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useNodeOperations } from '../hooks/useNodeOperations';
import { useWorkflowValidation } from '../hooks/useWorkflowValidation';
import { NODE_TYPES } from '../constants/nodeTypes';

const initialState = {
  nodes: [],
  edges: [],
  selectedNode: null,
  isDragging: false,
  draggedNode: null,
  dragOffset: { x: 0, y: 0 }
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
  // State
  const [nodes, setNodes] = useState(initialState.nodes);
  const [edges, setEdges] = useState(initialState.edges);
  const [selectedNode, setSelectedNode] = useState(initialState.selectedNode);
  const [isDragging, setIsDragging] = useState(initialState.isDragging);
  const [draggedNode, setDraggedNode] = useState(initialState.draggedNode);
  const [dragOffset, setDragOffset] = useState(initialState.dragOffset);

  // Custom hooks
  const {
    addNode,
    updateNodeConfig,
    removeNode,
    addEdge,
    removeEdge
  } = useNodeOperations(setNodes, setEdges);

  const {
    validateConnection,
    validateWorkflow,
    WorkflowError
  } = useWorkflowValidation(nodes);

  // Context value
  const value = {
    // State
    nodes,
    edges,
    selectedNode,
    isDragging,
    draggedNode,
    dragOffset,
    NODE_TYPES,

    // State setters
    setNodes,
    setEdges,
    setSelectedNode,
    setIsDragging,
    setDraggedNode,
    setDragOffset,

    // Node operations
    addNode,
    updateNodeConfig,
    removeNode,
    addEdge,
    removeEdge,

    // Validation
    validateConnection,
    validateWorkflow,
    WorkflowError
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