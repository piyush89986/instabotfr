import React from 'react';
import { Bell, Search } from 'lucide-react';
import { Input } from '../ui/Input';

export default function Header({ user }: { user: any }) {
  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-8 shrink-0">
      <div className="flex items-center w-96 relative">
        <Search size={16} className="absolute left-3 text-muted-foreground" />
        <Input 
          className="pl-9 bg-secondary/50 border-none focus-visible:ring-1" 
          placeholder="Search contacts, automations..." 
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-muted-foreground hover:text-foreground transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse"></span>
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-border">
          <div className="text-right">
            <p className="text-sm font-medium text-foreground leading-none">{user?.firstName} {user?.lastName}</p>
            <p className="text-xs text-muted-foreground mt-1">{user?.role?.name}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-sm shadow-inner shadow-black/20">
            {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  );
}
