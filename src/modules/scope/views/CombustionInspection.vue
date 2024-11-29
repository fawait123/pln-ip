<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";

import { useGlobalStore } from "@/stores/GlobalStore";
import type { BreadcrumbType } from "@/components/navigations/Breadcrumb.vue";
import { convertToOriginalFormat } from "@/helpers/global";
import { Breadcrumb } from "@/components";
import eventBus from "@/utils/eventBus";

// VIDEO
import CI1 from "@/assets/videos/combustion-inspection/new-1-manhole-turbine-cylinder.mp4";
import CI2 from "@/assets/videos/combustion-inspection/new-2-flame-detector.mp4";

const videos = [
  { video: CI1, duration: 5000 },
  { video: CI2, duration: 6000 },
];

const router = useRouter();
const route = useRoute();
const globalStore = useGlobalStore();
const { titleHeader, disabledBack, disabledNext } = storeToRefs(globalStore);
const breadcrumb = ref<BreadcrumbType[]>([]);

const currentVideoIndex = ref(0);
const videoRef = ref<HTMLVideoElement | null>(null);
const isVideoEnded = ref(false);
const isRewinding = ref(false);
let rewindInterval: ReturnType<typeof setInterval> | null = null;
const isButtonVisible = ref(false);

const handleVideoEnd = () => {
  isVideoEnded.value = true;
  if (isRewinding.value) {
    isRewinding.value = false;
    videoRef.value?.pause();
  }
};

const initializeFromURL = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const videoParam = urlParams.get("video") || "1";
  const startParam = urlParams.get("start");

  isButtonVisible.value = false;

  if (startParam === "end") {
    isButtonVisible.value = true;

    videoRef?.value?.addEventListener(
      "loadedmetadata",
      () => {
        if (videoRef.value && isFinite(videoRef.value.duration)) {
          videoRef.value.currentTime = videoRef.value.duration;
        }
      },
      { once: true }
    );

    disabledNext.value = false;
    disabledBack.value = false;

    const parsedIndex = parseInt(videoParam, 10) - 1;
    if (parsedIndex) {
      router.push(`/${route.params.id}/create/unit/${route.params.scope}`);
    }
  } else if (videoParam && startParam !== "end") {
    const parsedIndex = parseInt(videoParam, 10) - 1;
    if (parsedIndex >= 0 && parsedIndex < videos.length) {
      currentVideoIndex.value = parsedIndex;

      setTimeout(() => {
        isButtonVisible.value = true;
        disabledNext.value = false;
        disabledBack.value = false;
      }, videos[currentVideoIndex.value].duration);
    } else {
      router.push(`${route.params.id}/create/unit/${route.params.scope}`);
    }
  }
};

const updateURLParameter = () => {
  const url = new URL(window.location.href);
  url.searchParams.set("video", (currentVideoIndex.value + 1).toString());
  window.history.replaceState({}, "", url);
};

const handleNext = () => {
  if (currentVideoIndex.value < videos.length - 1) {
    currentVideoIndex.value++;
    isVideoEnded.value = false;
    isButtonVisible.value = false;
    disabledNext.value = true;
    disabledBack.value = true;

    const url = new URL(window.location.href);
    url.search = `?video=${currentVideoIndex.value + 1}`;
    window.history.replaceState({}, "", url);

    initializeFromURL();
  }
};

const handleBack = () => {
  if (videoRef.value) {
    isRewinding.value = true;
    isButtonVisible.value = false;
    disabledNext.value = true;
    disabledBack.value = true;

    rewindInterval = setInterval(() => {
      if (videoRef.value && videoRef.value.currentTime > 0) {
        videoRef.value.currentTime -= 0.1;
      } else {
        clearInterval(rewindInterval!);
        isRewinding.value = false;

        currentVideoIndex.value--;

        if (currentVideoIndex.value < 0) {
          router.push(`/${route.params.id}/create/unit/${route.params.scope}`);
        } else {
          const url = new URL(window.location.href);
          url.searchParams.set("start", "end");
          window.history.replaceState({}, "", url);

          updateURLParameter();
          initializeFromURL();
        }
      }
    }, 100);
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
    {
      name: "CI",
      as_link: false,
      url: "",
    },
  ];
  titleHeader.value = "Combustion Inspection";

  disabledNext.value = true;
  disabledBack.value = true;
  initializeFromURL();
  window.addEventListener("popstate", initializeFromURL);
  eventBus.on("next", handleNext);
  eventBus.on("back", handleBack);
});

onUnmounted(() => {
  window.removeEventListener("popstate", initializeFromURL);
  eventBus.off("next", handleNext);
  eventBus.off("back", handleBack);

  if (rewindInterval) {
    clearInterval(rewindInterval);
  }
});
</script>

<template>
  <div class="scope-container">
    <div class="scope-breadcrumb">
      <Breadcrumb :items="breadcrumb" />
    </div>
    <video
      ref="videoRef"
      :src="videos[currentVideoIndex].video"
      class="scope-video"
      @ended="handleVideoEnd"
      autoplay
      muted
      playsinline
    ></video>
    <button
      v-if="isButtonVisible && currentVideoIndex === 0"
      class="button-ci mtc"
    >
      Manhole Turbine Cylinder
    </button>
    <button
      v-if="isButtonVisible && currentVideoIndex === 1"
      class="button-ci fd"
    >
      Flame Detector
    </button>
  </div>
</template>

<style lang="sass">
.mtc
  @apply absolute z-[11] right-[calc((100vw/2)+12%)] top-[calc((100vh/2)-27%)]

.fd
  @apply absolute z-[11] right-[calc((100vw/2)+5%)] top-[calc((100vh/2)-3%)]

.button-ci
  @apply bg-cyan-500 py-2 w-[200px] text-center text-sm text-neutral-50 font-bold cursor-pointer rounded
  &:hover
    @apply bg-yellow-500
</style>
