import "colors";
import path from "path";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import { ORIGIN, PORT, REACT_APP_PATH, SECRET, SOCKET_PORT } from "./config";
import authRouter from "./routes/auth.routes";

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(cookieParser(SECRET));
app.use(cors({ credentials: true, origin: ORIGIN }));

app.get("/api", (_, res) => void res.send("Base API url"));
app.use("/api/auth", authRouter);

app.use(express.static(REACT_APP_PATH));
app.get("*", (_, res) => res.sendFile(path.join(REACT_APP_PATH, "index.html")));

server.listen(PORT, () => {
  console.log("Server is running on port".green, PORT);
});

export const io = new Server(server, { cors: { origin: ORIGIN } });
// Socket logic
io.listen(SOCKET_PORT, { cookie: true, cors: { credentials: true, origin: ORIGIN } });
