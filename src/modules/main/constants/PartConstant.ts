import type { TableColumnType } from "@/components/tables/Table.vue";

export const ColumnsPart: TableColumnType[] = [
  {
    key: "part",
    label: "Main Part",
    align: "center",
    sort: false,
  },
  {
    key: "document",
    label: "",
    align: "center",
    sort: false,
    width: "150",
  },
  {
    key: "quantity",
    label: "Quantity",
    align: "center",
    sort: false,
    width: "150",
  },
  {
    key: "volume",
    label: "Volume",
    align: "center",
    sort: false,
    width: "150",
  },
  {
    key: "note",
    label: "Note",
    align: "center",
    sort: false,
    width: "150",
  },
];
