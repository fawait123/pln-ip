import type { TableColumnType } from "@/components/tables/Table.vue";

export const ColumnsMachine: TableColumnType[] = [
  {
    key: "name",
    label: "Machine",
    align: "left",
    sort: false,
  },
  {
    key: "unit",
    label: "Unit",
    align: "center",
    sort: false,
  },
];
