import { Play, Loader2 } from "lucide-react";
import { useWorkflow } from "../context/WorkflowContext";

const Header = () => {
  const { executeWorkflow, isExecuting } = useWorkflow();
  const defaultButtonStyle = "rounded-md px-5 py-1.5 text-sm text-white";

  const handleRun = async () => {
    try {
      await executeWorkflow();
    } catch (err) {
      // Error is handled by Alert component
      console.error('Workflow execution failed:', err);
    }
  };

  return (
    <header className="border-b-2 border-zinc-200 bg-white">
      <div className="container mx-auto px-2 py-6">
        <nav className="flex justify-between items-center">
          <img src="/openagi.svg" alt="Ai Planet" />
          <div className="flex items-center gap-2">
            <button
              className={`${defaultButtonStyle} bg-zinc-400 hover:bg-zinc-500/80`}
              disabled={isExecuting}
            >
              Deploy
            </button>
            <button
              onClick={handleRun}
              disabled={isExecuting}
              className={`${defaultButtonStyle} bg-green-700 hover:bg-green-800 flex items-center gap-1`}
            >
              {isExecuting ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <Play size={14} /> Run
                </>
              )}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;