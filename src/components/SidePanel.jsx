import { FileInput, Cpu, FileOutput, Menu } from "lucide-react";
import { useWorkflow } from '../context/WorkflowContext'

const nodes = [
  {
    type: "input",
    icon: FileInput,
  },
  {
    type: "llm",
    icon: Cpu,
  },
  {
    type: "output",
    icon: FileOutput,
  }
];

const SidePanel = () => {
  const { isDragging, setIsDragging } = useWorkflow();

  const handleDragStart = (e, type) => {
    setIsDragging(true);
    e.dataTransfer.setData("nodeType", type);
  };

  const handleDragEnd = () => setIsDragging(false);

  return (
    <section className="absolute top-[calc(5.5rem+1rem)] left-8">
      <div className="h-[calc(100vh-8rem)] w-64 bg-white border border-slate-200 rounded-xl p-4 space-y-4">
        <div className="space-y-1.5">
          <h2 className="text-base font-medium text-slate-800">Components</h2>
          <p className="text-xs text-slate-500">Drag and drop components to the canvas</p>
        </div>

        <div className="space-y-3">
          {nodes.map((node) => (
            <div
              key={node.type}
              draggable
              onDragStart={(e) => handleDragStart(e, node.type)}
              onDragEnd={handleDragEnd}
              className={`
                flex justify-between items-center gap-3 p-3 rounded-lg cursor-move select-none
                bg-white border border-slate-200 hover:border-green-300 hover:shadow-sm
                transition-all duration-200
                ${isDragging ? "opacity-50" : ""}
              `}
            >
              <div className={`rounded-lg flex gap-2 items-center`}>
                <node.icon size={16} />
                <p className="text-sm font-medium text-slate-700">{node.type}</p>
              </div>
              <Menu size={16} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SidePanel;