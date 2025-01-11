import type { ValueUploadType } from "@/components/fields/Upload.vue";

interface WithFileInterface {
  result: { id: number; note: string }[];
  file: ValueUploadType[];
}

export interface ScopeInterface {
  id: number;
  asset: string;
  asset_welness: {
    color: string;
    result: { id: number; note: string }[];
  } | null;
  oh_recom: WithFileInterface | null;
  wo_priority: WithFileInterface | null;
  history: WithFileInterface | null;
  rla: WithFileInterface | null;
  etc: WithFileInterface | null;
}
