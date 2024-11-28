<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import eventBus from "@/utils/eventBus";
import { useGlobalStore } from "@/stores/GlobalStore";

const imgUrl = new URL("@/assets/images/priok.png", import.meta.url).href;

const globalStore = useGlobalStore();
const { titleHeader } = storeToRefs(globalStore);
const router = useRouter();
const route = useRoute();
const locationId = route.params.id;

const handleNext = () => {
  router.push(`/create/${locationId}/unit`);
};

onMounted(() => {
  titleHeader.value = `UBP ${locationId}`;
  eventBus.on("next", handleNext);
});

onUnmounted(() => {
  eventBus.off("next", handleNext);
});
</script>

<template>
  <div
    class="w-full min-h-screen"
    :style="{
      backgroundImage: `url(${imgUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }"
  >
    <div class="trapezoid">
      <p>UBP {{ locationId }}</p>
      <p>
        Unit Bisnis Pembangkitan Priok yang berlokasi di pantai utara Jakarta
        mengelola 14 unit dengan 8 unit PLTGU dan 6 Pusat Listrik Tenaga Diesel
        (PLTD )dengan total kapasitas terpasang 1.196,08 MW. Priok PGU
        mengoperasikan 6 unit Pusat Listrik Tenaga Diesel (PLTD) di Senayan
        berkapasitas 16,08 MW yang menjamin pasokan untuk kebutuhan
        sidang-sidang MPR. Selain Priok POMU mengelola pembangkit yang dimiliki
        Indonesia Power, Perusahaan juga mengelola jasa O&M milik PLN yaitu
        PLTGU Priok Blok 3 dengan kapasitas terpasang 740 MW.
      </p>
    </div>
  </div>
</template>

<style lang="sass">
.trapezoid
  @apply w-[40vw] min-h-screen bg-buttonGray bg-opacity-50 pt-[100px] pl-4 pr-16
  clip-path: polygon(0 0, 100% 0, 80% 100%, 0 100%)
  > p
    &:first-child
      @apply text-xl font-bold text-neutral-950
    &:last-child
      @apply text-base font-medium text-neutral-50 mt-4 ml-6
</style>
