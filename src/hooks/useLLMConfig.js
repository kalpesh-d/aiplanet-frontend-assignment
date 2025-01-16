import { useState, useCallback } from "react";

export const useLLMConfig = (initialConfig) => {
  const [config, setConfig] = useState(initialConfig);
  const [error, setError] = useState(null);

  const handleConfigChange = useCallback((name, value) => {
    setConfig((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Only validate API key format
    if (name === "apikey") {
      setError(!value.startsWith("sk-") ? "Invalid API key format" : null);
    }
  }, []);

  return {
    config,
    error,
    handleConfigChange,
  };
};
