import type { ActivityInterface } from "./AcitivityType";
import type { GlobalUnitInterface } from "./GlobalUnitType";

export interface ConsMatInterface {
  uuid: string;
  name: string;
  merk: string;
  qty: number;
  global_unit_uuid: string;
  global_unit: GlobalUnitInterface;
  activity_uuid: string;
  activity: ActivityInterface;
  created_at: string;
  updated_at: string;
}

export interface ConsMatCreateInterface {
  name: string;
  qty: number;
  merk: string;
  global_unit_uuid: string;
  activity_uuid: string;
}

export interface ConsMatCreateModelInterface {
  name: string;
  qty: string;
  merk: string;
  activity_uuid: string;
  global_unit_uuid: string;
}
