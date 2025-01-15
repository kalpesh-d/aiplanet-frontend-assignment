import { Cpu } from "lucide-react";
import { useState } from "react";
import BaseNode from "./BaseNode";

const LLMNode = ({ data, selected }) => {
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);

  const handleValidation = (e) => {
    const { name, value } = e.target;
    if (!value.trim()) {
      setError(`${name} is required`);
      setIsSuccess(false);
    } else if (name === 'baseurl' && !value.startsWith('http')) {
      setError('Invalid API URL format');
      setIsSuccess(false);
    } else {
      setError(null);
      setIsSuccess(true);
    }
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
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="font-medium text-sm text-slate-800">Model</label>
          <select
            value={data.config.model}
            onChange={handleValidation}
            name="model"
            className="w-full p-3 rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none text-slate-600 bg-white"
          >
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
            <option value="gpt-4">GPT-4</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="font-medium text-sm text-slate-800">OpenAI API Base</label>
          <input
            type="url"
            name="baseurl"
            value={data.config.baseurl}
            onChange={handleValidation}
            placeholder="https://api.openai.com/v1/chat/completions"
            className="w-full p-3 rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none text-slate-600 placeholder:text-slate-400"
          />
        </div>

        <div className="space-y-2">
          <label className="font-medium text-sm text-slate-800">API Key</label>
          <div className="relative">
            <input
              type={showApiKey ? "text" : "password"}
              name="apikey"
              value={data.config.apikey}
              onChange={handleValidation}
              placeholder="sk-..."
              className="w-full p-3 rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none text-slate-600 placeholder:text-slate-400 pr-24"
            />
            <button
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-xs font-medium text-purple-600 hover:text-purple-700"
            >
              {showApiKey ? 'HIDE' : 'SHOW'}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="font-medium text-sm text-slate-800">Temperature</label>
            <span className="text-sm text-slate-500">{data.config.temperature}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            name="temperature"
            value={data.config.temperature}
            onChange={handleValidation}
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
            <label className="font-medium text-sm text-slate-800">Max Tokens</label>
            <span className="text-sm text-slate-500">{data.config.maxTokens}</span>
          </div>
          <input
            type="range"
            min="1"
            max="4000"
            step="1"
            name="maxTokens"
            value={data.config.maxTokens}
            onChange={handleValidation}
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