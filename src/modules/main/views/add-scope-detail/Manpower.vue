<script setup lang="ts">
import type { AxiosError } from "axios";
import { computed, reactive, ref } from "vue";
import { useRoute } from "vue-router";

import { Table, Quantity } from "@/components";
import { useQuery } from "@tanstack/vue-query";
import type { IPagination } from "@/types/GlobalType";

import { ColumnsAddScopeDetailManpower } from "../../constants/AddScope";
import type {
  ManPowerInterface,
  ResponseManPowerInterface,
} from "../../types/ManpowerType";
import { useMainStore } from "../../stores/MainStore";

// const Data = ref<ManPowerInterface[]>([
//   {
//     id: "1",
//     manpower: "Teknisi Mekanik",
//     document: null,
//     quantity: null,
//     volume: null,
//     note: null,
//     children: [],
//   },
// ]);
const entitiesManPower = ref<ManPowerInterface[]>([]);

const mainStore = useMainStore();
const route = useRoute();
const params = reactive({
  search: "",
  filter: `additional_scope_uuid,${route.params.id_scope}`,
  currentPage: 1,
  perPage: 10,
});
const total_item = ref(0);

//--- GET MANPOWER
const {
  data: dataManPower,
  isFetching: isLoadingManPower,
  refetch: refetchManPower,
} = useQuery({
  queryKey: ["getAddScopeManPower"],
  queryFn: async () => {
    try {
      const { data } = await mainStore.getManPower(params);
      const response = data as IPagination<ResponseManPowerInterface[]>;

      total_item.value = response.total;

      const new_arr: ManPowerInterface[] =
        response.data?.map((item) => {
          return {
            id: item.uuid,
            manpower: item.name,
            quantity: item.qty.toString(),
            type: item.type,
            additional_scope_uuid: item.additional_scope_uuid,
            project_uuid: item.project_uuid,
            note: item.note,
          };
        }) || [];
      entitiesManPower.value = new_arr;

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
  refetchManPower();
};

const changeLimit = (e: string) => {
  params.perPage = parseInt(e);
  params.currentPage = 1;
  refetchManPower();
};

const saveQuantity = (e: { quantity: string }, entity: ManPowerInterface) => {
  const duplicate_data = [...entitiesManPower.value];
  const find_index = entitiesManPower.value.findIndex(
    (item) => item.id === entity.id
  );

  if (find_index !== -1) {
    duplicate_data[find_index].quantity = e.quantity;
    entitiesManPower.value = duplicate_data;
  }
};
</script>

<template>
  <Table
    label-create="Manpower"
    :columns="ColumnsAddScopeDetailManpower"
    :entities="entitiesManPower"
    :loading="isLoadingManPower"
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
          :label="entity.manpower"
          @save="(e) => saveFile(e, entity)"
        />
      </div>
    </template> -->
    <template #column_quantity="{ entity }">
      <div class="w-full flex justify-center">
        <Quantity
          :value="entity.quantity || ''"
          :label="entity.manpower"
          @save="(e) => saveQuantity(e, entity)"
        />
      </div>
    </template>
    <template #column_unit="{ entity }">
      <div class="w-full flex justify-center">
        <div
          class="border border-neutral-50 rounded-lg px-2 min-w-[100px] text-base text-neutral-50 text-center"
        >
          {{ entity.type }}
        </div>
      </div>
    </template>
    <!-- <template #column_note="{ entity }">
      <div class="w-full flex justify-center">
        <FormAddNote
          :value="entity.note || ''"
          :label="entity.manpower"
          @save="(e) => saveNote(e, entity)"
        />
      </div>
    </template> -->
    <!-- <template #children="{ entity, index, parentActive }">
      <tr
        v-if="parentActive === index"
        v-for="(child, childIndex) in entity.children"
        :key="childIndex"
      >
        <td :colspan="ColumnsManpower.length + 1" class="td-child">
          <div class="v-table-body">
            <p class="v-table-body-text pl-11">
              {{ child.name }}
            </p>
          </div>
        </td>
      </tr>
    </template> -->
  </Table>
</template>
