import type { TableColumnType } from "@/components/tables/Table.vue";

export const ColumnsUser: TableColumnType[] = [
  {
    key: "name",
    label: "Name",
    align: "left",
    sort: false,
  },
  {
    key: "email",
    label: "Email",
    align: "center",
    sort: false,
  },
  {
    key: "role",
    label: "Role",
    align: "center",
    sort: false,
  },
];
