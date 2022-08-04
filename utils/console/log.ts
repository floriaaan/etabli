import chalk from "chalk";

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

export const log = (
  data: string,
  {
    level = "INFO",
    textColor,
    date = false,
  }: {
    level?: "INFO" | "WARN" | "ERROR";
    textColor?: ForegroundColor;
    date?: boolean;
  }
): void => {
  return console.log(
    chalk[
      level === "INFO"
        ? "blueBright"
        : level === "WARN"
        ? "yellowBright"
        : "redBright"
    ].bold(level) +
      "\t" +
      (date ? new Date().toISOString() + "  " : undefined) +
      (textColor ? chalk[textColor].bold(data) : data)
  );
};
