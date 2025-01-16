import { BaseEdge, getBezierPath } from '@xyflow/react';

const CustomEdge = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd
}) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          strokeWidth: 2,
          stroke: 'url(#edge-gradient)',
          transition: 'stroke-width 0.2s'
        }}
      />
      <defs>
        <linearGradient id="edge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" className="text-blue-500" style={{ stopColor: 'currentColor' }} />
          <stop offset="50%" className="text-purple-500" style={{ stopColor: 'currentColor' }} />
          <stop offset="100%" className="text-green-500" style={{ stopColor: 'currentColor' }} />
        </linearGradient>
      </defs>
    </>
  );
};

export default CustomEdge; 