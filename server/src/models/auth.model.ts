import { UserWithRole } from "./express.extension";

export interface ITokenPayload {
  id: string;
}

export enum Permission {
  VIEW_SITE = 1 << 0, // 1
  EDIT_CONTENT = 1 << 1, // 2
  ACCESS_ADMIN_PANEL = 1 << 2, // 4
  VIEW_ANALYTICS = 1 << 3, // 8
  MANAGE_GLOBAL_SETTINGS = 1 << 4, // 16
  MANAGE_USERS = 1 << 5, // 32
}
