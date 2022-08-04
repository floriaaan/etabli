require("module-alias/register");
import chalk from "chalk";
import parseDuration from "parse-duration";
import singleLine from "@etabli/utils/console/singleLine";
const httpServer = require("http").createServer();
import { Server } from "socket.io";

import { Player } from "@etabli/classes/entities/Player";
import { savePlayer } from "@etabli/core/saver";
import { saves, server } from "@etabli/config";
import { log } from "./utils/console/log";

const clog = console.log;

require("@etabli/core/modloader")().then(() => {
  let players: Player[] = [];

  // websocket server
  if (server.enabled) {
    clog(chalk.green.underline.bold("Server") + ":\t\tenabled");

    const io = new Server(httpServer);
    io.listen(server.port);
    clog("\tListening on port: " + server.port);
    io.on("connection", (client) => {
      client.on("name_entered", (data) => {
        if (server.console.log.connections) {
          log(`${data.name} joined the game`, {
            textColor: "yellowBright",
            date: true,
          });
        }
        const player = new Player(data.name);
        player.socketId = client.id;
        players.push(player);

        io.sockets.emit("new_player", data.name);
      });

      client.on("chat_message", (message) => {
        const playerName = players.find((p) => p.socketId === client.id)?.name;
        log(`${playerName}: ${message}`, { date: true });
        io.sockets.emit("chat_message", { playerName, message });
      });

      client.on("disconnect", () => {
        if (server.console.log.connections) {
          const playerName = players.find(
            (p) => p.socketId === client.id
          )?.name;

          log(`${playerName} left the game`, {
            textColor: "yellowBright",
            date: true,
          });
        }
        players = players.filter((player) => player.socketId !== client.id);
      });
    });
  } else clog(chalk.red.underline.bold("Server") + ":\t\tdisabled");

  // check entity saving
  // @ts-ignore
  if (saves.autosave.enabled) {
    clog(chalk.green.underline.bold("Autosave") + ":\tenabled");
    setInterval(() => {
      singleLine.log(
        `\tSaving \t${chalk.blue(`${players.length} player(s)`)}...`
      );
      for (const player of players) {
        savePlayer(player);
      }
    }, parseDuration(saves.autosave.interval));
  } else clog(chalk.red.underline.bold("Autosave") + ":\tdisabled");
});
