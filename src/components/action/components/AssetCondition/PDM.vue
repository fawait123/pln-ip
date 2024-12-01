<script setup lang="ts">
import { Input, Icon } from "@/components";
import { ref } from "vue";

const emit = defineEmits(["save", "cancel"]);

const model = ref("");

const resultSaved = ref<{ id: number; result: string }[]>([]);

const add = () => {
  if (model.value !== "") {
    resultSaved.value.push({
      id: resultSaved.value.length + 1,
      result: model.value,
    });
    model.value = "";
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
      <div class="w-[400px]">
        <Input id="input-duration" size="sm" v-model="model" />
      </div>
      <button class="bp-trigger" @click="add">Add</button>
    </div>
    <div class="bp-tab-content-body">
      <p class="bp-tab-content-body-title">Note</p>
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
