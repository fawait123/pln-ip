import type { ValueUploadType } from "@/components/fields/Upload.vue";

export interface UserHistoryInterface {
  id: number;
  time: string;
  action: string;
  user: string;
}
