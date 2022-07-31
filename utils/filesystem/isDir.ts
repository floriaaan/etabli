import { statSync } from "fs";

export const isDir = (path: string): boolean => {
  try {
    return statSync(path).isDirectory();
  } catch (e) {
    return false;
  }
};
