<script setup lang="ts">
import { FormUploadOnly, FormAddNote, Table } from "@/components";
import { ColumnsWorkInstruction } from "../constants/WorkInstructionConstant";
import type { WorkInstructionInterface } from "../types/WorkInstructionType";
import { ref, watch } from "vue";
import type { ValueUploadType } from "@/components/fields/Upload.vue";

const Data = ref<WorkInstructionInterface[]>([
  {
    id: 1,
    asset: "Fuel Branch Pipe",
    document: null,
    note: null,
  },
]);

const onCreate = (e: string) => {
  const new_data = [...Data.value];

  new_data.unshift({
    id: new_data.length + 1,
    asset: e,
    document: null,
    note: null,
  });

  Data.value = new_data;
};

const onDelete = (e: WorkInstructionInterface) => {
  Data.value = Data.value.filter((item) => item.id !== e.id);
};

const saveFile = (
  e: { file: ValueUploadType[] },
  entity: WorkInstructionInterface
) => {
  const duplicate_data = [...Data.value];
  const find_index = Data.value.findIndex((item) => item.id === entity.id);

  if (find_index !== -1) {
    duplicate_data[find_index].document = {
      file: e.file,
    };
    Data.value = duplicate_data;
  }
};

const saveNote = (e: { note: string }, entity: WorkInstructionInterface) => {
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
    label-create="Asset"
    :columns="ColumnsWorkInstruction"
    :entities="Data"
    @create="onCreate"
    @delete="onDelete"
  >
    <template #column_document="{ entity }">
      <div class="w-full flex justify-center">
        <FormUploadOnly
          :value="entity.document"
          :label="entity.asset"
          @save="(e) => saveFile(e, entity)"
        />
      </div>
    </template>
    <template #column_note="{ entity }">
      <div class="w-full flex justify-center">
        <FormAddNote
          :value="entity.note || ''"
          :label="entity.asset"
          @save="(e) => saveNote(e, entity)"
        />
      </div>
    </template>
  </Table>
</template>
