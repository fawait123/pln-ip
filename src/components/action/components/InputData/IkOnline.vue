<script setup lang="ts">
import { Select, Input } from "@/components";
import { ref } from "vue";

const emit = defineEmits(["view", "download"]);

const modelIkOnline = ref({
  input: "",
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
    <div class="bp-tab-content-body">
      <p class="bp-tab-content-body-title">Title</p>
      <Input
        id="input-ik-online"
        type="number"
        size="sm"
        class="mt-2"
        v-model="modelIkOnline.input"
      />
      <!-- <div class="bp-tab-content-body-list-ik">
        <p>Disassembly Top Hat</p>
      </div> -->
    </div>
    <div class="bp-tab-content-action">
      <button class="bp-trigger" @click="view">View</button>
      <button class="bp-trigger" @click="download">Download</button>
    </div>
  </div>
</template>

<style lang="sass"></style>
