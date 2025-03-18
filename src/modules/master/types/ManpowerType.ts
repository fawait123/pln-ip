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
  inspection_type_uuid: string;
  additional_scope_uuid: string | null;
}

export interface ManpowerCreateModelInterface {
  name: string;
  qty: string;
  type: string;
  note: string;
  location_uuid: string;
  unit_uuid: string;
  machine_uuid: string;
  inspection_type_uuid: string;
}
