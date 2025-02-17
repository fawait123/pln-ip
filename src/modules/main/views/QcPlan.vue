<script setup lang="ts">
import {
  FormUploadOnly,
  FormAddNote,
  Table,
  Quantity,
  Volume,
} from "@/components";
import { ColumnsQcPlan } from "../constants/QcPlan";
import type {
  QcPlanInterface,
  ResponseQcPlanInterface,
} from "../types/QcPlanType";
import { reactive, ref, watch } from "vue";
import type { ValueUploadType } from "@/components/fields/Upload.vue";
import { useMainStore } from "../stores/MainStore";
import { useRoute } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import type { IPagination } from "@/types/GlobalType";
import type { AxiosError } from "axios";

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
  filter: `project_uuid,${route.params.id_project}`,
  currentPage: 1,
  perPage: 10,
});

//--- GET QC PLAN
const { data: dataQcPlan, isFetching: isLoadingQcPlan } = useQuery({
  queryKey: ["getQcPlan"],
  queryFn: async () => {
    try {
      const { data } = await mainStore.getQcPlan(params);
      const response = data as IPagination<ResponseQcPlanInterface[]>;

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

const onCreate = (e: string) => {
  const new_data = [...entitiesQcPlan.value];

  new_data.unshift({
    id: (new_data.length + 1).toString(),
    name: e,
    document: null,
    note: null,
  });

  entitiesQcPlan.value = new_data;
};

const onDelete = (e: QcPlanInterface) => {
  entitiesQcPlan.value = entitiesQcPlan.value.filter(
    (item) => item.id !== e.id
  );
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

const saveNote = (e: { note: string }, entity: QcPlanInterface) => {
  const duplicate_data = [...entitiesQcPlan.value];
  const find_index = entitiesQcPlan.value.findIndex(
    (item) => item.id === entity.id
  );

  if (find_index !== -1) {
    duplicate_data[find_index].note = e.note;
    entitiesQcPlan.value = duplicate_data;
  }
};
</script>

<template>
  <Table
    label-create="QC Plan Document"
    :columns="ColumnsQcPlan"
    :entities="entitiesQcPlan"
    :loading="isLoadingQcPlan"
    :is-create="false"
    @create="onCreate"
    @delete="onDelete"
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
