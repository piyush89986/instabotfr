import { Handle, Position } from '@xyflow/react';
import { Send, Bot } from 'lucide-react';

export default function ActionNode({ data }: { data: any }) {
  const isAI = data.config?.actionType === 'AI_REPLY';

  return (
    <div className={`w-64 bg-card border-2 rounded-xl shadow-xl overflow-hidden relative ${isAI ? 'border-accent shadow-accent/20' : 'border-border'}`}>
      
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-3 h-3 bg-foreground border-2 border-background"
      />

      <div className="p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isAI ? 'bg-accent/20 text-accent' : 'bg-secondary text-foreground'}`}>
            {isAI ? <Bot size={16} /> : <Send size={16} />}
          </div>
          <div>
            <h3 className="font-bold text-foreground leading-tight">{data.label || 'Action'}</h3>
            <p className="text-[10px] text-muted-foreground uppercase font-semibold">{isAI ? 'Generative AI' : 'Static Reply'}</p>
          </div>
        </div>
        
        <div className="mt-3 text-xs text-muted-foreground bg-secondary/50 p-2 rounded-md border border-border/50 truncate">
          {isAI 
            ? 'Uses GPT-4 to generate a contextual reply based on user message.'
            : data.config?.message || 'Configure message content'}
        </div>
      </div>

      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-3 h-3 bg-foreground border-2 border-background"
      />
    </div>
  );
}
