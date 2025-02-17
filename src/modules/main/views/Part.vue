<script setup lang="ts">
import {
  FormUploadOnly,
  FormAddNote,
  Table,
  Quantity,
  Volume,
} from "@/components";
import { ColumnsPart } from "../constants/PartConstant";
import type { PartInterface, ResponsePartInterface } from "../types/PartType";
import { reactive, ref, watch } from "vue";
import type { ValueUploadType } from "@/components/fields/Upload.vue";
import { useMainStore } from "../stores/MainStore";
import { useRoute } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import type { IPagination } from "@/types/GlobalType";
import type { AxiosError } from "axios";

const entitiesPart = ref<PartInterface[]>([]);

const mainStore = useMainStore();
const route = useRoute();
const params = reactive({
  search: "",
  filter: `project_uuid,${route.params.id_project}`,
  currentPage: 1,
  perPage: 10,
});

//--- GET PART
const { data: dataPart, isFetching: isLoadingPart } = useQuery({
  queryKey: ["getPart"],
  queryFn: async () => {
    try {
      const { data } = await mainStore.getPart(params);
      const response = data as IPagination<ResponsePartInterface[]>;

      const new_arr: PartInterface[] =
        response.data?.map((item) => {
          return {
            id: item.uuid,
            part: item.name,
            document: null,
            quantity: null,
            volume: null,
            note: null,
            children: [],
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

const onCreate = (e: string) => {
  const new_data = [...entitiesPart.value];

  new_data.unshift({
    id: (new_data.length + 1).toString(),
    part: e,
    document: null,
    quantity: null,
    volume: null,
    note: null,
    children: [],
  });

  entitiesPart.value = new_data;
};

const onDelete = (e: PartInterface) => {
  entitiesPart.value = entitiesPart.value.filter((item) => item.id !== e.id);
};

const saveFile = (e: { file: ValueUploadType[] }, entity: PartInterface) => {
  const duplicate_data = [...entitiesPart.value];
  const find_index = entitiesPart.value.findIndex(
    (item) => item.id === entity.id
  );

  if (find_index !== -1) {
    duplicate_data[find_index].document = {
      file: e.file,
    };
    entitiesPart.value = duplicate_data;
  }
};

const saveNote = (e: { note: string }, entity: PartInterface) => {
  const duplicate_data = [...entitiesPart.value];
  const find_index = entitiesPart.value.findIndex(
    (item) => item.id === entity.id
  );

  if (find_index !== -1) {
    duplicate_data[find_index].note = e.note;
    entitiesPart.value = duplicate_data;
  }
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

const saveVolume = (e: { volume: string }, entity: PartInterface) => {
  const duplicate_data = [...entitiesPart.value];
  const find_index = entitiesPart.value.findIndex(
    (item) => item.id === entity.id
  );

  if (find_index !== -1) {
    duplicate_data[find_index].volume = e.volume;
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
    :is-create="false"
    @create="onCreate"
    @delete="onDelete"
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
          pcs
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
