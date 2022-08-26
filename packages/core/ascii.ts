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
}

export default asciiArt;

