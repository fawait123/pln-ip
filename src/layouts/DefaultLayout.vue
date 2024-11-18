<script setup lang="ts"></script>

<template>
  <div class="layout-default">
    <main>
      <slot />
    </main>
    <footer>
      <!-- <Footer /> -->
    </footer>
  </div>
</template>

<style lang="sass">
.layout-default
  @apply relative w-full h-full min-h-screen bg-white
</style>
