import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchUserProfile } from '../../services/auth.service';
import Sidebar from './Sidebar';
import Header from './Header';

export default function ProtectedRoute() {
  const token = localStorage.getItem('accessToken');

  const { data: user, isLoading, isError } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUserProfile,
    enabled: !!token,
    retry: false
  });

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-background text-foreground">Loading workspace...</div>;
  }

  if (isError || !user) {
    localStorage.removeItem('accessToken');
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header user={user} />
        <main className="flex-1 overflow-y-auto p-8 bg-muted/20">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
