import "dotenv/config";
import { AppOptions, createApp } from "./app";
import authRouter from "./routes/auth.routes";
import usersRouter from "./routes/users.routes";
import { createServer } from "./server";
import { PrismaClient } from "@prisma/client";
import { initializeDatabase } from "./prisma";

const appOptions: AppOptions = {
  routes: [
    { path: "/api/auth", router: authRouter },
    { path: "/api/users", router: usersRouter },
  ],
};

const app = createApp(appOptions);
const server = createServer(app);

initializeDatabase().then(server.listen);
