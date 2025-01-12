<script setup lang="ts">
import {
  FormUploadOnly,
  FormAddNote,
  Table,
  Quantity,
  Volume,
} from "@/components";
import { ColumnsPart } from "../constants/PartConstant";
import type { PartInterface } from "../types/PartType";
import { ref, watch } from "vue";
import type { ValueUploadType } from "@/components/fields/Upload.vue";

const Data = ref<PartInterface[]>([
  {
    id: 1,
    part: "Transition Piece",
    document: null,
    quantity: null,
    volume: null,
    note: null,
  },
]);

const onCreate = (e: string) => {
  const new_data = [...Data.value];

  new_data.unshift({
    id: new_data.length + 1,
    part: e,
    document: null,
    quantity: null,
    volume: null,
    note: null,
  });

  Data.value = new_data;
};

const onDelete = (e: PartInterface) => {
  Data.value = Data.value.filter((item) => item.id !== e.id);
};

const saveFile = (e: { file: ValueUploadType[] }, entity: PartInterface) => {
  const duplicate_data = [...Data.value];
  const find_index = Data.value.findIndex((item) => item.id === entity.id);

  if (find_index !== -1) {
    duplicate_data[find_index].document = {
      file: e.file,
    };
    Data.value = duplicate_data;
  }
};

const saveNote = (e: { note: string }, entity: PartInterface) => {
  const duplicate_data = [...Data.value];
  const find_index = Data.value.findIndex((item) => item.id === entity.id);

  if (find_index !== -1) {
    duplicate_data[find_index].note = e.note;
    Data.value = duplicate_data;
  }
};

const saveQuantity = (e: { quantity: string }, entity: PartInterface) => {
  const duplicate_data = [...Data.value];
  const find_index = Data.value.findIndex((item) => item.id === entity.id);

  if (find_index !== -1) {
    duplicate_data[find_index].quantity = e.quantity;
    Data.value = duplicate_data;
  }
};

const saveVolume = (e: { volume: string }, entity: PartInterface) => {
  const duplicate_data = [...Data.value];
  const find_index = Data.value.findIndex((item) => item.id === entity.id);

  if (find_index !== -1) {
    duplicate_data[find_index].volume = e.volume;
    Data.value = duplicate_data;
  }
};
</script>

<template>
  <Table
    label-create="Part"
    :columns="ColumnsPart"
    :entities="Data"
    @create="onCreate"
    @delete="onDelete"
  >
    <template #column_document="{ entity }">
      <div class="w-full flex justify-center">
        <FormUploadOnly
          :value="entity.document"
          :label="entity.part"
          @save="(e) => saveFile(e, entity)"
        />
      </div>
    </template>
    <template #column_quantity="{ entity }">
      <div class="w-full flex justify-center">
        <Quantity
          :value="entity.quantity || ''"
          :label="entity.part"
          @save="(e) => saveQuantity(e, entity)"
        />
      </div>
    </template>
    <template #column_volume="{ entity }">
      <div class="w-full flex justify-center">
        <Volume
          type="part"
          :value="entity.volume || ''"
          @save="(e) => saveVolume(e, entity)"
        />
      </div>
    </template>
    <template #column_note="{ entity }">
      <div class="w-full flex justify-center">
        <FormAddNote
          :value="entity.note || ''"
          :label="entity.part"
          @save="(e) => saveNote(e, entity)"
        />
      </div>
    </template>
  </Table>
</template>
