<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import type { AxiosError } from "axios";

import { Table } from "@/components";
import { useQuery } from "@tanstack/vue-query";
import type { IPagination } from "@/types/GlobalType";

import { ColumnsUnit } from "../constants/UnitConstant";
import type { UnitInterface } from "../types/UnitType";
import { useMasterStore } from "../stores/MasterStore";

const Entities: UnitInterface[] = [];
const masterStore = useMasterStore();
const total_item = ref(0);
const params = reactive({
  search: "",
  filter: "",
  currentPage: 1,
  perPage: 10,
});

//--- GET UNIT
const {
  data: dataUnit,
  isFetching: isLoadingUnit,
  refetch: refetchUnit,
} = useQuery({
  queryKey: ["getUnitMaster"],
  queryFn: async () => {
    try {
      const { data } = await masterStore.getUnit(params);
      const response = data as IPagination<UnitInterface[]>;

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
  refetchUnit();
};

const changeLimit = (e: string) => {
  params.perPage = parseInt(e);
  params.currentPage = 1;
  refetchUnit();
};
</script>

<template>
  <Table
    label-create="Unit"
    :columns="ColumnsUnit"
    :entities="Entities"
    :loading="isLoadingUnit"
    :pagination="pagination"
    :is-create="false"
    @change-page="changePage"
    @change-limit="changeLimit"
  ></Table>
</template>
