import type { TableColumnType } from "@/components/tables/Table.vue";

export const ColumnsScope: TableColumnType[] = [
  {
    key: "name",
    label: "Name",
    align: "left",
    sort: false,
  },
  {
    key: "category",
    label: "Kategori",
    align: "left",
    sort: false,
  },
  {
    key: "sub_bidang",
    label: "Sub Bidang",
    align: "left",
    sort: false,
  },
  {
    key: "inspection_type",
    label: "Jenis Inspeksi",
    align: "left",
    sort: false,
  },
  {
    key: "machine",
    label: "Mesin",
    align: "left",
    sort: false,
  },
  {
    key: "unit",
    label: "Unit",
    align: "left",
    sort: false,
  },
  {
    key: "location",
    label: "Lokasi",
    align: "left",
    sort: false,
  },
];
