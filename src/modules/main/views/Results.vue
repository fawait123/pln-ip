<script setup lang="ts">
import { ref } from "vue";
import { Table } from "@/components";
import type { ResultsInterface } from "../types/ResultsType";
import { ColumnsResults } from "../constants/ResultsConstant";

const Data = ref<ResultsInterface[]>([
  {
    id: 1,
    manpower: "Material",
    note: "",
  },
  {
    id: 2,
    manpower: "Part List",
    note: "",
  },
  {
    id: 3,
    manpower: "Detail Scope",
    note: "",
  },
]);
</script>

<template>
  <p class="text-center w-full font-bold text-2xl text-blue-900 mb-10">
    REPORT
  </p>
  <Table
    label-create="Manpower"
    :is-create="false"
    :is-search="false"
    :is-action="false"
    :columns="ColumnsResults"
    :entities="Data"
  >
    <template #column_download="{ entity }">
      <button class="button-download">Download</button>
    </template>
    <template #column_note="{ entity }">
      <p class="v-table-body-text">{{ entity.note || "None" }}</p>
    </template>
  </Table>
</template>

<style lang="sass">
.button-download
  @apply bg-transparent border border-neutral-50 rounded-lg px-2 min-w-[100px] text-base text-neutral-50 hover:bg-cyan-500
</style>
