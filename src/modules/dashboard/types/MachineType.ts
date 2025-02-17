import type { TUnit } from "./UnitType";

export type TMachine = {
  name: string;
  unit_uuid: string;
  uuid: string;
  created_at: string;
  updated_at: string;
  unit: TUnit;
};
