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
  <div class="content-id-container">
    <div class="content-id-header">
      <div class="w-[70px]">
        <Input
          id="input-duration"
          type="number"
          v-model="modelDuration.input"
        />
      </div>
      <span class="content-id-header-title">HOURS</span>
      <button class="button-id" @click="save">Save</button>
    </div>
    <div class="content-id-body">
      <p class="content-id-body-title">List Duration</p>
      <div class="content-id-body-list">
        <div v-for="(item, key) in resultSaved" :key="key">
          {{ item.result }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass"></style>
