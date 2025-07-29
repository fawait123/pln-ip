<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import type { AxiosError } from "axios";

import { Button, Icon, ModalDelete, Table, Toast } from "@/components";
import { useMutation, useQuery } from "@tanstack/vue-query";
import type { IPagination } from "@/types/GlobalType";

import { ColumnsUser } from "../constants/UserConstant";
import type { UserInterface } from "../types/UserType";
import { useMasterStore } from "../stores/MasterStore";
import FormUser from "../components/FormUser.vue";

const masterStore = useMasterStore();
const total_item = ref(0);
const params = reactive({
  search: "",
  filter: "",
  currentPage: 1,
  perPage: 10,
});
const open_form = ref(false);
const open_delete = ref(false);
const selected_item = ref<UserInterface | null>(null);
const toastRef = ref<InstanceType<typeof Toast> | null>(null);
const timeout = ref(0);

//--- GET USER
const {
  data: dataUser,
  isFetching: isLoadingUser,
  refetch: refetchUser,
} = useQuery({
  queryKey: ["getUserMaster"],
  queryFn: async () => {
    try {
      const { data } = await masterStore.getUser(params);
      const response = data.data as IPagination<UserInterface[]>;

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

//--- DELETE USER
const { mutate: deleteUser, isPending: isLoadingDelete } = useMutation({
  mutationFn: async (id: number) => {
    return await masterStore.deleteUser(id);
  },
  onSuccess: () => {
    toastRef.value?.showToast({
      title: "Success",
      description: "Deleted successfully",
      type: "success",
    });
    open_delete.value = false;
    refetchUser();
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
  refetchUser();
};

const changeLimit = (e: string) => {
  params.perPage = parseInt(e);
  params.currentPage = 1;
  refetchUser();
};

const searchTable = () => {
  clearTimeout(timeout.value);
  timeout.value = window.setTimeout(() => {
    params.currentPage = 1;
    refetchUser();
  }, 1000);
};

const handleSuccess = () => {
  toastRef.value?.showToast({
    title: "Success",
    description: "Saved successfully",
    type: "success",
  });
  params.currentPage = 1;
  refetchUser();
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

const handleUpdate = (item: UserInterface) => {
  selected_item.value = item;
  open_form.value = true;
};

const handleDelete = (item: UserInterface) => {
  selected_item.value = item;
  open_delete.value = true;
};

const onDelete = () => {
  deleteUser(selected_item.value?.id as number);
};
</script>

<template>
  <Toast ref="toastRef" />
  <ModalDelete v-model="open_delete" :title="selected_item?.name" :loading="isLoadingDelete" @delete="onDelete" />
  <div class="relative w-full">
    <Button icon_only="plus" class="absolute right-0" size="sm" rounded="full" color="blue" @click="handleCreate" />

    <Table label-create="User" :columns="ColumnsUser" :entities="dataUser?.data || []" :loading="isLoadingUser"
      :pagination="pagination" :is-create="false" v-model:model-search="params.search" @change-page="changePage"
      @change-limit="changeLimit" @search="searchTable">
      <template #column_action="{ entity }">
        <div v-if="entity.roles?.[0]?.name !== 'superuser'" class="flex items-center justify-center gap-4">
          <Icon name="pencil" class="icon-action-table" @click="handleUpdate(entity)" />
          <Icon name="trash" class="icon-action-table" @click="handleDelete(entity)" />
        </div>
        <div v-else />
      </template>
      <template #column_role="{ entity }">
        <p class="text-base text-neutral-50 text-center" v-for="role in entity.roles">
          {{ role?.display_name }}
        </p>
      </template>
    </Table>

    <FormUser v-model="open_form" :selected-value="selected_item" @success="handleSuccess" @error="handleError" />
  </div>
</template>
