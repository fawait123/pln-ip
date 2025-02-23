import type { ValueUploadType } from "@/components/fields/Upload.vue";

export interface ConsumableMaterialInterface {
  id: string;
  material: string;
  merk: {
    file: ValueUploadType[];
  } | null;
  quantity: string | null;
  unit: string | null;
}

export interface ResponseConsMatInterface {
  uuid: string;
  name: string;
  merk: string;
  qty: number;
  global_unit_uuid: string;
  project_uuid: string;
  additional_scope_uuid: string | null;
  created_at: string;
  updated_at: string;
}
