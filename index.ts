require("module-alias/register");
import chalk from "chalk";
import parseDuration from "parse-duration";
import singleLine from "@etabli/utils/console/singleLine";
import { Server } from "socket.io";

import { Player } from "@etabli/classes/entities/Player";
import { savePlayer } from "@etabli/core/saver";
import { saves, server } from "@etabli/config";
import { log } from "@etabli/utils/console/log";
import { portInUse } from "@etabli/utils/server/portInUse";

const clog = console.log;

require("@etabli/core/modloader")()
  .then(async () => {
    let players: Player[] = [];

    // websocket server
    if (server.enabled) {
      clog(chalk.green.underline.bold("Server") + ":\t\tenabled");

      try {
        const httpServer = require("http").createServer();
        const io = new Server(httpServer, {
          cors: {
            origin: "*",
          },
        });

        // check if there is already a server running
        if (await portInUse(server.port)) {
          throw new Error("Port already in use");
        }

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

            io.sockets.emit("player_join", data.name);

            if (server.webapp.enabled)
              io.sockets.emit("webapp:players", players);
          });

          client.on("chat_message", (message) => {
            const playerName = players.find(
              (p) => p.socketId === client.id
            )?.name;
            log(`${playerName}: ${message}`, { date: true });
            io.sockets.emit("chat_message", { playerName, message });
          });

          client.on("disconnect", () => {
            const player = players.find((p) => p.socketId === client.id);
            if (player) {
              if (server.console.log.connections) {
                log(`${player.name} left the game`, {
                  textColor: "yellowBright",
                  date: true,
                });
              }
              players = players.filter(
                (player) => player.socketId !== client.id
              );

              io.sockets.emit(
                "player_left",
                players.map((p) => p.name)
              );
              if (server.webapp.enabled)
                io.sockets.emit("webapp:players", players);
            } else
              log(`Someone left the game`, {
                textColor: "cyan",
                date: true,
              });
          });

          if (server.webapp.enabled) {
            client.on("webapp:get_players", () => {
              client.emit("webapp:players", players);
            });
          }
        });
      } catch (e) {
        log(
          e instanceof Error
            ? "An error occured with server: " + e.message
            : "An error occured with server",
          {
            textColor: "red",
            level: "ERROR",
          }
        );
      }
    } else clog(chalk.red.underline.bold("Server") + ":\t\tdisabled");

    // check entity saving
    try {
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
    } catch (e) {
      log(
        e instanceof Error
          ? "An error occured with autosave: " + e.message
          : "An error occured with autosave",
        {
          textColor: "red",
          level: "ERROR",
        }
      );
    }
  })
  .catch((e) => {
    log(
      e instanceof Error
        ? "An error occured with modloader" + e.message
        : "An error occured with modloader",
      {
        textColor: "red",
        level: "ERROR",
      }
    );
  });
