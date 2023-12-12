import { readdir, readFile } from "fs/promises";
import { isDir } from "@etabli/utils/filesystem/isDir";
import { modloader } from "@etabli/config";

import chalk from "chalk";
import { log } from "@etabli/utils/console/log";
import path from "path";
import { buildMod } from "@etabli/core/mod-builder";
const MOD_DIR = modloader.path;

export type Mod = {
  name: string;
  version: string;
};

const modLoader = modloader.enabled
  ? async () => {
      console.log(chalk.underline.green.bold("Modloader") + ":\tenabled");

      // search for directories in the mod directory
      const modDirs = await readdir(MOD_DIR);
      // load each mod
      const modsLoaded: Mod[] = [];
      for (const modDir of modDirs) {
        if (isDir(`${MOD_DIR}/${modDir}`)) {
          // load the mod
          if (modloader.console.log.loading)
            console.log(`\tLoading mod:\t${modDir}`);

          try {
            // @ts-ignore

            // check if the mod has a dist/index.js file
            const isModBuilt = isDir(path.resolve(MOD_DIR, modDir, "dist"));
            if (!isModBuilt) {
              log(
                `Mod ${modDir} is not built. Starting build process (experimental)..`,
                { textColor: "yellow", level: "WARN" }
              );
              await buildMod(path.resolve(MOD_DIR, modDir));
            }

            // import the mod if it has a dist/index.js file
            const modInit = await import(
              path.resolve(MOD_DIR, modDir, "dist", "index.js")
            );

            const modVersion = await readFile(
              path.resolve(MOD_DIR, modDir, "package.json")
            );

            if (modInit.default) {
              modsLoaded.push({
                name: modDir,
                version: JSON.parse(modVersion.toString())?.version,
              });

              if (modloader.console.log.loading)
                console.log(`\tMod loaded:\t${modDir}`);
            }
          } catch (err) {
            log(`Error occured loading mod: ${modDir} - ${err.message}`, {
              textColor: "red",
              level: "FAIL",
              type: "crash",
            });
            Promise.reject(err);
          }
        }
      }
      return Promise.resolve(modsLoaded);
    }
  : () => {
      console.log(chalk.underline.red.bold("Modloader") + ":\tdisabled");
      return Promise.resolve([]);
    };

export default modLoader;
