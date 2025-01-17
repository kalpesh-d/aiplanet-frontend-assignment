import { Cpu } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { useWorkflow } from "../../context/WorkflowContext";
import BaseNode from "./BaseNode";
import { groqService } from "../../services/groqService";

const DEFAULT_MODEL = "gpt-3.5-turbo";
const DEFAULT_BASE_URL = "https://api.openai.com/v1/chat/completions";

const LLMNode = ({ selected }) => {
  const { llmConfig, handleLLMConfigChange } = useWorkflow();
  const [models, setModels] = useState([]);
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  const [modelError, setModelError] = useState(null);

  // Fetch models when component mounts
  useEffect(() => {
    const fetchModels = async () => {
      setIsLoadingModels(true);
      setModelError(null);
      try {
        groqService.setApiKey(llmConfig.apikey);
        const models = await groqService.fetchModels();
        setModels(models);
      } catch (error) {
        setModelError(error.message);
      } finally {
        setIsLoadingModels(false);
      }
    };

    if (llmConfig.apikey) {
      fetchModels();
    }
  }, [llmConfig.apikey]);

  // Set default model and URL when component mounts
  useEffect(() => {
    if (!llmConfig.model || !llmConfig.baseurl) {
      handleLLMConfigChange({
        model: DEFAULT_MODEL,
        baseurl: DEFAULT_BASE_URL
      });
    }
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    let updatedValue = value;
    if (name === 'temperature') updatedValue = parseFloat(value);
    if (name === 'maxTokens') updatedValue = parseInt(value);

    if (name === 'model') {
      const baseurl = value.includes('gpt')
        ? "https://api.openai.com/v1/chat/completions"
        : "https://api.groq.com/openai/v1/chat/completions";
      handleLLMConfigChange({
        [name]: value,
        baseurl
      });
    } else {
      handleLLMConfigChange({ [name]: updatedValue });
    }
  }, [handleLLMConfigChange]);

  // Group models by provider
  const groupedModels = models.reduce((acc, model) => {
    const provider = model.owned_by;
    if (!acc[provider]) {
      acc[provider] = [];
    }
    acc[provider].push(model);
    return acc;
  }, {});

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
            <optgroup label="OpenAI Models">
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
              <option value="gpt-4">GPT-4</option>
            </optgroup>
            {Object.entries(groupedModels).map(([provider, providerModels]) => (
              <optgroup key={provider} label={`${provider} Models`}>
                {providerModels.map(model => (
                  <option key={model.id} value={model.id}>
                    {model.id}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <div className="space-y-2">
            <label className="font-medium text-sm text-slate-800" htmlFor="baseurl">API Base URL</label>
            <input
              id="baseurl"
              type="url"
              name="baseurl"
              value={llmConfig.baseurl || ''}
              onChange={handleInputChange}
              placeholder="API endpoint will be set automatically based on model selection"
              className="w-full p-3 rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none text-slate-600 placeholder:text-slate-400"
              readOnly
            />
          </div>
          {modelError && (
            <p className="text-xs text-red-500 mt-1">{modelError}</p>
          )}
          {isLoadingModels && (
            <p className="text-xs text-slate-500 mt-1">Loading available models...</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="font-medium text-sm text-slate-800" htmlFor="apikey">API Key</label>
          <input
            id="apikey"
            type="password"
            name="apikey"
            value={llmConfig.apikey}
            onChange={handleInputChange}
            placeholder="Enter your API key"
            className="w-full p-3 rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none text-slate-600 placeholder:text-slate-400"
          />
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
        </div>
      </div>
    </BaseNode>
  );
};

export default LLMNode; 