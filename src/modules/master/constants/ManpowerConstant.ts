import type { TableColumnType } from "@/components/tables/Table.vue";

export const ColumnsManpower: TableColumnType[] = [
  {
    key: "name",
    label: "Manpower",
    align: "left",
    sort: false,
  },
  {
    key: "qty",
    label: "Quantity",
    align: "center",
    sort: false,
  },
];
