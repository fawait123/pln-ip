<!-- <script setup lang="ts">
import {
  AssetWelness,
  ButtonDots,
  ButtonOptions,
  FormDuration,
  FormIK,
  FormQcPlan,
  FormWithFile,
  Icon,
  Table,
  FormMaterial,
  FormManpower,
  FormPart,
} from "@/components";
import { ColumnsScope } from "../constants/ScopeConstant";
import { ref, watch } from "vue";
import type { ValueUploadType } from "@/components/fields/Upload.vue";
import type { AddScopeTableInterface } from "../types/AddScopeTableType";

const DataChildren = [
  {
    id: 1,
    name: "Diassembly",
    material: null,
    duration: "",
    manpower: null,
    ik: null,
    qc_plan: null,
    part: null,
  },
  {
    id: 2,
    name: "Inspection",
    material: null,
    duration: "",
    manpower: null,
    ik: null,
    qc_plan: null,
    part: null,
  },
  {
    id: 3,
    name: "Assembly",
    material: null,
    duration: "",
    manpower: null,
    ik: null,
    qc_plan: null,
    part: null,
  },
];

const OptionsMaterial = ref([
  {
    label: "Material A",
    value: "Material A",
  },
  {
    label: "Material B",
    value: "Material B",
  },
]);

const OptionsDuration = ref([
  {
    label: "Duration A",
    value: "Duration A",
  },
  {
    label: "Duration B",
    value: "Duration B",
  },
]);

const OptionsManpower = ref([
  {
    label: "Manpower A",
    value: "Manpower A",
  },
  {
    label: "Manpower B",
    value: "Manpower B",
  },
]);

const OptionsIk = ref([
  {
    label: "IK A",
    value: "IK A",
  },
  {
    label: "IK B",
    value: "IK B",
  },
]);

const OptionsQcPlan = ref([
  {
    label: "QC Plan A",
    value: "QC Plan A",
  },
  {
    label: "QC Plan B",
    value: "QC Plan B",
  },
]);

const OptionsPart = ref([
  {
    label: "Part A",
    value: "Part A",
  },
  {
    label: "Part B",
    value: "Part B",
  },
]);

const Data = ref<AddScopeTableInterface[]>([
  {
    id: 1,
    asset: "Vane Row 1",
    asset_welness: null,
    oh_recom: null,
    wo_priority: null,
    history: null,
    rla: null,
    etc: null,
    children: DataChildren,
  },
  {
    id: 2,
    asset: "Vane Row 2",
    asset_welness: null,
    oh_recom: null,
    wo_priority: null,
    history: null,
    rla: null,
    etc: null,
    children: DataChildren,
  },
]);

const saveAssetWelness = (
  e: { color: string; result: { id: number; note: string }[] },
  entity: AddScopeTableInterface
) => {
  const duplicate_data = [...Data.value];
  const find_index = Data.value.findIndex((item) => item.id === entity.id);

  if (find_index !== -1) {
    duplicate_data[find_index].asset_welness = {
      color: e.color,
      result: e.result,
    };
    Data.value = duplicate_data;
  }
};

const saveFieldWithFile = (
  e: { result: { id: number; note: string }[]; file: ValueUploadType[] },
  entity: AddScopeTableInterface,
  field: string
) => {
  const duplicate_data = [...Data.value];
  const find_index = Data.value.findIndex((item) => item.id === entity.id);

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
    Data.value = duplicate_data;
  }
};

const onCreate = (e: string) => {
  const new_data = [...Data.value];

  new_data.unshift({
    id: new_data.length + 1,
    asset: e,
    asset_welness: null,
    oh_recom: null,
    wo_priority: null,
    history: null,
    rla: null,
    etc: null,
    children: DataChildren,
  });

  Data.value = new_data;
};

const onDelete = (e: AddScopeTableInterface) => {
  Data.value = Data.value.filter((item) => item.id !== e.id);
};

const clickOptions = (
  parentIndex: number,
  childIndex: number,
  value: any,
  field: "material" | "duration" | "manpower" | "ik" | "qc_plan" | "part"
) => {
  const new_data = Data.value.map((parent) => ({
    ...parent,
    children: parent.children.map((child) => ({ ...child })),
  }));

  if (field === "material")
    new_data[parentIndex].children[childIndex].material = value;
  if (field === "duration")
    new_data[parentIndex].children[childIndex].duration = value;
  if (field === "manpower")
    new_data[parentIndex].children[childIndex].manpower = value;
  if (field === "ik") new_data[parentIndex].children[childIndex].ik = value;
  if (field === "qc_plan")
    new_data[parentIndex].children[childIndex].qc_plan = value;
  if (field === "part") new_data[parentIndex].children[childIndex].part = value;

  Data.value = new_data;
};

watch(
  Data,
  (value) => {
    console.log("AA", value);
  },
  { deep: true }
);
</script>

<template>
  <Table
    label-create="Asset"
    :columns="ColumnsScope"
    :entities="Data"
    @create="onCreate"
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
        <ButtonDots />
        <Icon name="trash" class="table-delete" @click="onDelete(entity)" />
      </div>
    </template>
    <template #children="{ entity, index, parentActive }">
      <tr
        v-if="parentActive === index"
        v-for="(child, childIndex) in entity.children"
        :key="childIndex"
      >
        <td
          v-for="(column, id) in ColumnsScope"
          :key="`column.${index.toString() + id.toString()}`"
          class="td-child"
        >
          <div v-if="id === 0" class="v-table-body">
            <p class="v-table-body-text pl-11">
              {{ child.name }}
            </p>
          </div>
          <div v-if="id === 1" class="v-table-body flex justify-center">
            <FormMaterial
              :value="Data[index].children[childIndex].material || undefined"
              @save="(e) => clickOptions(index, childIndex, e, 'material')"
            />
          </div>
          <div v-if="id === 2" class="v-table-body flex justify-center">
            <FormDuration
              :value="Data[index].children[childIndex].duration"
              @save="(e) => clickOptions(index, childIndex, e, 'duration')"
            />
          </div>
          <div v-if="id === 3" class="v-table-body flex justify-center">
            <FormManpower
              :value="Data[index].children[childIndex].manpower || undefined"
              @save="(e) => clickOptions(index, childIndex, e, 'manpower')"
            />
          </div>
          <div v-if="id === 4" class="v-table-body flex justify-center">
            <FormIK
              :value="Data[index].children[childIndex].ik || []"
              @save="(e) => clickOptions(index, childIndex, e, 'ik')"
            />
          </div>
          <div v-if="id === 5" class="v-table-body flex justify-center">
            <FormQcPlan
              :value="Data[index].children[childIndex].qc_plan || []"
              @save="(e) => clickOptions(index, childIndex, e, 'qc_plan')"
            />
          </div>
          <div v-if="id === 6" class="v-table-body flex justify-center">
            <FormPart
              :value="Data[index].children[childIndex].part || undefined"
              @save="(e) => clickOptions(index, childIndex, e, 'part')"
            />
          </div>
        </td>
        <td class="td-child w-[5%]"></td>
      </tr>
    </template>
  </Table> -->
<!-- <p class="font-bold text-black text-2xl">TEST</p> -->
<!-- </template> -->
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
  Toast,
} from "@/components";
import type { ValueUploadType } from "@/components/fields/Upload.vue";
import { useMutation, useQuery } from "@tanstack/vue-query";
import type { CreateDocumentInterface, IPagination } from "@/types/GlobalType";
import { useGlobalStore } from "@/stores/GlobalStore";

import type {
  ResponseAddScopeInterface,
  AddScopeInterface,
  CreateAddScopeInterface,
} from "../types/AddScopeTableType";
import { ColumnsScope } from "../constants/ScopeConstant";
import { useMainStore } from "../stores/MainStore";
import type { TColor } from "../types/ScopeType";
import FormAssetWelness from "../components/FormAssetWelness.vue";
import FormWithUploadFile from "../components/FormWithUploadFile.vue";

const entitiesScope = ref<AddScopeInterface[]>([]);

const mainStore = useMainStore();
const globalStore = useGlobalStore();
const router = useRouter();
const route = useRoute();
const params = reactive({
  search: "",
  filters: `project_uuid,${route.params.id_project}&category,listrik`,
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
      const { data } = await mainStore.getAddScope(params);
      const response = data as IPagination<ResponseAddScopeInterface[]>;

      total_item.value = response.total;

      const new_arr: AddScopeInterface[] =
        response.data?.map((item) => {
          return {
            id: item.uuid,
            squence: item.sequence_animation,
            day: item.day,
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
                  file: item.oh_recom?.document
                    ? [
                        {
                          id: item.oh_recom.document.uuid,
                          name: item.oh_recom.document.document_original_name,
                          size: item.oh_recom.document.document_size,
                          file: item.oh_recom.document.document_link,
                        },
                      ]
                    : [],
                }
              : null,
            wo_priority: item.wo_priority
              ? {
                  note: item.wo_priority?.note,
                  file: item.wo_priority?.document
                    ? [
                        {
                          id: item.wo_priority.document.uuid,
                          name: item.wo_priority.document
                            .document_original_name,
                          size: item.wo_priority.document.document_size,
                          file: item.wo_priority.document.document_link,
                        },
                      ]
                    : [],
                }
              : null,
            history: item.history
              ? {
                  note: item.history?.note,
                  file: item.history?.document
                    ? [
                        {
                          id: item.history.document.uuid,
                          name: item.history.document.document_original_name,
                          size: item.history.document.document_size,
                          file: item.history.document.document_link,
                        },
                      ]
                    : [],
                }
              : null,
            rla: item.rla
              ? {
                  note: item.rla?.note,
                  file: item.rla?.document
                    ? [
                        {
                          id: item.rla.document.uuid,
                          name: item.rla.document.document_original_name,
                          size: item.rla.document.document_size,
                          file: item.rla.document.document_link,
                        },
                      ]
                    : [],
                }
              : null,
            ncr: item.ncr
              ? {
                  note: item.ncr?.note,
                  file: item.ncr?.document
                    ? [
                        {
                          id: item.ncr.document.uuid,
                          name: item.ncr.document.document_original_name,
                          size: item.ncr.document.document_size,
                          file: item.ncr.document.document_link,
                        },
                      ]
                    : [],
                }
              : null,
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

//--- CREATE ADD SCOPE
const { mutate: createAddScope } = useMutation({
  mutationFn: async (payload: CreateAddScopeInterface) => {
    return await mainStore.createAddScope(payload);
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
        document_type: "App\\Models\\Transaction\\ScopeStandartAsset",
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
  entity: AddScopeInterface
) => {
  is_loading_create.value = true;
  file.value = null;
  createAddScope({
    color: e.color,
    note: e.note,
    category: "asset-welness",
    scope_standart_uuid: entity.id,
  });
};

const saveFieldWithFile = (
  e: { note: string; file: ValueUploadType[] },
  entity: AddScopeInterface,
  field: string
) => {
  is_loading_create.value = true;
  if (typeof e.file?.[0]?.file !== "string") {
    file.value = e.file?.[0]?.file as File;
  } else {
    file.value = null;
  }
  createAddScope({
    color: null,
    note: e.note,
    category: field,
    scope_standart_uuid: entity.id,
  });
};

const toDetail = (id: string) => {
  router.push(
    `/${route.params.id}/create/unit/${route.params.id_unit}/${route.params.menu}/${route.params.id_project}/${route.params.id_inspection}/add-scope/${id}/scope-mekanik`
  );
};

const toSquence = (item: AddScopeInterface) => {
  router.push(
    `/${route.params.id}/create/unit/${route.params.id_unit}/${route.params.menu}/${route?.params?.id_project}/${route.params.id_inspection}/add-scope-squences/${item.squence?.slug}`
  );
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
  <Toast ref="toastRef" />
  <Table
    label-create="Asset"
    :columns="ColumnsScope"
    :entities="entitiesScope"
    :loading="isLoadingScope"
    :pagination="pagination"
    :is-create="false"
    v-model:model-search="params.search"
    @change-page="changePage"
    @change-limit="changeLimit"
    @search="searchTable"
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
    <template #column_action="{ entity }">
      <div class="flex items-center justify-center gap-2">
        <ButtonDots
          :day="entity.day"
          @detail="toDetail(entity.id)"
          @squence="toSquence(entity)"
        />
        <!-- <Icon name="trash" class="table-delete" @click="onDelete(entity)" /> -->
      </div>
    </template>
  </Table>
  <!-- <p class="font-bold text-black text-2xl">TEST</p> -->
</template>
