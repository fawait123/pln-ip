import type { ValueUploadType } from "@/components/fields/Upload.vue";

export interface ManPowerInterface {
  id: number;
  manpower: string;
  document: {
    file: ValueUploadType[];
  } | null;
  quantity: string | null;
  volume: string | null;
  note: string | null;
}
