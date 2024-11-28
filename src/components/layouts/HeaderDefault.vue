<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import { Icon } from "@/components";
import eventBus from "@/utils/eventBus";
import { useAuthStore } from "@/modules/auth/stores/AuthStore";
import { useGlobalStore } from "@/stores/GlobalStore";

const imgUrl = new URL("@/assets/images/logo.png", import.meta.url).href;

const globalStore = useGlobalStore();
const { titleHeader } = storeToRefs(globalStore);
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const toHome = () => {
  router.push("/");
};

const handleBack = () => {
  router.go(-1);
};

const handleNext = () => {
  eventBus.emit("next");
};

const logout = () => {
  authStore.logout();
  router.push("/login");
};
</script>

<template>
  <div class="pln-header-default">
    <img :src="imgUrl" @click="toHome" />
    <div class="menu-bar">
      <div class="menu-wrapper">
        <div class="user-info">
          <p>User : superadmin@gmail.com</p>
        </div>
        <button class="menu-button">UBH</button>
        <button
          class="menu-button"
          :class="{ active: route.path.includes('create') }"
        >
          Create
        </button>
        <button class="menu-button">Timeline OH</button>
        <button class="menu-button">Report</button>
        <button class="sign-out-button" @click="logout">Sign Out</button>
      </div>
      <div class="navigation">
        <div class="page-info">
          <p>{{ titleHeader }}</p>
        </div>
        <div class="home-button" @click="toHome">
          <Icon name="home" class="text-white text-xl" />
        </div>
        <div class="arrow-buttons">
          <button class="arrow-button back" @click="handleBack">Back</button>
          <button class="arrow-button next" @click="handleNext">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
.pln-header-default
  @apply w-full h-full flex justify-between
  img
    @apply h-[50px] pl-4 pt-4
  .menu-bar
    @apply h-full flex flex-col gap-2
    .menu-wrapper
      @apply flex text-sm text-neutral-50
      .user-info
        @apply w-[300px] py-2 bg-buttonGray mr-[-22px] text-center
        clip-path: polygon(7.5% 0, 100% 0, 92.5% 100%, 0% 100%)
      .menu-button
        @apply px-6 py-2 bg-buttonGray w-[150px] mr-[-22px]
        clip-path: polygon(15% 0, 100% 0, 85% 100%, 0% 100%)
        &:hover
          @apply bg-cyan-500
      .active
        @apply bg-cyan-500
      .sign-out-button
        @apply px-6 py-2 bg-buttonGray w-[150px]
        clip-path: polygon(15% 0, 100% 0, 100% 100%, 0% 100%)
        &:hover
          @apply bg-cyan-500

    .navigation
      @apply flex items-center gap-2 justify-end
      .page-info
        @apply bg-cyan-500 bg-opacity-55 w-[300px] text-center py-1 text-base text-neutral-50 font-bold
        clip-path: polygon(7% 0, 100% 0, 93% 100%, 0% 100%)
      .home-button
        @apply rounded-full w-10 h-10 bg-buttonGray flex items-center justify-center cursor-pointer
        &:hover
          @apply bg-cyan-500
      .arrow-buttons
        @apply flex gap-[1px] items-center pr-4
        .arrow-button
          @apply flex items-center justify-center text-sm font-bold text-neutral-50 py-1.5 px-6 border-0 cursor-pointer
        .back
          @apply bg-buttonGray
          clip-path: polygon(0 50%, 20% 0, 100% 0, 100% 100%, 20% 100%)
          &:hover
            @apply bg-yellow-500
          &:disabled
            @apply bg-neutral-500
        .next
          @apply bg-buttonGray
          clip-path: polygon(80% 0, 100% 50%, 80% 100%, 0 100%, 0 0)
          &:hover
            @apply bg-yellow-500
          &:disabled
            @apply bg-neutral-500
</style>
