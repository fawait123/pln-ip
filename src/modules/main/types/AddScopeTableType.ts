import type { ValueUploadType } from "@/components/fields/Upload.vue";
import type { TColor } from "./ScopeType";
import type { ResponseDocumentInterface } from "@/types/GlobalType";

interface WithFileInterface {
  note: string;
  file: ValueUploadType[];
}

// export interface AddScopeTableInterface {
//   id: number;
//   asset: string;
//   asset_welness: {
//     color: string;
//     result: { id: number; note: string }[];
//   } | null;
//   oh_recom: WithFileInterface | null;
//   wo_priority: WithFileInterface | null;
//   history: WithFileInterface | null;
//   rla: WithFileInterface | null;
//   etc: WithFileInterface | null;
//   children: {
//     id: number;
//     name: string;
//     material:
//       | {
//           id: number;
//           material: string;
//           quantity: string;
//           unit: string;
//         }[]
//       | null;
//     duration: string;
//     manpower:
//       | {
//           id: number;
//           manpower: string;
//           quantity: string;
//         }[]
//       | null;
//     ik: ValueUploadType[] | null;
//     qc_plan: ValueUploadType[] | null;
//     part:
//       | {
//           id: number;
//           part: string;
//           quantity: string;
//           unit: string;
//         }[]
//       | null;
//   }[];
// }

export interface AddScopeInterface {
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
  squence: ResponseSequenceAnimationInterface;
  day: number;
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

export interface ResponseSequenceAnimationInterface {
  additional_scope_uuid: string;
  created_at: string;
  updated_at: string;
  uuid: string;
  name: string;
  slug: string;
}

export interface ResponseAddScopeInterface {
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
  day: number;
  sequence_animation: ResponseSequenceAnimationInterface;
}

export interface CreateAddScopeInterface {
  scope_standart_uuid: string;
  note: string;
  category: string;
  color: string | null;
}
