// # server connection
import { World } from "@etabli/classes/world/World";
import inquirer from "inquirer";
import { io } from "socket.io-client";
const url = `http://127.0.0.1:3000`;
const socket = io(url, { autoConnect: true, reconnection: true });

console.log("Connecting to server...", url);

let world: World;

socket.on("connect", async () => {
  //bootstrap
  console.log("Connected successfully to: " + url);

  // events listeners
  socket.on("world_loading", (data) => {
    let buffer = Buffer.from(data);
    world = World.fromCompressed(buffer);
  });

  const input = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter your name:",
    },
  ]);
  socket.emit("name_entered", input);
});

socket.on("player_join", (playerName: string) => {
  console.log(`${playerName} joined the game`);
});
socket.on("chat_message", (data: { message: string; playerName: string }) => {
  console.log(`${data.playerName}: ${data.message}`);
});

// events emitters
socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

socket.on("error", (error) => {
  console.log(error);
});

socket.on("reconnect_attempt", () => {
  console.log("Reconnecting to server...");
});

socket.on("reconnect_error", (error) => {
  console.log(error);
});

socket.on("reconnect_failed", () => {
  console.log("Reconnection failed");
});

socket.on("reconnect", () => {
  console.log("Reconnected to server");
});

socket.on("reconnecting", (attemptNumber) => {
  console.log(`Reconnecting to server... ${attemptNumber}`);
});

socket.on("connect_failed", () => {
  console.log("Connection failed");
});

socket.on("connect_error", (error) => {
  console.log(error);
});
