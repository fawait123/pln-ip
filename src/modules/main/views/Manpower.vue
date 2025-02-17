<script setup lang="ts">
import {
  FormUploadOnly,
  FormAddNote,
  Table,
  Quantity,
  Volume,
} from "@/components";
import { ColumnsManpower } from "../constants/ManpowerConstant";
import type {
  ManPowerInterface,
  ResponseManPowerInterface,
} from "../types/ManpowerType";
import { reactive, ref, watch } from "vue";
import type { ValueUploadType } from "@/components/fields/Upload.vue";
import { useMainStore } from "../stores/MainStore";
import { useRoute } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import type { IPagination } from "@/types/GlobalType";
import type { AxiosError } from "axios";

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

//--- GET MANPOWER
const { data: dataScope, isFetching: isLoadingScope } = useQuery({
  queryKey: ["getManPower"],
  queryFn: async () => {
    try {
      const { data } = await mainStore.getManPower(params);
      const response = data as IPagination<ResponseManPowerInterface[]>;

      const new_arr: ManPowerInterface[] =
        response.data?.map((item) => {
          return {
            id: item.uuid,
            manpower: item.name,
            document: null,
            quantity: null,
            volume: null,
            note: null,
            children: [],
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

const onCreate = (e: string) => {
  const new_data = [...entitiesManPower.value];

  new_data.unshift({
    id: (new_data.length + 1).toString(),
    manpower: e,
    document: null,
    quantity: null,
    volume: null,
    note: null,
    children: [],
  });

  entitiesManPower.value = new_data;
};

const onDelete = (e: ManPowerInterface) => {
  entitiesManPower.value = entitiesManPower.value.filter(
    (item) => item.id !== e.id
  );
};

const saveFile = (
  e: { file: ValueUploadType[] },
  entity: ManPowerInterface
) => {
  const duplicate_data = [...entitiesManPower.value];
  const find_index = entitiesManPower.value.findIndex(
    (item) => item.id === entity.id
  );

  if (find_index !== -1) {
    duplicate_data[find_index].document = {
      file: e.file,
    };
    entitiesManPower.value = duplicate_data;
  }
};

const saveNote = (e: { note: string }, entity: ManPowerInterface) => {
  const duplicate_data = [...entitiesManPower.value];
  const find_index = entitiesManPower.value.findIndex(
    (item) => item.id === entity.id
  );

  if (find_index !== -1) {
    duplicate_data[find_index].note = e.note;
    entitiesManPower.value = duplicate_data;
  }
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

const saveVolume = (e: { volume: string }, entity: ManPowerInterface) => {
  const duplicate_data = [...entitiesManPower.value];
  const find_index = entitiesManPower.value.findIndex(
    (item) => item.id === entity.id
  );

  if (find_index !== -1) {
    duplicate_data[find_index].volume = e.volume;
    entitiesManPower.value = duplicate_data;
  }
};
</script>

<template>
  <Table
    label-create="Manpower"
    :columns="ColumnsManpower"
    :entities="entitiesManPower"
    :loading="isLoadingScope"
    :is-create="false"
    @create="onCreate"
    @delete="onDelete"
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
    <template #column_volume="{ entity }">
      <div class="w-full flex justify-center">
        <div
          class="border border-neutral-50 rounded-lg px-2 min-w-[100px] text-base text-neutral-50 text-center"
        >
          Orang
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
    <template #children="{ entity, index, parentActive }">
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
    </template>
  </Table>
</template>
