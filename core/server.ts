import { Player } from "@etabli/classes/entities/Player";
import { log } from "@etabli/utils/console/log";
import chalk from "chalk";

import { server as serverConfig } from "@etabli/config";
import { Server } from "socket.io";
import { portInUse } from "@etabli/utils/server/portInUse";
import { World } from "@etabli/classes/world/World";

const clog = console.log;

module.exports = async function server(
  players: Player[],
  world: World
): Promise<Server> {
  if (serverConfig.enabled) {
    clog(chalk.green.underline.bold("Server") + ":\t\tenabled");

    try {
      const httpServer = require("http").createServer();
      const io = new Server(httpServer, {
        cors: {
          origin: "*",
        },
      });

      // check if there is already a server running
      if (await portInUse(serverConfig.port)) {
        throw new Error("Port already in use");
      }

      io.listen(serverConfig.port);
      clog("\tListening on port: " + serverConfig.port);
      io.on("connection", (client) => {
        client.emit("world_loading", world.toCompressed());

        client.on("name_entered", (data) => {
          if (serverConfig.console.log.connections) {
            log(`${data.name} joined the game`, {
              textColor: "yellowBright",
              date: true,
            });
          }
          const player = new Player(data.name);
          player.socketId = client.id;
          players.push(player);

          io.sockets.emit("player_join", data.name);

          if (serverConfig.webapp.enabled)
            io.sockets.emit("webapp:players", players);
        });

        client.on("world_update", (data) => {
          world = World.fromCompressed(data);
          io.sockets.emit("world_updated", world.toCompressed());
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
            if (serverConfig.console.log.connections) {
              log(`${player.name} left the game`, {
                textColor: "yellowBright",
                date: true,
              });
            }
            players = players.filter((player) => player.socketId !== client.id);

            io.sockets.emit(
              "player_left",
              players.map((p) => p.name)
            );
            if (serverConfig.webapp.enabled)
              io.sockets.emit("webapp:players", players);
          } else
            log(`Someone left the game`, {
              textColor: "cyan",
              date: true,
            });
        });

        if (serverConfig.webapp.enabled) {
          client.on("webapp:get_players", () => {
            client.emit("webapp:players", players);
          });
        }
      });

      return Promise.resolve(io);
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

      return Promise.reject(e);
    }
  } else clog(chalk.red.underline.bold("Server") + ":\t\tdisabled");

  return Promise.resolve(null);
};
