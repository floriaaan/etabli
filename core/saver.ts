import { Player } from "@etabli/classes/entities/Player";
import { isDir } from "@etabli/utils/filesystem/isDir";
import { mkdir, writeFile } from "fs/promises";

import { saves } from "@etabli/config";

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
