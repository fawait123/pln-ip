import type { ValueUploadType } from "@/components/fields/Upload.vue";

export interface ConsumableMaterialInterface {
  id: number;
  material: string;
  document: {
    file: ValueUploadType[];
  } | null;
  quantity: string | null;
  volume: string | null;
  note: string | null;
}
