import type { TableColumnType } from "@/components/tables/Table.vue";

export const ColumnsInspectionType: TableColumnType[] = [
  {
    key: "name",
    label: "Inspection Type",
    align: "left",
    sort: false,
  },
  {
    key: "machine_uuid",
    label: "Machine",
    align: "center",
    sort: false,
    width: "150",
  },
];
