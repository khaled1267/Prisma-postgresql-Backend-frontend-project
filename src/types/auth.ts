import { UserRole } from "./user";

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface RegisterSuccessData {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginSuccessData {
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  };
  token: string;
}
