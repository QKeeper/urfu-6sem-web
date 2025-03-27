export interface ILoginFields {
  username: string;
  password: string;
}

export interface IRegisterFields extends ILoginFields {
  displayName: string;
  confirmPassword: string;
}

export interface ILoginResponse {
  message: string;
}
