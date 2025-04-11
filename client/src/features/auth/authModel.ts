export interface IAuthState {
  isPending: boolean;
  user: IUser | null;
}

export interface IUser {
  id: string;
  username: string;
  password: string;
  displayName: string;
  roleId: number;
  role: IUserRole;
}

export interface IUserRole {
  id: number;
  name: string;
  permission: number;
}

export enum Permission {
  VIEW_SITE = 1 << 0,
  EDIT_CONTENT = 1 << 1,
  ACCESS_ADMIN_PANEL = 1 << 2,
  VIEW_ANALYTICS = 1 << 3,
  MANAGE_GLOBAL_SETTINGS = 1 << 4,
  MANAGE_USERS = 1 << 5,
}
