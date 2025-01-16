import { useState, useCallback } from "react";

export const useLLMConfig = (initialConfig) => {
  const [config, setConfig] = useState(initialConfig);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleConfigChange = useCallback((name, value) => {
    setConfig((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Simple validation
    if (name === "apikey" && !value.startsWith("sk-")) {
      setError("Invalid API key format");
      setIsSuccess(false);
    } else {
      setError(null);
      setIsSuccess(true);
    }
  }, []);

  return {
    config,
    error,
    isSuccess,
    handleConfigChange,
  };
};
