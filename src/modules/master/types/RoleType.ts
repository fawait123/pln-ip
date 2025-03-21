export interface RoleInterface {
  name: string;
  id: number;
  display_name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  permissions: PermissionInterface[];
}

export interface RoleCreateInterface {
  name: string;
  display_name: string;
  permissions: string[];
}

export interface PermissionInterface {
  id: number;
  uuid: string;
  name: string;
  guard_name: string;
  display_name: string;
  created_at: string;
  updated_at: string;
}
