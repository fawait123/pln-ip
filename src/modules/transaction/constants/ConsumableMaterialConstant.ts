import type { TableColumnType } from "@/components/tables/Table.vue";

export const ColumnsConsumableMaterial: TableColumnType[] = [
  {
    key: "material",
    label: "Material",
    align: "left",
    sort: false,
  },
  {
    key: "merk",
    label: "Merk",
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
    key: "unit",
    label: "Unit",
    align: "center",
    sort: false,
    width: "150",
  },
];
