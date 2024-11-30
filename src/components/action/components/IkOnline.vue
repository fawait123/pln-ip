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
  <div class="content-id-container">
    <div>
      <p class="content-id-body-title">Title</p>
      <div class="content-id-body-list-ik">
        <p>Disassembly Top Hat</p>
      </div>
    </div>
    <div class="content-id-action">
      <button class="button-id" @click="view">View</button>
      <button class="button-id" @click="download">Download</button>
    </div>
  </div>
</template>

<style lang="sass">
.content-id-body-list-ik
  @apply rounded bg-buttonGray bg-opacity-70 text-base text-neutral-950 mt-2 px-2 py-3
</style>
