import { Circle } from "lucide-react";
import { Handle, Position } from "@xyflow/react";

const BaseNode = ({
  icon: Icon,
  title,
  description,
  selected,
  children,
  error,
  isSuccess,
  color,
  handles = { source: true, target: true }
}) => {
  // Memoize status color calculation
  const getStatusColor = () => {
    if (error) return "bg-red-500 text-red-500 hover:bg-red-600 hover:text-red-600";
    if (isSuccess) return "bg-green-500 text-green-500 hover:bg-green-600 hover:text-green-600";
    return "bg-slate-400 text-slate-400 hover:bg-slate-500 hover:text-slate-500";
  };

  // Extract reusable styles
  const handleStyles = `w-3 h-3 border-2 border-white hover:w-4 hover:h-4 transition-all duration-200`;
  const handleContainerStyles = `w-5 h-5 rounded-full flex items-center justify-center`;

  return (
    <div
      className={`
        relative
        bg-white border-2 rounded-xl shadow-lg select-none w-80 min-h-80
        transition-all duration-200 ease-in-out
        hover:shadow-xl
        ${error ? 'border-red-400' : selected ? `border-${color}-500 shadow-${color}-100` : 'border-slate-200'}
      `}
      role="region"
      aria-label={title}
    >
      {error && (
        <div
          className="absolute -top-10 right-0 bg-red-500 text-white px-4 py-2 rounded-lg text-sm shadow-lg animate-in fade-in slide-in-from-top-4"
          role="alert"
        >
          {error}
        </div>
      )}

      <div>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className={`p-2 bg-${color}-50 rounded-lg`}>
              <Icon size={24} className={`text-${color}-500`} aria-hidden="true" />
            </div>
            <h3 className="text-base font-semibold text-slate-800">{title}</h3>
          </div>
          <Circle
            size={16}
            className={`rounded-full cursor-pointer transition-all duration-200 ${getStatusColor()}`}
            role="status"
            aria-label={error ? "Error" : isSuccess ? "Success" : "Neutral"}
          />
        </div>

        {/* Description */}
        <div className={`bg-${color}-50 px-6 py-4`}>
          <p className="text-slate-600 text-sm">{description}</p>
        </div>

        {/* Content */}
        <div className="pt-6 px-6 pb-20">
          {children}
        </div>
      </div>

      {/* Handles */}
      {handles.target && (
        <div className="absolute bottom-5 left-0 px-6">
          <div className={`${handleContainerStyles} bg-${color}-100`}>
            <Handle
              type="target"
              position={Position.Left}
              className={`!left-0 !bg-${color}-500 ${handleStyles}`}
            />
          </div>
          <p className="text-slate-500 text-xs mt-1 text-center">Input</p>
        </div>
      )}

      {handles.source && (
        <div className="absolute bottom-5 right-0 px-6">
          <div className={`${handleContainerStyles} bg-${color}-100`}>
            <Handle
              type="source"
              position={Position.Right}
              className={`!right-0 !bg-${color}-500 ${handleStyles}`}
            />
          </div>
          <p className="text-slate-500 text-xs mt-1 text-center">Output</p>
        </div>
      )}
    </div>
  );
};

export default BaseNode;