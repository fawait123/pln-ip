import type { ValueUploadType } from "@/components/fields/Upload.vue";

interface WithFileInterface {
  result: { id: number; note: string }[];
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
    color: string;
    result: { id: number; note: string }[];
  } | null;
  oh_recom: WithFileInterface | null;
  wo_priority: WithFileInterface | null;
  history: WithFileInterface | null;
  rla: WithFileInterface | null;
  etc: WithFileInterface | null;
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
}
