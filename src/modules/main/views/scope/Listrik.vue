<script setup lang="ts">
import { AssetWelness, FormWithFile, Table } from "@/components";
import { ColumnsScope } from "../../constants/ScopeConstant";
import type {
  ResponseScopeInterface,
  ScopeInterface,
} from "../../types/ScopeType";
import { reactive, ref, watch } from "vue";
import type { ValueUploadType } from "@/components/fields/Upload.vue";
import { useQuery } from "@tanstack/vue-query";
import { useMaindStore } from "../../stores/MainStore";
import { useRoute } from "vue-router";
import type { IPagination } from "@/types/GlobalType";
import type { AxiosError } from "axios";

const entitiesScope = ref<ScopeInterface[]>([]);

const mainStore = useMaindStore();
const route = useRoute();
const params = reactive({
  search: "",
  filter: `project_uuid,${route.params.id_project}`,
  currentPage: 1,
  perPage: 10,
});

//--- GET SCOPE
const { data: dataScope, isFetching: isLoadingScope } = useQuery({
  queryKey: ["getScopeListrik"],
  queryFn: async () => {
    try {
      const { data } = await mainStore.getScopeStandar(params);
      const response = data as IPagination<ResponseScopeInterface[]>;

      const new_arr: ScopeInterface[] =
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

const saveAssetWelness = (
  e: { color: string; result: { id: number; note: string }[] },
  entity: ScopeInterface
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
  entity: ScopeInterface,
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

const onCreate = (e: string) => {
  const new_data = [...entitiesScope.value];

  new_data.unshift({
    id: (new_data.length + 1).toString(),
    asset: e,
    asset_welness: null,
    oh_recom: null,
    wo_priority: null,
    history: null,
    rla: null,
    etc: null,
    children: [],
  });

  entitiesScope.value = new_data;
};

const onDelete = (e: ScopeInterface) => {
  entitiesScope.value = entitiesScope.value.filter((item) => item.id !== e.id);
};
</script>

<template>
  <Table
    label-create="Asset"
    :columns="ColumnsScope"
    :entities="entitiesScope"
    :loading="isLoadingScope"
    @create="onCreate"
    @delete="onDelete"
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
    <template #children="{ entity, index, parentActive }">
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
  <!-- <p class="font-bold text-black text-2xl">TEST</p> -->
</template>
