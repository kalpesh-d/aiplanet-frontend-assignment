import { FileInput, Cpu, FileOutput, Menu } from "lucide-react";

const SidePanel = () => {
  const nodes = [
    {
      name: "File Input",
      icon: <FileInput size={16} />,
    },
    {
      name: "LLM Engine",
      icon: <Cpu size={16} />,
    },
    {
      name: "File Output",
      icon: <FileOutput size={16} />,
    },
  ];

  return (
    <section className="my-4 container mx-auto">
      <div className="h-[calc(100vh-8rem)] w-60 bg-white border-2 rounded-[1rem] p-4 space-y-3">
        <h2 className="text-lg">Components</h2>
        <div className="border-b-2 border-slate-800/10"></div>
        <p className="text-sm text-zinc-400">Drag and Drop</p>

        {nodes.map((node) => (
          <div className="flex justify-between items-center border border-slate-800/20 rounded-md p-2">
            <div className="flex items-center space-x-2">
              {node.icon}
              <p className="text-sm">{node.name}</p>
            </div>
            <Menu size={16} />
          </div>
        ))}
      </div>
    </section >
  );
};

export default SidePanel;