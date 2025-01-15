import { Circle } from "lucide-react";
import { Handle, Position } from "@xyflow/react";
import PropTypes from 'prop-types';
import { nodeStyles } from '../../styles/nodeStyles';

const BaseNode = ({
  icon: Icon,
  title,
  description,
  selected,
  children,
  error,
  isSuccess,
  color = 'default',
  handles = { source: true, target: true },
  onStatusChange
}) => {
  const handleLabels = nodeStyles.HANDLE_LABELS[color] || nodeStyles.HANDLE_LABELS.default;

  const statusColor = error
    ? nodeStyles.STATUS_COLORS.error
    : isSuccess
      ? nodeStyles.STATUS_COLORS.success
      : nodeStyles.STATUS_COLORS.neutral;

  const borderColor = error
    ? 'border-red-400'
    : selected
      ? `border-${color}-500 shadow-${color}-100`
      : 'border-slate-200';

  const descriptionColor =
    color === 'blue' ? 'bg-blue-50' :
      color === 'purple' ? 'bg-purple-50' :
        color === 'green' ? 'bg-green-50' : 'bg-slate-50';

  return (
    <div
      className={`${nodeStyles.CONTAINER} ${borderColor}`}
      role="region"
      aria-label={title}
      data-testid={`node-${title.toLowerCase()}`}
    >
      {error && (
        <div
          className={nodeStyles.ERROR_MESSAGE}
          role="alert"
        >
          {error}
        </div>
      )}

      <div>
        <div className={nodeStyles.HEADER}>
          <div className="flex items-center gap-1">
            <div className="p-2 rounded-lg">
              <Icon size={24} aria-hidden="true" />
            </div>
            <h3 className="text-base font-semibold text-slate-800">{title}</h3>
          </div>
          <Circle
            size={16}
            className={`rounded-full cursor-pointer transition-all duration-200 ${statusColor}`}
            role="status"
            aria-label={error ? "Error" : isSuccess ? "Success" : "Neutral"}
            onClick={() => onStatusChange?.()}
          />
        </div>

        <div className={`${nodeStyles.DESCRIPTION} ${descriptionColor}`}>
          <p className="text-slate-600 text-sm">{description}</p>
        </div>

        <div className={nodeStyles.CONTENT}>
          {children}
        </div>
      </div>

      {handles.target && (
        <div className={nodeStyles.HANDLE_LEFT}>
          <div className={nodeStyles.HANDLE_CONTAINER}>
            <Handle
              type="target"
              position={Position.Left}
              className={`!left-0 !border-${color}-500 ${nodeStyles.HANDLE}`}
              data-testid="target-handle"
            />
          </div>
          <p className={nodeStyles.HANDLE_LABEL}>{handleLabels.target}</p>
        </div>
      )}

      {handles.source && (
        <div className={nodeStyles.HANDLE_RIGHT}>
          <div className={nodeStyles.HANDLE_CONTAINER}>
            <Handle
              type="source"
              position={Position.Right}
              className={`!right-0 !border-${color}-500 ${nodeStyles.HANDLE}`}
              data-testid="source-handle"
            />
          </div>
          <p className={nodeStyles.HANDLE_LABEL}>{handleLabels.source}</p>
        </div>
      )}
    </div>
  );
};

BaseNode.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  children: PropTypes.node,
  error: PropTypes.string,
  isSuccess: PropTypes.bool,
  color: PropTypes.oneOf(['blue', 'purple', 'green', 'default']),
  handles: PropTypes.shape({
    source: PropTypes.bool,
    target: PropTypes.bool
  }),
  onStatusChange: PropTypes.func
};

export default BaseNode;