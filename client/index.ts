

// # arguments
// soloplayer : inits the server
// import yargs from "yargs";
// import { hideBin } from "yargs/helpers";
// import { initServer } from "@etabli/server";
// const argv = yargs(hideBin(process.argv)).argv as unknown as {
//   soloplayer: boolean;
// };
// if (argv.soloplayer) {
//   initServer();
// }

// import inquirer from "inquirer";
// const { prompt } = inquirer;

import {World} from "@etabli/classes/World/World";

let world: World;

// # server connection
import { io } from "socket.io-client";
const url = `http://localhost:3000`;
const socket = io(url);

socket.on("connection", async () => {
  //bootstrap
  console.log("Connected successfully to: " + url);
  // const input = await prompt([
  //   {
  //     type: "input",
  //     name: "name",
  //     message: "What's your name",
  //   },
  // ]);
  const input = { name: "John" };

  socket.emit("name_entered", input);

  // events listeners
  socket.on("world_loading", (data) => {
    console.log(data)
  })


  socket.on("player_join", (playerName: string) => {
    console.log(`${playerName} joined the game`);
  });
  socket.on("chat_message", (data: { message: string; playerName: string }) => {
    console.log(`${data.playerName}: ${data.message}`);
  });

  // events emitters
  socket.emit("chat_message", "hello guys");
});
