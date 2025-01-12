import type { ValueUploadType } from "@/components/fields/Upload.vue";

export interface PartInterface {
  id: number;
  part: string;
  document: {
    file: ValueUploadType[];
  } | null;
  quantity: string | null;
  volume: string | null;
  note: string | null;
}
