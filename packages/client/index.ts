import { Player } from "@etabli/classes/entities/Player";
import { World } from "@etabli/classes/world/World";
import { io } from "socket.io-client";
const url = `http://127.0.0.1:3000`;
const socket = io(url, { autoConnect: true, reconnection: true });

let world: World;
let player: Player;
let players: Player[];

const player_name_input = document.getElementById(
  "player_name"
) as HTMLInputElement;
const player_name_form = document.getElementById(
  "player_name_form"
) as HTMLFormElement;

player_name_form.addEventListener("submit", (e) => {
  e.preventDefault();
  socket.emit("name_entered", { name: player_name_input.value });
  player_name_input.value = "";
});

console.log("Connecting to server...", url);

socket.on("connect", async () => {
  //bootstrap
  console.log("Connected successfully to: " + url);
  player_name_form.style.display = "block";

  socket.on("world_loading", (data) => {
    let buffer = new Uint8Array(data);
    world = World.fromCompressed(buffer as Buffer);
    console.log(world);
  });
  socket.on("player_joined", (data) => {
    let buffer = new Uint8Array(data);
    player = Player.fromCompressed(buffer as Buffer);
    console.log(player);

    player_name_form.style.display = "none";
  });

  socket.on("player_join", (data) => {
    players = data.map((playerBuffer) => {
      let buffer = new Uint8Array(playerBuffer);
      return Player.fromCompressed(buffer as Buffer);
    });
    console.log(players);
  });

  socket.on("player_left", (data) => {
    players = data.map((playerBuffer) => {
      let buffer = new Uint8Array(playerBuffer);
      return Player.fromCompressed(buffer as Buffer);
    });
    console.log(players);
  });
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});
