import type { ValueUploadType } from "@/components/fields/Upload.vue";

export interface ManPowerInterface {
  id: string;
  manpower: string;
  document: {
    file: ValueUploadType[];
  } | null;
  quantity: string | null;
  volume: string | null;
  note: string | null;
}

export interface ResponseManPowerInterface {
  uuid: string;
  name: string;
  qty: number;
  note: string | null;
  project_uuid: string;
  type: string;
  created_at: string;
  updated_at: string;
}
