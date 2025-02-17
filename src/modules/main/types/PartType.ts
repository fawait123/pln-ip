import type { ValueUploadType } from "@/components/fields/Upload.vue";

export interface PartInterface {
  id: string;
  part: string;
  document: {
    file: ValueUploadType[];
  } | null;
  quantity: string | null;
  volume: string | null;
  number_drawing: string | null;
}

export interface ResponsePartInterface {
  uuid: string;
  name: string;
  no_drawing: string;
  note: string | null;
  project_uuid: string;
  qty: number;
  global_unit_uuid: string;
  global_unit: {
    name: string;
    uuid: string;
    created_at: string;
    updated_at: string;
  };
  created_at: string;
  updated_at: string;
}
