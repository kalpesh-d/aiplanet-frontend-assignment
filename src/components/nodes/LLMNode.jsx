import { Cpu } from "lucide-react";
import { useState, useCallback } from "react";
import { useWorkflow } from "../../context/WorkflowContext";
import BaseNode from "./BaseNode";

const LLMNode = ({ selected }) => {
  const { llmConfig, handleLLMConfigChange } = useWorkflow();
  const [showApiKey, setShowApiKey] = useState(false);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    let updatedValue = value;
    if (name === 'temperature') updatedValue = parseFloat(value);
    if (name === 'maxTokens') updatedValue = parseInt(value);
    handleLLMConfigChange({ [name]: updatedValue });
  }, [handleLLMConfigChange]);

  return (
    <BaseNode
      icon={Cpu}
      title="LLM"
      description="Configure your LLM model settings"
      selected={selected}
      color="purple"
    >
      <div className="space-y-4 nodrag">
        <div className="space-y-2">
          <label className="font-medium text-sm text-slate-800" htmlFor="model">Model</label>
          <select
            id="model"
            name="model"
            value={llmConfig.model}
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none text-slate-600 bg-white"
          >
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
            <option value="gpt-4">GPT-4</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="font-medium text-sm text-slate-800" htmlFor="baseurl">OpenAI API Base</label>
          <input
            id="baseurl"
            type="url"
            name="baseurl"
            value={llmConfig.baseurl || ''}
            onChange={handleInputChange}
            placeholder="https://api.openai.com/v1/chat/completions"
            className="w-full p-3 rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-1 
            focus:ring-purple-500 outline-none text-slate-600 placeholder:text-slate-400"
          />
        </div>

        <div className="space-y-2">
          <label className="font-medium text-sm text-slate-800" htmlFor="apikey">API Key</label>
          <div className="relative">
            <input
              id="apikey"
              type={showApiKey ? "text" : "password"}
              name="apikey"
              value={llmConfig.apikey}
              onChange={handleInputChange}
              placeholder="sk-..."
              className="w-full p-3 rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none text-slate-600 placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="font-medium text-sm text-slate-800" htmlFor="temperature">Temperature</label>
            <span className="text-sm text-slate-500">{llmConfig.temperature}</span>
          </div>
          <input
            id="temperature"
            type="range"
            name="temperature"
            min="0"
            max="1"
            step="0.1"
            value={llmConfig.temperature}
            onChange={handleInputChange}
            className="w-full accent-purple-500"
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>Precise</span>
            <span>Balanced</span>
            <span>Creative</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="font-medium text-sm text-slate-800" htmlFor="maxTokens">Max Tokens</label>
            <span className="text-sm text-slate-500">{llmConfig.maxTokens}</span>
          </div>
          <input
            id="maxTokens"
            type="range"
            name="maxTokens"
            min="1"
            max="4000"
            step="1"
            value={llmConfig.maxTokens}
            onChange={handleInputChange}
            className="w-full accent-purple-500"
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>Short</span>
            <span>Medium</span>
            <span>Long</span>
          </div>
        </div>
      </div>
    </BaseNode>
  );
};

export default LLMNode; 