<script setup lang="ts">
import {
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger,
} from "radix-vue";
import { ButtonPopover } from "@/components";
import { ref } from "vue";

const props = defineProps({
  text: {
    type: String,
    default: "",
  },
});

const model = ref(false);
</script>

<template>
  <PopoverRoot v-model:open="model">
    <PopoverTrigger>
      <button class="button-part" :class="{ 'button-part-active': model }">
        {{ text }}
      </button>
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent :side-offset="5" class="mt-3">
        <ButtonPopover />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>

<style lang="sass">
.button-part
  @apply py-2 px-6 rounded bg-cyan-500 text-base text-neutral-50 shadow-lg shadow-neutral-700 hover:bg-yellow-500

.button-part-active
  @apply bg-yellow-500
</style>
