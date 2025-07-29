import type { InspectionTypeInterface } from "./InspectionType";

export interface SequenceInterface {
    uuid: string;
    name: string;
    link?: string;
    inspection_type_uuid: string | null;
    additional_scope_uuid?: string | null;
    inspection_type: InspectionTypeInterface;
    created_at: string;
    updated_at: string;
}

export interface SequenceCreateInterface {
    name: string;
    link?: string;
    inspection_type_uuid?: string | null;
    additional_scope_uuid?: string | null;
}

export interface SequenceCreateModelInterface {
    name: string;
    link?: string;
    location_uuid: string;
    unit_uuid: string;
    machine_uuid: string;
    inspection_type_uuid?: string | null;
    additional_scope_uuid?: string | null;
}
