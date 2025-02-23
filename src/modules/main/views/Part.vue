<script setup lang="ts">
import type { AxiosError } from "axios";
import { computed, reactive, ref } from "vue";
import { useRoute } from "vue-router";

import { Table, Quantity } from "@/components";
import { useQuery } from "@tanstack/vue-query";
import type { IPagination } from "@/types/GlobalType";

import { ColumnsPart } from "../constants/PartConstant";
import type { PartInterface, ResponsePartInterface } from "../types/PartType";
import { useMainStore } from "../stores/MainStore";

const entitiesPart = ref<PartInterface[]>([]);

const mainStore = useMainStore();
const route = useRoute();
const params = reactive({
  search: "",
  filter: `project_uuid,${route.params.id_project}`,
  currentPage: 1,
  perPage: 10,
});
const total_item = ref(0);

//--- GET PART
const {
  data: dataPart,
  isFetching: isLoadingPart,
  refetch: refetchPart,
} = useQuery({
  queryKey: ["getPart"],
  queryFn: async () => {
    try {
      const { data } = await mainStore.getPart(params);
      const response = data as IPagination<ResponsePartInterface[]>;

      total_item.value = response.total;

      const new_arr: PartInterface[] =
        response.data?.map((item) => {
          return {
            id: item.uuid,
            part: item.name,
            document: null,
            quantity: item.qty.toString(),
            volume: item.global_unit?.name,
            number_drawing: item.no_drawing,
          };
        }) || [];
      entitiesPart.value = new_arr;

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
  refetchPart();
};

const changeLimit = (e: string) => {
  params.perPage = parseInt(e);
  params.currentPage = 1;
  refetchPart();
};

const saveQuantity = (e: { quantity: string }, entity: PartInterface) => {
  const duplicate_data = [...entitiesPart.value];
  const find_index = entitiesPart.value.findIndex(
    (item) => item.id === entity.id
  );

  if (find_index !== -1) {
    duplicate_data[find_index].quantity = e.quantity;
    entitiesPart.value = duplicate_data;
  }
};
</script>

<template>
  <Table
    label-create="Part"
    :columns="ColumnsPart"
    :entities="entitiesPart"
    :loading="isLoadingPart"
    :pagination="pagination"
    :is-create="false"
    :is-action="false"
    @change-page="changePage"
    @change-limit="changeLimit"
  >
    <!-- <template #column_document="{ entity }">
      <div class="w-full flex justify-center">
        <FormUploadOnly
          :value="entity.document"
          :label="entity.part"
          @save="(e) => saveFile(e, entity)"
        />
      </div>
    </template> -->
    <template #column_quantity="{ entity }">
      <div class="w-full flex justify-center">
        <Quantity
          :value="entity.quantity || ''"
          :label="entity.part"
          @save="(e) => saveQuantity(e, entity)"
        />
      </div>
    </template>
    <template #column_unit="{ entity }">
      <div class="w-full flex justify-center">
        <div
          class="border border-neutral-50 rounded-lg px-2 min-w-[100px] text-base text-neutral-50 text-center"
        >
          {{ entity.volume }}
        </div>
      </div>
    </template>
    <!-- <template #column_volume="{ entity }">
      <div class="w-full flex justify-center">
        <Volume
          type="part"
          :value="entity.volume || ''"
          @save="(e) => saveVolume(e, entity)"
        />
      </div>
    </template> -->
  </Table>
</template>
