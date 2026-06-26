import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchWorkspace, updateKnowledgeBase } from '../services/workspace.service';
import { Button } from '../components/ui/Button';
import { BookOpen, Save, Loader2, CheckCircle2 } from 'lucide-react';

export default function KnowledgeBase() {
  const [content, setContent] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const queryClient = useQueryClient();

  const { data: workspace, isLoading } = useQuery({
    queryKey: ['workspace'],
    queryFn: fetchWorkspace
  });

  useEffect(() => {
    if (workspace?.aiKnowledgeBase) {
      setContent(workspace.aiKnowledgeBase);
    }
  }, [workspace]);

  const updateMutation = useMutation({
    mutationFn: updateKnowledgeBase,
    onSuccess: (newWorkspace) => {
      queryClient.setQueryData(['workspace'], newWorkspace);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  });

  const handleSave = () => {
    updateMutation.mutate(content);
  };

  return (
    <div className="animate-fade-in space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-primary" />
            AI Knowledge Base
          </h1>
          <p className="text-muted-foreground mt-2">
            Paste your business information, FAQs, and product details here. The AI will automatically read this and use it to answer customer DMs.
          </p>
        </div>

        <Button
          onClick={handleSave}
          disabled={updateMutation.isPending}
          className="gap-2"
        >
          {updateMutation.isPending ? (
            <Loader2 size={16} className="animate-spin" />
          ) : isSaved ? (
            <CheckCircle2 size={16} className="text-green-500" />
          ) : (
            <Save size={16} />
          )}
          {isSaved ? 'Saved!' : 'Save Knowledge Base'}
        </Button>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm p-6">
        <label className="block text-sm font-medium mb-2 text-foreground">
          Business Information
        </label>
        <p className="text-xs text-muted-foreground mb-4">
          Write this as a "System Prompt" (e.g., "You are a helpful assistant for Bob's Bike Shop. We sell mountain bikes for $500..."). Keep it clear and concise.
        </p>

        {isLoading ? (
          <div className="h-[500px] w-full bg-secondary/50 animate-pulse rounded-lg flex items-center justify-center">
            <Loader2 className="animate-spin text-muted-foreground h-8 w-8" />
          </div>
        ) : (
          <textarea
            className="w-full h-[500px] p-4 bg-background border border-input rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring font-mono text-sm resize-y"
            placeholder="Type or paste your business information here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        )}
      </div>
    </div>
  );
}
