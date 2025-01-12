import type { TableColumnType } from "@/components/tables/Table.vue";

export const ColumnsQcPlan: TableColumnType[] = [
  {
    key: "name",
    label: "QC Plan Document",
    align: "left",
    sort: false,
  },
  {
    key: "document",
    label: "Add Document",
    align: "center",
    sort: false,
  },
  {
    key: "note",
    label: "Note",
    align: "center",
    sort: false,
  },
];
