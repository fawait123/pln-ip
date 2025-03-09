export interface ToolsInterface {
  uuid: string;
  name: string;
  qty: number;
  section: string;
  global_unit_uuid: string;
  inspection_type_uuid: string;
  created_at: string;
  updated_at: string;
}

export interface ToolsCreateInterface {
  name: string;
  qty: number;
  section: string;
}
