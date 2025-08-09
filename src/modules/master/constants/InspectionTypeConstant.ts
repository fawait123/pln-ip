import type { TableColumnType } from "@/components/tables/Table.vue";

export const ColumnsInspectionType: TableColumnType[] = [
  {
    key: "name",
    label: "Nama Inspeksi",
    align: "left",
    sort: false,
  },
  {
    key: "sequence",
    label: "Sequence",
    align: "center",
    sort: false,
  },
];
