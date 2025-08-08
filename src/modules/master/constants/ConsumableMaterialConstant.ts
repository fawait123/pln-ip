import type { TableColumnType } from "@/components/tables/Table.vue";

export const ColumnsConsMat: TableColumnType[] = [
  {
    key: "name",
    label: "Name",
    align: "left",
    sort: false,
  },
  {
    key: "price",
    label: "Harga",
    align: "center",
    sort: false,
  },
  {
    key: "merk",
    label: "Merk",
    align: "center",
    sort: false,
  },
  {
    key: "global_unit",
    label: "Satuan",
    align: "center",
    sort: false,
  },
];
