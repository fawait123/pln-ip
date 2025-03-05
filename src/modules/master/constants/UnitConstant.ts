import type { TableColumnType } from "@/components/tables/Table.vue";

export const ColumnsUnit: TableColumnType[] = [
  {
    key: "name",
    label: "Unit",
    align: "left",
    sort: false,
  },
  {
    key: "location_uuid",
    label: "Location",
    align: "center",
    sort: false,
    width: "150",
  },
];
