<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import type { AxiosError } from "axios";

import { Button, Table } from "@/components";
import { useQuery } from "@tanstack/vue-query";
import type { IPagination } from "@/types/GlobalType";

import { ColumnsLocation } from "../constants/LocationConstant";
import type { LocationInterface } from "../types/LocationType";
import { useMasterStore } from "../stores/MasterStore";
import FormLocation from "../components/FormLocation.vue";

const Entities: LocationInterface[] = [];
const masterStore = useMasterStore();
const total_item = ref(0);
const params = reactive({
  search: "",
  filter: "",
  currentPage: 1,
  perPage: 10,
});
const open_form = ref(false);

//--- GET LOCATION
const {
  data: dataLocation,
  isFetching: isLoadingLocation,
  refetch: refetchLocation,
} = useQuery({
  queryKey: ["getLocationMaster"],
  queryFn: async () => {
    try {
      const { data } = await masterStore.getLocation(params);
      const response = data as IPagination<LocationInterface[]>;

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

const pagination = computed(() => {
  return {
    totalItems: total_item.value,
    itemsPerPage: params.perPage,
    currentPage: params.currentPage,
  };
});

const changePage = (e: number) => {
  params.currentPage = e;
  refetchLocation();
};

const changeLimit = (e: string) => {
  params.perPage = parseInt(e);
  params.currentPage = 1;
  refetchLocation();
};
</script>

<template>
  <div class="relative w-full">
    <Button
      icon_only="plus"
      class="absolute right-0"
      size="sm"
      rounded="full"
      color="blue"
      @click="open_form = true"
    />

    <Table
      label-create="Location"
      :columns="ColumnsLocation"
      :entities="Entities"
      :loading="isLoadingLocation"
      :pagination="pagination"
      :is-create="false"
      @change-page="changePage"
      @change-limit="changeLimit"
    ></Table>

    <FormLocation v-model="open_form" />
  </div>
</template>
