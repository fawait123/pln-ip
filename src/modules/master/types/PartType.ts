export interface PartInterface {
  uuid: string;
  name: string;
  qty: number;
  no_drawing: string;
  note: string | null;
  global_unit_uuid: string;
  inspection_type_uuid: string;
  additional_scope_uuid: string | null;
  created_at: string;
  updated_at: string;
}

export interface PartCreateInterface {
  name: string;
  qty: number;
  no_drawing: string;
  note: string;
}
