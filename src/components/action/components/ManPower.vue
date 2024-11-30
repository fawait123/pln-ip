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
  <div class="content-id-container">
    <div class="content-id-header">
      <div class="w-[250px]">
        <Select
          id="select-man-power"
          v-model="modelManPower.manPower"
          :options="dataManPower"
          options_label="label"
          options_value="value"
        />
      </div>
      <div class="w-[70px]">
        <Input
          id="input-man-power"
          type="number"
          v-model="modelManPower.input"
        />
      </div>
      <span class="content-id-header-title">PEOPLES</span>
      <button class="button-id" @click="add">Add</button>
    </div>
    <div class="content-id-body">
      <p class="content-id-body-title">List Man Power</p>
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
