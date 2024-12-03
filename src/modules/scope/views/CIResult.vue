<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted, onUnmounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import eventBus from "@/utils/eventBus";
import { Breadcrumb, Icon } from "@/components";
import type { BreadcrumbType } from "@/components/navigations/Breadcrumb.vue";
import { convertToOriginalFormat } from "@/helpers/global";
import { useGlobalStore } from "@/stores/GlobalStore";

const imgUrl = new URL("@/assets/images/bg-ci-section.png", import.meta.url)
  .href;

const router = useRouter();
const route = useRoute();
const globalStore = useGlobalStore();
const {
  titleHeader,
  disabledBack,
  isAddScope,
  isRemoveNext,
  isStepNavigation,
} = storeToRefs(globalStore);
const breadcrumb = ref<BreadcrumbType[]>([]);

const handleBack = () => {
  router.go(-1);
};

onMounted(() => {
  breadcrumb.value = [
    {
      name: "UBP Priok",
      as_link: false,
      url: "",
    },
    {
      name: convertToOriginalFormat(route.params.scope as string),
      as_link: false,
      url: "",
    },
    {
      name: "Scope Overhaul",
      as_link: false,
      url: "",
    },
    {
      name: "CI",
      as_link: false,
      url: "",
    },
  ];
  titleHeader.value = "Output";

  isAddScope.value = false;
  disabledBack.value = false;
  isRemoveNext.value = true;
  isStepNavigation.value = false;

  eventBus.on("back", handleBack);
});

onUnmounted(() => {
  eventBus.off("back", handleBack);

  isRemoveNext.value = false;
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
    <div class="scope-breadcrumb">
      <Breadcrumb :items="breadcrumb" />
    </div>
    <div class="ci-result--wrapper pt-[150px]">
      <div class="ci-result-header ml-[100px]">Inspection</div>
      <div class="ci-result-header ml-10 mr-[100px]">Output Data</div>
    </div>
    <div class="ci-result--wrapper mt-5">
      <div class="pl-[100px] bg-buttonGray bg-opacity-30 py-10">
        <p class="text-cyan-500 text-xl font-bold">
          COMBUSTION INSPECTION PLUS
        </p>
        <ul class="text-cyan-500 text-base list-disc list-inside mt-4">
          <li class="font-bold">Turbine Blade Row 1</li>
          <li class="font-bold">Turbine Blade Row 2</li>
        </ul>
      </div>
      <div
        class="pr-[100px] bg-buttonGray bg-opacity-30 py-10 flex flex-col gap-4"
      >
        <div class="flex gap-4">
          <div class="ci-result-box">Duration</div>
          <div class="ci-result-box">10 Days</div>
        </div>
        <div class="flex gap-4">
          <div class="ci-result-box">Manpower</div>
          <div class="ci-result-box">20 People</div>
        </div>
        <div class="flex gap-4">
          <div class="ci-result-box">Material</div>
          <div class="ci-result-box">Rp. 100.000</div>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-4 ml-[100px] mt-10">
      <Icon name="excel" class="text-[50px]" />
      <button class="btn-download">Download</button>
    </div>
  </div>
</template>

<style lang="sass">
.ci-result
  &--wrapper
    @apply grid grid-cols-2 w-full
    .ci-result-header
      @apply bg-cyan-500 flex items-center justify-center text-base font-bold text-neutral-50 py-1.5 pl-4 w-[250px] border-0 rounded
    .ci-result-box
      @apply bg-cyan-500 rounded bg-opacity-70 text-2xl text-neutral-50 w-[200px] py-2 px-4

.btn-download
  @apply bg-buttonGray hover:bg-cyan-500 rounded-full text-base text-neutral-50 py-2 px-10 font-bold
</style>
