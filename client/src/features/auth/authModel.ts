export interface IAuthState {
  isPending: boolean;
  user: IUser | null;
}

export interface IUser {
  id: string;
  username: string;
  password: string;
  displayName: string;
  role: number;
}
