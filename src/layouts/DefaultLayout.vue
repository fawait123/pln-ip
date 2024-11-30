<script setup lang="ts">
import { HeaderDefault, Footer } from "@/components";
import { useRoute } from "vue-router";

const page = ["blok", "unit"];

const route = useRoute();
</script>

<template>
  <div class="layout-default">
    <header>
      <HeaderDefault />
    </header>
    <main>
      <slot />
    </main>
    <footer v-if="page.includes((route?.name || '') as string)">
      <Footer />
    </footer>
  </div>
</template>

<style lang="sass">
.layout-default
  @apply relative w-full h-full min-h-screen bg-transparent flex flex-col
  > header
    @apply fixed h-[80px] w-full z-[9999]
  > main
    @apply h-full w-full flex-1 relative
  > footer
    @apply fixed bottom-0 w-full z-[9999]
</style>
