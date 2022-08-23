import { readdir } from "fs/promises";
import { isDir } from "@etabli/utils/filesystem/isDir";
import { modloader } from "@etabli/config";

import chalk from "chalk";

const MOD_DIR = modloader.path;

const modLoader = modloader.enabled
  ? async () => {
      console.log(chalk.underline.green.bold("Modloader") + ":\tenabled");

      // search for directories in the mod directory
      const modDirs = await readdir(MOD_DIR);
      // load each mod
      for (const modDir of modDirs) {
        if (isDir(`${MOD_DIR}/${modDir}`)) {
          // load the mod
          console.log(`\tLoading mod:\t${modDir}`);
          try {
            // @ts-ignore

            const modInit = await import(`../${MOD_DIR}/${modDir}/dist/index.js`);
            if (modInit.default) {
              await modInit.default();
              console.log(`\tMod loaded:\t${modDir}`);
            }
          } catch (err) {
            console.error(err);
          }
        }
      }
    }
  : () => {
      console.log(chalk.underline.red.bold("Modloader") + ":\tdisabled");
      return Promise.resolve();
    };

export { modLoader };
export default modLoader;
