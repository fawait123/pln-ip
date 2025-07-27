import type { TableColumnType } from "@/components/tables/Table.vue";

export const ColumnsInspectionType: TableColumnType[] = [
  {
    key: "name",
    label: "Inspection Type",
    align: "left",
    sort: false,
  },
  {
    key: "machine",
    label: "Machine",
    align: "center",
    sort: false,
  },
  {
    key: "unit",
    label: "Unit",
    align: "center",
    sort: false,
  },
  {
    key: "location",
    label: "Lokasi",
    align: "center",
    sort: false,
  },
];
