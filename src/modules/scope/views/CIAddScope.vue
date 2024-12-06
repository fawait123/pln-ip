<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted, onUnmounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import eventBus from "@/utils/eventBus";
import { Breadcrumb } from "@/components";
import { useGlobalStore } from "@/stores/GlobalStore";
import { convertToKebabCase, convertToOriginalFormat } from "@/helpers/global";
import type { BreadcrumbType } from "@/components/navigations/Breadcrumb.vue";

import Section1 from "@/assets/videos/add-scope/1-exhaust.mp4";
import Section2 from "@/assets/videos/add-scope/2-turbine.mp4";
import Section3 from "@/assets/videos/add-scope/3-combustion.mp4";
import Section4 from "@/assets/videos/add-scope/4-compressor.mp4";
import Section5 from "@/assets/videos/add-scope/5-inlet.mp4";
import Section6 from "@/assets/videos/add-scope/6-generator.mp4";

const videos = [Section1, Section2, Section3, Section4, Section5, Section6];
const section = [
  "Exhaust Section",
  "Turbine Section",
  "Combustion Section",
  "Compressor Section",
  "Inlet Section",
  "Generator Section",
];

const router = useRouter();
const route = useRoute();
const globalStore = useGlobalStore();
const {
  titleHeader,
  disabledNext,
  disabledBack,
  isFinish,
  isAddScope,
  isStepNavigation,
} = storeToRefs(globalStore);

const breadcrumb = ref<BreadcrumbType[]>([]);
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

const handleMouseOver = async (section: number) => {
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
  if (videoRef.value) {
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

const handleBack = () => {
  router.push(
    `/${route.params.id}/create/unit/${route.params.scope}/ci?video=27`
  );
};

const toSection = (name: string) => {
  router.push(
    `/${route.params.id}/create/unit/${
      route.params.scope
    }/add-scope/${convertToKebabCase(name)}`
  );
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
    {
      name: "Add Scope",
      as_link: false,
      url: "",
    },
  ];
  titleHeader.value = "Add Scope";

  isFinish.value = false;
  isAddScope.value = false;
  disabledNext.value = true;
  disabledBack.value = false;
  isStepNavigation.value = false;

  eventBus.on("back", handleBack);
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
      <div class="add-scope-ci">
        <button
          v-for="(item, key) in section"
          :key="key"
          @mouseover="handleMouseOver(key)"
          @mouseleave="handleMouseLeave"
          @click="toSection(item)"
        >
          {{ item }}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
.add-scope-ci
  @apply absolute z-[11] top-[175px] left-[430px] flex
  > button
    @apply px-6 py-1 bg-buttonGray w-[150px] mr-[-22px] h-[inherit] text-xs text-neutral-50
    clip-path: polygon(15% 0, 100% 0, 85% 100%, 0% 100%)
    &:hover
      @apply bg-cyan-500
</style>
