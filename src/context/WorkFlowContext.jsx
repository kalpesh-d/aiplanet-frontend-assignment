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
    model: '',
    temperature: 0.7,
    maxTokens: 256,
    apikey: '',
    baseurl: 'https://api.groq.com/openai/v1/chat/completions'
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

  const validateWorkflow = useCallback(() => {
    const inputNode = nodes.find(n => n.type === NODE_TYPES.INPUT);
    const llmNode = nodes.find(n => n.type === NODE_TYPES.LLM);
    const outputNode = nodes.find(n => n.type === NODE_TYPES.OUTPUT);

    if (!inputNode || !llmNode || !outputNode) {
      throw new Error('Workflow must contain Input, LLM, and Output nodes');
    }

    const inputToLLM = edges.some(e =>
      e.source === inputNode.id && e.target === llmNode.id
    );
    const llmToOutput = edges.some(e =>
      e.source === llmNode.id && e.target === outputNode.id
    );

    if (!inputToLLM || !llmToOutput) {
      throw new Error('Nodes must be properly connected: Input → LLM → Output');
    }
  }, [nodes, edges]);

  const executeWorkflow = useCallback(async () => {
    try {
      setIsExecuting(true);
      setExecutionError(null);
      setShowSuccess(false);

      // Validate inputs
      if (!inputText.trim()) throw new Error('Input text is required');
      if (!llmConfig.apikey) throw new Error('API key is required');

      // Validate workflow
      validateWorkflow();

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
  }, [inputText, llmConfig, nodes, edges, validateWorkflow]);

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