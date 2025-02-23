<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import type { AxiosError } from "axios";

import type { CreateDocumentInterface, IPagination } from "@/types/GlobalType";
import { ModalDelete, Table, Toast } from "@/components";
import type { ValueUploadType } from "@/components/fields/Upload.vue";
import { useQuery, useMutation } from "@tanstack/vue-query";
import { useGlobalStore } from "@/stores/GlobalStore";

import FormAssetWelness from "../../components/FormAssetWelness.vue";
import FormWithUploadFile from "../../components/FormWithUploadFile.vue";
import { ColumnsScope } from "../../constants/ScopeConstant";
import type {
  CreateScopeInterface,
  ResponseScopeInterface,
  ScopeInterface,
  TColor,
} from "../../types/ScopeType";
import { useMainStore } from "../../stores/MainStore";

const entitiesScope = ref<ScopeInterface[]>([]);
const selected_item = ref<ScopeInterface>();

const mainStore = useMainStore();
const globalStore = useGlobalStore();
const route = useRoute();
const params = reactive({
  search: "",
  filters: `project_uuid,${route.params.id_project}&category,mekanik`,
  currentPage: 1,
  perPage: 10,
});
const total_item = ref(0);
const toastRef = ref<InstanceType<typeof Toast> | null>(null);
const asset_welness = ref<any>(null);
const oh_recom = ref<any>(null);
const wo_priority = ref<any>(null);
const history = ref<any>(null);
const rla = ref<any>(null);
const ncr = ref<any>(null);
const open_delete = ref(false);
const file = ref<File | null>(null);
const is_loading_create = ref(false);

//--- GET SCOPE
const {
  data: dataScope,
  isFetching: isLoadingScope,
  refetch: refetchScope,
} = useQuery({
  queryKey: ["getScopeMekanik"],
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
            oh_recom: item.oh_recom
              ? {
                  note: item.oh_recom?.note,
                  file: [],
                }
              : null,
            wo_priority: item.wo_priority
              ? {
                  note: item.wo_priority?.note,
                  file: [],
                }
              : null,
            history: item.history
              ? {
                  note: item.history?.note,
                  file: [],
                }
              : null,
            rla: item.rla
              ? {
                  note: item.rla?.note,
                  file: [],
                }
              : null,
            ncr: item.ncr
              ? {
                  note: item.ncr?.note,
                  file: [],
                }
              : null,
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

//--- CREATE SCOPE
const { mutate: createScope } = useMutation({
  mutationFn: async (payload: CreateScopeInterface) => {
    return await mainStore.createScopeStandar(payload);
  },
  onSuccess: (data) => {
    if (file.value === null) {
      refetchScope();
      asset_welness.value.modelOpenInputData = false;
      toastRef.value?.showToast({
        title: "Success",
        description: "Saved successfully",
        type: "success",
      });
      file.value = null;
      is_loading_create.value = false;
    } else {
      createDocument({
        document: file.value,
        document_type: "App\\Models\\Trasaction\\ScopeStandartAsset",
        document_uuid: data.data.uuid,
      });
    }
  },
  onError: (error: any) => {
    console.log(error);
    toastRef.value?.showToast({
      title: "Error",
      description: error?.response?.data?.message || "Something went wrong",
      type: "error",
    });
    file.value = null;
    is_loading_create.value = false;
  },
});
//--- END

//--- CREATE DOCUMENT
const { mutate: createDocument } = useMutation({
  mutationFn: async (payload: CreateDocumentInterface) => {
    return await globalStore.createDocument(payload);
  },
  onSuccess: () => {
    refetchScope();
    oh_recom.value.modelOpenInputData = false;
    wo_priority.value.modelOpenInputData = false;
    history.value.modelOpenInputData = false;
    rla.value.modelOpenInputData = false;
    ncr.value.modelOpenInputData = false;
    toastRef.value?.showToast({
      title: "Success",
      description: "Saved successfully",
      type: "success",
    });
    file.value = null;
    is_loading_create.value = false;
  },
  onError: (error: any) => {
    console.log(error);
    toastRef.value?.showToast({
      title: "Error",
      description: error?.response?.data?.message || "Something went wrong",
      type: "error",
    });
    file.value = null;
    is_loading_create.value = false;
  },
});
//--- END

//--- DELETE SCOPE
const { mutate: deleteScope, isPending: isLoadingDelete } = useMutation({
  mutationFn: async (id: string) => {
    return await mainStore.deleteScopeStandar(id);
  },
  onSuccess: () => {
    refetchScope();
    toastRef.value?.showToast({
      title: "Success",
      description: "Deleted successfully",
      type: "success",
    });
    open_delete.value = false;
  },
  onError: (error: any) => {
    console.log(error);
    toastRef.value?.showToast({
      title: "Error",
      description: error?.response?.data?.message || "Something went wrong",
      type: "error",
    });
    open_delete.value = true;
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
  refetchScope();
};

const changeLimit = (e: string) => {
  params.perPage = parseInt(e);
  params.currentPage = 1;
  refetchScope();
};

const saveAssetWelness = (
  e: { color: TColor; note: string },
  entity: ScopeInterface
) => {
  is_loading_create.value = true;
  file.value = null;
  createScope({
    color: e.color,
    note: e.note,
    category: "asset-welness",
    scope_standart_uuid: entity.id,
  });
};

const saveFieldWithFile = (
  e: { note: string; file: ValueUploadType[] },
  entity: ScopeInterface,
  field: string
) => {
  is_loading_create.value = true;
  file.value = e.file?.[0]?.file as File;
  createScope({
    color: null,
    note: e.note,
    category: field,
    scope_standart_uuid: entity.id,
  });
};

const handleDelete = (e: ScopeInterface) => {
  selected_item.value = e;
  open_delete.value = true;
};

const onDelete = () => {
  deleteScope(selected_item.value?.id as string);
};
</script>

<template>
  <Toast ref="toastRef" />
  <ModalDelete
    v-model="open_delete"
    :title="selected_item?.asset"
    :loading="isLoadingDelete"
    @delete="onDelete"
  />
  <Table
    label-create="Asset"
    :columns="ColumnsScope"
    :entities="entitiesScope"
    :loading="isLoadingScope"
    :pagination="pagination"
    :is-create="false"
    @delete="handleDelete"
    @change-page="changePage"
    @change-limit="changeLimit"
  >
    <template #column_asset_welness="{ entity }">
      <div class="w-full flex justify-center">
        <FormAssetWelness
          ref="asset_welness"
          :value="entity.asset_welness"
          :label="entity.asset"
          :loading="is_loading_create"
          @save="(e) => saveAssetWelness(e, entity)"
        />
      </div>
    </template>
    <template #column_oh_recom="{ entity }">
      <div class="w-full flex justify-center">
        <FormWithUploadFile
          ref="oh_recom"
          :value="entity.oh_recom"
          :label="entity.asset"
          :loading="is_loading_create"
          @save="(e) => saveFieldWithFile(e, entity, 'oh-recom')"
        />
      </div>
    </template>
    <template #column_wo_priority="{ entity }">
      <div class="w-full flex justify-center">
        <FormWithUploadFile
          ref="wo_priority"
          :value="entity.wo_priority"
          :label="entity.asset"
          :loading="is_loading_create"
          @save="(e) => saveFieldWithFile(e, entity, 'wo-priority')"
        />
      </div>
    </template>
    <template #column_history="{ entity }">
      <div class="w-full flex justify-center">
        <FormWithUploadFile
          ref="history"
          :value="entity.history"
          :label="entity.asset"
          :loading="is_loading_create"
          @save="(e) => saveFieldWithFile(e, entity, 'history')"
        />
      </div>
    </template>
    <template #column_rla="{ entity }">
      <div class="w-full flex justify-center">
        <FormWithUploadFile
          ref="rla"
          :value="entity.rla"
          :label="entity.asset"
          :loading="is_loading_create"
          @save="(e) => saveFieldWithFile(e, entity, 'rla')"
        />
      </div>
    </template>
    <template #column_ncr="{ entity }">
      <div class="w-full flex justify-center">
        <FormWithUploadFile
          ref="ncr"
          :value="entity.ncr"
          :label="entity.asset"
          :loading="is_loading_create"
          @save="(e) => saveFieldWithFile(e, entity, 'ncr')"
        />
      </div>
    </template>
    <template #children="{ entity, index, parentActive }">
      <tr v-if="parentActive === index && entity.children.length === 0">
        <td :colspan="ColumnsScope.length + 1" class="td-child">
          <div class="v-table-body">
            <p class="v-table-body-text pl-11 text-center">Not Found Data</p>
          </div>
        </td>
      </tr>
      <tr
        v-if="parentActive === index && entity.children.length > 0"
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
