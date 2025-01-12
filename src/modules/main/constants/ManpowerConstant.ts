import type { TableColumnType } from "@/components/tables/Table.vue";

export const ColumnsManpower: TableColumnType[] = [
  {
    key: "manpower",
    label: "Manpower",
    align: "left",
    sort: false,
  },
  {
    key: "document",
    label: "",
    align: "center",
    sort: false,
  },
  {
    key: "quantity",
    label: "Quantity",
    align: "center",
    sort: false,
  },
  {
    key: "volume",
    label: "",
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
