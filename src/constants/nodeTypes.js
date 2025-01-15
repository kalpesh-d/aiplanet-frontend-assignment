export const NODE_TYPES = {
  INPUT: "input",
  LLM: "llm",
  OUTPUT: "output",
};

export const NODE_COLORS = {
  [NODE_TYPES.INPUT]: "blue",
  [NODE_TYPES.LLM]: "purple",
  [NODE_TYPES.OUTPUT]: "green",
};

export const NODE_DESCRIPTIONS = {
  [NODE_TYPES.INPUT]: "Configure input parameters and data",
  [NODE_TYPES.LLM]: "Configure your LLM model settings",
  [NODE_TYPES.OUTPUT]: "Configure output handling and formatting",
};
