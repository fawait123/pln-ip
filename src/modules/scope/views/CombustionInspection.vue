<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";

import { useGlobalStore } from "@/stores/GlobalStore";
import type { BreadcrumbType } from "@/components/navigations/Breadcrumb.vue";
import { convertToOriginalFormat } from "@/helpers/global";
import { Breadcrumb } from "@/components";
import eventBus from "@/utils/eventBus";
import ButtonPart from "../components/ButtonPart.vue";

// VIDEO
import CI1 from "@/assets/videos/combustion-inspection/1-manhole-turbine-cylinder.mp4";
import CI2 from "@/assets/videos/combustion-inspection/2-flame-detector.mp4";
import CI3 from "@/assets/videos/combustion-inspection/3-flame-igniter.mp4";
import CI4 from "@/assets/videos/combustion-inspection/4-discavity-temperature.mp4";
import CI5 from "@/assets/videos/combustion-inspection/5-black-patch-temperature.mp4";
import CI6 from "@/assets/videos/combustion-inspection/6-fuel-branch-pipe.mp4";
import CI7 from "@/assets/videos/combustion-inspection/7-cross-flame-tube.mp4";
import CI8 from "@/assets/videos/combustion-inspection/8-top-hat.mp4";
import CI9 from "@/assets/videos/combustion-inspection/9-fuel-nozzle.mp4";
import CI10 from "@/assets/videos/combustion-inspection/10-combuster-basket.mp4";
import CI11 from "@/assets/videos/combustion-inspection/11-top-hat.mp4";
import CI12 from "@/assets/videos/combustion-inspection/12-u-support.mp4";
import CI13 from "@/assets/videos/combustion-inspection/13-bypass-elbow.mp4";
import CI14 from "@/assets/videos/combustion-inspection/14-transition-piece.mp4";
import CI15 from "@/assets/videos/combustion-inspection/15.mp4";
import CI16 from "@/assets/videos/combustion-inspection/16-transition-piece.mp4";
import CI17 from "@/assets/videos/combustion-inspection/17-u-support.mp4";
import CI18 from "@/assets/videos/combustion-inspection/18-bypass-elbow.mp4";
import CI19 from "@/assets/videos/combustion-inspection/19-top-hat.mp4";
import CI20 from "@/assets/videos/combustion-inspection/20-cross-flame-tube.mp4";
import CI21 from "@/assets/videos/combustion-inspection/21-flame-detector.mp4";
import CI22 from "@/assets/videos/combustion-inspection/22-manhole-turbine.mp4";
import CI23 from "@/assets/videos/combustion-inspection/23-discavity-temperature.mp4";
import CI24 from "@/assets/videos/combustion-inspection/24-black-patch-temperature.mp4";
import CI25 from "@/assets/videos/combustion-inspection/25-fuel-branch-pipe.mp4";
import CI26 from "@/assets/videos/combustion-inspection/26-flame-igniter.mp4";
import CI27 from "@/assets/videos/combustion-inspection/27.mp4";

const videos = [
  { video: CI1, duration: 5500 },
  { video: CI2, duration: 5500 },
  { video: CI3, duration: 7500 },
  { video: CI4, duration: 4500 },
  { video: CI5, duration: 5500 },
  { video: CI6, duration: 3500 },
  { video: CI7, duration: 7500 },
  { video: CI8, duration: 5500 },
  { video: CI9, duration: 4500 },
  { video: CI10, duration: 4500 },
  { video: CI11, duration: 1500 },
  { video: CI12, duration: 3500 },
  { video: CI13, duration: 3500 },
  { video: CI14, duration: 3500 },
  { video: CI15, duration: 3500 },
  { video: CI16, duration: 2500 },
  { video: CI17, duration: 2500 },
  { video: CI18, duration: 5500 },
  { video: CI19, duration: 5500 },
  { video: CI20, duration: 4500 },
  { video: CI21, duration: 5500 },
  { video: CI22, duration: 8500 },
  { video: CI23, duration: 5500 },
  { video: CI24, duration: 3500 },
  { video: CI25, duration: 5500 },
  { video: CI26, duration: 4500 },
  { video: CI27, duration: 4500 },
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

const handleVideoTimeUpdate = () => {
  if (videoRef.value) {
    const currentTime = videoRef.value.currentTime;
    const duration = videoRef.value.duration;

    if (currentTime >= duration) {
      isButtonVisible.value = true;
      disabledNext.value = false;
      disabledBack.value = false;
    }
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
    if (parsedIndex < 0) {
      router.push(`/${route.params.id}/create/unit/${route.params.scope}`);
    }
  } else if (videoParam && startParam !== "end") {
    const parsedIndex = parseInt(videoParam, 10) - 1;
    if (parsedIndex >= 0 && parsedIndex < videos.length) {
      currentVideoIndex.value = parsedIndex;
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

  if (videoRef.value) {
    videoRef.value.addEventListener("timeupdate", handleVideoTimeUpdate);
  }
});

onUnmounted(() => {
  window.removeEventListener("popstate", initializeFromURL);
  eventBus.off("next", handleNext);
  eventBus.off("back", handleBack);

  if (rewindInterval) {
    clearInterval(rewindInterval);
  }

  if (videoRef.value) {
    videoRef.value.removeEventListener("timeupdate", handleVideoTimeUpdate);
  }
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
        :src="videos[currentVideoIndex].video"
        @ended="handleVideoEnd"
        autoplay
        muted
        playsinline
        class="scope-video"
      ></video>
      <div
        v-if="isButtonVisible && currentVideoIndex === 0"
        class="absolute top-[147px] left-[400px]"
      >
        <ButtonPart text="Manhole Turbine Cylinder" />
      </div>
      <div
        v-if="isButtonVisible && currentVideoIndex === 1"
        class="absolute top-[140px] left-[520px]"
      >
        <ButtonPart text="Flame Detector" />
      </div>
      <div
        v-if="isButtonVisible && currentVideoIndex === 2"
        class="absolute top-[148px] left-[390px]"
      >
        <ButtonPart text="Flame Igniter" />
      </div>
      <div
        v-if="isButtonVisible && currentVideoIndex === 3"
        class="absolute top-[130px] left-[320px]"
      >
        <ButtonPart text="Discavity Temperature" />
      </div>
      <div
        v-if="isButtonVisible && currentVideoIndex === 4"
        class="absolute top-[150px] left-[295px]"
      >
        <ButtonPart text="Black Patch Temperature" />
      </div>
      <div
        v-if="isButtonVisible && currentVideoIndex === 5"
        class="absolute top-[148px] left-[300px]"
      >
        <ButtonPart text="Fuel Branch Pipe" />
      </div>
      <div
        v-if="isButtonVisible && currentVideoIndex === 6"
        class="absolute top-[148px] left-[260px]"
      >
        <ButtonPart text="Cross Flame Tube" />
      </div>
      <div
        v-if="isButtonVisible && currentVideoIndex === 7"
        class="absolute top-[148px] left-[390px]"
      >
        <ButtonPart text="Top Hat" />
      </div>
      <div
        v-if="isButtonVisible && currentVideoIndex === 8"
        class="absolute top-[148px] left-[550px]"
      >
        <ButtonPart text="Fuel Nozzle" />
      </div>
      <div
        v-if="isButtonVisible && currentVideoIndex === 9"
        class="absolute top-[148px] left-[490px]"
      >
        <ButtonPart text="Combuster Basket" />
      </div>
      <div
        v-if="isButtonVisible && currentVideoIndex === 10"
        class="absolute top-[150px] left-[415px]"
      >
        <ButtonPart text="Top Hat" />
      </div>
      <div
        v-if="isButtonVisible && currentVideoIndex === 11"
        class="absolute top-[147px] left-[610px]"
      >
        <ButtonPart text="U-Support" />
      </div>
      <div
        v-if="isButtonVisible && currentVideoIndex === 12"
        class="absolute top-[147px] left-[385px]"
      >
        <ButtonPart text="Bypass Elbow" />
      </div>
      <div
        v-if="isButtonVisible && currentVideoIndex === 13"
        class="absolute top-[147px] left-[465px]"
      >
        <ButtonPart text="Transition Piece" />
      </div>
      <div
        v-if="isButtonVisible && currentVideoIndex === 15"
        class="absolute top-[147px] left-[465px]"
      >
        <ButtonPart text="Transition Piece" />
      </div>
      <div
        v-if="isButtonVisible && currentVideoIndex === 16"
        class="absolute top-[147px] left-[480px]"
      >
        <ButtonPart text="U-Support" />
      </div>
      <div
        v-if="isButtonVisible && currentVideoIndex === 17"
        class="absolute top-[147px] left-[635px]"
      >
        <ButtonPart text="Bypass Elbow" />
      </div>
      <div
        v-if="isButtonVisible && currentVideoIndex === 18"
        class="absolute top-[147px] left-[530px]"
      >
        <ButtonPart text="Top Hat" />
      </div>
      <div
        v-if="isButtonVisible && currentVideoIndex === 19"
        class="absolute top-[147px] left-[430px]"
      >
        <ButtonPart text="Cross Flame Tube" />
      </div>
      <div
        v-if="isButtonVisible && currentVideoIndex === 20"
        class="absolute top-[147px] left-[600px]"
      >
        <ButtonPart text="Flame Detector" />
      </div>
      <div
        v-if="isButtonVisible && currentVideoIndex === 21"
        class="absolute top-[147px] left-[460px]"
      >
        <ButtonPart text="Manhole Turbine" />
      </div>
      <div
        v-if="isButtonVisible && currentVideoIndex === 22"
        class="absolute top-[143px] left-[470px]"
      >
        <ButtonPart text="Discavity Temperature" />
      </div>
      <div
        v-if="isButtonVisible && currentVideoIndex === 23"
        class="absolute top-[148px] left-[295px]"
      >
        <ButtonPart text="Black Patch Temperature" />
      </div>
      <div
        v-if="isButtonVisible && currentVideoIndex === 24"
        class="absolute top-[148px] left-[300px]"
      >
        <ButtonPart text="Fuel Branch Pipe" />
      </div>
      <div
        v-if="isButtonVisible && currentVideoIndex === 25"
        class="absolute top-[148px] left-[390px]"
      >
        <ButtonPart text="Flame Igniter" />
      </div>
    </div>
  </div>
</template>

<style lang="sass">
.wrapper-bid
  @apply absolute top-[120px] left-10 z-[100]
</style>
