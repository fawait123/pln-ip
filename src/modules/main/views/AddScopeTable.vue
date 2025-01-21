<script setup lang="ts">
import {
  AssetWelness,
  ButtonDots,
  ButtonOptions,
  FormDuration,
  FormIK,
  FormQcPlan,
  FormWithFile,
  Icon,
  Table,
  FormMaterial,
  FormManpower,
  FormPart,
} from "@/components";
import { ColumnsScope } from "../constants/ScopeConstant";
import { ref, watch } from "vue";
import type { ValueUploadType } from "@/components/fields/Upload.vue";
import type { AddScopeTableInterface } from "../types/AddScopeTableType";

const DataChildren = [
  {
    id: 1,
    name: "Diassembly",
    material: null,
    duration: "",
    manpower: null,
    ik: null,
    qc_plan: null,
    part: null,
  },
  {
    id: 2,
    name: "Inspection",
    material: null,
    duration: "",
    manpower: null,
    ik: null,
    qc_plan: null,
    part: null,
  },
  {
    id: 3,
    name: "Assembly",
    material: null,
    duration: "",
    manpower: null,
    ik: null,
    qc_plan: null,
    part: null,
  },
];

const OptionsMaterial = ref([
  {
    label: "Material A",
    value: "Material A",
  },
  {
    label: "Material B",
    value: "Material B",
  },
]);

const OptionsDuration = ref([
  {
    label: "Duration A",
    value: "Duration A",
  },
  {
    label: "Duration B",
    value: "Duration B",
  },
]);

const OptionsManpower = ref([
  {
    label: "Manpower A",
    value: "Manpower A",
  },
  {
    label: "Manpower B",
    value: "Manpower B",
  },
]);

const OptionsIk = ref([
  {
    label: "IK A",
    value: "IK A",
  },
  {
    label: "IK B",
    value: "IK B",
  },
]);

const OptionsQcPlan = ref([
  {
    label: "QC Plan A",
    value: "QC Plan A",
  },
  {
    label: "QC Plan B",
    value: "QC Plan B",
  },
]);

const OptionsPart = ref([
  {
    label: "Part A",
    value: "Part A",
  },
  {
    label: "Part B",
    value: "Part B",
  },
]);

const Data = ref<AddScopeTableInterface[]>([
  {
    id: 1,
    asset: "Vane Row 1",
    asset_welness: null,
    oh_recom: null,
    wo_priority: null,
    history: null,
    rla: null,
    etc: null,
    children: DataChildren,
  },
  {
    id: 2,
    asset: "Vane Row 2",
    asset_welness: null,
    oh_recom: null,
    wo_priority: null,
    history: null,
    rla: null,
    etc: null,
    children: DataChildren,
  },
]);

const saveAssetWelness = (
  e: { color: string; result: { id: number; note: string }[] },
  entity: AddScopeTableInterface
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
  entity: AddScopeTableInterface,
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
    children: DataChildren,
  });

  Data.value = new_data;
};

const onDelete = (e: AddScopeTableInterface) => {
  Data.value = Data.value.filter((item) => item.id !== e.id);
};

const clickOptions = (
  parentIndex: number,
  childIndex: number,
  value: any,
  field: "material" | "duration" | "manpower" | "ik" | "qc_plan" | "part"
) => {
  const new_data = Data.value.map((parent) => ({
    ...parent,
    children: parent.children.map((child) => ({ ...child })),
  }));

  if (field === "material")
    new_data[parentIndex].children[childIndex].material = value;
  if (field === "duration")
    new_data[parentIndex].children[childIndex].duration = value;
  if (field === "manpower")
    new_data[parentIndex].children[childIndex].manpower = value;
  if (field === "ik") new_data[parentIndex].children[childIndex].ik = value;
  if (field === "qc_plan")
    new_data[parentIndex].children[childIndex].qc_plan = value;
  if (field === "part") new_data[parentIndex].children[childIndex].part = value;

  Data.value = new_data;
};

watch(
  Data,
  (value) => {
    console.log("AA", value);
  },
  { deep: true }
);
</script>

<template>
  <Table
    label-create="Asset"
    :columns="ColumnsScope"
    :entities="Data"
    @create="onCreate"
  >
    <template #column_asset_welness="{ entity }">
      <div class="w-full flex justify-center">
        <AssetWelness
          :value="entity.asset_welness"
          :label="entity.asset"
          @save="(e) => saveAssetWelness(e, entity)"
        />
      </div>
    </template>
    <template #column_oh_recom="{ entity }">
      <div class="w-full flex justify-center">
        <FormWithFile
          :value="entity.oh_recom"
          :label="entity.asset"
          @save="(e) => saveFieldWithFile(e, entity, 'oh_recom')"
        />
      </div>
    </template>
    <template #column_wo_priority="{ entity }">
      <div class="w-full flex justify-center">
        <FormWithFile
          :value="entity.wo_priority"
          :label="entity.asset"
          @save="(e) => saveFieldWithFile(e, entity, 'wo_priority')"
        />
      </div>
    </template>
    <template #column_history="{ entity }">
      <div class="w-full flex justify-center">
        <FormWithFile
          :value="entity.history"
          :label="entity.asset"
          @save="(e) => saveFieldWithFile(e, entity, 'history')"
        />
      </div>
    </template>
    <template #column_rla="{ entity }">
      <div class="w-full flex justify-center">
        <FormWithFile
          :value="entity.rla"
          :label="entity.asset"
          @save="(e) => saveFieldWithFile(e, entity, 'rla')"
        />
      </div>
    </template>
    <template #column_etc="{ entity }">
      <div class="w-full flex justify-center">
        <FormWithFile
          :value="entity.etc"
          :label="entity.asset"
          @save="(e) => saveFieldWithFile(e, entity, 'etc')"
        />
      </div>
    </template>
    <template #column_action="{ entity }">
      <div class="flex items-center justify-center gap-2">
        <ButtonDots />
        <Icon name="trash" class="table-delete" @click="onDelete(entity)" />
      </div>
    </template>
    <template #children="{ entity, index, parentActive }">
      <tr
        v-if="parentActive === index"
        v-for="(child, childIndex) in entity.children"
        :key="childIndex"
      >
        <td
          v-for="(column, id) in ColumnsScope"
          :key="`column.${index.toString() + id.toString()}`"
          class="td-child"
        >
          <div v-if="id === 0" class="v-table-body">
            <p class="v-table-body-text pl-11">
              {{ child.name }}
            </p>
          </div>
          <div v-if="id === 1" class="v-table-body flex justify-center">
            <FormMaterial
              :value="Data[index].children[childIndex].material || undefined"
              @save="(e) => clickOptions(index, childIndex, e, 'material')"
            />
          </div>
          <div v-if="id === 2" class="v-table-body flex justify-center">
            <FormDuration
              :value="Data[index].children[childIndex].duration"
              @save="(e) => clickOptions(index, childIndex, e, 'duration')"
            />
          </div>
          <div v-if="id === 3" class="v-table-body flex justify-center">
            <FormManpower
              :value="Data[index].children[childIndex].manpower || undefined"
              @save="(e) => clickOptions(index, childIndex, e, 'manpower')"
            />
          </div>
          <div v-if="id === 4" class="v-table-body flex justify-center">
            <FormIK
              :value="Data[index].children[childIndex].ik || []"
              @save="(e) => clickOptions(index, childIndex, e, 'ik')"
            />
          </div>
          <div v-if="id === 5" class="v-table-body flex justify-center">
            <FormQcPlan
              :value="Data[index].children[childIndex].qc_plan || []"
              @save="(e) => clickOptions(index, childIndex, e, 'qc_plan')"
            />
          </div>
          <div v-if="id === 6" class="v-table-body flex justify-center">
            <FormPart
              :value="Data[index].children[childIndex].part || undefined"
              @save="(e) => clickOptions(index, childIndex, e, 'part')"
            />
          </div>
        </td>
        <td class="td-child w-[5%]"></td>
      </tr>
    </template>
  </Table>
  <!-- <p class="font-bold text-black text-2xl">TEST</p> -->
</template>
