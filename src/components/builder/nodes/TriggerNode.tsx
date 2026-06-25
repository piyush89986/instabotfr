import { Handle, Position } from '@xyflow/react';
import { Zap } from 'lucide-react';

export default function TriggerNode({ data }: { data: any }) {
  return (
    <div className="w-64 bg-card border-2 border-primary rounded-xl shadow-lg shadow-primary/20 overflow-hidden relative">
      {/* Decorative gradient top bar */}
      <div className="h-2 w-full bg-gradient-to-r from-primary to-accent"></div>
      
      <div className="p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
            <Zap size={16} fill="currentColor" />
          </div>
          <div>
            <h3 className="font-bold text-foreground leading-tight">{data.label || 'Instagram Trigger'}</h3>
            <p className="text-[10px] text-muted-foreground uppercase font-semibold">Entry Point</p>
          </div>
        </div>
        
        <div className="mt-3 text-xs text-muted-foreground bg-secondary/50 p-2 rounded-md border border-border/50">
          {data.config?.triggerType === 'COMMENT' 
            ? 'When user comments on a Post' 
            : data.config?.triggerType === 'DM'
            ? 'When user sends a direct message'
            : 'Configure trigger event'}
        </div>
      </div>

      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-3 h-3 bg-primary border-2 border-background"
      />
    </div>
  );
}
