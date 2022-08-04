import { io } from "socket.io-client";
const socket = io("http://localhost:3000");
import { prompt } from "inquirer";

socket.on("connect", async () => {
  //bootstrap
  console.log("Connected successfully");
  const input = await prompt([
    {
      type: "input",
      name: "name",
      message: "What's your name",
    },
  ]);
  socket.emit("name_entered", input);



  // events listeners
  socket.on("player_join", (playerName: string) => {
    console.log(`${playerName} joined the game`);
  })
  socket.on("chat_message", (data: { message: string; playerName: string }) => {
    console.log(`${data.playerName}: ${data.message}`);
  });


  // events emitters

  socket.emit("chat_message", "hello guys");

});
