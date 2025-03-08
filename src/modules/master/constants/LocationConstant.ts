import type { TableColumnType } from "@/components/tables/Table.vue";

export const ColumnsLocation: TableColumnType[] = [
  {
    key: "name",
    label: "Location",
    align: "left",
    sort: false,
  },
  {
    key: "lat",
    label: "Latitude",
    align: "center",
    sort: false,
    width: "150",
  },
  {
    key: "lon",
    label: "Longitude",
    align: "center",
    sort: false,
    width: "150",
  },
  {
    key: "description",
    label: "Description",
    align: "center",
    sort: false,
  },
];
