import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";

const SocketContext = createContext({});

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [url, setUrl] = useState("http://localhost:3000");
  const [connected, setConnected] = useState(false);
  const [socket, setSocket] = useState<Socket>(io(url));

  
  const reconnect = () => {
    setSocket(io(url));
  };
  const disconnect = () => {
    socket.disconnect();
    setConnected(false);
  };

  useEffect(() => {
    socket.on("connect", () => {
      setConnected(true);
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    return () => {
      socket.disconnect();
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [socket, url]);

  return (
    <SocketContext.Provider
      value={{ socket, connected, reconnect, disconnect }}
    >
      {children}
    </SocketContext.Provider>
  );
};

interface ISocketContext {
  socket: Socket | null;
  connected: boolean;
  reconnect: () => void;
  disconnect: () => void;
}
export const useSocket = () => useContext(SocketContext) as ISocketContext;
