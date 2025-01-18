import type { TableColumnType } from "@/components/tables/Table.vue";

export const ColumnsConsumableMaterial: TableColumnType[] = [
  {
    key: "material",
    label: "Material",
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
    label: "Valume",
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
