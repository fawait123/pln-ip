import type { TableColumnType } from "@/components/tables/Table.vue";

export const ColumnSequence: TableColumnType[] = [
    {
        key: "name",
        label: "Nama",
        align: "left",
        sort: false,
    },
    {
        key: "link",
        label: "Link",
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
