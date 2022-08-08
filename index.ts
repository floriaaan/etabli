require("module-alias/register");
import { Player } from "@etabli/classes/entities/Player";
import { log } from "@etabli/utils/console/log";

import { BootstrapApp } from "@etabli/types/Bootstrap";

let players: Player[] = [];

require("@etabli/core/bootstrap")(players)
  .then(async (app: BootstrapApp) => {})
  .catch((e: Error) => {
    log(
      e instanceof Error
        ? "An error occured with bootstrap" + e.message
        : "An error occured with bootstrap",
      {
        textColor: "red",
        level: "ERROR",
      }
    );
  });

import { generateWorld } from "./core/world/generation";
import { World } from "@etabli/classes/world/World";
// generate world
// const compressed = compress(generateWorld());
// console.log(compressed);
// console.log((decompress(compressed) as World).chunks[0][0].data[0][0]);
