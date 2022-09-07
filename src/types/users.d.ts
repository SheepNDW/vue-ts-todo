export interface RegisterUser {
  email: string;
  nickname: string;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface UserRes {
  message: string;
  email: string;
  nickname: string;
}
