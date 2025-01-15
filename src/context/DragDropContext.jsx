import { createContext, useContext, useState } from "react";

export const DragDropContext = createContext();

export const useDragDrop = () => {
  return useContext(DragDropContext);
};

export const DragDropProvider = ({ children }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedNode, setDraggedNode] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Node type constants
  const NODE_TYPES = {
    INPUT: 'input',
    LLM: 'llm',
    OUTPUT: 'output'
  };

  const addNode = (type, position) => {
    if (!Object.values(NODE_TYPES).includes(type)) {
      throw new Error('Invalid node type');
    }

    const newNode = {
      id: `${type}-${Date.now()}`,
      type,
      position,
      data: {
        label: type.toUpperCase(),
        // Default configuration based on node type
        config: type === NODE_TYPES.LLM ? {
          model: 'gpt-3.5-turbo',
          temperature: 0.7,
          maxTokens: 256
        } : {}
      }
    };

    setNodes(prev => [...prev, newNode]);
    return newNode.id;
  };

  const updateNodeConfig = (nodeId, config) => {
    setNodes(prev => prev.map(node =>
      node.id === nodeId
        ? { ...node, data: { ...node.data, config: { ...node.data.config, ...config } } }
        : node
    ));
  };

  const validateConnection = (source, target) => {
    const sourceNode = nodes.find(n => n.id === source);
    const targetNode = nodes.find(n => n.id === target);

    if (!sourceNode || !targetNode) return false;

    // Enforce workflow rules
    // Input -> LLM -> Output
    const validConnections = {
      [NODE_TYPES.INPUT]: [NODE_TYPES.LLM],
      [NODE_TYPES.LLM]: [NODE_TYPES.OUTPUT],
      [NODE_TYPES.OUTPUT]: []
    };

    return validConnections[sourceNode.type].includes(targetNode.type);
  };

  const addEdge = (sourceId, targetId) => {
    if (!validateConnection(sourceId, targetId)) {
      return false;
    }

    const newEdge = {
      id: `${sourceId}-${targetId}`,
      source: sourceId,
      target: targetId
    };

    setEdges(prev => [...prev, newEdge]);
    return true;
  };

  const removeNode = (id) => {
    setNodes(prev => prev.filter(node => node.id !== id));
    setEdges(prev => prev.filter(edge =>
      edge.source !== id && edge.target !== id
    ));
  };

  const removeEdge = (id) => {
    setEdges(prev => prev.filter(edge => edge.id !== id));
  };

  const value = {
    nodes,
    edges,
    selectedNode,
    isDragging,
    NODE_TYPES,
    draggedNode,
    dragOffset,
    setNodes,
    setEdges,
    setSelectedNode,
    setIsDragging,
    addNode,
    updateNodeConfig,
    removeNode,
    addEdge,
    removeEdge,
    validateConnection,
    setDraggedNode,
    setDragOffset
  };

  return (
    <DragDropContext.Provider value={value}>
      {children}
    </DragDropContext.Provider>
  );
};