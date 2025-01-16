import { FileInput } from "lucide-react";
import { useCallback } from "react";
import { useWorkflow } from "../../context/WorkflowContext";
import BaseNode from "./BaseNode";

const InputNode = ({ selected }) => {
  const { inputText, handleInputChange } = useWorkflow();

  const onChange = useCallback((e) => {
    handleInputChange(e.target.value);
  }, [handleInputChange]);

  return (
    <BaseNode
      icon={FileInput}
      title="INPUT"
      description="Write the input/question you want to ask"
      selected={selected}
      color="blue"
      handles={{ source: true, target: false }}
    >
      <div className="space-y-2 nodrag">
        <div className="flex items-center">
          <label htmlFor="input" className="font-medium text-sm text-slate-800">Input</label>
        </div>
        <textarea
          id="input"
          value={inputText}
          onChange={onChange}
          placeholder="Type your question or prompt here..."
          rows={4}
          className="w-full p-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none text-slate-600 placeholder:text-slate-400"
        />
      </div>
    </BaseNode>
  );
};

export default InputNode;