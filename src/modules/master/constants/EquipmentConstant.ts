import type { TableColumnType } from "@/components/tables/Table.vue";

export const ColumnsEquipment: TableColumnType[] = [
  {
    key: "name",
    label: "Equipment",
    align: "left",
    sort: false,
  },
  {
    key: "scope_standart",
    label: "Scope Standart",
    align: "left",
    sort: false,
  },
];
