export interface ManpowerInterface {
  uuid: string;
  name: string;
  qty: number;
  type: string;
  note: string | null;
  inspection_type_uuid: string;
  additional_scope_uuid: string | null;
  created_at: string;
  updated_at: string;
}

export interface ManpowerCreateInterface {
  name: string;
  qty: number;
  type: string;
  note: string;
}
