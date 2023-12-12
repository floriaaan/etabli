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
    process.chdir(path);
    console.log(`[${modName}]\tInstalling modules...`);

    const packageManager = await getPackageManager(path);
    const command = `${packageManager} install`;
    console.log(`[${modName}]\tRunning ${command}...`);

    // Run install command
    const { stdout, stderr } = await exec(command);

    // Handle the output of the command
    if (stdout.trim()) console.log(stdout.replace(/\n/g, `\n[${modName}]\t`));
    if (stderr.trim()) console.error(stderr.replace(/\n/g, `\n[${modName}]\t`));

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
    const packageManager = await getPackageManager(path);
    const command = `${packageManager} run build`;
    console.log(`[${modName}]\tRunning ${command}...`);

    console.log(`[${modName}]\tBuilding mod...`);
    const { stdout, stderr } = await exec(command);

    // Handle the output of the command
    // watchout: rollup outputs to stderr
    if (stdout.trim()) console.log(stdout.replace(/\n/g, `\n[${modName}]\t`));
    if (stderr.trim()) console.error(stderr.replace(/\n/g, `\n[${modName}]\t`));

    return true;
  } catch (error) {
    console.error("Error occurred during the build process:", error);
  } finally {
    // Change directory back to the root directory
    process.chdir(baseDir);
    return false;
  }
};
