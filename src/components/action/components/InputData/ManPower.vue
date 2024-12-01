<script setup lang="ts">
import { Select, Input, Icon } from "@/components";
import { ref } from "vue";

const emit = defineEmits(["save", "cancel"]);

const dataManPower = [
  {
    label: "Mechanical - QC",
    value: "Mechanical - QC",
  },
  {
    label: "Mechanical Project Leader",
    value: "Mechanical Project Leader",
  },
  {
    label: "Helper",
    value: "Helper",
  },
];

const modelManPower = ref({
  manPower: "",
  input: "",
});

const resultSaved = ref<{ id: number; result: string }[]>([]);

const add = () => {
  if (modelManPower.value.manPower !== "" && modelManPower.value.input !== "") {
    resultSaved.value.push({
      id: resultSaved.value.length + 1,
      result:
        modelManPower.value.manPower +
        " " +
        modelManPower.value.input +
        " People",
    });
    modelManPower.value.manPower = "";
    modelManPower.value.input = "";
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
  <div class="bp-tab-content-container">
    <div class="bp-tab-content-header">
      <div class="w-[250px]">
        <Select
          id="select-man-power"
          v-model="modelManPower.manPower"
          :options="dataManPower"
          options_label="label"
          options_value="value"
          size="sm"
        />
      </div>
      <div class="w-[70px]">
        <Input
          id="input-man-power"
          type="number"
          size="sm"
          v-model="modelManPower.input"
        />
      </div>
      <span class="bp-tab-content-header-title">PEOPLES</span>
      <button class="bp-trigger" @click="add">Add</button>
    </div>
    <div class="bp-tab-content-body">
      <p class="bp-tab-content-body-title">List Man Power</p>
      <div class="bp-tab-content-body-list">
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
    <div class="bp-tab-content-action">
      <button class="bp-trigger" @click="cancel">Cancel</button>
      <button class="bp-trigger" @click="save">Save</button>
    </div>
  </div>
</template>

<style lang="sass"></style>
