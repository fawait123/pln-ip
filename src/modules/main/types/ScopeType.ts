import type { ValueUploadType } from "@/components/fields/Upload.vue";
import type { ResponseDocumentInterface } from "@/types/GlobalType";

interface WithFileInterface {
  note: string;
  file: ValueUploadType[];
}

export type TColor = "red" | "green" | "yellow" | "";

export interface ScopeInterface {
  id: string;
  asset: string;
  asset_welness: {
    color: TColor;
    note: string;
  } | null;
  oh_recom: WithFileInterface | null;
  wo_priority: WithFileInterface | null;
  history: WithFileInterface | null;
  rla: WithFileInterface | null;
  ncr: WithFileInterface | null;
  children: {
    id: string;
    name: string;
  }[];
}

interface Category {
  uuid: string;
  note: string;
  category: string;
  color: TColor;
  scope_standart_uuid: string;
  created_at: string;
  updated_at: string;
  document: ResponseDocumentInterface | null;
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
  asset_welnes: Category;
  oh_recom: Category;
  wo_priority: Category;
  history: Category;
  rla: Category;
  ncr: Category;
}

export interface CreateScopeInterface {
  scope_standart_uuid: string;
  note: string;
  category: string;
  color: string | null;
}
