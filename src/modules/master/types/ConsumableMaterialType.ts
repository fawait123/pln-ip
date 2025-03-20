import type { InspectionTypeInterface } from "./InspectionType";

export interface ConsMatInterface {
  uuid: string;
  name: string;
  merk: string;
  qty: number;
  global_unit_uuid: string;
  global_unit: {
    created_at: string;
    updated_at: string;
    name: string;
    uuid: string;
  };
  inspection_type_uuid: string;
  inspection_type: InspectionTypeInterface;
  additional_scope_uuid: string | null;
  created_at: string;
  updated_at: string;
}

export interface ConsMatCreateInterface {
  name: string;
  qty: number;
  merk: string;
  global_unit_uuid: string;
  inspection_type_uuid: string;
  additional_scope_uuid: string | null;
}

export interface ConsMatCreateModelInterface {
  name: string;
  qty: string;
  merk: string;
  global_unit_uuid: string;
  location_uuid: string;
  unit_uuid: string;
  machine_uuid: string;
  inspection_type_uuid: string;
}
