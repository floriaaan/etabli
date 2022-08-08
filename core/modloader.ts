import { readdir } from "fs/promises";
import { isDir } from "@etabli/utils/filesystem/isDir";
import { modloader } from "@etabli/config";

import chalk from "chalk";

const MOD_DIR = modloader.path;

module.exports = modloader.enabled
  ? async function modLoader() {
      console.log(chalk.underline.green.bold("Modloader") + ":\tenabled");

      // search for directories in the mod directory
      const modDirs = await readdir(MOD_DIR);
      // load each mod
      const modsLoaded: string[] = [];
      for (const modDir of modDirs) {
        if (isDir(`${MOD_DIR}/${modDir}`)) {
          // load the mod
          if (modloader.console.log.loading)
            console.log(`\tLoading mod:\t${modDir}`);

          try {
            await require(`${MOD_DIR}/${modDir}/index`)();

            if (modloader.console.log.loading)
              console.log(`\tMod loaded:\t${modDir}`);
              
            modsLoaded.push(modDir);
          } catch (err) {
            console.error(err);
            Promise.reject(err);
          }
        }
      }
      Promise.resolve(modsLoaded);
    }
  : () => {
      console.log(chalk.underline.red.bold("Modloader") + ":\tdisabled");
      return Promise.resolve([]);
    };
