import { Player } from "@etabli/classes/entities/Player";
import { log } from "@etabli/utils/console/log";
import chalk from "chalk";

import { server as serverConfig } from "@etabli/config";
import { Server } from "socket.io";
import { portInUse } from "@etabli/utils/server/portInUse";
import { World } from "@etabli/classes/world/World";
import { savePlayer } from "./saver";

const clog = console.log;

async function server(players: Player[], world: World): Promise<Server> {
  if (serverConfig.enabled) {
    clog(chalk.green.underline.bold("Server") + ":\t\tenabled");

    try {
      const httpServer = (await import("http")).createServer();
      const io = new Server(httpServer, {
        cors: {
          origin: "*",
        },
        maxHttpBufferSize: 1e8,
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
              type: "connections",
            });
          }
          const player = new Player(data.name);
          player.socketId = client.id;
          players.push(player);

          client.emit("player_joined", player.toCompressed());

          io.sockets.emit(
            "player_join",
            players.map((p) => p.toCompressed())
          );

          io.sockets.emit("chat_message", {
            message: `${data.name} joined the game`,
            type: "system",
          });

          if (serverConfig.webapp.enabled)
            io.sockets.emit("webapp:players", players);
        });

        // client.on("world_update", (data) => {
        //   world = World.fromCompressed(data);
        //   io.sockets.emit("world_updated", world.toCompressed());
        // });

        client.on("chat_message", (message) => {
          const player = players.find(
            (p) => p.socketId === client.id
          );

          // commands
          if (message.startsWith("/")) {
            const args = message.split(" ");
            const command = args.shift()?.slice(1);
            if (command === "help") {
              client.emit("chat_message", {
                message: "Available commands: /help, /players",
                type: "system",
              });
            } else if (command === "players") {
              client.emit("chat_message", {
                message: `Players online: ${players.length}`,
                type: "system",
              });
            } else if (command === "give") {
              const playerName = args[0]
              const item = args[1];
              const amount = parseInt(args[2]);
              const player = players.find((p) => p.name === playerName);
              if (player) {
                // player.inventory.add(item, amount); FIXME
                const index = players.findIndex((p) => p.name === playerName);
                players[index] = player;

                client.emit(
                  "player_inventory_update",
                  player.toCompressed()
                );

                io.sockets.emit("chat_message", {
                  message: `Give ${playerName} ${amount} ${item}`,
                  type: "system",
                });
              } else {
                client.emit("chat_message", {
                  message: `Player not found`,
                  type: "system",
                });
              }
            } else {
              client.emit("chat_message", {
                message: `Unknown command: ${command}`,
                type: "system",
              });
            }
          }

          log(`${player.name}: ${message}`, { date: true, type: "chat" });
          io.sockets.emit("chat_message", {
            playerName: player.name,
            message,
            type: "chat",
          });
        });

        client.on("disconnect", () => {
          const player = players.find((p) => p.socketId === client.id);
          if (player) {
            if (serverConfig.console.log.connections) {
              log(`${player.name} left the game`, {
                textColor: "yellowBright",
                date: true,
                type: "connections",
              });
            }
            players = players.filter((player) => player.socketId !== client.id);

            io.sockets.emit(
              "player_left",
              players.map((p) => p.toCompressed())
            );
            if (serverConfig.webapp.enabled)
              io.sockets.emit("webapp:players", players);
          } else {
            if (serverConfig.console.log.anonymousConnections) {
              log(`Someone left the game (${client.handshake.address})`, {
                textColor: "cyan",
                date: true,
                type: "connections",
              });
            }
          }
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
          level: "FAIL",
          type: "crash",
        }
      );

      return Promise.reject(e);
    }
  } else clog(chalk.red.underline.bold("Server") + ":\t\tdisabled");

  return Promise.resolve(null);
}

export default server;
