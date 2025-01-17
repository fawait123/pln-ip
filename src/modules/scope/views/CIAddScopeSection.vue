<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";

import eventBus from "@/utils/eventBus";
import { Breadcrumb } from "@/components";
import { useGlobalStore } from "@/stores/GlobalStore";
import { convertToOriginalFormat } from "@/helpers/global";
import type { BreadcrumbType } from "@/components/navigations/Breadcrumb.vue";
import ButtonPart from "../components/ButtonPart.vue";

// VIDEO INLET
import InletSection1 from "@/assets/videos/add-scope/inlet-section/1-inlet.mp4";
import InletSection2 from "@/assets/videos/add-scope/inlet-section/2-inlet.mp4";
import InletSection3 from "@/assets/videos/add-scope/inlet-section/3-inlet.mp4";
import InletSection4 from "@/assets/videos/add-scope/inlet-section/4-inlet.mp4";
import InletSection5 from "@/assets/videos/add-scope/inlet-section/5-inlet.mp4";

// VIDEO COMPRESSOR
import CompressorSection1 from "@/assets/videos/add-scope/compressor-section/1-compressor.mp4";
import CompressorSection2 from "@/assets/videos/add-scope/compressor-section/2-compressor.mp4";
import CompressorSection3 from "@/assets/videos/add-scope/compressor-section/3-compressor.mp4";
import CompressorSection4 from "@/assets/videos/add-scope/compressor-section/4-compressor.mp4";
import CompressorSection5 from "@/assets/videos/add-scope/compressor-section/5-compressor.mp4";
import CompressorSection6 from "@/assets/videos/add-scope/compressor-section/6-compressor.mp4";
import CompressorSection7 from "@/assets/videos/add-scope/compressor-section/7-compressor.mp4";
import CompressorSection8 from "@/assets/videos/add-scope/compressor-section/8-compressor.mp4";
import CompressorSection9 from "@/assets/videos/add-scope/compressor-section/9-compressor.mp4";
import CompressorSection10 from "@/assets/videos/add-scope/compressor-section/10-compressor.mp4";
import CompressorSection11 from "@/assets/videos/add-scope/compressor-section/11-compressor.mp4";
import CompressorSection12 from "@/assets/videos/add-scope/compressor-section/12-compressor.mp4";
import CompressorSection13 from "@/assets/videos/add-scope/compressor-section/13-compressor.mp4";
import CompressorSection14 from "@/assets/videos/add-scope/compressor-section/14-compressor.mp4";

// VIDEO GENERATOR
import GeneratorSection1 from "@/assets/videos/add-scope/generator-section/1-cover-bearing-5.mp4";
import GeneratorSection2 from "@/assets/videos/add-scope/generator-section/2-turning-device.mp4";
import GeneratorSection3 from "@/assets/videos/add-scope/generator-section/3-base-plate-turning-device.mp4";
import GeneratorSection4 from "@/assets/videos/add-scope/generator-section/4-cover-coupling-lower.mp4";
import GeneratorSection5 from "@/assets/videos/add-scope/generator-section/5-air-seal-cover-exciter.mp4";
import GeneratorSection6 from "@/assets/videos/add-scope/generator-section/6-cover-exciter.mp4";
import GeneratorSection7 from "@/assets/videos/add-scope/generator-section/7-cover-bearing-5.mp4";
import GeneratorSection8 from "@/assets/videos/add-scope/generator-section/8-bearing-5.mp4";
import GeneratorSection9 from "@/assets/videos/add-scope/generator-section/9-pedestal-bearing-5.mp4";
import GeneratorSection10 from "@/assets/videos/add-scope/generator-section/10-cover-fan-outer-seal.mp4";
import GeneratorSection11 from "@/assets/videos/add-scope/generator-section/11-brush.mp4";
import GeneratorSection12 from "@/assets/videos/add-scope/generator-section/12-brush-rigging.mp4";
import GeneratorSection13 from "@/assets/videos/add-scope/generator-section/13-base-plate-bearing 5.mp4";
import GeneratorSection14 from "@/assets/videos/add-scope/generator-section/14-outer-oil-deflector-nde.mp4";
import GeneratorSection15 from "@/assets/videos/add-scope/generator-section/15-upper-outer-braket-nde.mp4";
import GeneratorSection16 from "@/assets/videos/add-scope/generator-section/16-upper-bearing-4.mp4";
import GeneratorSection17 from "@/assets/videos/add-scope/generator-section/17-outer-oil-deflector-de.mp4";
import GeneratorSection18 from "@/assets/videos/add-scope/generator-section/18-upper-outer-bracket-nde.mp4";
import GeneratorSection19 from "@/assets/videos/add-scope/generator-section/19-upper-bearing-3.mp4";
import GeneratorSection20 from "@/assets/videos/add-scope/generator-section/20-lower-bearing-4.mp4";

const videosData = ref({
  ["inlet-section"]: [
    {
      id: 0,
      video: InletSection1,
      duration: 155000,
      name: "Inlet Duct",
      top: 235,
      left: 560,
    },
    {
      id: 1,
      video: InletSection2,
      duration: 155000,
      name: "Inlet manifold",
      top: 235,
      left: 530,
    },
    {
      id: 2,
      video: InletSection3,
      duration: 155000,
      name: "Vapour Pipe",
      top: 230,
      left: 700,
    },
    {
      id: 3,
      video: InletSection4,
      duration: 155000,
      name: "Casing Upper",
      top: 235,
      left: 550,
    },
    {
      id: 4,
      video: InletSection5,
      duration: 155000,
      name: "Seal Housing Upper",
      top: 235,
      left: 510,
    },
  ],
  ["compressor-section"]: [
    {
      id: 0,
      video: CompressorSection1,
      duration: 155000,
      name: "Inlet Duct",
      top: 235,
      left: 560,
    },
    {
      id: 1,
      video: CompressorSection2,
      duration: 155000,
      name: "Inlet manifold",
      top: 235,
      left: 530,
    },
    {
      id: 2,
      video: CompressorSection3,
      duration: 155000,
      name: "Vapour Pipe",
      top: 230,
      left: 700,
    },
    {
      id: 3,
      video: CompressorSection4,
      duration: 155000,
      name: "Casing Upper",
      top: 235,
      left: 550,
    },
    {
      id: 4,
      video: CompressorSection5,
      duration: 155000,
      name: "Seal Housing Upper",
      top: 235,
      left: 510,
    },
    {
      id: 5,
      video: CompressorSection6,
      duration: 155000,
      name: "Bleed Pipe",
      top: 235,
      left: 410,
    },
    {
      id: 6,
      video: CompressorSection7,
      duration: 165000,
      name: "RCA Pipe",
      top: 235,
      left: 550,
    },
    {
      id: 7,
      video: CompressorSection8,
      duration: 155000,
      name: "Compressor Cylinder",
      top: 235,
      left: 470,
    },
    {
      id: 8,
      video: CompressorSection9,
      duration: 155000,
      name: "Compressor Vane Row 1 Lower",
      top: 238,
      left: 735,
    },
    {
      id: 9,
      video: CompressorSection10,
      duration: 155000,
      name: "Compressor Vane Row 2 Lower",
      top: 238,
      left: 730,
    },
    {
      id: 10,
      video: CompressorSection11,
      duration: 155000,
      name: "Compressor Vane Row 3 Lower",
      top: 235,
      left: 470,
    },
    {
      id: 11,
      video: CompressorSection12,
      duration: 155000,
      name: "Compressor Vane Row 4 Lower",
      top: 235,
      left: 360,
    },
    {
      id: 12,
      video: CompressorSection13,
      duration: 155000,
      name: "Compressor Vane Row 5 Lower",
      top: 238,
      left: 360,
    },
    {
      id: 13,
      video: CompressorSection14,
      duration: 155000,
      name: "Compressor Vane Row 6 Lower",
      top: 235,
      left: 265,
    },
  ],
  ["generator-section"]: [
    {
      id: 0,
      video: GeneratorSection1,
      duration: 155000,
      name: "Cover Bearing 5",
      top: 235,
      left: 470,
    },
    {
      id: 1,
      video: GeneratorSection2,
      duration: 155000,
      name: "Turning Device",
      top: 233,
      left: 545,
    },
    {
      id: 2,
      video: GeneratorSection3,
      duration: 155000,
      name: "Base Plate Turning Device",
      top: 235,
      left: 415,
    },
    {
      id: 3,
      video: GeneratorSection4,
      duration: 155000,
      name: "Cover Coupling Lower",
      top: 235,
      left: 545,
    },
    {
      id: 4,
      video: GeneratorSection5,
      duration: 155000,
      name: "Air Seal Cover Exciter",
      top: 235,
      left: 530,
    },
    {
      id: 5,
      video: GeneratorSection6,
      duration: 155000,
      name: "Cover Exciter",
      top: 235,
      left: 590,
    },
    {
      id: 6,
      video: GeneratorSection7,
      duration: 155000,
      name: "Cover Bearing 5",
      top: 235,
      left: 585,
    },
    {
      id: 7,
      video: GeneratorSection8,
      duration: 155000,
      name: "Bearing 5",
      top: 240,
      left: 630,
    },
    {
      id: 8,
      video: GeneratorSection9,
      duration: 155000,
      name: "Pedestal Bearing 5",
      top: 235,
      left: 570,
    },
    {
      id: 9,
      video: GeneratorSection10,
      duration: 155000,
      name: "Cover Fan Outer Seal",
      top: 235,
      left: 570,
    },
    {
      id: 10,
      video: GeneratorSection11,
      duration: 155000,
      name: "Brush",
      top: 238,
      left: 705,
    },
    {
      id: 11,
      video: GeneratorSection12,
      duration: 155000,
      name: "Brush Rigging",
      top: 236,
      left: 660,
    },
    {
      id: 12,
      video: GeneratorSection13,
      duration: 155000,
      name: "Base Plate Bearing 5",
      top: 235,
      left: 580,
    },
    {
      id: 13,
      video: GeneratorSection14,
      duration: 155000,
      name: "Outer Oil Deflector NDE",
      top: 235,
      left: 615,
    },
    {
      id: 14,
      video: GeneratorSection15,
      duration: 155000,
      name: "Upper Outer Braket NDE",
      top: 238,
      left: 570,
    },
    {
      id: 15,
      video: GeneratorSection16,
      duration: 155000,
      name: "Upper Bearing 4",
      top: 235,
      left: 670,
    },
    {
      id: 16,
      video: GeneratorSection17,
      duration: 155000,
      name: "Outer Oil Deflector DE",
      top: 235,
      left: 615,
    },
    {
      id: 17,
      video: GeneratorSection18,
      duration: 155000,
      name: "Upper Outer Bracket NDE",
      top: 235,
      left: 560,
    },
    {
      id: 18,
      video: GeneratorSection19,
      duration: 155000,
      name: "Upper Bearing 3",
      top: 235,
      left: 580,
    },
    {
      id: 19,
      video: GeneratorSection20,
      duration: 155000,
      name: "Lower Bearing 4",
      top: 235,
      left: 660,
    },
  ],
});

const route = useRoute();
const videos: any = computed(() => {
  return videosData.value[(route.params.section as string) || "inlet-section"];
});

const currentVideoIndex = ref(0);
const videoRef = ref<HTMLVideoElement | null>(null);
const isButtonVisible = ref(false);
const openStep = ref(false);
const isReversing = ref(false);
let reverseInterval: number | null = null;

const router = useRouter();

const globalStore = useGlobalStore();
const {
  titleHeader,
  disabledNext,
  disabledBack,
  isStepNavigation,
  isAddScope,
} = storeToRefs(globalStore);
const breadcrumb = ref<BreadcrumbType[]>([]);

const videoState = ref({
  isTransitioning: false,
});

const handleVideoEnd = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const videoParam = urlParams.get("video") || "1";
  const toParam = urlParams.get("to");

  if (toParam) {
    if (currentVideoIndex.value < parseInt(toParam) - 1) {
      isButtonVisible.value = true;
      disabledNext.value = false;
      disabledBack.value = false;
      setTimeout(() => {
        const nextVideo = currentVideoIndex.value + 1;
        currentVideoIndex.value = nextVideo;
        isButtonVisible.value = false;
        disabledNext.value = true;
        disabledBack.value = true;

        const url = new URL(window.location.href);
        url.search = `?video=${parseInt(videoParam) + 1}&to=${toParam}`;
        window.history.replaceState({}, "", url);
      }, 500);
    } else if (currentVideoIndex.value > parseInt(toParam) - 1) {
      isButtonVisible.value = true;
      disabledNext.value = false;
      disabledBack.value = false;
      setTimeout(() => {
        isButtonVisible.value = false;
        disabledNext.value = true;
        disabledBack.value = true;
        if (videoRef.value) {
          reverseInterval = setInterval(reverseVideo, 100);
        }
      }, 500);
    } else if (currentVideoIndex.value === parseInt(toParam) - 1) {
      isButtonVisible.value = true;
      disabledNext.value = false;
      disabledBack.value = false;

      const { to, video, ...updatedQuery } = route.query;
      router.replace({
        path: route.path,
        query: { video: currentVideoIndex.value + 1, ...updatedQuery },
      });
    }
  } else {
    isButtonVisible.value = true;
    disabledNext.value = false;
    disabledBack.value = false;
  }
};

const initializeVideo = async (index: number, startAtEnd = false) => {
  videoState.value.isTransitioning = true;
  isButtonVisible.value = false;
  disabledNext.value = true;
  disabledBack.value = true;

  if (videoRef.value) {
    videoRef.value.pause();
  }

  currentVideoIndex.value = index;
  // isFinish.value = index === videos.value.length - 1;
  // isAddScope.value = index === videos.length - 1;

  await new Promise((resolve) => {
    if (videoRef.value) {
      videoRef.value.onloadedmetadata = () => {
        if (startAtEnd && videoRef.value) {
          videoRef.value.currentTime = videoRef.value.duration - 0.1;
          isButtonVisible.value = true;
          disabledNext.value = false;
          disabledBack.value = false;
        } else {
          videoRef.value?.play();
        }
        resolve(null);
      };
    }
  });

  videoState.value.isTransitioning = false;
};

const updateURLParameter = (index: number, startAtEnd = false) => {
  const url = new URL(window.location.href);
  url.searchParams.set("video", (index + 1).toString());
  if (startAtEnd) {
    url.searchParams.set("start", "end");
  } else {
    url.searchParams.delete("start");
  }
  window.history.replaceState({}, "", url);
};

const reverseVideo = () => {
  if (!videoRef.value || videoRef.value.currentTime <= 0) {
    if (reverseInterval) {
      clearInterval(reverseInterval);
      reverseInterval = null;
    }
    isReversing.value = false;

    const prevIndex = currentVideoIndex.value - 1;

    if (prevIndex < 0) {
      if (route.name === "main add scope squences section") {
        router.push(
          `/${route.params.id}/create/unit/${route.params.scope}/${route.params.menu}/add-scope-squences`
        );
      } else {
        router.push(
          `/${route.params.id}/create/unit/${route.params.scope}/add-scope`
        );
      }
      return;
    }

    currentVideoIndex.value = prevIndex;
    updateURLParameter(prevIndex, true);
    initializeVideo(prevIndex, true);
    return;
  }

  videoRef.value.currentTime = Math.max(0, videoRef.value.currentTime - 0.1);
};

const handleBack = () => {
  if (videoState.value.isTransitioning) return;

  isReversing.value = true;
  videoState.value.isTransitioning = true;
  isButtonVisible.value = false;
  disabledNext.value = true;
  disabledBack.value = true;

  if (videoRef.value) {
    reverseInterval = setInterval(reverseVideo, 100);
  }
};

const handleNext = async () => {
  if (
    videoState.value.isTransitioning ||
    currentVideoIndex.value >= videos.value.length - 1
  ) {
    if (route.name === "main add scope squences section") {
      router.push(
        `/${route.params.id}/create/unit/${route.params.scope}/${route.params.menu}/add-scope-squences/${route.params.section}/result`
      );
    } else {
      router.push(
        `/${route.params.id}/create/unit/${route.params.scope}/add-scope/${route.params.section}/result`
      );
    }
  } else {
    const nextIndex = currentVideoIndex.value + 1;
    updateURLParameter(nextIndex);
    await initializeVideo(nextIndex);
  }
};

const handleJumpStep = async (index: number) => {
  if (videoRef.value) {
    if (videoRef.value.currentTime === videoRef.value.duration) {
      const urlParams = new URLSearchParams(window.location.search);
      const videoParam = urlParams.get("video") || "1";
      const video = parseInt(videoParam, 10);

      if (index === video) {
        return;
      }

      const { path } = route;

      disabledNext.value = true;
      disabledBack.value = true;
      isButtonVisible.value = false;

      if (index > video) {
        const updatedQuery = { video: video + 1, to: index };
        router.push({ path, query: updatedQuery });
        const nextIndex = currentVideoIndex.value + 1;
        currentVideoIndex.value = nextIndex;
        await initializeVideo(nextIndex);
      } else {
        const updatedQuery = { video: video, to: index };
        router.push({ path, query: updatedQuery });
        if (videoRef.value) {
          reverseInterval = setInterval(reverseVideo, 100);
        }
      }

      openStep.value = false;
    }
  }
};

const handleStepNavigation = () => {
  openStep.value = true;
};

const handleCloseStep = () => {
  openStep.value = false;
};

watch(openStep, (value) => {
  if (value) {
    isStepNavigation.value = false;
  } else {
    isStepNavigation.value = true;
  }
});

const initializeFromURL = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const videoParam = urlParams.get("video") || "1";
  const startParam = urlParams.get("start");
  const index = Math.max(
    0,
    Math.min(parseInt(videoParam, 10) - 1, videos.value.length - 1)
  );

  await initializeVideo(index, startParam === "end");
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
  titleHeader.value = convertToOriginalFormat(route.params.section as string);

  disabledNext.value = true;
  disabledBack.value = true;
  // isFinish.value = false;
  isStepNavigation.value = true;

  window.addEventListener("popstate", initializeFromURL);
  eventBus.on("next", handleNext);
  eventBus.on("back", handleBack);
  eventBus.on("stepNavigation", handleStepNavigation);

  initializeFromURL();
});

onUnmounted(() => {
  window.removeEventListener("popstate", initializeFromURL);
  eventBus.off("next", handleNext);
  eventBus.off("back", handleBack);
  eventBus.off("stepNavigation", handleStepNavigation);
  if (reverseInterval) {
    clearInterval(reverseInterval);
    reverseInterval = null;
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
        :src="videos[currentVideoIndex]?.video"
        @ended="handleVideoEnd"
        autoplay
        muted
        playsinline
        class="scope-video"
      ></video>
      <div v-for="(item, key) in videos" :key="key">
        <div
          v-if="
            isButtonVisible && currentVideoIndex === key && item.name !== ''
          "
          class="absolute"
          :style="{ top: `${item.top}px`, left: `${item.left}px` }"
        >
          <ButtonPart :text="item.name" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass"></style>

<!-- <script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";

import eventBus from "@/utils/eventBus";
import { Breadcrumb } from "@/components";
import { useGlobalStore } from "@/stores/GlobalStore";
import { convertToOriginalFormat } from "@/helpers/global";
import type { BreadcrumbType } from "@/components/navigations/Breadcrumb.vue";

const imgUrl = new URL("@/assets/images/bg-ci-section.png", import.meta.url)
  .href;

const router = useRouter();
const route = useRoute();
const globalStore = useGlobalStore();
const { titleHeader, disabledNext, disabledBack, isFinish, isStepNavigation } =
  storeToRefs(globalStore);
const breadcrumb = ref<BreadcrumbType[]>([]);

const handleNext = () => {
  if (route.name === "main add scope squences section") {
    router.push(
      `/${route.params.id}/create/unit/${route.params.scope}/${route.params.menu}/add-scope-squences/${route.params.section}/result`
    );
  } else {
    router.push(
      `/${route.params.id}/create/unit/${route.params.scope}/add-scope/${route.params.section}/result`
    );
  }
};

const handleBack = () => {
  if (route.name === "main add scope squences section") {
    router.push(
      `/${route.params.id}/create/unit/${route.params.scope}/add-scope`
    );
  } else {
    router.push(
      `/${route.params.id}/create/unit/${route.params.scope}/add-scope`
    );
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
    {
      name: "Add Scope",
      as_link: false,
      url: "",
    },
  ];
  titleHeader.value = convertToOriginalFormat(route.params.section as string);

  disabledNext.value = false;
  disabledBack.value = false;
  isFinish.value = false;
  isStepNavigation.value = false;

  eventBus.on("next", handleNext);
  eventBus.on("back", handleBack);
});

onUnmounted(() => {
  eventBus.off("next", handleNext);
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
    <div class="scope-breadcrumb">
      <Breadcrumb :items="breadcrumb" />
    </div>
  </div>
</template> -->
