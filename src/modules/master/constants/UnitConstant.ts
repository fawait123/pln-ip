import type { TableColumnType } from "@/components/tables/Table.vue";

export const ColumnsUnit: TableColumnType[] = [
  {
    key: "name",
    label: "Unit",
    align: "left",
    sort: false,
  },
  {
    key: "location",
    label: "Location",
    align: "center",
    sort: false,
  },
];
