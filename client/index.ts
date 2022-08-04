import { io } from "socket.io-client";
const socket = io("http://localhost:3000");
import { prompt } from "inquirer";

socket.on("connect", async () => {
  console.log("Connected successfully");
  const input = await prompt([
    {
      type: "input",
      name: "name",
      message: "What's your name",
    },
  ]);
  socket.emit("name_entered", input);

  socket.emit("chat_message", "hello guys");

  socket.on("chat_message", (data: { message: string; playerName: string }) => {
    console.log(`${data.playerName}: ${data.message}`);
  });
});
