import { Cpu } from "lucide-react";
import { useState, useCallback } from "react";
import BaseNode from "./BaseNode";
import { useLLMConfig } from "../../hooks/useLLMConfig";

const LLMNode = ({ data, selected }) => {
  const {
    config,
    error,
    isSuccess,
    handleConfigChange,
    validateConfig
  } = useLLMConfig(data.config);

  const [showApiKey, setShowApiKey] = useState(false);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    handleConfigChange(name, value);
    validateConfig(name, value);
  }, [handleConfigChange, validateConfig]);

  const handleSliderInteraction = (e) => {
    // Only stop propagation to prevent node dragging
    e.stopPropagation();
  };

  return (
    <BaseNode
      icon={Cpu}
      title="LLM"
      description="Configure your LLM model settings"
      selected={selected}
      error={error}
      isSuccess={isSuccess}
      color="purple"
      data-testid="llm-node"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="font-medium text-sm text-slate-800" htmlFor="model">
            Model
          </label>
          <select
            id="model"
            value={config.model}
            onChange={handleInputChange}
            name="model"
            className="w-full p-3 rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none text-slate-600 bg-white"
            data-testid="model-select"
          >
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
            <option value="gpt-4">GPT-4</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="font-medium text-sm text-slate-800" htmlFor="baseurl">
            OpenAI API Base
          </label>
          <input
            id="baseurl"
            type="url"
            name="baseurl"
            value={config.baseurl}
            onChange={handleInputChange}
            placeholder="https://api.openai.com/v1/chat/completions"
            className="w-full p-3 rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none text-slate-600 placeholder:text-slate-400"
            data-testid="baseurl-input"
          />
        </div>

        <div className="space-y-2">
          <label className="font-medium text-sm text-slate-800" htmlFor="apikey">
            API Key
          </label>
          <div className="relative">
            <input
              id="apikey"
              type={showApiKey ? "text" : "password"}
              name="apikey"
              value={config.apikey}
              onChange={handleInputChange}
              placeholder="sk-..."
              className="w-full p-3 rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none text-slate-600 placeholder:text-slate-400"
              data-testid="apikey-input"
            />
          </div>
        </div>

        <div className="space-y-2 nodrag" onMouseDown={handleSliderInteraction}>
          <div className="flex justify-between items-center">
            <label className="font-medium text-sm text-slate-800" htmlFor="temperature">
              Temperature
            </label>
            <span className="text-sm text-slate-500">{config.temperature}</span>
          </div>
          <input
            id="temperature"
            type="range"
            min="0"
            max="1"
            step="0.1"
            name="temperature"
            value={config.temperature}
            onChange={handleInputChange}
            className="w-full accent-purple-500"
            data-testid="temperature-slider"
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>Precise</span>
            <span>Balanced</span>
            <span>Creative</span>
          </div>
        </div>

        <div className="space-y-2 nodrag" onMouseDown={handleSliderInteraction}>
          <div className="flex justify-between items-center">
            <label className="font-medium text-sm text-slate-800" htmlFor="maxTokens">
              Max Tokens
            </label>
            <span className="text-sm text-slate-500">{config.maxTokens}</span>
          </div>
          <input
            id="maxTokens"
            type="range"
            min="1"
            max="4000"
            step="1"
            name="maxTokens"
            value={config.maxTokens}
            onChange={handleInputChange}
            className="w-full accent-purple-500"
            data-testid="max-tokens-slider"
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