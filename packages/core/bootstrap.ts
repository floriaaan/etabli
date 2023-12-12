import { BootstrapApp } from "@etabli/types/Bootstrap";
import { Player } from "@etabli/classes/entities/Player";
import { generateWorld } from "@etabli/core/world/generation";
import { Mod } from "@etabli/core/mod-loader";
import { Configuration } from "@etabli/core/configuration";

async function bootstrap(players: Player[]): Promise<BootstrapApp> {
  //todo: pass a ref to this variable to the server so it can be updated
  let world = generateWorld();

  const ascii = await import("@etabli/core/ascii");
  const modloader = await import("@etabli/core/mod-loader");
  const server = await import("@etabli/core/server");
  const saver = await import("@etabli/core/saver");
  const datastore = await import("@etabli/core/configuration");

  const plugins = await Promise.all([
    await ascii.default(),
    await modloader.default() as unknown as Promise<Mod[]>,
    server.default(players, world),
    saver.default(players, world),
    datastore.default() as Promise<Configuration>,
    // require("@etabli/core/world/generation"),
  ]);

  return {
    world,
    mods: plugins[1],
    server: plugins[2],
    datastore: plugins[4],
  };
}

export default bootstrap;
