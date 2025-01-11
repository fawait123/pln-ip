<script setup lang="ts">
import { AssetWelness, FormWithFile, Table } from "@/components";
import { ColumnsScope } from "../constants/ScopeConstant";
import type { ScopeInterface } from "../types/ScopeType";
import { ref, watch } from "vue";
import type { ValueUploadType } from "@/components/fields/Upload.vue";

const Data = ref<ScopeInterface[]>([
  {
    id: 1,
    asset: "Fuel Branch Pipe",
    asset_welness: null,
    oh_recom: null,
    wo_priority: null,
    history: null,
    rla: null,
    etc: null,
  },
]);

const saveAssetWelness = (
  e: { color: string; result: { id: number; note: string }[] },
  entity: ScopeInterface
) => {
  const duplicate_data = [...Data.value];
  const find_index = Data.value.findIndex((item) => item.id === entity.id);

  if (find_index !== -1) {
    duplicate_data[find_index].asset_welness = {
      color: e.color,
      result: e.result,
    };
    Data.value = duplicate_data;
  }
};

const saveFieldWithFile = (
  e: { result: { id: number; note: string }[]; file: ValueUploadType[] },
  entity: ScopeInterface,
  field: string
) => {
  const duplicate_data = [...Data.value];
  const find_index = Data.value.findIndex((item) => item.id === entity.id);

  if (find_index !== -1) {
    if (field === "oh_recom") {
      duplicate_data[find_index].oh_recom = {
        result: e.result,
        file: e.file,
      };
    } else if (field === "wo_priority") {
      duplicate_data[find_index].wo_priority = {
        result: e.result,
        file: e.file,
      };
    } else if (field === "history") {
      duplicate_data[find_index].history = {
        result: e.result,
        file: e.file,
      };
    } else if (field === "rla") {
      duplicate_data[find_index].rla = {
        result: e.result,
        file: e.file,
      };
    } else if (field === "etc") {
      duplicate_data[find_index].etc = {
        result: e.result,
        file: e.file,
      };
    }
    Data.value = duplicate_data;
  }
};

const onCreate = (e: string) => {
  const new_data = [...Data.value];

  new_data.unshift({
    id: new_data.length + 1,
    asset: e,
    asset_welness: null,
    oh_recom: null,
    wo_priority: null,
    history: null,
    rla: null,
    etc: null,
  });

  Data.value = new_data;
};

const onDelete = (e: ScopeInterface) => {
  Data.value = Data.value.filter((item) => item.id !== e.id);
};

watch(Data, (value) => {
  console.log("AAA", value);
});
</script>

<template>
  <Table
    label-create="Asset"
    :columns="ColumnsScope"
    :entities="Data"
    @create="onCreate"
    @delete="onDelete"
  >
    <template #column_asset_welness="{ entity }">
      <div class="w-full flex justify-center">
        <AssetWelness
          :value="entity.asset_welness"
          @save="(e) => saveAssetWelness(e, entity)"
        />
      </div>
    </template>
    <template #column_oh_recom="{ entity }">
      <div class="w-full flex justify-center">
        <FormWithFile
          :value="entity.oh_recom"
          @save="(e) => saveFieldWithFile(e, entity, 'oh_recom')"
        />
      </div>
    </template>
    <template #column_wo_priority="{ entity }">
      <div class="w-full flex justify-center">
        <FormWithFile
          :value="entity.wo_priority"
          @save="(e) => saveFieldWithFile(e, entity, 'wo_priority')"
        />
      </div>
    </template>
    <template #column_history="{ entity }">
      <div class="w-full flex justify-center">
        <FormWithFile
          :value="entity.history"
          @save="(e) => saveFieldWithFile(e, entity, 'history')"
        />
      </div>
    </template>
    <template #column_rla="{ entity }">
      <div class="w-full flex justify-center">
        <FormWithFile
          :value="entity.rla"
          @save="(e) => saveFieldWithFile(e, entity, 'rla')"
        />
      </div>
    </template>
    <template #column_etc="{ entity }">
      <div class="w-full flex justify-center">
        <FormWithFile
          :value="entity.etc"
          @save="(e) => saveFieldWithFile(e, entity, 'etc')"
        />
      </div>
    </template>
  </Table>
  <!-- <p class="font-bold text-black text-2xl">TEST</p> -->
</template>
