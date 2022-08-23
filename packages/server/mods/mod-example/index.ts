declare global {
  interface Player {
    exampleMod(): string;
    skills: {
      intelligence: number;
      strength: number;
      dexterity: number;
      constitution: number;
    };
    train: (
      skill: "intelligence" | "strength" | "dexterity" | "constitution"
    ) => void;
  }
}
import pkg from "./package.json";

import { Player } from "@etabli/classes/entities/Player";

import chalk from "chalk";
const { bgBlue } = chalk;

export default async function () {
  // @ts-ignore
  Player.prototype.exampleMod = function () {
    return (
      bgBlue.whiteBright(" MOD-EXAMPLE ") +
      "\t" +
      "This is an example mod, and it works!"
    );
  };

  // @ts-ignore
  Player.prototype.skills = {
    intelligence: 0,
    strength: 0,
    dexterity: 0,
    constitution: 0,
  };

  // @ts-ignore
  Player.prototype.train = function (skill: string) {
    this.skills[skill] += 1;
  };

  // @ts-ignore

  return Promise.resolve({
    name: pkg.name,
    version: pkg.version,
    loaded: true,
  });
}
