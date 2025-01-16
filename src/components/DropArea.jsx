import { useWorkflow } from "../context/WorkflowContext";
import InputNode from "./nodes/InputNode";
import LLMNode from "./nodes/LLMNode";
import OutputNode from "./nodes/OutputNode";
import CustomEdge from "./edges/CustomEdge";
import { useCallback, useState } from "react";
import { addEdge, Background, Controls, ReactFlow, useEdgesState, useNodesState, Panel } from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import { AlertCircle } from "lucide-react";

const nodeTypes = {
  input: InputNode,
  llm: LLMNode,
  output: OutputNode,
};

const edgeTypes = {
  custom: CustomEdge,
};

const DropArea = () => {
  const { isDragging } = useWorkflow();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [error, setError] = useState(null);

  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(null), 3000);
  };

  const onConnect = useCallback((params) => {
    const sourceNode = nodes.find(n => n.id === params.source);
    const targetNode = nodes.find(n => n.id === params.target);

    if (!sourceNode || !targetNode) return;

    const validConnections = {
      'input': ['llm'],
      'llm': ['output'],
      'output': []
    };

    // Check if target already has an incoming connection
    const hasIncomingConnection = edges.some(edge => edge.target === params.target);
    if (hasIncomingConnection) {
      showError("Node already has an incoming connection");
      return;
    }

    if (validConnections[sourceNode.type]?.includes(targetNode.type)) {
      const edge = {
        ...params,
        type: 'custom',
        animated: true,
      };
      setEdges((eds) => addEdge(edge, eds));
    } else {
      showError(`Cannot connect ${sourceNode.type.toUpperCase()} to ${targetNode.type.toUpperCase()}`);
    }
  }, [nodes, edges]);

  const onDrop = (event) => {
    event.preventDefault();

    const nodeType = event.dataTransfer.getData('nodeType');
    if (!nodeType) return;

    // Get the drop position relative to the ReactFlow viewport
    const reactFlowBounds = event.currentTarget.getBoundingClientRect();
    const position = {
      x: event.clientX - reactFlowBounds.left - 210, // Half of node width (420px)
      y: event.clientY - reactFlowBounds.top - 40,
    };

    const newNode = {
      id: `${nodeType}-${Date.now()}`,
      type: nodeType,
      position,
      data: {
        label: nodeType.toUpperCase(),
        config: nodeType === 'llm' ? {
          model: 'gpt-3.5-turbo',
          baseurl: 'https://api.openai.com/v1/chat/completions',
          apikey: '',
          maxTokens: 256,
          temperature: 0.5,
        } : {}
      },
      style: {
        padding: 0,
        borderRadius: 0,
        border: 'none',
        background: 'none',
        width: 'auto',
        boxShadow: 'none'
      }
    };

    setNodes((nds) => nds.concat(newNode));
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  return (
    <div className="h-[calc(100vh-6rem)] bg-slate-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        className={isDragging ? "opacity-50" : ""}
        defaultEdgeOptions={{
          type: 'custom',
          animated: true
        }}
      >
        <Background color="#000000" gap={16} size={1} />
        <Controls
          className="bg-white border-2 border-slate-200 rounded-xl overflow-hidden"
          position="bottom-right"
        />

        {/* Error Message */}
        {error && (
          <Panel position="top-center" className="bg-red-100 text-red-800 px-4 py-2 rounded-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
            <AlertCircle size={16} />
            {error}
          </Panel>
        )}

        {/* Empty State */}
        {nodes.length === 0 && !isDragging && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center space-y-4">
              <div className="bg-white rounded-full p-4 mx-auto w-fit">
                <img className="w-10 h-10" src="/d&d.svg" alt="Drag & Drop" />
              </div>
              <div className="space-y-1">
                <p className="text-slate-600 font-medium">Start Building Your Flow</p>
                <p className="text-slate-400 text-sm">Drag components from the sidebar and connect them</p>
              </div>
            </div>
          </div>
        )}
      </ReactFlow>
    </div>
  );
};

export default DropArea;