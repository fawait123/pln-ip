<script setup lang="ts">
import { useAuthStore } from "@/modules/auth/stores/AuthStore";
import { useRouter } from "vue-router";

const imgUrl = new URL("@/assets/images/logo.png", import.meta.url).href;

const authStore = useAuthStore();
const router = useRouter();

const logout = () => {
  authStore.logout();
  router.push("/login");
};

const toHome = () => {
  router.push("/");
};
</script>

<template>
  <div class="pln-header">
    <img :src="imgUrl" @click="toHome" />
    <p @click="logout">LOGOUT</p>
  </div>
</template>

<style lang="sass">
.pln-header
  @apply w-full h-full border-b border-neutral-100 shadow flex items-center justify-between px-4
  img
    @apply h-10 cursor-pointer
  p
    @apply text-neutral-950 text-sm cursor-pointer font-semibold hover:text-cyan-500
</style>
