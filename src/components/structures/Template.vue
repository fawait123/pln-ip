<script setup lang="ts">
import { Icon } from "@/components";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["back"]);
</script>

<template>
  <div class="header-title">
    <div class="back-button" @click="() => $emit('back')">
      <Icon name="caret-left" />
    </div>
    <p>{{ title }}</p>
  </div>
  <div>
    <slot />
  </div>
</template>

<style lang="sass">
.header-title
  @apply flex items-center gap-4 mb-6
  .back-button
    @apply rounded h-10 w-10 bg-neutral-100 flex items-center justify-center text-base text-neutral-950 cursor-pointer hover:bg-neutral-200
  > p
    @apply text-xl font-bold text-neutral-950
</style>
