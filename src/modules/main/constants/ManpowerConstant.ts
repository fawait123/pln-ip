import type { TableColumnType } from "@/components/tables/Table.vue";

export const ColumnsManpower: TableColumnType[] = [
  {
    key: "manpower",
    label: "Manpower",
    align: "left",
    sort: false,
  },
  // {
  //   key: "document",
  //   label: "",
  //   align: "center",
  //   sort: false,
  //   width: "150",
  // },
  {
    key: "quantity",
    label: "Quantity",
    align: "center",
    sort: false,
    width: "150",
  },
  {
    key: "volume",
    label: "",
    align: "center",
    sort: false,
    width: "150",
  },
  // {
  //   key: "note",
  //   label: "Note",
  //   align: "center",
  //   sort: false,
  //   width: "150",
  // },
];
