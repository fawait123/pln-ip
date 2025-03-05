<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import type { AxiosError } from "axios";
import { useRoute } from "vue-router";

import { Table } from "@/components";
import { useQuery } from "@tanstack/vue-query";
import type { IPagination } from "@/types/GlobalType";

import { ColumnsWorkInstruction } from "../../constants/WorkInstructionConstant";
import type {
  ResponseScopeInterface,
  ScopeInterface,
} from "../../types/ScopeType";
import { ColumnsScope } from "../../constants/ScopeConstant";
import { useMainStore } from "../../stores/MainStore";

const entitiesScope = ref<ScopeInterface[]>([]);

const mainStore = useMainStore();
const route = useRoute();
const params = reactive({
  search: "",
  filters: `project_uuid,${route.params.id_project}&category,listrik`,
  currentPage: 1,
  perPage: 10,
});
const total_item = ref(0);
const timeout = ref(0);

//--- GET SCOPE
const {
  data: dataScope,
  isFetching: isLoadingScope,
  refetch: refetchScope,
} = useQuery({
  queryKey: ["getScopeListrik"],
  queryFn: async () => {
    try {
      const { data } = await mainStore.getScopeStandar(params);
      const response = data as IPagination<ResponseScopeInterface[]>;

      total_item.value = response.total;

      const new_arr: ScopeInterface[] =
        response.data?.map((item) => {
          return {
            id: item.uuid,
            asset: item.name || "",
            asset_welness: item.asset_welnes
              ? {
                  color: item.asset_welnes?.color,
                  note: item.asset_welnes?.note,
                }
              : null,
            oh_recom: null,
            wo_priority: null,
            history: null,
            rla: null,
            ncr: null,
            children: item.details.map((el) => {
              return {
                id: el.uuid,
                name: el.name,
              };
            }),
          };
        }) || [];
      entitiesScope.value = new_arr;

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
  refetchScope();
};

const changeLimit = (e: string) => {
  params.perPage = parseInt(e);
  params.currentPage = 1;
  refetchScope();
};

function searchTable() {
  clearTimeout(timeout.value);
  timeout.value = window.setTimeout(() => {
    params.currentPage = 1;
    refetchScope();
  }, 1000);
}
</script>

<template>
  <Table
    label-create="Asset"
    :columns="ColumnsWorkInstruction"
    :entities="entitiesScope"
    :loading="isLoadingScope"
    :pagination="pagination"
    :is-create="false"
    v-model:model-search="params.search"
    @change-page="changePage"
    @change-limit="changeLimit"
    @search="searchTable"
  >
    <template #column_action><p></p> </template>
    <template #children="{ entity, index, parentActive }">
      <tr v-if="parentActive === index && entity.children.length === 0">
        <td :colspan="ColumnsWorkInstruction.length + 1" class="td-child">
          <div class="v-table-body">
            <p class="v-table-body-text pl-11 text-center">Not Found Data</p>
          </div>
        </td>
      </tr>
      <tr
        v-if="parentActive === index"
        v-for="(child, childIndex) in entity.children"
        :key="childIndex"
      >
        <td :colspan="ColumnsScope.length + 1" class="td-child">
          <div class="v-table-body">
            <p class="v-table-body-text pl-11">
              {{ child.name }}
            </p>
          </div>
        </td>
      </tr>
    </template>
  </Table>
</template>
