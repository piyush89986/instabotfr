import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchConversations, fetchMessages, toggleHumanTakeover } from '../services/inbox.service';
import { useSocket } from '../contexts/SocketContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Search, Bot, User as UserIcon, Send, MessageSquare } from 'lucide-react';

export default function Inbox() {
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  
  const queryClient = useQueryClient();
  const { socket } = useSocket();

  // Fetch Conversations
  const { data: conversations = [] } = useQuery({
    queryKey: ['conversations'],
    queryFn: () => fetchConversations('OPEN')
  });

  // Fetch Active Messages
  const { data: messages = [] } = useQuery({
    queryKey: ['messages', activeConversationId],
    queryFn: () => fetchMessages(activeConversationId!),
    enabled: !!activeConversationId
  });

  // Handle Real-time socket events
  useEffect(() => {
    if (!socket) return;
    
    socket.on('new_message', (payload: any) => {
      // Invalidate queries to refresh UI
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      
      if (payload.conversation._id === activeConversationId) {
        // Optimistic UI update could go here, but invalidating is safer
        queryClient.invalidateQueries({ queryKey: ['messages', activeConversationId] });
      }
    });

    return () => {
      socket.off('new_message');
    };
  }, [socket, activeConversationId, queryClient]);

  const activeConv = conversations.find((c: any) => c._id === activeConversationId);

  const toggleTakeoverMutation = useMutation({
    mutationFn: (takeover: boolean) => toggleHumanTakeover(activeConversationId!, takeover),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    }
  });

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeConversationId) return;
    // TODO: Send reply to backend (Phase 6 API)
    setReplyText('');
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] bg-card border border-border rounded-xl overflow-hidden shadow-sm animate-fade-in">
      
      {/* Left Sidebar: Conversation List */}
      <div className="w-80 border-r border-border flex flex-col bg-muted/10">
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-3 text-muted-foreground" />
            <Input className="pl-9 bg-background" placeholder="Search leads..." />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv: any) => (
            <div 
              key={conv._id}
              onClick={() => setActiveConversationId(conv._id)}
              className={`p-4 border-b border-border cursor-pointer transition-colors ${activeConversationId === conv._id ? 'bg-secondary' : 'hover:bg-secondary/50'}`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-medium text-foreground">{conv.contactId?.username || 'Unknown Lead'}</span>
                <span className="text-[10px] text-muted-foreground">
                  {new Date(conv.lastMessageAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {conv.humanTakeover ? (
                  <span className="bg-amber-500/20 text-amber-500 text-[10px] px-1.5 py-0.5 rounded font-medium">AGENT</span>
                ) : (
                  <span className="bg-primary/20 text-primary text-[10px] px-1.5 py-0.5 rounded font-medium">AI BOT</span>
                )}
                <span className="text-xs text-muted-foreground truncate flex-1">
                  Active Conversation
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Area: Chat Window */}
      <div className="flex-1 flex flex-col bg-background relative">
        {activeConversationId ? (
          <>
            {/* Chat Header */}
            <div className="h-16 border-b border-border flex items-center justify-between px-6 bg-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <UserIcon size={20} className="text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{activeConv?.contactId?.username}</h3>
                  <p className="text-xs text-muted-foreground">Instagram Lead</p>
                </div>
              </div>
              
              <Button 
                variant={activeConv?.humanTakeover ? 'outline' : 'default'} 
                onClick={() => toggleTakeoverMutation.mutate(!activeConv?.humanTakeover)}
                className="gap-2"
                disabled={toggleTakeoverMutation.isPending}
              >
                {activeConv?.humanTakeover ? (
                  <>Resume AI Bot</>
                ) : (
                  <><Bot size={16} /> Pause AI & Reply</>
                )}
              </Button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg: any) => {
                const isUser = msg.source === 'INSTAGRAM';
                return (
                  <div key={msg._id} className={`flex ${isUser ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                      isUser 
                        ? 'bg-secondary text-secondary-foreground rounded-tl-sm' 
                        : 'bg-primary text-primary-foreground rounded-tr-sm'
                    }`}>
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      <div className={`text-[10px] mt-1 opacity-70 ${isUser ? 'text-left' : 'text-right'}`}>
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        {!isUser && ` • ${msg.source === 'SYSTEM_AI' ? 'AI Generated' : 'Automated'}`}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Reply Input */}
            <div className="p-4 border-t border-border bg-card">
              <form onSubmit={handleSendReply} className="flex gap-2">
                <Input 
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={activeConv?.humanTakeover ? "Type your message..." : "Pause AI to send a manual reply..."} 
                  disabled={!activeConv?.humanTakeover}
                  className="flex-1 rounded-full px-6"
                />
                <Button type="submit" disabled={!activeConv?.humanTakeover || !replyText.trim()} size="icon" className="rounded-full shrink-0">
                  <Send size={18} />
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
            <MessageSquare size={48} className="mb-4 opacity-20" />
            <p>Select a conversation to view thread</p>
          </div>
        )}
      </div>
    </div>
  );
}
