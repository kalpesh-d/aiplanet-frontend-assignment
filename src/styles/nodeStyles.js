export const nodeStyles = {
  CONTAINER: `
    relative bg-white border-2 rounded-xl shadow-lg select-none w-80 min-h-80
    transition-all duration-200 ease-in-out hover:shadow-xl
  `,
  HEADER: "flex items-center justify-between p-6 border-b border-slate-100",
  DESCRIPTION: "px-6 py-4",
  CONTENT: "pt-6 px-6 pb-20",
  ERROR_MESSAGE:
    "absolute -top-10 right-0 bg-red-500 text-white px-4 py-2 rounded-lg text-sm shadow-lg animate-in fade-in slide-in-from-top-4",
  HANDLE:
    "w-3 h-3 border-2 border-white hover:w-4 hover:h-4 transition-all duration-200",
  HANDLE_CONTAINER: "w-5 h-5 rounded-full flex items-center justify-center",
  HANDLE_LABEL: "text-slate-500 text-xs mt-1 text-center relative bottom-3",
  HANDLE_LEFT: "absolute bottom-5 left-0 px-6",
  HANDLE_RIGHT: "absolute bottom-5 right-0 px-6",

  STATUS_COLORS: {
    error: "bg-red-500 text-red-500 hover:bg-red-600 hover:text-red-600",
    success:
      "bg-green-500 text-green-500 hover:bg-green-600 hover:text-green-600",
    neutral:
      "bg-slate-400 text-slate-400 hover:bg-slate-500 hover:text-slate-500",
  },

  HANDLE_LABELS: {
    blue: { source: "LLM Engine", target: "" },
    purple: { source: "Output", target: "Input" },
    green: { source: "", target: "LLM Engine" },
    default: { source: "Output", target: "Input" },
  },
};
