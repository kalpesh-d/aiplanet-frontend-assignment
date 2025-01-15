import { FileInput } from "lucide-react";
import { useState } from "react";
import BaseNode from "./BaseNode";

const InputNode = ({ data, selected }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (!e.target.value.trim()) {
      setError("Input is missing input key");
      setIsSuccess(false);
    } else {
      setError(null);
      setIsSuccess(true);
    }
  };

  return (
    <BaseNode
      icon={FileInput}
      title="INPUT"
      description="Write the input/ question you want to ask"
      selected={selected}
      error={error}
      isSuccess={isSuccess}
      color="blue"
      handles={{ source: true, target: false }}
    >
      <div className="space-y-2">
        <div className="flex items-center">
          <label htmlFor="input" className="font-medium text-slate-800">Input</label>
        </div>
        <input
          id="input"
          value={input}
          onChange={handleInputChange}
          placeholder="Type Something..."
          className="w-full p-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none text-slate-600 placeholder:text-slate-400"
        />
      </div>
    </BaseNode>
  );
};

export default InputNode; 