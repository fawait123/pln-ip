<script setup lang="ts">
import { onMounted, onUnmounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import type { AxiosError } from "axios";

import eventBus from "@/utils/eventBus";
import { useGlobalStore } from "@/stores/GlobalStore";
import { useQuery } from "@tanstack/vue-query";
import { useDashboardStore } from "@/modules/dashboard/stores/DashboardStore";

import type { TLocation } from "../types/DashboardType";

const imgUrl = new URL("@/assets/images/priok.png", import.meta.url).href;

const globalStore = useGlobalStore();
const { titleHeader, disabledNext } = storeToRefs(globalStore);
const router = useRouter();
const route = useRoute();

const dashboardStore = useDashboardStore();

//--- GET LOCATION
const { data: dataLocation, isFetching: isLoadingLocation } = useQuery({
  queryKey: ["getLocationDetail"],
  queryFn: async () => {
    try {
      const { data } = await dashboardStore.getLocation({
        search: "",
        filter: `uuid,${route.params.id}`,
      });
      const response = data.data as TLocation[];

      titleHeader.value = `UBP ${response?.[0]?.name}`;

      return response;
    } catch (error: any) {
      const err = error as AxiosError;
      throw err.response;
    }
  },
  refetchOnWindowFocus: false,
});
//--- END

const handleBack = () => {
  router.push("/");
};

onMounted(() => {
  disabledNext.value = true;
  eventBus.on("back", handleBack);
});

onUnmounted(() => {
  eventBus.off("back", handleBack);
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
      <p>UBP {{ dataLocation?.[0]?.name }}</p>
      <p>
        Unit Bisnis Pembangkitan Priok yang berlokasi di pantai utara Jakarta
        mengelola 14 unit dengan 8 unit PLTGU dan 6 Pusat Listrik Tenaga Diesel
        (PLTD) dengan total kapasitas terpasang 1.196,08 MW. Priok PGU
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
  @apply w-[40vw] min-h-screen bg-neutral-950 bg-opacity-50 pt-[90px] pl-4 pr-[140px]
  clip-path: polygon(0 0, 100% 0, 80% 100%, 0 100%)
  > p
    &:first-child
      @apply text-[24px] font-extrabold text-cyan-500
    &:last-child
      @apply text-[20px] font-medium text-neutral-50 mt-4 ml-6 text-justify
</style>
