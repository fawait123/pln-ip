<script setup lang="ts">
import type { AxiosError } from "axios";
import { computed, reactive, ref } from "vue";
import { useRoute } from "vue-router";

import { FormUploadOnly, Table } from "@/components";
import type { ValueUploadType } from "@/components/fields/Upload.vue";
import { useQuery } from "@tanstack/vue-query";
import type { IPagination } from "@/types/GlobalType";

import { ColumnsAddScopeDetailQcPlan } from "../../constants/AddScope";
import type {
  QcPlanInterface,
  ResponseQcPlanInterface,
} from "../../types/QcPlanType";
import { useMainStore } from "../../stores/MainStore";

// const Data = ref<QcPlanInterface[]>([
//   {
//     id: 1,
//     name: "QC Plan Mekanik",
//     document: null,
//     note: null,
//   },
// ]);

const entitiesQcPlan = ref<QcPlanInterface[]>([]);

const mainStore = useMainStore();
const route = useRoute();
const params = reactive({
  search: "",
  filter: `project_uuid,${route.params.id_project}&additional_scope_uuid,${route.params.id_scope}`,
  currentPage: 1,
  perPage: 10,
});
const total_item = ref(0);

//--- GET QC PLAN
const {
  data: dataQcPlan,
  isFetching: isLoadingQcPlan,
  refetch: refetchQcPlan,
} = useQuery({
  queryKey: ["getAddScopeQcPlan"],
  queryFn: async () => {
    try {
      const { data } = await mainStore.getQcPlan(params);
      const response = data as IPagination<ResponseQcPlanInterface[]>;

      total_item.value = response.total;

      const new_arr: QcPlanInterface[] =
        response.data?.map((item) => {
          return {
            id: item.uuid,
            name: item.name,
            document: null,
            note: null,
          };
        }) || [];
      entitiesQcPlan.value = new_arr;

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
  refetchQcPlan();
};

const changeLimit = (e: string) => {
  params.perPage = parseInt(e);
  params.currentPage = 1;
  refetchQcPlan();
};

const saveFile = (e: { file: ValueUploadType[] }, entity: QcPlanInterface) => {
  const duplicate_data = [...entitiesQcPlan.value];
  const find_index = entitiesQcPlan.value.findIndex(
    (item) => item.id === entity.id
  );

  if (find_index !== -1) {
    duplicate_data[find_index].document = {
      file: e.file,
    };
    entitiesQcPlan.value = duplicate_data;
  }
};
</script>

<template>
  <Table
    label-create="QC Plan Document"
    :columns="ColumnsAddScopeDetailQcPlan"
    :entities="entitiesQcPlan"
    :loading="isLoadingQcPlan"
    :pagination="pagination"
    :is-create="false"
    :is-action="false"
    @change-page="changePage"
    @change-limit="changeLimit"
  >
    <template #column_attachment="{ entity }">
      <div class="w-full flex justify-center">
        <FormUploadOnly
          :value="entity.document"
          :label="entity.name"
          @save="(e) => saveFile(e, entity)"
        />
      </div>
    </template>
    <template #column_preview="{ entity }">
      <div class="w-full flex justify-center">
        <!-- <FormAddNote
          :value="entity.note || ''"
          :label="entity.name"
          @save="(e) => saveNote(e, entity)"
        /> -->
      </div>
    </template>
  </Table>
</template>
