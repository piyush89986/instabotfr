import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Users, MessageSquare, Zap, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchDashboardStats } from '../services/analytics.service';

export default function Dashboard() {
  const { data: stats, isLoading, isError } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: fetchDashboardStats
  });

  if (isLoading) return <div className="text-muted-foreground animate-pulse">Loading analytics...</div>;
  if (isError) return <div className="text-destructive">Failed to load analytics. Ensure the backend is running.</div>;

  const { overview, trends } = stats;

  const cards = [
    { title: 'Total Leads', value: overview.totalContacts, icon: Users, color: 'text-blue-500' },
    { title: 'Open Conversations', value: overview.openConversations, icon: MessageSquare, color: 'text-amber-500' },
    { title: 'AI Messages Sent', value: overview.totalAiMessagesSent, icon: Zap, color: 'text-primary' },
  ];

  return (
    <div className="animate-fade-in space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Overview</h1>
        <p className="text-muted-foreground mt-1">Here's how your automations are performing today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="bg-card border border-border p-6 rounded-xl shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Icon size={100} className={card.color} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className={`p-2 rounded-lg bg-secondary/50 ${card.color}`}>
                    <Icon size={20} />
                  </div>
                  <h3 className="text-sm font-medium text-muted-foreground">{card.title}</h3>
                </div>
                <div className="flex items-end justify-between">
                  <h2 className="text-4xl font-bold text-foreground">{card.value.toLocaleString()}</h2>
                  <div className="flex items-center text-emerald-500 text-sm font-medium">
                    <ArrowUpRight size={16} />
                    <span>12%</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-card border border-border p-6 rounded-xl shadow-lg">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-foreground">Message Volume (Last 7 Days)</h3>
        </div>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trends} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorUser" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="_id" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                itemStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Area type="monotone" dataKey="userMessages" name="User DMs" stroke="hsl(var(--muted-foreground))" fillOpacity={1} fill="url(#colorUser)" />
              <Area type="monotone" dataKey="aiMessages" name="AI Replies" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorAi)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
