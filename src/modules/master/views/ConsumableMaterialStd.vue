<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import type { AxiosError } from "axios";

import {
  Breadcrumb,
  Button,
  Icon,
  ModalDelete,
  Table,
  Toast,
} from "@/components";
import { useMutation, useQuery } from "@tanstack/vue-query";
import type { IPagination } from "@/types/GlobalType";
import type { BreadcrumbType } from "@/components/navigations/Breadcrumb.vue";

import { useMasterStore } from "../stores/MasterStore";
import FilterConsumableMaterialStd from "../components/FilterConsumableMaterialStd.vue";
import type {
  ConsumableMaterialStdCreateModelInterface,
  ConsumableMaterialStdInterface,
} from "../types/ConsumableMaterialStdType";
import { ColumnConsumableMaterialStd } from "../constants/ConsumableMaterialStdConstant";
import FormConsumableMaterialStd from "../components/FormConsumableMaterialStd.vue";

const dataForm = ref<ConsumableMaterialStdCreateModelInterface | null>(null);
const masterStore = useMasterStore();
const total_item = ref(0);
const params = reactive({
  search: "",
  filter: "",
  filters: [
    {
      group: "AND",
      operator: "NOT_NULL",
      column: "activity.equipment.scopeStandart.inspection_type_uuid",
      value: "",
    },
  ],
  currentPage: 1,
  perPage: 10,
});
const open_form = ref(false);
const open_delete = ref(false);
const selected_item = ref<ConsumableMaterialStdInterface | null>(null);
const toastRef = ref<InstanceType<typeof Toast> | null>(null);
const timeout = ref(0);
const breadcrumb = ref<BreadcrumbType[]>([]);

//--- GET SCOPE
const {
  data: dataScope,
  isFetching: isLoadingScope,
  refetch: refetchScope,
} = useQuery({
  queryKey: ["getConsumableMaterialStd"],
  queryFn: async () => {
    try {
      const { data } = await masterStore.getConsumableMaterialStd(params);
      const response = data.data as IPagination<
        ConsumableMaterialStdInterface[]
      >;
      total_item.value = response.total;

      return response;
    } catch (error: any) {
      const err = error as AxiosError;
      throw err.response;
    }
  },
  refetchOnWindowFocus: false,
});
//--- END

//--- DELETE SCOPE
const { mutate: deleteScope, isPending: isLoadingDelete } = useMutation({
  mutationFn: async (id: string) => {
    return await masterStore.deleteManpowerStd(id);
  },
  onSuccess: () => {
    toastRef.value?.showToast({
      title: "Success",
      description: "Deleted successfully",
      type: "success",
    });
    open_delete.value = false;
    refetchScope();
  },
  onError: (error: any) => {
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
  refetchScope();
};

const changeLimit = (e: string) => {
  params.perPage = parseInt(e);
  params.currentPage = 1;
  refetchScope();
};

const searchTable = () => {
  clearTimeout(timeout.value);
  timeout.value = window.setTimeout(() => {
    params.currentPage = 1;
    refetchScope();
  }, 1000);
};

const handleSuccess = () => {
  toastRef.value?.showToast({
    title: "Success",
    description: "Saved successfully",
    type: "success",
  });
  params.currentPage = 1;
  refetchScope();
};

const handleError = (error: any) => {
  toastRef.value?.showToast({
    title: "Error",
    description: error?.response?.data?.message || "Something went wrong",
    type: "error",
  });
};

const handleCreate = () => {
  selected_item.value = null;
  open_form.value = true;
};

const handleUpdate = (item: ConsumableMaterialStdInterface) => {
  selected_item.value = item;
  open_form.value = true;
};

const handleDelete = (item: ConsumableMaterialStdInterface) => {
  selected_item.value = item;
  open_delete.value = true;
};

const onDelete = () => {
  deleteScope(selected_item.value?.uuid as string);
};

const setFilter = () => {
  params.filters = [
    {
      group: "AND",
      operator: "EQ",
      column: "activity_uuid",
      value: String(dataForm.value?.activity_uuid),
    },
  ];
};

const resetFilter = () => {
  dataForm.value = null;
  params.filters = [
    {
      group: "AND",
      operator: "NOT_NULL",
      column: "inspection_type_uuid",
      value: "",
    },
  ];
};

const handleOnFilter = (data: ConsumableMaterialStdCreateModelInterface) => {
  dataForm.value = data;
  setFilter();
  refetchScope();
};

const handleResetFilter = () => {
  resetFilter();
  refetchScope();
};

const handleRemoveSuccess = () => {
  refetchScope();
};

onMounted(() => {
  breadcrumb.value = [
    {
      name: "Consumable Material Std",
      as_link: false,
      url: "",
    },
  ];
});
</script>

<template>
  <div class="relative w-full">
    <Button
      v-if="dataForm?.activity_uuid"
      icon_only="plus"
      class="absolute right-0"
      size="sm"
      rounded="full"
      color="blue"
      @click="handleCreate"
    />

    <div class="flex gap-8">
      <div class="w-[330px]">
        <FilterConsumableMaterialStd
          @filter="handleOnFilter"
          @reset-filter="handleResetFilter"
          :loading="isLoadingScope"
        />
      </div>
      <div class="w-full">
        <Breadcrumb :items="breadcrumb" />
        <Table
          label-create="User"
          :columns="ColumnConsumableMaterialStd"
          :entities="dataScope?.data || []"
          :loading="isLoadingScope"
          :pagination="pagination"
          :is-create="false"
          v-model:model-search="params.search"
          class="mt-6"
          @change-page="changePage"
          @change-limit="changeLimit"
          @search="searchTable"
        >
          <template #column_action="{ entity }">
            <div class="flex items-center justify-center gap-4">
              <Icon
                name="pencil"
                class="icon-action-table"
                @click="handleUpdate(entity)"
              />
              <Icon
                name="trash"
                class="icon-action-table"
                @click="handleDelete(entity)"
              />
            </div>
          </template>
          <template #column_cons_mat="{ entity }">
            <p
              class="text-base text-neutral-50 text-left underline cursor-pointer"
            >
              {{ entity.consmat?.name ?? "-" }}
            </p>
          </template>
        </Table>
      </div>
    </div>

    <FormConsumableMaterialStd
      :data-form="dataForm"
      v-model="open_form"
      :selected-value="selected_item"
      @success="handleSuccess"
      @error="handleError"
      @removeSucess="handleRemoveSuccess"
    />
  </div>

  <Toast ref="toastRef" />
  <ModalDelete
    v-model="open_delete"
    :title="selected_item?.uuid"
    :loading="isLoadingDelete"
    @delete="onDelete"
  />
</template>
