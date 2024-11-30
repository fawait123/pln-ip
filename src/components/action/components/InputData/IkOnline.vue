<script setup lang="ts">
import { Select, Input } from "@/components";
import { ref } from "vue";

const emit = defineEmits(["view", "download"]);

const modelTools = ref({
  tools: "",
  input: "",
  unit: "",
});

const view = () => {
  emit("view");
};

const download = () => {
  emit("download");
};
</script>

<template>
  <div class="bp-tab-content-container">
    <div>
      <p class="bp-tab-content-body-title">Title</p>
      <div class="bp-tab-content-body-list-ik">
        <p>Disassembly Top Hat</p>
      </div>
    </div>
    <div class="bp-tab-content-action">
      <button class="bp-trigger" @click="view">View</button>
      <button class="bp-trigger" @click="download">Download</button>
    </div>
  </div>
</template>

<style lang="sass">
.bp-tab-content-body-list-ik
  @apply rounded bg-white text-base text-neutral-950 mt-2 px-2 py-3
</style>
