import type { RoleInterface } from "./RoleType";

export interface UserInterface {
  name: string;
  created_at: string;
  updated_at: string;
  id: number;
  email: string;
  email_verified_at: string | null;
  roles: RoleInterface[];
}

export interface UserCreateInterface {
  name: string;
  email: string;
  roles: string[];
  password?: string;
}

export interface UserCreateModelInterface {
  name: string;
  email: string;
  roles: string;
  password: string;
}
