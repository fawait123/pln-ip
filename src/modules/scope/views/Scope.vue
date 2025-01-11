<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";

import Home0 from "@/assets/videos/home/0-homepage.mp4";

import { useGlobalStore } from "@/stores/GlobalStore";
import { Breadcrumb } from "@/components";
import type { BreadcrumbType } from "@/components/navigations/Breadcrumb.vue";
import { convertToOriginalFormat } from "@/helpers/global";
import eventBus from "@/utils/eventBus";

const videos = [Home0, Home0, Home0];
const scope = [
  { label: "Combustion Inspection", url: "ci" },
  { label: "Turbine Inspection", url: "ti" },
  { label: "Major Inspection", url: "mi" },
];

const router = useRouter();
const route = useRoute();
const globalStore = useGlobalStore();
const {
  titleHeader,
  disabledBack,
  disabledNext,
  isAddScope,
  isFinish,
  isRemoveNext,
  isStepNavigation,
} = storeToRefs(globalStore);
const breadcrumb = ref<BreadcrumbType[]>([]);
const scopeSelected = ref("");

const currentVideoIndex = ref(0);
const videoRef = ref<HTMLVideoElement | null>(null);
const isVideoEnded = ref(false);
const isRewinding = ref(false);
let rewindInterval: ReturnType<typeof setInterval> | null = null;

const handleFirstVideoLoad = () => {
  if (currentVideoIndex.value === 0 && videoRef.value) {
    videoRef.value.pause();
  }
};

const handleVideoEnd = () => {
  isVideoEnded.value = true;
  if (isRewinding.value) {
    isRewinding.value = false;
    videoRef.value?.pause();
  }
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
  ];
  titleHeader.value = convertToOriginalFormat(route.params.scope as string);
});

const handleMouseOver = async (section: number) => {
  console.log("oiiii, ", scopeSelected.value);
  if (scopeSelected.value !== "") return;

  if (rewindInterval) {
    clearInterval(rewindInterval);
  }

  if (currentVideoIndex.value !== section) {
    currentVideoIndex.value = section;

    if (videoRef.value) {
      try {
        videoRef.value.src = videos[currentVideoIndex.value];
        await videoRef.value.load();

        if (videoRef.value.readyState >= 3) {
          await videoRef.value.play();
        } else {
          videoRef.value.addEventListener(
            "canplay",
            async () => {
              await videoRef.value?.play();
            },
            { once: true }
          );
        }
      } catch (err) {
        console.error("Error playing video:", err);
      }
    }
  } else {
    if (videoRef.value) {
      await videoRef.value.play();
    }
  }

  isRewinding.value = false;
};

const handleMouseLeave = () => {
  if (videoRef.value && scopeSelected.value === "") {
    isRewinding.value = true;
    rewindInterval = setInterval(() => {
      if (videoRef.value && videoRef.value.currentTime > 0) {
        videoRef.value.currentTime -= 0.1;
      } else {
        clearInterval(rewindInterval!);
        videoRef.value?.pause();
        isRewinding.value = false;
      }
    }, 30);
  }
};

const toScope = (url: string) => {
  console.log(url);
  // router.push(`${route.path}/${url}`);
  scopeSelected.value = url;
};

const handleBack = () => {
  router.push(`/${route.params.id}/create/unit`);
};

onMounted(() => {
  disabledBack.value = false;
  disabledNext.value = true;
  isAddScope.value = false;
  isFinish.value = false;
  isRemoveNext.value = false;
  isStepNavigation.value = false;
  eventBus.on("back", handleBack);

  window.addEventListener("click", (e) => {
    let isButtonClicked = false;

    scope.forEach((_, key) => {
      const button = document.getElementById(`button-home-${key}`);
      if (button?.contains(e.target as Node)) {
        isButtonClicked = true;
      }
    });

    const scopeMenu = document.getElementById("scope-menu");
    const isContainsScopeMenu = scopeMenu?.contains(e.target as Node);

    if (!isButtonClicked && !isContainsScopeMenu) {
      scopeSelected.value = "";
      handleMouseLeave();
    }
  });
});

onUnmounted(() => {
  eventBus.off("back", handleBack);
});
</script>

<template>
  <div class="scope-container">
    <div class="scope-breadcrumb">
      <Breadcrumb :items="breadcrumb" />
    </div>
    <div class="scope-video-container">
      <video
        ref="videoRef"
        :src="videos[currentVideoIndex]"
        class="scope-video"
        @loadedmetadata="handleFirstVideoLoad"
        @ended="handleVideoEnd"
        autoplay
        muted
        playsinline
      ></video>
      <div class="scope-button-home">
        <button
          v-for="(item, key) in scope"
          :id="`button-home-${key}`"
          :key="key"
          :class="{ 'scope-button-home--active': scopeSelected === item.url }"
          @mouseover="handleMouseOver(key)"
          @mouseleave="handleMouseLeave"
          @click="toScope(item.url)"
        >
          {{ item.label }}
        </button>
      </div>
      <div
        v-show="scopeSelected === 'ci'"
        id="scope-menu"
        class="scope-button-menus"
      >
        <button class="scope-button-menus--button">Squances</button>
        <button
          class="scope-button-menus--button"
          @click="() => router.push(`${route.path}/scope`)"
        >
          Scope
        </button>
        <button class="scope-button-menus--button">IK</button>
        <button class="scope-button-menus--button">Consmat</button>
        <button class="scope-button-menus--button">Manpower</button>
        <button class="scope-button-menus--button">Part</button>
        <button class="scope-button-menus--button">HSE</button>
        <button class="scope-button-menus--button-last">Add Scope</button>
      </div>
      <!-- <div class="scope-button-home-2">
        <button>Exhaust Section</button>
        <button>Turbine Section</button>
        <button>Combustion Sec</button>
        <button>Compressor Sec</button>
        <button>Inlet Section</button>
        <button>Generator Sec</button>
      </div> -->
    </div>
  </div>
</template>

<style lang="sass">
.scope-button-home
  @apply absolute z-[11] flex flex-col gap-2 left-[180px] top-[165px] text-center text-sm text-neutral-50 font-bold
  > button
    @apply bg-buttonGray py-2 w-[200px] rounded shadow-md shadow-neutral-950
    &:hover
      @apply bg-cyan-500
  &--active
    @apply bg-cyan-500 !important

.scope-button-menus
  @apply flex text-sm text-neutral-50 fixed z-[9999] top-[50px] right-0
  &--button
    @apply px-6 py-2 bg-buttonGray w-[150px] mr-[-22px]
    clip-path: polygon(15% 0, 100% 0, 85% 100%, 0% 100%)
    &:hover
      @apply bg-yellow-500
  &--button-last
    @apply px-6 py-2 bg-buttonGray w-[150px]
    clip-path: polygon(15% 0, 100% 0, 100% 100%, 0% 100%)
    &:hover
      @apply bg-yellow-500
</style>
