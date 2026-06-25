import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, Workflow, BarChart3, Settings, Users } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Sidebar() {
  const location = useLocation();

  const links = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Live Inbox', path: '/inbox', icon: MessageSquare },
    { name: 'Contacts (CRM)', path: '/crm', icon: Users },
    { name: 'Automations', path: '/automations', icon: Workflow },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className="w-64 border-r border-border bg-card flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent flex items-center gap-2">
          CloudInsta <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">AI</span>
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          
          return (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <Icon size={18} className={isActive ? "text-primary" : ""} />
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="bg-secondary/50 p-4 rounded-xl text-center">
          <p className="text-xs text-muted-foreground mb-2">Pro Plan Active</p>
          <div className="h-1 w-full bg-border rounded-full overflow-hidden">
            <div className="h-full bg-primary w-2/3"></div>
          </div>
          <p className="text-[10px] text-muted-foreground mt-2">6,432 / 10,000 Messages</p>
        </div>
      </div>
    </div>
  );
}
