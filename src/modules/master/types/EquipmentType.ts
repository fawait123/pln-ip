import type { ScopeInterface } from "./ScopeType";

export interface EquipmentInterface {
  uuid: string;
  name: string;
  scope_standart_uuid: string;
  scope_standart: ScopeInterface;
  created_at: string;
  updated_at: string;
  link_ik1: null;
  link_ik2: null;
}

export interface EquipmentCreateInterface {
  name: string;
  scope_standart_uuid: string;
}
