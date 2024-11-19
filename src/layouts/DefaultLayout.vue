<script setup lang="ts">
import { Header } from "@/components";
</script>

<template>
  <div class="layout-default">
    <header>
      <Header />
    </header>
    <main>
      <slot />
    </main>
    <!-- <footer>
      <Footer />
    </footer> -->
  </div>
</template>

<style lang="sass">
.layout-default
  @apply relative w-full h-full min-h-screen bg-white flex flex-col
  header
    @apply fixed h-[80px] w-full bg-white z-[9999]
  main
    @apply mt-[80px] p-4 h-full w-full flex-1 relative
</style>
