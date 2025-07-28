import type { TableColumnType } from "@/components/tables/Table.vue";

export const ColumnsActivity: TableColumnType[] = [
  {
    key: "name",
    label: "Activity",
    align: "left",
    sort: false,
  },
  {
    key: "duration",
    label: "Duration",
    align: "left",
    sort: false,
  },
  {
    key: "equipment",
    label: "Equipment",
    align: "left",
    sort: false,
  },
];
