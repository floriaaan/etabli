import { Player } from "@etabli/classes/entities/Player";
import { isDir } from "@etabli/utils/filesystem/isDir";
import { mkdir, readFile, writeFile } from "fs/promises";
import { v5 as uuid } from "uuid";

import { log } from "@etabli/utils/console/log";
import { saves } from "@etabli/config";

import chalk from "chalk";
import singleLine from "@etabli/utils/console/singleLine";
import parseDuration from "parse-duration";
import { World } from "@etabli/classes/World/World";

const SAVES_DIR = saves.path;
const WORLD_DIR = saves.world;

export const savePlayer = async (player: Player) => {
  if (!isDir(`${SAVES_DIR}/${WORLD_DIR}/players`)) {
    await mkdir(`${SAVES_DIR}/${WORLD_DIR}/players`, { recursive: true });
  }
  const savePath = `${SAVES_DIR}/${WORLD_DIR}/players/${player.uuid}.json`;

  const saveData = {
    player,
  };
  await writeFile(savePath, JSON.stringify(saveData));
};

export const getPlayerSave = async (playerName: string) => {
  const fileName = uuid(
    `player:${playerName}`,
    "630eb68f-e0fa-5ecc-887a-7c7a62614681"
  );

  const savePath = `${SAVES_DIR}/${WORLD_DIR}/players/${fileName}.json`;
  try {
    const saveData = JSON.parse(await readFile(savePath, "utf-8"));
    return saveData;
  } catch (e) {
    console.error(e)
    return null;
  }
};

async function autosaver(players: Player[], world: World) {
  // check entity saving
  try {
    if (saves.autosave.enabled) {
      log(chalk.green.underline.bold("Autosave") + ":\tenabled", { level: "DEBUG" });
      setInterval(() => {
        if (saves.console.log.players) {
          singleLine.log(
            `\tSaving \t${chalk.blue(`${players.length} player(s)`)}...`
          );
        }
        for (const player of players) {
          savePlayer(player);
        }
      }, parseDuration(saves.autosave.interval));
    } else log(chalk.red.underline.bold("Autosave") + ":\tdisabled", { level: "DEBUG" });
  } catch (e) {
    log(
      e instanceof Error
        ? "An error occured with autosave: " + e.message
        : "An error occured with autosave",
      {
        textColor: "red",
        level: "FAIL",
        type: "crash",
      }
    );
  }
}

export default autosaver;
