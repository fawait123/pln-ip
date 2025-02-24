<script setup lang="ts">
import type { AxiosError } from "axios";
import { computed, reactive, ref } from "vue";
import { useRoute } from "vue-router";

import { FormUploadOnly, Table, Quantity } from "@/components";
import type { ValueUploadType } from "@/components/fields/Upload.vue";
import { useQuery } from "@tanstack/vue-query";
import type { IPagination } from "@/types/GlobalType";

import { ColumnsAddScopeDetailConsMat } from "../../constants/AddScope";
import type {
  ConsumableMaterialInterface,
  ResponseConsMatInterface,
} from "../../types/ConsumableMaterialType";
import { useMainStore } from "../../stores/MainStore";

// const Data = ref<ConsumableMaterialInterface[]>([
//   {
//     id: 1,
//     material: "WD-40",
//     document: null,
//     quantity: null,
//     volume: null,
//     note: null,
//   },
// ]);
const entitiesConsMat = ref<ConsumableMaterialInterface[]>([]);

const mainStore = useMainStore();
const route = useRoute();
const params = reactive({
  search: "",
  filter: `additional_scope_uuid,${route.params.id_scope}`,
  currentPage: 1,
  perPage: 10,
});
const total_item = ref(0);

//--- GET CONSMAT
const {
  data: dataConsMat,
  isFetching: isLoadingConsMat,
  refetch: refetchConsMat,
} = useQuery({
  queryKey: ["getAddScopeConsMat"],
  queryFn: async () => {
    try {
      const { data } = await mainStore.getConsMat(params);
      const response = data as IPagination<ResponseConsMatInterface[]>;

      total_item.value = response.total;

      const new_arr: ConsumableMaterialInterface[] =
        response.data?.map((item) => {
          return {
            id: item.uuid,
            material: item.name,
            merk: item.merk,
            quantity: item.qty.toString(),
            unit: null,
            global_unit_uuid: item.global_unit_uuid,
            project_uuid: item.project_uuid,
            additional_scope_uuid: item.additional_scope_uuid,
          };
        }) || [];
      entitiesConsMat.value = new_arr;

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
  refetchConsMat();
};

const changeLimit = (e: string) => {
  params.perPage = parseInt(e);
  params.currentPage = 1;
  refetchConsMat();
};

const saveQuantity = (
  e: { quantity: string },
  entity: ConsumableMaterialInterface
) => {
  const duplicate_data = [...entitiesConsMat.value];
  const find_index = entitiesConsMat.value.findIndex(
    (item) => item.id === entity.id
  );

  if (find_index !== -1) {
    duplicate_data[find_index].quantity = e.quantity;
    entitiesConsMat.value = duplicate_data;
  }
};
</script>

<template>
  <Table
    label-create="Material"
    :columns="ColumnsAddScopeDetailConsMat"
    :entities="entitiesConsMat"
    :loading="isLoadingConsMat"
    :pagination="pagination"
    :is-create="false"
    :is-action="false"
    @change-page="changePage"
    @change-limit="changeLimit"
  >
    <!-- <template #column_merk="{ entity }">
      <div class="w-full flex justify-center">
        <FormUploadOnly
          :value="entity.merk"
          :label="entity.material"
          @save="(e) => saveFile(e, entity)"
        />
      </div>
    </template> -->
    <template #column_quantity="{ entity }">
      <div class="w-full flex justify-center">
        <Quantity
          :value="entity.quantity || ''"
          :label="entity.material"
          @save="(e) => saveQuantity(e, entity)"
        />
      </div>
    </template>
    <template #column_unit="{ entity }">
      <div class="w-full flex justify-center">
        <div
          v-if="entity.unit"
          class="border border-neutral-50 rounded-lg px-2 min-w-[100px] text-base text-neutral-50 text-center"
        >
          {{ entity.unit }}
        </div>
        <div v-else>-</div>
      </div>
    </template>
  </Table>
</template>
