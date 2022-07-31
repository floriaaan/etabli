import { readdir } from "fs/promises";
import { isDir } from "@etabli/utils/filesystem/isDir";

const MOD_DIR = "mods";

module.exports = async function modLoader() {
  // search for directories in the mod directory
  const modDirs = await readdir(MOD_DIR);
  // load each mod
  for (const modDir of modDirs) {
    if (isDir(`${MOD_DIR}/${modDir}`)) {
      // load the mod
      console.log(`Loading mod:\t${modDir}`);
      try {
        await require(`${MOD_DIR}/${modDir}/index`)();
        console.log(`Mod loaded:\t${modDir}`);
      } catch (err) {
        console.error(err);
      }
    }
  }
};
