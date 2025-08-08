import type { TableColumnType } from "@/components/tables/Table.vue";

export const ColumnsPart: TableColumnType[] = [
  {
    key: "name",
    label: "Part",
    align: "left",
    sort: false,
  },
  {
    key: "merk",
    label: "Merk",
    align: "center",
    sort: false,
  },
  {
    key: "no_drawing",
    label: "No Drawing",
    align: "center",
    sort: false,
  },
  {
    key: "price",
    label: "Harga",
    align: "center",
    sort: false,
  },
  {
    key: "global_unit",
    label: "Unit",
    align: "center",
    sort: false,
  },
];
