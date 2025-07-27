import type { HseDocInterface } from "./HseDocTypes";
import type { InspectionTypeInterface } from "./InspectionType";

export interface HseInterface {
    uuid: string;
    title: string;
    hse_doc: HseDocInterface;
    hse_doc_uuid: string;
    inspection_type_uuid: string;
    inspection_type: InspectionTypeInterface;
    created_at: string;
    updated_at: string;
}

export interface HseCreateInterface {
    title: string;
    hse_doc_uuid: string;
    inspection_type_uuid: string;
}

export interface HseCreateModelInterface {
    title: string;
    hse_doc_uuid: string;
    location_uuid: string;
    unit_uuid: string;
    machine_uuid: string;
    inspection_type_uuid: string;
}
