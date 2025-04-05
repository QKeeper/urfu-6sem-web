import path from "path";
import "dotenv/config";

const cfg = {
  PORT: process.env.PORT || 3200,
  SOCKET_PORT: Number(process.env.SOCKET_PORT) || 4000,
  CLIENT_PATH: path.resolve(__dirname, "..", "..", "client", "dist"),

  ORIGIN: "http://localhost:5173",
  TOKEN: "token",

  ROUNDS: 10,
  SECRET: process.env.SECRET || "app-secret",
};

export default cfg;
