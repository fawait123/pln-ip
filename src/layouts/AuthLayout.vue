<script setup lang="ts"></script>

<template>
  <div class="layout-auth">
    <main>
      <slot />
    </main>
  </div>
</template>

<style lang="sass">
.layout-auth
  @apply relative w-full h-full min-h-screen bg-white
</style>
