import { readdir } from "fs/promises";
import { isDir } from "@etabli/utils/filesystem/isDir";
import { modloader } from "@etabli/config";

const MOD_DIR = modloader.path;

module.exports = modloader.enabled ? async function modLoader() {
  console.log("Modloader:\tenabled");

  // search for directories in the mod directory
  const modDirs = await readdir(MOD_DIR);
  // load each mod
  for (const modDir of modDirs) {
    if (isDir(`${MOD_DIR}/${modDir}`)) {
      // load the mod
      console.log(`\tLoading mod:\t${modDir}`);
      try {
        await require(`${MOD_DIR}/${modDir}/index`)();
        console.log(`\tMod loaded:\t${modDir}`);
      } catch (err) {
        console.error(err);
      }
    }
  }
}: () => {
  console.log("Modloader:\tdisabled");
  return Promise.resolve();
};
