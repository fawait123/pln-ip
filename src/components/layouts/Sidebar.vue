<script setup lang="ts">
import { Menus } from "@/constants/Menus";
import { Icon } from "@/components";
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <div class="sidebar-main">
    <p class="sidebar-main--title">MAIN MENU</p>
    <div class="sidebar-main--menus">
      <RouterLink
        v-for="(item, key) in Menus"
        :key="key"
        :to="`/${route.params?.id}/create/unit/${route.params?.scope}${item.url}`"
        :class="{ 'menu-active': route.path.includes(item.url) }"
        class="menu-item"
      >
        <Icon :name="item.icon" class="menu-icon" />
        <p class="menu-title">{{ item.name }}</p>
      </RouterLink>
    </div>
  </div>
</template>

<style lang="sass">
.sidebar-main
  @apply w-[240px] fixed top-[80px] bottom-[10px] left-[10px] bg-blue-900 rounded-lg px-6 py-4
  &--title
    @apply text-lg font-bold text-neutral-50
  &--menus
    @apply flex flex-col gap-2 mt-6
    .menu-active
      .menu-icon
        @apply text-cyan-500 #{!important}
      .menu-title
        @apply text-cyan-500 #{!important}
    .menu-item
      @apply flex items-center gap-1 cursor-pointer w-full
      .menu-icon
        @apply text-neutral-50 text-base
      .menu-title
        @apply text-neutral-50 text-base font-bold
      &:hover
        .menu-icon
          @apply text-cyan-500
        .menu-title
          @apply text-cyan-500
</style>
