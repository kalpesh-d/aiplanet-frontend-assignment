import { useState, useCallback } from "react";

const VALIDATION_RULES = {
  model: (value) => ({
    isValid: value.trim() !== "",
    error: "Model selection is required",
  }),
  baseurl: (value) => ({
    isValid: value.trim() !== "" && value.startsWith("http"),
    error: "Invalid API URL format",
  }),
  apikey: (value) => ({
    isValid: value.trim() !== "" && value.startsWith("sk-"),
    error: "Invalid API key format",
  }),
  temperature: (value) => ({
    isValid: value >= 0 && value <= 1,
    error: "Temperature must be between 0 and 1",
  }),
  maxTokens: (value) => ({
    isValid: value >= 1 && value <= 4000,
    error: "Max tokens must be between 1 and 4000",
  }),
};

export const useLLMConfig = (initialConfig) => {
  const [config, setConfig] = useState(initialConfig);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateConfig = useCallback((name, value) => {
    if (!VALIDATION_RULES[name]) return true;

    const { isValid, error } = VALIDATION_RULES[name](value);

    if (!isValid) {
      setError(error);
      setIsSuccess(false);
      return false;
    }

    setError(null);
    setIsSuccess(true);
    return true;
  }, []);

  const handleConfigChange = useCallback((name, value) => {
    setConfig((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const validateAllConfig = useCallback(() => {
    for (const [key, value] of Object.entries(config)) {
      if (!validateConfig(key, value)) {
        return false;
      }
    }
    return true;
  }, [config, validateConfig]);

  return {
    config,
    error,
    isSuccess,
    handleConfigChange,
    validateConfig,
    validateAllConfig,
  };
};
