<script setup lang="ts">
import { HeaderMaster, Footer } from "@/components";
import HeaderMasterAdditional from "@/components/layouts/HeaderMasterAdditional.vue";
import SidebarMasterAdditional from "@/components/layouts/SidebarMasterAdditional.vue";
import { useRoute } from "vue-router";

const imgUrl = new URL("@/assets/images/bg-main-page.jpg", import.meta.url)
    .href;

const page = ["blok", "unit"];

const route = useRoute();
</script>

<template>
    <div class="layout-master" :style="{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }">
        <header>
            <HeaderMasterAdditional />
        </header>
        <main>
            <SidebarMasterAdditional />
            <div class="layout-master--content">
                <slot />
            </div>
        </main>
        <footer v-if="page.includes((route?.name || '') as string)">
            <Footer />
        </footer>
    </div>
</template>

<style lang="sass">
.layout-master
  @apply relative w-full h-full min-h-screen bg-transparent flex flex-col
  > header
    @apply fixed h-[80px] w-full z-[9999]
  > main
    @apply h-full w-full flex-1 relative
  > footer
    @apply fixed bottom-0 w-full z-[9999]
  &--content
    @apply pl-[280px] pr-5 pt-[80px] pb-2
</style>
