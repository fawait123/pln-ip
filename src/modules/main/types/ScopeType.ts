import type { ValueUploadType } from "@/components/fields/Upload.vue";

interface WithFileInterface {
  result: { id: number; note: string }[];
  file: ValueUploadType[];
}

export interface ScopeInterface {
  id: string;
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
  children: {
    id: string;
    name: string;
  }[];
}

export interface ResponseScopeInterface {
  uuid: string;
  name: string;
  link: string | null;
  global_unit_uuid: string;
  project_uuid: string;
  created_at: string;
  updated_at: string;
  details: {
    link: string | null;
    name: string;
    scope_standart_uuid: string;
    uuid: string;
    created_at: string;
    updated_at: string;
  }[];
}
