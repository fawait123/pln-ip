import type { TableColumnType } from "@/components/tables/Table.vue";

export const ColumnsPart: TableColumnType[] = [
  {
    key: "name",
    label: "Part",
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
    key: "activity",
    label: "Aktifitas",
    align: "center",
    sort: false,
  },
];
