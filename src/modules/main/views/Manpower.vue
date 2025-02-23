<script setup lang="ts">
import type { AxiosError } from "axios";
import { computed, reactive, ref } from "vue";
import { useRoute } from "vue-router";

import { Table, Toast } from "@/components";
import { useMutation, useQuery } from "@tanstack/vue-query";
import type { IPagination } from "@/types/GlobalType";

import { ColumnsManpower } from "../constants/ManpowerConstant";
import type {
  ManPowerInterface,
  ResponseManPowerInterface,
  UpdateManPowerInterface,
} from "../types/ManpowerType";
import { useMainStore } from "../stores/MainStore";
import FormQuantity from "../components/FormQuantity.vue";

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
  filter: `project_uuid,${route.params.id_project}`,
  currentPage: 1,
  perPage: 10,
});
const total_item = ref(0);
const toastRef = ref<InstanceType<typeof Toast> | null>(null);
const quantity = ref<any>(null);

//--- GET MANPOWER
const {
  data: dataManPower,
  isFetching: isLoadingManPower,
  refetch: refetchManPower,
} = useQuery({
  queryKey: ["getManPower"],
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

//--- UPDATE MANPOWER
const { mutate: updateCManPower, isPending: isLoadingUpdate } = useMutation({
  mutationFn: async ({
    payload,
    id,
  }: {
    payload: UpdateManPowerInterface;
    id: string;
  }) => {
    return await mainStore.updateManPower(payload, id);
  },
  onSuccess: async () => {
    refetchManPower();
    quantity.value.modelOpenInputData = false;
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
  refetchManPower();
};

const changeLimit = (e: string) => {
  params.perPage = parseInt(e);
  params.currentPage = 1;
  refetchManPower();
};

const saveQuantity = (e: { quantity: string }, entity: ManPowerInterface) => {
  updateCManPower({
    id: entity.id,
    payload: {
      name: entity.manpower,
      qty: parseFloat(e.quantity),
      additional_scope_uuid: entity.additional_scope_uuid,
      project_uuid: entity.project_uuid,
      type: entity.type,
    },
  });
};
</script>

<template>
  <Toast ref="toastRef" />
  <Table
    label-create="Manpower"
    :columns="ColumnsManpower"
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
        <FormQuantity
          ref="quantity"
          :value="entity.quantity || ''"
          :label="entity.manpower"
          :loading="isLoadingUpdate"
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
