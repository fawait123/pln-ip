<script setup lang="ts">
import {
  FormUploadOnly,
  FormAddNote,
  Table,
  Quantity,
  Volume,
} from "@/components";
import { ColumnsHse } from "../constants/HseConstant";
import type { HseInterface, ResponseHseInterface } from "../types/HseType";
import { reactive, ref, watch } from "vue";
import type { ValueUploadType } from "@/components/fields/Upload.vue";
import { useMainStore } from "../stores/MainStore";
import { useRoute } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import type { IPagination } from "@/types/GlobalType";
import type { AxiosError } from "axios";

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

//--- GET HSE
const { data: dataHse, isFetching: isLoadingHse } = useQuery({
  queryKey: ["getHse"],
  queryFn: async () => {
    try {
      const { data } = await mainStore.getHse(params);
      const response = data as IPagination<ResponseHseInterface[]>;

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

const onCreate = (e: string) => {
  const new_data = [...entitiesHse.value];

  new_data.unshift({
    id: (new_data.length + 1).toString(),
    name: e,
    document: null,
    note: null,
  });

  entitiesHse.value = new_data;
};

const onDelete = (e: HseInterface) => {
  entitiesHse.value = entitiesHse.value.filter((item) => item.id !== e.id);
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

const saveNote = (e: { note: string }, entity: HseInterface) => {
  const duplicate_data = [...entitiesHse.value];
  const find_index = entitiesHse.value.findIndex(
    (item) => item.id === entity.id
  );

  if (find_index !== -1) {
    duplicate_data[find_index].note = e.note;
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
