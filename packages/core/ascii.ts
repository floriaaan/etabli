import { log } from "@etabli/utils/console/log";
import { version } from "../../package.json";
import { readFile } from "fs/promises";
import path from "path";

async function asciiArt(): Promise<void> {
  let __dirname = path.resolve();
  const ascii = await readFile(
    path.resolve(__dirname, "..", "..", "docs", "ascii.txt")
  );
  console.log(ascii.toString() + version);
  console.log("");
  log("------------------------------------", { level: "DEBUG" });
  log("Starting Etabli Server version " + version, { level: "DEBUG" });
}

export default asciiArt;
