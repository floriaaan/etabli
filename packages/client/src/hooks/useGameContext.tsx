import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useSocket } from "./useSocket";

import { unpack } from "msgpackr";
import { message } from "@tauri-apps/api/dialog";


export type ChatMessage = {
  message: string;
  playerName?: string;
  type: "chat" | "system";
}

const GameContext = createContext({});
export const GameProvider = ({ children }: { children: ReactNode }) => {
  const { socket, connected } = useSocket();
  const [player, setPlayer] = useState<any>(undefined);
  const [players, setPlayers] = useState<any[]>([]);
  const [world, setWorld] = useState<any>(undefined);

  const [chat, setChat] = useState<ChatMessage[]>([]);

  const [mods, setMods] = useState<any[]>([]);

  useEffect(() => {
    socket?.on("mods", async (data: any[]) => {
      if (!data.every((mod) => mods.includes(mod))) {
        // @ts-ignore
        if (window.__TAURI__) {
          await message(
            "You might encountered issues, and you will no longer be able to play from 1.0.0",
            { title: "Mods mismatch", type: "warning" }
          );
        } else {
          alert(
            "Mods mismatch - You might encountered issues, and you will no longer be able to play from 1.0.0"
          );
        }

        console.log("Mods mismatch", "Got:", mods, "Received:", data);
      }
    });
    if (socket && connected) {
      socket.on("player_joined", (data: any) => {
        let buffer = new Uint8Array(data);
        let player = unpack(buffer);
        setPlayer(player);
      });

      socket.on("player_join", (data: any) => {
        let players = data.map((playerBuffer: any) => {
          return unpack(new Uint8Array(playerBuffer));
        });
        setPlayers(players);
      });

      socket.on("world_loading", (data: any) => {
        console.log(data);
        let buffer = new Uint8Array(data);
        let world = unpack(buffer);
        setWorld(world);
      });

      socket.on("chat_message", (data: any) => {
        setChat((chat) => [...chat, data]);
      })
    }

    if (!socket || !connected) {
      setPlayer(undefined);
      setPlayers([]);
      setWorld(undefined);
      setChat([]);
    }

    return () => {
      socket?.off("player_joined");
      socket?.off("player_join");
      socket?.off("world_loading");
      socket?.off("chat_message");
    }
  }, [socket, connected]);
  return (
    <GameContext.Provider value={{ player, players, world, chat }}>
      {children}
    </GameContext.Provider>
  );
};

interface IGameContext {
  player: any;
  players: any[];
  world: any;
  chat: ChatMessage[];
}

export const useGameContext = () => useContext(GameContext) as IGameContext;
