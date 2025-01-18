import type { TableColumnType } from "@/components/tables/Table.vue";

export const ColumnsUserHistory: TableColumnType[] = [
  {
    key: "time",
    label: "Time",
    align: "left",
    sort: false,
  },
  {
    key: "action",
    label: "Action",
    align: "left",
    sort: false,
  },
  {
    key: "user",
    label: "User",
    align: "left",
    sort: false,
  },
];
