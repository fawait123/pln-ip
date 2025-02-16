import type { TLocation } from "./DashboardType";

export type TUnit = {
  uuid: string;
  location_uuid: string;
  name: string;
  created_at: string;
  updated_at: string;
  location: TLocation;
};
