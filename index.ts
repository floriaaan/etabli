require("module-alias/register");

import { Player } from "@etabli/classes/entities/Player";
import { savePlayer } from "@etabli/core/saver";
import parseDuration from "parse-duration";
import { saves } from "@etabli/config";
import singleLine from "@etabli/utils/console/singleLine";

require("@etabli/core/modloader")().then(() => {
  const players = [];

  const p: Player = new Player("Steve");
  players.push(p);

  // check mod loading
  // @ts-ignore
  if (players[0].exampleMod) console.log(players[0].exampleMod());

  // check entity saving
  // @ts-ignore
  if (saves.autosave.enabled) {
    console.log("Autosave:\tenabled");
    setInterval(() => {
      singleLine.log(`Autosave:\tSaving ${players.length} player(s)...`);
      for (const player of players) {
        savePlayer(p);
      }
    }, parseDuration(saves.autosave.interval));
  } else console.log("Autosave:\tdisabled");
});
