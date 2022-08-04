require("module-alias/register");
import chalk from "chalk";
import parseDuration from "parse-duration";
import singleLine from "@etabli/utils/console/singleLine";
const httpServer = require("http").createServer();
import { Server } from "socket.io";

import { Player } from "@etabli/classes/entities/Player";
import { savePlayer } from "@etabli/core/saver";
import { saves, server } from "@etabli/config";

require("@etabli/core/modloader")().then(() => {
  let players = [];

  // websocket server
  if (server.enabled) {
    console.log(chalk.green.underline.bold("Server") + ":\t\tenabled");

    const io = new Server(httpServer);
    io.listen(server.port);
    console.log("\tListening on port: " + server.port);
    io.on("connection", (client) => {
      client.on("name_entered", (data) => {
        const player = new Player(data.name);
        player.socketId = client.id;
        players.push(player);
      });

      client.on("disconnect", () => {
        players = players.filter((player) => player.socketId !== client.id);
      });
    });
  } else console.log(chalk.red.underline.bold("Server") + ":\t\tdisabled");

  // check entity saving
  // @ts-ignore
  if (saves.autosave.enabled) {
    console.log(chalk.green.underline.bold("Autosave") + ":\tenabled");
    setInterval(() => {
      singleLine.log(
        `\tSaving \t${chalk.blue(`${players.length} player(s)`)}...`
      );
      for (const player of players) {
        savePlayer(player);
      }
    }, parseDuration(saves.autosave.interval));
  } else console.log(chalk.red.underline.bold("Autosave") + ":\tdisabled");
});
