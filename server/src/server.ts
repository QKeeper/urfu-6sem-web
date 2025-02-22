import { createServer as createHttpServer, Server } from "http";
import { Server as SocketIOServer } from "socket.io";
import { Express } from "express-serve-static-core";
import * as cfg from "./config";

interface ServerOptions {
  port?: number;
  socket_port?: number;
  origin?: string;
}

export function createServer(app: Express, options?: ServerOptions) {
  const server = createHttpServer(app);

  const port = options?.port || cfg.PORT;
  const ws = configureSockets(server, options);

  return {
    instance: server,
    listen: () => {
      server.listen(port, () => console.log("Server is running on port", port));
      ws.listen();
    },
  };
}

function configureSockets(server: Server, options?: ServerOptions) {
  const origin = options?.origin || cfg.ORIGIN;
  const socket_port = options?.socket_port || cfg.SOCKET_PORT;
  const io = new SocketIOServer(server, { cors: { origin } });
  return {
    instance: io,
    listen: () => io.listen(socket_port, { cookie: true, cors: { credentials: true, origin } }),
  };
}
