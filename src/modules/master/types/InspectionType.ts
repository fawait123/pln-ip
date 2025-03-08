import type { MachineInterface } from "./MachineType";

export interface InspectionTypeInterface {
  uuid: string;
  name: string;
  machine_uuid: string;
  machine: MachineInterface;
  created_at: string;
  updated_at: string;
  day: number;
}

export interface InspectionTypeCreateInterface {
  name: string;
  machine_uuid: string;
}
