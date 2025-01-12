import type { TableColumnType } from "@/components/tables/Table.vue";

export const ColumnsHse: TableColumnType[] = [
  {
    key: "name",
    label: "Document Title",
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
