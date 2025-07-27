import type { TableColumnType } from "@/components/tables/Table.vue";

export const ColumnHse: TableColumnType[] = [
    {
        key: "title",
        label: "Nama",
        align: "left",
        sort: false,
    },
    {
        key: "hse_doc",
        label: "Hse Dokumen",
        align: "left",
        sort: false,
    },
    {
        key: "inspection_type",
        label: "Jenis Inspeksi",
        align: "left",
        sort: false,
    },
];
