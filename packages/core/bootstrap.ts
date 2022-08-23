import { BootstrapApp } from "@etabli/types/Bootstrap";
import { Player } from "@etabli/classes/entities/Player";
import { generateWorld } from "@etabli/core/world/generation";

async function bootstrap(
  players: Player[]
): Promise<BootstrapApp> {
  //todo: pass a ref to this variable to the server so it can be updated
  let world = generateWorld();

  const ascii = await import("@etabli/core/ascii");
  const modloader = await import("@etabli/core/modloader");
  const server = await import("@etabli/core/server");
  const saver = await import("@etabli/core/saver");

  const plugins = await Promise.all([
    await ascii.default(),
    modloader.default() as Promise<string[]>,
    server.default(players, world),
    saver.default(players, world),
    // require("@etabli/core/world/generation"),
  ]);

  return {
    world,
    mods: plugins[1],
    server: plugins[2],
  };
};

export default bootstrap;