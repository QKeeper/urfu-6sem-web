import { UserWithRole } from "./express.extension";

export interface ITokenPayload {
  id: string;
}

export enum Permission {
  VIEW_SITE = 1 << 0,
  EDIT_CONTENT = 1 << 1,
  ACCESS_ADMIN_PANEL = 1 << 2,
  VIEW_ANALYTICS = 1 << 3,
  MANAGE_GLOBAL_SETTINGS = 1 << 4,
  MANAGE_USERS = 1 << 5,
}
