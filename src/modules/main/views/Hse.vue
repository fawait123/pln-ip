<script setup lang="ts">
import type { AxiosError } from "axios";
import { computed, reactive, ref } from "vue";
import { useRoute } from "vue-router";

import { FormUploadOnly, Table } from "@/components";

import type { ValueUploadType } from "@/components/fields/Upload.vue";
import { useQuery } from "@tanstack/vue-query";
import type { IPagination } from "@/types/GlobalType";

import { ColumnsHse } from "../constants/HseConstant";
import type { HseInterface, ResponseHseInterface } from "../types/HseType";
import { useMainStore } from "../stores/MainStore";

// const Data = ref<HseInterface[]>([
//   {
//     id: 1,
//     name: "Dokumen Kesepakatan OH",
//     document: null,
//     note: null,
//   },
// ]);

const entitiesHse = ref<HseInterface[]>([]);

const mainStore = useMainStore();
const route = useRoute();
const params = reactive({
  search: "",
  filter: `project_uuid,${route.params.id_project}`,
  currentPage: 1,
  perPage: 10,
});
const total_item = ref(0);

//--- GET HSE
const {
  data: dataHse,
  isFetching: isLoadingHse,
  refetch: refetchHse,
} = useQuery({
  queryKey: ["getHse"],
  queryFn: async () => {
    try {
      const { data } = await mainStore.getHse(params);
      const response = data as IPagination<ResponseHseInterface[]>;

      total_item.value = response.total;

      const new_arr: HseInterface[] =
        response.data?.map((item) => {
          return {
            id: item.uuid,
            name: item.title,
            document: null,
            note: null,
          };
        }) || [];
      entitiesHse.value = new_arr;

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
  refetchHse();
};

const changeLimit = (e: string) => {
  params.perPage = parseInt(e);
  params.currentPage = 1;
  refetchHse();
};

const saveFile = (e: { file: ValueUploadType[] }, entity: HseInterface) => {
  const duplicate_data = [...entitiesHse.value];
  const find_index = entitiesHse.value.findIndex(
    (item) => item.id === entity.id
  );

  if (find_index !== -1) {
    duplicate_data[find_index].document = {
      file: e.file,
    };
    entitiesHse.value = duplicate_data;
  }
};
</script>

<template>
  <Table
    label-create="Part"
    :columns="ColumnsHse"
    :entities="entitiesHse"
    :loading="isLoadingHse"
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
