import { World } from "@etabli/classes/world/World";
import { Server } from "socket.io";

export type BootstrapApp = {
  world: World;
  mods: string[];
  server: Server;
};
