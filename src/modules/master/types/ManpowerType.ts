import type { ActivityInterface } from "./AcitivityType";
import type { InspectionTypeInterface } from "./InspectionType";

export interface ManpowerInterface {
  uuid: string;
  name: string;
  qty: number;
  type: string;
  note: string | null;
  activity_uuid: string;
  activity: ActivityInterface;
  created_at: string;
  updated_at: string;
}

export interface ManpowerCreateInterface {
  name: string;
  qty: number;
  type: string;
  note: string;
  activity_uuid: string;
}

export interface ManpowerCreateModelInterface {
  name: string;
  qty: string;
  type: string;
  note: string;
  activity_uuid: string;
}
