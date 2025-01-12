import type { ValueUploadType } from "@/components/fields/Upload.vue";

export interface HseInterface {
  id: number;
  name: string;
  document: {
    file: ValueUploadType[];
  } | null;
  note: string | null;
}
