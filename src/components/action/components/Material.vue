<script setup lang="ts">
import { Select, Input, Icon } from "@/components";
import { ref } from "vue";

const emit = defineEmits(["save", "cancel"]);

const dataMaterial = [
  {
    label: "WD-40",
    value: "WD-40",
  },
  {
    label: "MAJUN",
    value: "MAJUN",
  },
  {
    label: "SIKAT KAWAT",
    value: "SIKAT KAWAT",
  },
  {
    label: "THINNER",
    value: "THINNER",
  },
];

const dataUnitMaterial = [
  {
    label: "CAN",
    value: "CAN",
  },
  {
    label: "KG",
    value: "KG",
  },
  {
    label: "BH",
    value: "BH",
  },
  {
    label: "GLN",
    value: "GLN",
  },
];

const modelMaterial = ref({
  material: "",
  input: "",
  unit: "",
});

const resultSaved = ref<{ id: number; result: string }[]>([]);

const add = () => {
  if (
    modelMaterial.value.material !== "" &&
    modelMaterial.value.input !== "" &&
    modelMaterial.value.unit !== ""
  ) {
    resultSaved.value.push({
      id: resultSaved.value.length + 1,
      result:
        modelMaterial.value.material +
        " " +
        modelMaterial.value.input +
        " " +
        modelMaterial.value.unit,
    });
    modelMaterial.value.material = "";
    modelMaterial.value.input = "";
    modelMaterial.value.unit = "";
  }
};

const handleDelete = (id: number) => {
  resultSaved.value = resultSaved.value.filter((item) => item.id !== id);
};

const cancel = () => {
  emit("cancel");
};

const save = () => {
  emit("save");
};
</script>

<template>
  <div class="content-id-container">
    <div class="content-id-header">
      <Select
        id="select-material"
        v-model="modelMaterial.material"
        :options="dataMaterial"
        options_label="label"
        options_value="value"
      />
      <div class="w-[70px]">
        <Input id="input-material" v-model="modelMaterial.input" />
      </div>
      <div class="w-[100px]">
        <Select
          id="select-unit-material"
          v-model="modelMaterial.unit"
          :options="dataUnitMaterial"
          options_label="label"
          options_value="value"
        />
      </div>
      <button class="button-id" @click="add">Add</button>
    </div>
    <div class="content-id-body">
      <p class="content-id-body-title">List Material</p>
      <div class="content-id-body-list">
        <div
          v-for="(item, key) in resultSaved"
          :key="key"
          class="w-full flex justify-between items-center gap-6"
        >
          <p>{{ key + 1 }}. {{ item.result }}</p>
          <Icon
            name="trash"
            class="mr-2 cursor-pointer text-neutral-500 hover:text-neutral-950"
            @click="handleDelete(item.id)"
          />
        </div>
      </div>
    </div>
    <div class="content-id-action">
      <button class="button-id" @click="cancel">Cancel</button>
      <button class="button-id" @click="save">Save</button>
    </div>
  </div>
</template>

<style lang="sass"></style>
