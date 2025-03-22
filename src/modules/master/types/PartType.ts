import type { GlobalUnitInterface } from "./GlobalUnitType";
import type { InspectionTypeInterface } from "./InspectionType";

export interface PartInterface {
  uuid: string;
  name: string;
  qty: number;
  no_drawing: string;
  note: string | null;
  global_unit_uuid: string;
  global_unit: GlobalUnitInterface;
  inspection_type_uuid: string;
  inspection_type: InspectionTypeInterface;
  additional_scope_uuid: string | null;
  created_at: string;
  updated_at: string;
  location: string;
  size: string;
}

export interface PartCreateInterface {
  name: string;
  qty: number;
  no_drawing: string;
  note: string;
  global_unit_uuid: string;
  inspection_type_uuid: string;
  additional_scope_uuid: string | null;
  location: string;
  size: string;
}

export interface PartCreateModelInterface {
  name: string;
  qty: string;
  no_drawing: string;
  note: string;
  global_unit_uuid: string;
  location_uuid: string;
  unit_uuid: string;
  machine_uuid: string;
  inspection_type_uuid: string;
  location: string;
  size: string;
}
