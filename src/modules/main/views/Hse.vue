<script setup lang="ts">
import type { AxiosError } from "axios";
import { computed, reactive, ref } from "vue";
import { useRoute } from "vue-router";

import { FormUploadOnly, Table, Toast } from "@/components";

import type { ValueUploadType } from "@/components/fields/Upload.vue";
import { useMutation, useQuery } from "@tanstack/vue-query";
import type { CreateDocumentInterface, IPagination } from "@/types/GlobalType";
import { useGlobalStore } from "@/stores/GlobalStore";

import { ColumnsHse } from "../constants/HseConstant";
import type { HseInterface, ResponseHseInterface } from "../types/HseType";
import { useMainStore } from "../stores/MainStore";
import FormOnlyUploadFile from "../components/FormOnlyUploadFile.vue";

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
const globalStore = useGlobalStore();
const route = useRoute();
const params = reactive({
  search: "",
  filter: `project_uuid,${route.params.id_project}`,
  currentPage: 1,
  perPage: 10,
});
const total_item = ref(0);
const toastRef = ref<InstanceType<typeof Toast> | null>(null);
const attachment = ref<any>(null);
const timeout = ref(0);

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
            document: item.document
              ? {
                  file: item.document
                    ? [
                        {
                          id: item.document.uuid,
                          name: item.document.document_original_name,
                          size: item.document.document_size,
                          file: item.document.document_link,
                        },
                      ]
                    : [],
                }
              : null,
            note: null,
            document_original: item.document,
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

//--- CREATE DOCUMENT
const { mutate: createDocument, isPending: isLoadingCreate } = useMutation({
  mutationFn: async (payload: CreateDocumentInterface) => {
    return await globalStore.createDocument(payload);
  },
  onSuccess: () => {
    refetchHse();
    attachment.value.modelOpenInputData = false;
    toastRef.value?.showToast({
      title: "Success",
      description: "Saved successfully",
      type: "success",
    });
  },
  onError: (error: any) => {
    console.log(error);
    toastRef.value?.showToast({
      title: "Error",
      description: error?.response?.data?.message || "Something went wrong",
      type: "error",
    });
  },
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

const preview = (item: HseInterface) => {
  const a = document.createElement("a");
  a.href =
    import.meta.env.VITE_API_BASE_URL.replace("api", "") +
    item?.document_original?.document_link;
  a.download = item?.document_original?.document_name || "";
  a.target = "_blank";
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const saveFile = (e: { file: ValueUploadType[] }, entity: HseInterface) => {
  // const duplicate_data = [...entitiesHse.value];
  // const find_index = entitiesHse.value.findIndex(
  //   (item) => item.id === entity.id
  // );

  // if (find_index !== -1) {
  //   duplicate_data[find_index].document = {
  //     file: e.file,
  //   };
  //   entitiesHse.value = duplicate_data;
  // }
  createDocument({
    document: e.file?.[0]?.file as File,
    document_type: "App\\Models\\Transaction\\Hse",
    document_uuid: entity.id,
  });
};

function searchTable() {
  clearTimeout(timeout.value);
  timeout.value = window.setTimeout(() => {
    params.currentPage = 1;
    refetchHse();
  }, 1000);
}
</script>

<template>
  <Toast ref="toastRef" />
  <Table
    label-create="Part"
    :columns="ColumnsHse"
    :entities="entitiesHse"
    :loading="isLoadingHse"
    :pagination="pagination"
    :is-create="false"
    :is-action="false"
    v-model:model-search="params.search"
    @change-page="changePage"
    @change-limit="changeLimit"
    @search="searchTable"
  >
    <template #column_attachment="{ entity }">
      <div class="w-full flex justify-center">
        <FormOnlyUploadFile
          ref="attachment"
          :value="entity.document"
          :label="entity.name"
          :loading="isLoadingCreate"
          @save="(e) => saveFile(e, entity)"
        />
      </div>
    </template>
    <template #column_preview="{ entity }">
      <!-- <div class="w-full flex justify-center">
        <FormAddNote
          :value="entity.note || ''"
          :label="entity.name"
          @save="(e) => saveNote(e, entity)"
        />
      </div> -->
      <div v-if="entity.document" class="w-full flex justify-center">
        <div
          class="bg-cyan-500 text-center border border-neutral-50 rounded-lg px-2 min-w-[120px] text-base text-neutral-50 cursor-pointer"
          @click="preview(entity)"
        >
          Preview
        </div>
      </div>
      <div v-else class="text-center">-</div>
    </template>
  </Table>
</template>
