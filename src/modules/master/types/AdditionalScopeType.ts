import type { InspectionTypeInterface } from "./InspectionType";

export interface AdditionalScopeInterface {
  uuid: string;
  name: string;
  category: string;
  link: string;
  details: AdditionalScopeDetailInterface[];
  inspection_type_uuid: string;
  inspection_type: InspectionTypeInterface;
  additional_scope_uuid: string | null;
  created_at: string;
  updated_at: string;
  day: number;
  animation: string;
}

export interface AdditionalScopeDetailInterface {
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

export interface AdditionalScopeCreateInterface {
  name: string;
  inspection_type_uuid: string;
  additional_scope_uuid: string | null;
  link: string;
  category: string;
  day: number;
  animation: string | null;
  details: { name: string }[];
}

export interface AdditionalScopeUpdateInterface {
  name: string;
  inspection_type_uuid: string;
  additional_scope_uuid: string | null;
  link: string;
  category: string;
  day: number;
  animation: string | null;
  details: { name: string; uuid: string | null }[];
}

export interface AdditionalScopeCreateModelInterface {
  name: string;
  location_uuid: string;
  unit_uuid: string;
  machine_uuid: string;
  inspection_type_uuid: string;
  link: string;
  category: string;
  day: string;
  details: { name: string }[];
  animation: string;
}
