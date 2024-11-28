<script setup lang="ts">
import { HeaderTransparant } from "@/components";
</script>

<template>
  <div class="layout-map">
    <header>
      <HeaderTransparant />
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>

<style lang="sass">
.layout-map
  @apply relative w-full h-full min-h-screen bg-transparent flex flex-col
  > header
    @apply fixed h-[80px] w-full z-[9999]
  > main
    @apply mt-[80px] p-4 h-full w-full flex-1 relative
</style>
