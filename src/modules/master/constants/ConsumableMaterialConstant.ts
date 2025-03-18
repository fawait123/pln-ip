import type { TableColumnType } from "@/components/tables/Table.vue";

export const ColumnsConsMat: TableColumnType[] = [
  {
    key: "name",
    label: "Name",
    align: "left",
    sort: false,
  },
  {
    key: "qty",
    label: "Quantity",
    align: "center",
    sort: false,
  },
  {
    key: "merk",
    label: "Merk",
    align: "center",
    sort: false,
  },
];
