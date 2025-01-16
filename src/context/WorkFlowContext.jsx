import { createContext, useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
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

  const addNode = useCallback((type, position) => {
    const newNode = {
      id: `${type}-${Date.now()}`,
      type,
      position,
      data: { label: type.toUpperCase() }
    };
    setNodes(prev => [...prev, newNode]);
  }, []);

  const addEdge = useCallback((sourceId, targetId) => {
    const newEdge = { id: `${sourceId}-${targetId}`, source: sourceId, target: targetId };
    setEdges(prev => [...prev, newEdge]);
  }, []);

  const executeWorkflow = useCallback(async () => {
    try {
      setIsExecuting(true);
      setExecutionError(null);
      setShowSuccess(false);

      if (!inputText.trim()) throw new Error('Input text is required');
      if (!llmConfig.apikey) throw new Error('API key is required');

      const response = await fetch(llmConfig.baseurl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${llmConfig.apikey}`
        },
        body: JSON.stringify({
          model: llmConfig.model,
          messages: [{ role: 'user', content: inputText }],
          temperature: parseFloat(llmConfig.temperature),
          max_tokens: parseInt(llmConfig.maxTokens)
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to get response from OpenAI');
      }

      const data = await response.json();
      const output = data.choices[0]?.message?.content;

      // Update output nodes
      setNodes(prev => prev.map(node =>
        node.type === NODE_TYPES.OUTPUT
          ? { ...node, data: { ...node.data, output } }
          : node
      ));

      setShowSuccess(true);
    } catch (err) {
      setExecutionError(err.message);
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
    setIsDragging,
    setShowSuccess,
    setExecutionError,
    handleInputChange,
    handleLLMConfigChange,
    addNode,
    addEdge,
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