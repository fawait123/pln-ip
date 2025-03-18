<script setup lang="ts">
import { useRouter } from "vue-router";

import { Button } from "@/components";

const router = useRouter();

const handleBack = () => {
  router.go(-1);
};
</script>

<template>
  <div class="not-found">
    <div class="not-found-group">
      <div class="not-found-message">
        <span class="not-found-title"> Oops! Page not found! </span>
        <span class="not-found-description">
          This page doesn’t exist or was removed! We suggest you back to home.
        </span>
      </div>
      <div class="not-found-action">
        <Button text="Kembali" @click="handleBack" />
      </div>
    </div>
  </div>
</template>

<style lang="sass">
.not-found
  @apply absolute top-0 left-0 bottom-0 right-0 w-full h-full z-[999] flex justify-center items-center
  .not-found-group
    @apply max-w-[488px] w-full flex flex-col items-center justify-center gap-8 py-10 px-10 border rounded shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none
    .not-found-message
      @apply flex flex-col items-center gap-4 max-w-[360px]
      .not-found-title
        @apply text-2xl font-bold text-center text-neutral-950
      .not-found-description
        @apply text-sm text-center text-neutral-950
    .not-found-action
      @apply w-full flex justify-center gap-4
</style>
