import { io } from "socket.io-client";
const socket = io("http://localhost:3000");
const inquirer = require("inquirer");

socket.on("connect", async () => {
  console.log("Connected successfully");

  const input = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What's your name",
    },
  ]);

  socket.emit("name_entered", input);
});
