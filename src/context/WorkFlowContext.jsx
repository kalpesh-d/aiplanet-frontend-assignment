import { createContext, useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { NODE_TYPES } from '../constants/nodeTypes';

const initialState = {
  nodes: [],
  edges: [],
  isDragging: false,
  isExecuting: false,
  executionError: null,
  showSuccess: false,
  inputText: '',
  llmConfig: {
    model: 'gpt-3.5-turbo',
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

      // Validate inputs
      if (!inputText.trim()) throw new Error('Input text is required');
      if (!llmConfig.apikey) throw new Error('API key is required');

      // Make API call
      const { data } = await axios.post(
        llmConfig.baseurl,
        {
          model: llmConfig.model,
          messages: [{ role: 'user', content: inputText }],
          temperature: parseFloat(llmConfig.temperature),
          max_tokens: parseInt(llmConfig.maxTokens)
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${llmConfig.apikey}`
          }
        }
      );

      // Update output nodes
      const output = data.choices[0]?.message?.content;
      setNodes(prev => prev.map(node =>
        node.type === NODE_TYPES.OUTPUT
          ? { ...node, data: { ...node.data, output } }
          : node
      ));

      setShowSuccess(true);
    } catch (err) {
      const errorMessage = err.response?.data?.error?.message || err.message;
      setExecutionError(errorMessage);
      throw err;
    } finally {
      setIsExecuting(false);
    }
  }, [inputText, llmConfig]);

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