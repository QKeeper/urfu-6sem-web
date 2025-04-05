import express, { Express, json, RequestHandler, Router } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import cfg from "./config";

export interface AppOptions {
  origin?: string;
  secret?: string;
  client_path?: string;
  middleware?: RequestHandler[];
  routes: { path: string; router: Router }[];
}

function configureMiddleware(app: Express, options?: AppOptions) {
  const origin = options?.origin || cfg.ORIGIN;
  const secret = options?.secret || cfg.SECRET;

  app.use(json());
  app.use(cookieParser(secret));
  app.use(cors({ credentials: true, origin }));

  options?.middleware?.forEach((mw) => app.use(mw));
}

function configureRoutes(app: Express, routes: { path: string; router: Router }[]) {
  routes.forEach((route) => app.use(route.path, route.router));
}

function configureStatic(app: Express, client_path: string) {
  app.use(express.static(client_path));
  app.get("*", (_, res) => res.sendFile(path.join(client_path, "index.html")));
}

export function createApp(options?: AppOptions): Express {
  const app = express();

  configureMiddleware(app, options);
  configureRoutes(app, options?.routes || []);
  configureStatic(app, options?.client_path || cfg.CLIENT_PATH);

  return app;
}
