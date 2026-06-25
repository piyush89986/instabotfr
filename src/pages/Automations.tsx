import React, { useState, useCallback, useMemo } from 'react';
import { ReactFlow, Controls, Background, addEdge, applyNodeChanges, applyEdgeChanges, type Node, type Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import TriggerNode from '../components/builder/nodes/TriggerNode';
import ActionNode from '../components/builder/nodes/ActionNode';
import { Button } from '../components/ui/Button';
import { Save, Play } from 'lucide-react';

const initialNodes: Node[] = [
  {
    id: 'node-1',
    type: 'triggerNode',
    position: { x: 250, y: 100 },
    data: { label: 'Instagram Trigger', config: { triggerType: 'COMMENT' } },
  },
  {
    id: 'node-2',
    type: 'actionNode',
    position: { x: 250, y: 350 },
    data: { label: 'Send AI Reply', config: { actionType: 'AI_REPLY' } },
  },
];

const initialEdges: Edge[] = [
  { id: 'edge-1', source: 'node-1', target: 'node-2', animated: true, style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 } },
];

export default function Automations() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  // We use useMemo to map the custom node types so React Flow can render our Tailwind components
  const nodeTypes = useMemo(() => ({
    triggerNode: TriggerNode,
    actionNode: ActionNode,
  }), []);

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 } }, eds)),
    []
  );

  const handleSave = () => {
    // In production, this JSON is sent to our backend `PUT /api/v1/automation/workflows/:id`
    console.log('Saved Workflow State:', { nodes, edges });
    alert('Workflow saved successfully! Check console for JSON serialization.');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-background rounded-xl border border-border shadow-sm overflow-hidden animate-fade-in relative">
      
      {/* Builder Top Bar */}
      <div className="h-16 border-b border-border bg-card flex items-center justify-between px-6 z-10">
        <div>
          <h2 className="font-bold text-foreground">Lead Generation Flow</h2>
          <p className="text-xs text-muted-foreground">Draft • Last saved just now</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Test Flow</Button>
          <Button onClick={handleSave} className="gap-2"><Save size={16} /> Save & Publish</Button>
        </div>
      </div>

      {/* React Flow Canvas */}
      <div className="flex-1 w-full h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          className="bg-muted/10"
        >
          <Background color="hsl(var(--border))" gap={16} size={1} />
          <Controls className="bg-card border-border fill-foreground" />
        </ReactFlow>
      </div>
      
    </div>
  );
}
