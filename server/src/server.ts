import { createServer as createHttpServer, Server } from "http";
import { Server as SocketIOServer } from "socket.io";
import { Express } from "express-serve-static-core";
import cfg from "./config";
import { initializeDatabase } from "./prisma";

export function createServer(app: Express) {
  const server = createHttpServer(app);
  const ws = configureSockets(server);

  return {
    instance: server,
    listen: async () => {
      await initializeDatabase();
      server.listen(cfg.PORT, () => console.log("Server is running on port", cfg.PORT));
      ws.listen();
    },
  };
}

function configureSockets(server: Server) {
  const io = new SocketIOServer(server, { cors: { origin: cfg.ORIGIN } });
  return {
    instance: io,
    listen: () =>
      io.listen(cfg.SOCKET_PORT, { cookie: true, cors: { credentials: true, origin: cfg.ORIGIN } }),
  };
}
