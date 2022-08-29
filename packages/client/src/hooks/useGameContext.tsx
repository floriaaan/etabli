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

const GameContext = createContext({});
export const GameProvider = ({ children }: { children: ReactNode }) => {
  const { socket, connected } = useSocket();
  const [player, setPlayer] = useState<any>(undefined);
  const [players, setPlayers] = useState<any[]>([]);
  const [world, setWorld] = useState<any>(undefined);

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
    }

    if (!socket || !connected) {
      setPlayer(undefined);
      setPlayers([]);
      setWorld(undefined);
    }
  }, [socket, connected]);
  return (
    <GameContext.Provider value={{ player, players, world }}>
      {children}
    </GameContext.Provider>
  );
};

interface IGameContext {
  player: any;
  players: any[];
  world: any;
}

export const useGameContext = () => useContext(GameContext) as IGameContext;
