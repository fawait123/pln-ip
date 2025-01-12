import type { ValueUploadType } from "@/components/fields/Upload.vue";

export interface WorkInstructionInterface {
  id: number;
  asset: string;
  document: {
    file: ValueUploadType[];
  } | null;
  note: string | null;
}
