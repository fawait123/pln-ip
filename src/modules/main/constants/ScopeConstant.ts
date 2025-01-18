import type { TableColumnType } from "@/components/tables/Table.vue";

export const ColumnsScope: TableColumnType[] = [
  {
    key: "asset",
    label: "Asset",
    align: "left",
    sort: false,
  },
  {
    key: "asset_welness",
    label: "Asset Welness",
    align: "center",
    sort: false,
    width: "150",
  },
  {
    key: "oh_recom",
    label: "OH Recom",
    align: "center",
    sort: false,
    width: "150",
  },
  {
    key: "wo_priority",
    label: "WO Priority",
    align: "center",
    sort: false,
    width: "150",
  },
  {
    key: "history",
    label: "History",
    align: "center",
    sort: false,
    width: "150",
  },
  {
    key: "rla",
    label: "RLA",
    align: "center",
    sort: false,
    width: "150",
  },
  {
    key: "etc",
    label: "Etc",
    align: "center",
    sort: false,
    width: "150",
  },
];
