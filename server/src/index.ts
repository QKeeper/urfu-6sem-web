import { AppOptions, createApp } from "./app";
import authRouter from "./routes/auth.routes";
import usersRouter from "./routes/users.routes";
import { createServer } from "./server";

const appOptions: AppOptions = {
  routes: [
    { path: "/api/auth", router: authRouter },
    { path: "/api/users", router: usersRouter },
  ],
};

const app = createApp(appOptions);
const server = createServer(app);

server.listen();
