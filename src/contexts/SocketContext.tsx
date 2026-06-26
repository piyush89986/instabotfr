import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({ socket: null, isConnected: false });

export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    let socketInstance: Socket | null = null;

    const connectSocket = () => {
      const token = localStorage.getItem('accessToken');
      if (!token || socketInstance) return;

      // Connect to the backend Socket.IO server
      socketInstance = io(import.meta.env.VITE_BACKEND_URL || 'https://instabotbac.onrender.com', {
        transports: ['websocket'],
      });

      socketInstance.on('connect', () => {
        setIsConnected(true);
        socketInstance?.emit('authenticate', { token });
      });

      socketInstance.on('disconnect', () => {
        setIsConnected(false);
      });

      setSocket(socketInstance);
    };

    connectSocket();
    
    // Check for token every 2 seconds (fixes issue where socket doesn't connect after login without a page refresh)
    const interval = setInterval(connectSocket, 2000);

    return () => {
      clearInterval(interval);
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
