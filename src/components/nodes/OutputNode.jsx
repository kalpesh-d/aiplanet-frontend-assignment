import { FileOutput, Copy, Check } from "lucide-react";
import { useState } from "react";
import BaseNode from "./BaseNode";

const OutputNode = ({ data, selected }) => {
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError("Failed to copy to clipboard");
      setTimeout(() => setError(null), 2000);
    }
  };

  return (
    <BaseNode
      icon={FileOutput}
      title="OUTPUT"
      description="View the generated output"
      selected={selected}
      error={error}
      isSuccess={isSuccess}
      color="green"
      handles={{ source: false, target: true }}
    >
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="font-medium text-slate-800">Output</label>
          {output && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-green-600 hover:text-green-700 rounded-md hover:bg-green-50"
            >
              {copied ? (
                <>
                  <Check size={14} />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={14} />
                  Copy
                </>
              )}
            </button>
          )}
        </div>
        <div className="w-full min-h-24 rounded-lg border border-slate-200 bg-slate-50 text-slate-600">
          {output ? (
            <pre className="whitespace-pre-wrap font-mono text-sm">{output}</pre>
          ) : (
            <div className="flex items-center justify-center h-24 text-slate-400">
              No output generated yet
            </div>
          )}
        </div>
      </div>
    </BaseNode>
  );
};

export default OutputNode; 