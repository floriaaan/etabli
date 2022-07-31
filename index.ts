require("module-alias/register");
require("@etabli/core/modloader")();

import { Player } from "@etabli/classes/entities/Player";

const p: Player = new Player("Steve");
console.log(p);
