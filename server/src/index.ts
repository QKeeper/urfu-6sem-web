import "dotenv/config";
import { AppOptions, createApp } from "./app";
import authRouter from "./routes/auth.routes";
import usersRouter from "./routes/users.routes";
import { createServer } from "./server";
import { PrismaClient } from "@prisma/client";

const appOptions: AppOptions = {
  routes: [
    { path: "/api/auth", router: authRouter },
    { path: "/api/users", router: usersRouter },
  ],
};

const app = createApp(appOptions);
const server = createServer(app);

server.listen();

(async () => {
  try {
    console.log({ database_url: process.env.DATABASE_URL });
    const prisma = new PrismaClient();
    const result = await prisma.user.findMany();
    if (result) console.log("PRISMA IS READY");
  } catch (error) {
    console.log(
      "ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR "
    );
  }
})();
