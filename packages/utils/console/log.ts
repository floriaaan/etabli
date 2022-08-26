import chalk from "chalk";

import { server } from "@etabli/config";
import { appendFile, mkdir } from "fs/promises";
import { isDir } from "@etabli/utils/filesystem/isDir";

type ForegroundColor =
  | "black"
  | "red"
  | "green"
  | "yellow"
  | "blue"
  | "magenta"
  | "cyan"
  | "white"
  | "gray"
  | "grey"
  | "blackBright"
  | "redBright"
  | "greenBright"
  | "yellowBright"
  | "blueBright"
  | "magentaBright"
  | "cyanBright"
  | "whiteBright";

const levelColors: Record<string, ForegroundColor> = {
  INFO: "cyanBright",
  WARN: "yellowBright",
  ERROR: "redBright",
  DEBUG: "magentaBright",
  default: "whiteBright",
};

export const log = (
  data: string,
  {
    level = "INFO",
    textColor,
    date = false,
    type = "default",
  }: {
    level?: "INFO" | "WARN" | "FAIL" | "DEBUG";
    textColor?: ForegroundColor;
    date?: boolean;
    type?: "default" | "chat" | "connections" | "crash";
  }
): void => {
  const dateStr = `[${new Date().toLocaleString()}] `;
  const levelStr = `[${level}]`;

  if (server.log.enabled) {
    const log = `${dateStr} ${levelStr}: ${data}`;
    const logPath = `${server.log.pathDir}/${server.log.pathFiles[type]}`;
    if (!isDir(server.log.pathDir)) {
      mkdir(server.log.pathDir, { recursive: true }).then(() => {
        appendFile(logPath, log + "\n");
      });
    } else appendFile(logPath, log + "\n");
  }

  return console.log(
    chalk[levelColors[level] || levelColors.default].bold(levelStr) +
      "\t" +
      (date ? dateStr : "") +
      (textColor ? chalk[textColor].bold(data) : data)
  );
};
