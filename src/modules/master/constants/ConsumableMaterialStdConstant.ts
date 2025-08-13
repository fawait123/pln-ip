import type { TableColumnType } from "@/components/tables/Table.vue";

export const ColumnConsumableMaterialStd: TableColumnType[] = [
    {
        key: "cons_mat",
        label: "Consumable Material",
        align: "left",
        sort: false,
    },
    {
        key: "qty",
        label: "Qty",
        align: "center",
        sort: false,
    },
];
