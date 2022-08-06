// import { io } from "socket.io-client";
// const socket = io("http://localhost:3000");
// import { prompt } from "inquirer";




// socket.on("connect", async () => {
//   //bootstrap
//   console.log("Connected successfully");
//   const input = await prompt([
//     {
//       type: "input",
//       name: "name",
//       message: "What's your name",
//     },
//   ]);
//   socket.emit("name_entered", input);



//   // events listeners
//   socket.on("player_join", (playerName: string) => {
//     console.log(`${playerName} joined the game`);
//   })
//   socket.on("chat_message", (data: { message: string; playerName: string }) => {
//     console.log(`${data.playerName}: ${data.message}`);
//   });


//   // events emitters

//   socket.emit("chat_message", "hello guys");

// });

import { Engine } from 'noa-engine'
import { initRegistration } from './utils/registration'
import { initWorldGen } from './utils/worldgen'
import { setupPlayerEntity } from './utils/entities'
import { setupInteractions } from './utils/actions'

const noa = new Engine({
  debug: true,
  showFPS: true,
  inverseY: false,
  inverseX: false,
  chunkSize: 32,
  chunkAddDistance: [2, 1.5],     // [horiz, vert]
  blockTestDistance: 50,
  texturePath: 'textures/',
  playerStart: [0.5, 5, 0.5],
  playerHeight: 1.4,
  playerWidth: 0.6,
  playerAutoStep: true,
  useAO: true,
  AOmultipliers: [0.92, 0.8, 0.5],
  reverseAOmultiplier: 1.0,
  manuallyControlChunkLoading: false,
  originRebaseDistance: 25,
})

const blockIDs = initRegistration(noa)

initWorldGen(noa, blockIDs)

// adds a mesh to player
setupPlayerEntity(noa)

// does stuff on button presses
setupInteractions(noa)