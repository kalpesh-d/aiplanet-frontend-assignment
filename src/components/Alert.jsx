import { CircleX, CheckCircle2, X } from "lucide-react";
import { useEffect } from "react";
import { useWorkflow } from "../context/WorkflowContext";

const Alert = () => {
  const { executionError, showSuccess, setShowSuccess, setExecutionError } = useWorkflow();

  useEffect(() => {
    if (showSuccess || executionError) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
        setExecutionError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess, executionError, setShowSuccess, setExecutionError]);

  if (!executionError && !showSuccess) return null;

  const isError = Boolean(executionError);
  const bgColor = isError ? 'bg-red-500' : 'bg-green-600';
  const borderColor = isError ? 'border-red-400' : 'border-green-400';
  const textColor = 'text-white';

  const handleClose = () => {
    setShowSuccess(false);
    setExecutionError(null);
  };

  return (
    <div className={`
      fixed top-24 right-4 z-50
      ${bgColor} ${borderColor}
      border rounded-lg shadow-lg p-4 w-[32rem]
      animate-in fade-in slide-in-from-top-4
      transition-all duration-200
    `}>
      <div className="flex items-start gap-3">
        {isError ? (
          <CircleX className={`w-5 h-5 ${textColor} mt-0.5`} />
        ) : (
          <CheckCircle2 className={`w-5 h-5 ${textColor} mt-0.5`} />
        )}

        <div className="flex-1">
          <h3 className={`font-medium ${textColor}`}>
            {isError ? 'Error while running the flow' : 'Flow ran successfully'}
          </h3>
          <p className={`mt-1 text-sm ${textColor}`}>
            {isError ? executionError : 'The workflow has been executed successfully.'}
          </p>
        </div>

        <button
          onClick={handleClose}
          className={`
            p-1 rounded-md 
            hover:bg-white/20
            transition-colors duration-200
            ${textColor}
          `}
          aria-label="Close alert"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

export default Alert;