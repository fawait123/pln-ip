<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import type { AxiosError } from "axios";

import { Table } from "@/components";
import { useQuery } from "@tanstack/vue-query";
import type { IPagination } from "@/types/GlobalType";

import { ColumnsMachine } from "../constants/MachineConstant";
import type { MachineInterface } from "../types/MachineType";
import { useMasterStore } from "../stores/MasterStore";

const Entities: MachineInterface[] = [];
const masterStore = useMasterStore();
const total_item = ref(0);
const params = reactive({
  search: "",
  filter: "",
  currentPage: 1,
  perPage: 10,
});

//--- GET MACHINE
const {
  data: dataMachine,
  isFetching: isLoadingMachine,
  refetch: refetchMachine,
} = useQuery({
  queryKey: ["getMachineMaster"],
  queryFn: async () => {
    try {
      const { data } = await masterStore.getMachine(params);
      const response = data as IPagination<MachineInterface[]>;

      total_item.value = response.total;

      return response;
    } catch (error: any) {
      const err = error as AxiosError;
      throw err.response;
    }
  },
  refetchOnWindowFocus: false,
});
//--- END

const pagination = computed(() => {
  return {
    totalItems: total_item.value,
    itemsPerPage: params.perPage,
    currentPage: params.currentPage,
  };
});

const changePage = (e: number) => {
  params.currentPage = e;
  refetchMachine();
};

const changeLimit = (e: string) => {
  params.perPage = parseInt(e);
  params.currentPage = 1;
  refetchMachine();
};
</script>

<template>
  <Table
    label-create="Machine"
    :columns="ColumnsMachine"
    :entities="Entities"
    :loading="isLoadingMachine"
    :pagination="pagination"
    :is-create="false"
    @change-page="changePage"
    @change-limit="changeLimit"
  ></Table>
</template>
