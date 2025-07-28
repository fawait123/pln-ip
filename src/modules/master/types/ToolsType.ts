import type { ActivityInterface } from "./AcitivityType";
import type { GlobalUnitInterface } from "./GlobalUnitType";
import type { InspectionTypeInterface } from "./InspectionType";

export interface ToolsInterface {
  uuid: string;
  name: string;
  qty: number;
  section: string;
  global_unit_uuid: string;
  global_unit: GlobalUnitInterface;
  activity_uuid: string;
  activity: ActivityInterface;
  created_at: string;
  updated_at: string;
}

export interface ToolsCreateInterface {
  name: string;
  qty: number;
  section: string;
  global_unit_uuid: string;
  activity_uuid: string;
}

export interface ToolsCreateModelInterface {
  name: string;
  qty: string;
  section: string;
  global_unit_uuid: string;
  activity_uuid: string;
}
