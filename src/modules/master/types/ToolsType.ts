import type { InspectionTypeInterface } from "./InspectionType";

export interface ToolsInterface {
  uuid: string;
  name: string;
  qty: number;
  section: string;
  global_unit_uuid: string;
  inspection_type_uuid: string;
  inspection_type: InspectionTypeInterface;
  additional_scope_uuid: string | null;
  created_at: string;
  updated_at: string;
}

export interface ToolsCreateInterface {
  name: string;
  qty: number;
  section: string;
  global_unit_uuid: string;
  inspection_type_uuid: string;
  additional_scope_uuid: string | null;
}

export interface ToolsCreateModelInterface {
  name: string;
  qty: string;
  section: string;
  global_unit_uuid: string;
  location_uuid: string;
  unit_uuid: string;
  machine_uuid: string;
  inspection_type_uuid: string;
}
