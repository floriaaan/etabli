import { BootstrapApp } from "@etabli/types/Bootstrap";
import { Player } from "@etabli/classes/entities/Player";
import { generateWorld } from "@etabli/core/world/generation";

module.exports = async function bootstrap(
  players: Player[]
): Promise<BootstrapApp> {
  const world = generateWorld();

  const plugins = await Promise.all([
    await require("@etabli/core/ascii")(),
    require("@etabli/core/modloader")(),
    require("@etabli/core/server")(players, world),
    require("@etabli/core/saver")(players, world),
    // require("@etabli/core/world/generation"),
  ]);

  return {
    world,
    mods: plugins[1],
    server: plugins[2],
  };
};
