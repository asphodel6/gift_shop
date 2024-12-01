export interface ILogin{
  email: string;
  password: string;
}

export interface IRegistration {
  lastname: string;
  firstname: string;
  email: string;
  password: string;
  birthday: string;
  confirmPassword: string
}

export interface ILoginResponse {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  not_before_policy: number;
  session_state: string;
  scope: string;
}
