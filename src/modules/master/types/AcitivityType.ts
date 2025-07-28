import type { EquipmentInterface } from "./EquipmentType";

export interface ActivityInterface {
  uuid: string;
  name: string;
  equipment_uuid: string;
  equipment: EquipmentInterface;
  duration: number;
  created_at: string;
  updated_at: string;
  link_ik1: null;
  link_ik2: null;
}

export interface ActivityCreateInterface {
  name: string;
  equipment_uuid: string;
  duration: string;
}
