import type { ActivityInterface } from "./AcitivityType";
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
  activity_uuid: string;
  activity: ActivityInterface;
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
  activity_uuid: string;
  location: string;
  size: string;
}

export interface PartCreateModelInterface {
  name: string;
  qty: string;
  no_drawing: string;
  note: string;
  global_unit_uuid: string;
  activity_uuid: string;
  location: string;
  size: string;
}
