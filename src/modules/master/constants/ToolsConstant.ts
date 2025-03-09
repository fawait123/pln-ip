import type { TableColumnType } from "@/components/tables/Table.vue";

export const ColumnsTools: TableColumnType[] = [
  {
    key: "name",
    label: "Tool",
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
