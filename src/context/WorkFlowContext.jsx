import { createContext, useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { workflowService } from '../services/workflowService';

const initialState = {
  nodes: [],
  edges: [],
  isDragging: false,
  isExecuting: false,
  executionError: null,
  showSuccess: false,
  inputText: '',
  llmConfig: {
    model: '',
    temperature: 0.7,
    maxTokens: 256,
    apikey: '',
    baseurl: 'https://api.openai.com/v1/chat/completions'
  }
};

export const WorkflowContext = createContext(null);

export const useWorkflow = () => {
  const context = useContext(WorkflowContext);
  if (!context) throw new Error('useWorkflow must be used within a WorkflowProvider');
  return context;
};

export const WorkflowProvider = ({ children }) => {
  const [nodes, setNodes] = useState(initialState.nodes);
  const [edges, setEdges] = useState(initialState.edges);
  const [isDragging, setIsDragging] = useState(initialState.isDragging);
  const [isExecuting, setIsExecuting] = useState(initialState.isExecuting);
  const [executionError, setExecutionError] = useState(initialState.executionError);
  const [showSuccess, setShowSuccess] = useState(initialState.showSuccess);
  const [inputText, setInputText] = useState(initialState.inputText);
  const [llmConfig, setLLMConfig] = useState(initialState.llmConfig);

  const handleInputChange = useCallback((text) => {
    setInputText(text);
  }, []);

  const handleLLMConfigChange = useCallback((updates) => {
    setLLMConfig(prev => ({ ...prev, ...updates }));
  }, []);

  const executeWorkflow = useCallback(async () => {
    try {
      setIsExecuting(true);
      setExecutionError(null);
      setShowSuccess(false);

      const output = await workflowService.executeWorkflow(
        nodes,
        edges,
        llmConfig,
        inputText
      );

      // Update output nodes
      setNodes(prev => prev.map(node =>
        node.type === 'output'
          ? { ...node, data: { ...node.data, output } }
          : node
      ));

      setShowSuccess(true);
    } catch (err) {
      setExecutionError(err.message);
    } finally {
      setIsExecuting(false);
    }
  }, [inputText, llmConfig, nodes, edges]);

  const value = {
    nodes,
    edges,
    isDragging,
    isExecuting,
    executionError,
    showSuccess,
    inputText,
    llmConfig,
    setNodes,
    setEdges,
    setIsDragging,
    setShowSuccess,
    setExecutionError,
    handleInputChange,
    handleLLMConfigChange,
    executeWorkflow
  };

  return (
    <WorkflowContext.Provider value={value}>
      {children}
    </WorkflowContext.Provider>
  );
};

WorkflowProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default WorkflowProvider;