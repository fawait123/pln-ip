import type { TableColumnType } from "@/components/tables/Table.vue";

export const ColumnSequence: TableColumnType[] = [
    {
        key: "name",
        label: "Nama",
        align: "left",
        sort: false,
    },
    {
        key: "document",
        label: "Link",
        align: "left",
        sort: false,
    },
];
