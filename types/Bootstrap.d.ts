import { World } from "@etabli/classes/world/World";
import { Configuration } from "@etabli/core/configuration";
import { Mod } from "@etabli/core/mod-loader";
import { Server } from "socket.io";

export type BootstrapApp = {
  world: World;
  mods: Mod[];
  server: Server;
  datastore: Configuration
};
