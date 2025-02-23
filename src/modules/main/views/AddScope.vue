<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import type { AxiosError } from "axios";
import { useRoute, useRouter } from "vue-router";

import {
  AssetWelness,
  ButtonDots,
  FormWithFile,
  Icon,
  Table,
} from "@/components";
import type { ValueUploadType } from "@/components/fields/Upload.vue";
import { useQuery } from "@tanstack/vue-query";
import type { IPagination } from "@/types/GlobalType";

import type {
  ResponseAddScopeInterface,
  AddScopeInterface,
} from "../types/AddScopeTableType";
import { ColumnsScope } from "../constants/ScopeConstant";
import { useMainStore } from "../stores/MainStore";

const entitiesScope = ref<AddScopeInterface[]>([]);

const mainStore = useMainStore();
const router = useRouter();
const route = useRoute();
const params = reactive({
  search: "",
  filters: `project_uuid,${route.params.id_project}&category,listrik`,
  currentPage: 1,
  perPage: 10,
});
const total_item = ref(0);

//--- GET SCOPE
const {
  data: dataScope,
  isFetching: isLoadingScope,
  refetch: refetchScope,
} = useQuery({
  queryKey: ["getScopeListrik"],
  queryFn: async () => {
    try {
      const { data } = await mainStore.getAddScope(params);
      const response = data as IPagination<ResponseAddScopeInterface[]>;

      total_item.value = response.total;

      const new_arr: AddScopeInterface[] =
        response.data?.map((item) => {
          return {
            id: item.uuid,
            asset: item.name || "",
            asset_welness: null,
            oh_recom: null,
            wo_priority: null,
            history: null,
            rla: null,
            etc: null,
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

const saveAssetWelness = (
  e: { color: string; result: { id: number; note: string }[] },
  entity: AddScopeInterface
) => {
  const duplicate_data = [...entitiesScope.value];
  const find_index = entitiesScope.value.findIndex(
    (item) => item.id === entity.id
  );

  if (find_index !== -1) {
    duplicate_data[find_index].asset_welness = {
      color: e.color,
      result: e.result,
    };
    entitiesScope.value = duplicate_data;
  }
};

const saveFieldWithFile = (
  e: { result: { id: number; note: string }[]; file: ValueUploadType[] },
  entity: AddScopeInterface,
  field: string
) => {
  const duplicate_data = [...entitiesScope.value];
  const find_index = entitiesScope.value.findIndex(
    (item) => item.id === entity.id
  );

  if (find_index !== -1) {
    if (field === "oh_recom") {
      duplicate_data[find_index].oh_recom = {
        result: e.result,
        file: e.file,
      };
    } else if (field === "wo_priority") {
      duplicate_data[find_index].wo_priority = {
        result: e.result,
        file: e.file,
      };
    } else if (field === "history") {
      duplicate_data[find_index].history = {
        result: e.result,
        file: e.file,
      };
    } else if (field === "rla") {
      duplicate_data[find_index].rla = {
        result: e.result,
        file: e.file,
      };
    } else if (field === "etc") {
      duplicate_data[find_index].etc = {
        result: e.result,
        file: e.file,
      };
    }
    entitiesScope.value = duplicate_data;
  }
};

const onDelete = (e: AddScopeInterface) => {
  entitiesScope.value = entitiesScope.value.filter((item) => item.id !== e.id);
};

const toDetail = (id: string) => {
  router.push(
    `/${route.params.id}/create/unit/${route.params.id_unit}/${route.params.menu}/${route.params.id_project}/add-scope/${id}/scope-mekanik`
  );
};
</script>

<template>
  <Table
    label-create="Asset"
    :columns="ColumnsScope"
    :entities="entitiesScope"
    :loading="isLoadingScope"
    :pagination="pagination"
    :is-create="false"
    @delete="onDelete"
    @change-page="changePage"
    @change-limit="changeLimit"
  >
    <template #column_asset_welness="{ entity }">
      <div class="w-full flex justify-center">
        <AssetWelness
          :value="entity.asset_welness"
          :label="entity.asset"
          @save="(e) => saveAssetWelness(e, entity)"
        />
      </div>
    </template>
    <template #column_oh_recom="{ entity }">
      <div class="w-full flex justify-center">
        <FormWithFile
          :value="entity.oh_recom"
          :label="entity.asset"
          @save="(e) => saveFieldWithFile(e, entity, 'oh_recom')"
        />
      </div>
    </template>
    <template #column_wo_priority="{ entity }">
      <div class="w-full flex justify-center">
        <FormWithFile
          :value="entity.wo_priority"
          :label="entity.asset"
          @save="(e) => saveFieldWithFile(e, entity, 'wo_priority')"
        />
      </div>
    </template>
    <template #column_history="{ entity }">
      <div class="w-full flex justify-center">
        <FormWithFile
          :value="entity.history"
          :label="entity.asset"
          @save="(e) => saveFieldWithFile(e, entity, 'history')"
        />
      </div>
    </template>
    <template #column_rla="{ entity }">
      <div class="w-full flex justify-center">
        <FormWithFile
          :value="entity.rla"
          :label="entity.asset"
          @save="(e) => saveFieldWithFile(e, entity, 'rla')"
        />
      </div>
    </template>
    <template #column_etc="{ entity }">
      <div class="w-full flex justify-center">
        <FormWithFile
          :value="entity.etc"
          :label="entity.asset"
          @save="(e) => saveFieldWithFile(e, entity, 'etc')"
        />
      </div>
    </template>
    <template #column_action="{ entity }">
      <div class="flex items-center justify-center gap-2">
        <ButtonDots @detail="toDetail(entity.id)" />
        <Icon name="trash" class="table-delete" @click="onDelete(entity)" />
      </div>
    </template>
  </Table>
  <!-- <p class="font-bold text-black text-2xl">TEST</p> -->
</template>
