import net from "net";
export const portInUse = (port: number) => {
  return new Promise((resolve) => {
    const server = net.createServer(function (socket) {
      socket.pipe(socket);
    });

    server.on("error", function (e) {
      resolve(true);
    });
    server.on("listening", function (e) {
      server.close();
      resolve(false);
    });

    server.listen(port);
  });
};
