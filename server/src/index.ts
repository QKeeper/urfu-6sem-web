import "dotenv/config";
import { AppOptions, createApp } from "./app";
import { createServer } from "./server";
import authRouter from "./routes/auth.routes";
import usersRouter from "./routes/users.routes";

const appOptions: AppOptions = {
  routes: [
    { path: "/api/auth", router: authRouter },
    { path: "/api/users", router: usersRouter },
  ],
};

const app = createApp(appOptions);
const server = createServer(app);

server.listen();
