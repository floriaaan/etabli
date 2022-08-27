import { World } from "@etabli/classes/world/World";
import { Mod } from "@etabli/core/modloader";
import { Server } from "socket.io";

export type BootstrapApp = {
  world: World;
  mods: Mod[];
  server: Server;
};
