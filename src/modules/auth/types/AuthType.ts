export interface UserType {
  name: string;
  username: string;
  email: string;
  id: string;
}

export interface LoginPayloadInterface {
  email: string;
  password: string;
}

export interface LoginInterface {
  created_at: string;
  email: string;
  email_verified_at: string | null;
  id: number;
  name: string;
  token: string;
  updated_at: string;
  permissions: string[];
  roles: {
    created_at: string;
    updated_at: string;
    guard_name: string;
    id: number;
    name: string;
    uuid: string;
    pivot: {
      model_id: number;
      model_type: string;
      role_id: number;
    };
  }[];
}
