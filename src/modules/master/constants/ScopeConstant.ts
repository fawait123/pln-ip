import type { TableColumnType } from "@/components/tables/Table.vue";

export const ColumnsScope: TableColumnType[] = [
  {
    key: "name",
    label: "Nama Scope Standart",
    align: "left",
    sort: false,
  },
  {
    key: "document",
    label: "Link IK (Dokumen)",
    align: "left",
    sort: false,
  },
  {
    key: "link",
    label: "Link IK (Online)",
    align: "left",
    sort: false,
  },
];
