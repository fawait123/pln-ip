<script setup lang="ts">
import HeaderUserHistory from "@/components/layouts/HeaderUserHistory.vue";
</script>

<template>
  <div class="layout-user-history">
    <header>
      <HeaderUserHistory />
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>

<style lang="sass">
.layout-user-history
  @apply relative w-full h-full min-h-screen bg-transparent flex flex-col
  > header
    @apply fixed h-[80px] w-full z-[9999]
  > main
    @apply mt-[70px] p-4 h-full w-full flex-1 relative
</style>
