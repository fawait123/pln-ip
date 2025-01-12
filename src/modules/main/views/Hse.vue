<script setup lang="ts">
import {
  FormUploadOnly,
  FormAddNote,
  Table,
  Quantity,
  Volume,
} from "@/components";
import { ColumnsHse } from "../constants/HseConstant";
import type { HseInterface } from "../types/HseType";
import { ref, watch } from "vue";
import type { ValueUploadType } from "@/components/fields/Upload.vue";

const Data = ref<HseInterface[]>([
  {
    id: 1,
    name: "Dokumen Kesepakatan OH",
    document: null,
    note: null,
  },
]);

const onCreate = (e: string) => {
  const new_data = [...Data.value];

  new_data.unshift({
    id: new_data.length + 1,
    name: e,
    document: null,
    note: null,
  });

  Data.value = new_data;
};

const onDelete = (e: HseInterface) => {
  Data.value = Data.value.filter((item) => item.id !== e.id);
};

const saveFile = (e: { file: ValueUploadType[] }, entity: HseInterface) => {
  const duplicate_data = [...Data.value];
  const find_index = Data.value.findIndex((item) => item.id === entity.id);

  if (find_index !== -1) {
    duplicate_data[find_index].document = {
      file: e.file,
    };
    Data.value = duplicate_data;
  }
};

const saveNote = (e: { note: string }, entity: HseInterface) => {
  const duplicate_data = [...Data.value];
  const find_index = Data.value.findIndex((item) => item.id === entity.id);

  if (find_index !== -1) {
    duplicate_data[find_index].note = e.note;
    Data.value = duplicate_data;
  }
};
</script>

<template>
  <Table
    label-create="Part"
    :columns="ColumnsHse"
    :entities="Data"
    @create="onCreate"
    @delete="onDelete"
  >
    <template #column_document="{ entity }">
      <div class="w-full flex justify-center">
        <FormUploadOnly
          :value="entity.document"
          :label="entity.name"
          @save="(e) => saveFile(e, entity)"
        />
      </div>
    </template>
    <template #column_note="{ entity }">
      <div class="w-full flex justify-center">
        <FormAddNote
          :value="entity.note || ''"
          :label="entity.name"
          @save="(e) => saveNote(e, entity)"
        />
      </div>
    </template>
  </Table>
</template>
