import { Player } from "@etabli/classes/entities/Player";
import { log } from "@etabli/utils/console/log";

import { BootstrapApp } from "@etabli/types/Bootstrap";

export async function initServer() {
  let players: Player[] = [];

  const bootstrap = (await import("@etabli/core/bootstrap")).default as (
    p: Player[]
  ) => Promise<BootstrapApp>;

  bootstrap(players)
    .then(async (app: BootstrapApp) => {})
    .catch((e: Error) => {
      log(
        e instanceof Error
          ? "An error occured with bootstrap: " + e.message
          : "An error occured with bootstrap",
        {
          textColor: "red",
          level: "ERROR",
        }
      );
    });
}

initServer();
