const { version } = require("../../package.json");
import { readFile } from "fs/promises";
import path from "path";

module.exports = async function asciiArt(): Promise<void> {
  const ascii = await readFile(
    path.resolve(__dirname, "..", "..", "docs", "ascii.txt")
  );
  console.log(ascii.toString() + version);
  console.log("");
};
