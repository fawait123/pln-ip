<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import type { AxiosError } from "axios";

import { Table } from "@/components";
import { useQuery } from "@tanstack/vue-query";
import type { IPagination } from "@/types/GlobalType";

import { ColumnsInspectionType } from "../constants/InspectionTypeConstant";
import type { InspectionTypeInterface } from "../types/InspectionType";
import { useMasterStore } from "../stores/MasterStore";

const Entities: InspectionTypeInterface[] = [];
const masterStore = useMasterStore();
const total_item = ref(0);
const params = reactive({
  search: "",
  filter: "",
  currentPage: 1,
  perPage: 10,
});

//--- GET INSPECTION TYPE
const {
  data: dataInspectionType,
  isFetching: isLoadingInspectionType,
  refetch: refetchInspectionType,
} = useQuery({
  queryKey: ["getInspectionTypeMaster"],
  queryFn: async () => {
    try {
      const { data } = await masterStore.getInspectionType(params);
      const response = data as IPagination<InspectionTypeInterface[]>;

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
  refetchInspectionType();
};

const changeLimit = (e: string) => {
  params.perPage = parseInt(e);
  params.currentPage = 1;
  refetchInspectionType();
};
</script>

<template>
  <Table
    label-create="Inspection Type"
    :columns="ColumnsInspectionType"
    :entities="Entities"
    :loading="isLoadingInspectionType"
    :pagination="pagination"
    :is-create="false"
    @change-page="changePage"
    @change-limit="changeLimit"
  ></Table>
</template>
