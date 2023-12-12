import { log } from "@etabli/utils/console/log";
import { exists } from "@etabli/utils/filesystem/exists";
import { exec } from "@etabli/utils/process/exec";

const getPackageManager = async (
  path: string
): Promise<"pnpm" | "yarn" | "npm"> => {
  if (await exists(`${path}/pnpm-lock.yaml`)) return "pnpm";
  if (await exists(`${path}/yarn.lock`)) return "yarn";
  if (await exists(`${path}/package-lock.json`)) return "npm";
  return "npm";
};

const installModules = async (path: string) => {
  const baseDir = process.cwd();
  const modName = path.split("/").pop();
  try {
    // Change directory to the mod directory
    process.chdir(baseDir); // Change directory back to the root directory to log the command
    log(`(${modName})\tInstalling modules...`, { level: "DEBUG" });

    process.chdir(path);
    const packageManager = await getPackageManager(path);
    const command = `${packageManager} install`;

    process.chdir(baseDir); // Change directory back to the root directory to log the command
    log(`(${modName})\tRunning ${command}...`, { level: "DEBUG" });

    // Run install command
    process.chdir(path); // Change directory back to the mod directory to run the command
    const { stdout, stderr } = await exec(command);

    // Handle the output of the command
    process.chdir(baseDir); // Change directory back to the root directory to log the command
    if (stdout.trim())
      log(stdout.replace(/\n/g, `\n(${modName})\t`), { level: "DEBUG" });
    if (stderr.trim())
      log(stderr.replace(/\n/g, `\n(${modName})\t`), { level: "DEBUG" });

    return true;
  } catch (error) {
    console.error(
      "Error occurred during the module installation process:",
      error
    );
  } finally {
    // Change directory back to the root directory
    process.chdir(baseDir);
    return false;
  }
};

export const buildMod = async (path: string) => {
  const baseDir = process.cwd();
  const modName = path.split("/").pop();
  try {
    // Change directory to the mod directory
    process.chdir(path);

    // Run npm install command
    await installModules(path);

    // Run npm run build command
    process.chdir(path); // Change directory back to the mod directory to run the command
    const packageManager = await getPackageManager(path);
    const command = `${packageManager} run build`;

    process.chdir(baseDir); // Change directory back to the root directory to log the command
    log(`(${modName})\tRunning ${command}...`, { level: "DEBUG" });
    log(`(${modName})\tBuilding mod...`, { level: "DEBUG" });

    process.chdir(path); // Change directory back to the mod directory to run the command
    const { stdout, stderr } = await exec(command);

    // Handle the output of the command
    // watchout: rollup outputs to stderr
    process.chdir(baseDir); // Change directory back to the root directory to log the command
    if (stdout.trim())
      log(stdout.replace(/\n/g, `\n(${modName})\t`), { level: "DEBUG" });
    if (stderr.trim())
      log(stderr.replace(/\n/g, `\n(${modName})\t`), { level: "DEBUG" });

    return true;
  } catch (error) {
    process.chdir(baseDir); // Change directory back to the root directory to log the command
    log("Error occurred during the build process: " + error.message, {
      level: "FAIL",
    });
  } finally {
    // Change directory back to the root directory
    process.chdir(baseDir);
    return false;
  }
};
