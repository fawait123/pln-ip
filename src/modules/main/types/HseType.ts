import type { ValueUploadType } from "@/components/fields/Upload.vue";
import type { ResponseDocumentInterface } from "@/types/GlobalType";

export interface HseInterface {
  id: string;
  name: string;
  document: {
    file: ValueUploadType[];
  } | null;
  note: string | null;
  document_original: ResponseDocumentInterface | null;
}

export interface ResponseHseInterface {
  uuid: string;
  project_uuid: string;
  title: string;
  created_at: string;
  updated_at: string;
  document: ResponseDocumentInterface | null;
}
