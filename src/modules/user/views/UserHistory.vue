<script setup lang="ts">
import { ref } from "vue";

import { Table } from "@/components";
import { ColumnsUserHistory } from "@/modules/user/constant/UserHistoryConstant";
import type { UserHistoryInterface } from "@/modules/user/types/UserHistoryType";

const Data = ref<UserHistoryInterface[]>([
  {
    id: 1,
    time: "10.01.2025 / 10.21WIB",
    action: "Upload - IK - Top Hat - IK Assembly Top Hat.pdf",
    user: "sopan@plnindonesiapower.co.id",
  },
  {
    id: 2,
    time: "10.01.2025 / 10.21WIB",
    action: "Delet - QC Plan - QC Plan Mekanik - QC Plan Mekanik.pdf",
    user: "ramli@plnindonesiapower.co.id",
  },
  {
    id: 3,
    time: "10.01.2025 / 10.21WIB",
    action: "Active - History - Note",
    user: "sopan@plnindonesiapower.co.id",
  },
]);
</script>

<template>
  <Table
    label-create="Part"
    :columns="ColumnsUserHistory"
    :entities="Data"
    :is-action="false"
    :is-create="false"
  ></Table>
</template>
