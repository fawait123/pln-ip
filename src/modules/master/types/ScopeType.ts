import type { InspectionTypeInterface } from "./InspectionType";

export interface ScopeInterface {
  uuid: string;
  name: string;
  category: string;
  link: string;
  details: ScopeDetailInterface[];
  inspection_type_uuid: string;
  inspection_type: InspectionTypeInterface;
  additional_scope_uuid: string | null;
  created_at: string;
  updated_at: string;
}

export interface ScopeDetailInterface {
  uuid: string;
  name: string;
  link: string | null;
  scope_standart_uuid: string;
  created_at: string;
  updated_at: string;
  merk: string | null;
  qty: string | null;
  global_unit_uuid: string | null;
  inspection_type_uuid: string | null;
  additional_scope_uuid: string;
}

export interface ScopeCreateInterface {
  name: string;
  inspection_type_uuid: string;
  additional_scope_uuid: string | null;
  link: string;
  category: string;
  details: { name: string }[];
}

export interface ScopeUpdateInterface {
  name: string;
  inspection_type_uuid: string;
  additional_scope_uuid: string | null;
  link: string;
  category: string;
  details: { name: string; uuid: string | null }[];
}

export interface ScopeCreateModelInterface {
  name: string;
  location_uuid: string;
  unit_uuid: string;
  machine_uuid: string;
  inspection_type_uuid: string;
  link: string;
  category: string;
}
