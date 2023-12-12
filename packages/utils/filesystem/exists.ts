import fs from "fs";
import util from "util";

const fileExists = util.promisify(fs.exists);

export async function exists(path: string): Promise<boolean> {
  try {
    const exists = await fileExists(path);
    return exists;
  } catch (err) {
    console.error(err);
    return false;
  }
}
