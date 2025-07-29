<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import type { AxiosError } from "axios";

import { Button, Icon, ModalDelete, Table, Toast } from "@/components";
import { useMutation, useQuery } from "@tanstack/vue-query";
import type { IPagination } from "@/types/GlobalType";

import { ColumnsActivity } from "../constants/ActivityConstant";
import { useMasterStore } from "../stores/MasterStore";
import type { ActivityInterface } from "../types/AcitivityType";
import FormActivity from "../components/FormActivity.vue";

const masterStore = useMasterStore();
const total_item = ref(0);
const params = reactive({
  search: "",
  filter: "",
  filters: [
    {
      group: "AND",
      operator: "NOT_NULL",
      column: "equipment.scopeStandart.inspection_type_uuid",
      value: null,
    }
  ],
  currentPage: 1,
  perPage: 10,
});
const open_form = ref(false);
const open_delete = ref(false);
const selected_item = ref<ActivityInterface | null>(null);
const toastRef = ref<InstanceType<typeof Toast> | null>(null);
const timeout = ref(0);

//--- GET ACTIVITY
const {
  data: dataActivity,
  isFetching: isLoadingActivity,
  refetch: refetchActivity,
} = useQuery({
  queryKey: ["getActivityMaster"],
  queryFn: async () => {
    try {
      const { data } = await masterStore.getActivity(params);
      const response = data.data as IPagination<ActivityInterface[]>;

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

//--- DELETE ACTIVITY
const { mutate: deleteActivity, isPending: isLoadingDelete } = useMutation({
  mutationFn: async (id: string) => {
    return await masterStore.deleteActivity(id);
  },
  onSuccess: () => {
    toastRef.value?.showToast({
      title: "Success",
      description: "Deleted successfully",
      type: "success",
    });
    open_delete.value = false;
    refetchActivity();
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
  refetchActivity();
};

const changeLimit = (e: string) => {
  params.perPage = parseInt(e);
  params.currentPage = 1;
  refetchActivity();
};

const searchTable = () => {
  clearTimeout(timeout.value);
  timeout.value = window.setTimeout(() => {
    params.currentPage = 1;
    refetchActivity();
  }, 1000);
};

const handleSuccess = () => {
  toastRef.value?.showToast({
    title: "Success",
    description: "Saved successfully",
    type: "success",
  });
  params.currentPage = 1;
  refetchActivity();
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

const handleUpdate = (item: ActivityInterface) => {
  selected_item.value = item;
  open_form.value = true;
};

const handleDelete = (item: ActivityInterface) => {
  selected_item.value = item;
  open_delete.value = true;
};

const onDelete = () => {
  deleteActivity(selected_item.value?.uuid as string);
};
</script>

<template>
  <Toast ref="toastRef" />
  <ModalDelete v-model="open_delete" :title="selected_item?.name" :loading="isLoadingDelete" @delete="onDelete" />

  <div class="relative w-full">
    <Button icon_only="plus" class="absolute right-0" size="sm" rounded="full" color="blue" @click="handleCreate" />

    <Table label-create="Sub Bidang" :columns="ColumnsActivity" :entities="dataActivity?.data || []"
      :loading="isLoadingActivity" :pagination="pagination" :is-create="false" v-model:model-search="params.search"
      @change-page="changePage" @change-limit="changeLimit" @search="searchTable">
      <template #column_action="{ entity }">
        <div class="flex items-center justify-center gap-4">
          <Icon name="pencil" class="icon-action-table" @click="handleUpdate(entity)" />
          <Icon name="trash" class="icon-action-table" @click="handleDelete(entity)" />
        </div>
      </template>
      <template #column_equipment="{ entity }">
        <p class="text-base text-neutral-50 text-left">
          {{ entity.equipment?.name }}
        </p>
      </template>
    </Table>

    <FormActivity v-model="open_form" :selected-value="selected_item" @success="handleSuccess" @error="handleError" />
  </div>
</template>

<style lang="sass"></style>
