import type { InspectionTypeInterface } from "@/modules/master/types/InspectionType";

export type StatusProjectType = "approve" | "pending";
export interface ProjectInterface {
    name: string;
    uuid: string;
    inspection_type_uuid: string;
    inspection_type: InspectionTypeInterface;
    status: StatusProjectType;
    created_at: string;
    updated_at: string;
}