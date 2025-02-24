<script setup lang="ts">
import type { AxiosError } from "axios";
import { computed, reactive, ref } from "vue";
import { useRoute } from "vue-router";

import { Table, Toast } from "@/components";
import type { ValueUploadType } from "@/components/fields/Upload.vue";
import { useMutation, useQuery } from "@tanstack/vue-query";
import type { CreateDocumentInterface, IPagination } from "@/types/GlobalType";
import { useGlobalStore } from "@/stores/GlobalStore";

import { ColumnsQcPlan } from "../constants/QcPlan";
import type {
  QcPlanInterface,
  ResponseQcPlanInterface,
} from "../types/QcPlanType";
import { useMainStore } from "../stores/MainStore";
import FormOnlyUploadFile from "../components/FormOnlyUploadFile.vue";

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

//--- GET QC PLAN
const {
  data: dataQcPlan,
  isFetching: isLoadingQcPlan,
  refetch: refetchQcPlan,
} = useQuery({
  queryKey: ["getQcPlan"],
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
            document: item.document
              ? {
                  file: item.document
                    ? [
                        {
                          id: item.document.uuid,
                          name: item.document.document_name,
                          size: item.document.document_size,
                          file: item.document.document_link,
                        },
                      ]
                    : [],
                }
              : null,
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

//--- CREATE DOCUMENT
const { mutate: createDocument, isPending: isLoadingCreate } = useMutation({
  mutationFn: async (payload: CreateDocumentInterface) => {
    return await globalStore.createDocument(payload);
  },
  onSuccess: () => {
    refetchQcPlan();
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
  refetchQcPlan();
};

const changeLimit = (e: string) => {
  params.perPage = parseInt(e);
  params.currentPage = 1;
  refetchQcPlan();
};

const saveFile = (e: { file: ValueUploadType[] }, entity: QcPlanInterface) => {
  // const duplicate_data = [...entitiesQcPlan.value];
  // const find_index = entitiesQcPlan.value.findIndex(
  //   (item) => item.id === entity.id
  // );

  // if (find_index !== -1) {
  //   duplicate_data[find_index].document = {
  //     file: e.file,
  //   };
  //   entitiesQcPlan.value = duplicate_data;
  // }
  createDocument({
    document: e.file?.[0]?.file as File,
    document_type: "App\\Models\\Transaction\\QcPlan",
    document_uuid: entity.id,
  });
};
</script>

<template>
  <Toast ref="toastRef" />
  <Table
    label-create="QC Plan Document"
    :columns="ColumnsQcPlan"
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
        <FormOnlyUploadFile
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
        >
          Preview
        </div>
      </div>
      <div v-else class="text-center">-</div>
    </template>
  </Table>
</template>
