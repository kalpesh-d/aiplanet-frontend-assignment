import { FileOutput } from "lucide-react";
import BaseNode from "./BaseNode";

const OutputNode = ({ data, selected }) => {
  return (
    <BaseNode
      icon={FileOutput}
      title="OUTPUT"
      description="View the generated output"
      selected={selected}
      color="green"
      handles={{ source: false, target: true }}
    >
      <div className="space-y-2 nodrag">
        <div className="flex justify-between items-center">
          <label className="font-medium text-sm text-slate-800">Output</label>
        </div>
        <div className="w-full min-h-24 p-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-600">
          {data.output ? (
            <pre className="whitespace-pre-wrap font-mono text-sm text-left">{data.output}</pre>
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