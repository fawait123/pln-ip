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
  children: {
    id: string;
    name: string;
  }[];
}

export interface ResponseManPowerInterface {
  uuid: string;
  name: string;
  created_at: string;
  updated_at: string;
}
