<script setup lang="ts">
import { Select, Input } from "@/components";
import { ref } from "vue";

const modelDuration = ref({
  input: "",
});

const resultSaved = ref<{ id: number; result: string }[]>([]);

const save = () => {
  if (modelDuration.value.input !== "") {
    if (resultSaved.value.length === 0) {
      resultSaved.value.push({
        id: resultSaved.value.length + 1,
        result: modelDuration.value.input + " Hours",
      });
    } else {
      resultSaved.value[0].result = modelDuration.value.input + " Hours";
    }
    modelDuration.value.input = "";
  }
};
</script>

<template>
  <div class="bp-tab-content-container">
    <div class="bp-tab-content-header">
      <div class="w-[70px]">
        <Input
          id="input-duration"
          type="number"
          v-model="modelDuration.input"
        />
      </div>
      <span class="bp-tab-content-header-title">HOURS</span>
      <button class="bp-trigger" @click="save">Save</button>
    </div>
    <div class="bp-tab-content-body">
      <p class="bp-tab-content-body-title">List Duration</p>
      <div class="bp-tab-content-body-list">
        <div v-for="(item, key) in resultSaved" :key="key">
          {{ item.result }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass"></style>
