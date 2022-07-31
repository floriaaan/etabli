require("module-alias/register");

import { Player } from "@etabli/classes/entities/Player";

require("@etabli/core/modloader")().then(() => {
  const p: Player = new Player("Steve");

  
  // check mod loading
  // @ts-ignore
  console.log(p.exampleMod());

});
