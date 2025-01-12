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

const imgUrl = new URL("@/assets/images/bg-scope.jpg", import.meta.url).href;

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

const currentVideoIndex = ref(0);
const videoRef = ref<HTMLVideoElement | null>(null);
const isVideoEnded = ref(false);
const isRewinding = ref(false);
// let rewindInterval: ReturnType<typeof setInterval> | null = null;
const rewindInterval = ref<number | null>(null);
const is_image = ref(true);

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
  is_image.value = false;

  if (rewindInterval.value) {
    clearInterval(rewindInterval.value);
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

  // if (currentVideoIndex.value !== section) {
  //   currentVideoIndex.value = section;

  //   if (videoRef.value) {
  //     try {
  //       videoRef.value.src = videos[currentVideoIndex.value];
  //       await videoRef.value.load();

  //       if (videoRef.value.readyState >= 3) {
  //         await videoRef.value.play();
  //       } else {
  //         videoRef.value.addEventListener(
  //           "canplay",
  //           async () => {
  //             await videoRef.value?.play();
  //           },
  //           { once: true }
  //         );
  //       }
  //     } catch (err) {
  //       console.error("Error playing video:", err);
  //     }
  //   }
  // } else {
  //   if (videoRef.value) {
  //     await videoRef.value.play();
  //   }
  // }

  isRewinding.value = false;
};

const handleMouseLeave = () => {
  if (videoRef.value) {
    isRewinding.value = true;
    // rewindInterval = setInterval(() => {
    //   if (videoRef.value && videoRef.value.currentTime > 0) {
    //     videoRef.value.currentTime -= 0.1;
    //   } else {
    //     clearInterval(rewindInterval!);
    //     videoRef.value?.pause();
    //     isRewinding.value = false;
    //   }
    // }, 30);
    rewindInterval.value = setInterval(() => {
      if (videoRef.value) {
        videoRef.value.currentTime -= 0.1; // Rewind video in small increments
        if (videoRef.value.currentTime <= 0) {
          clearInterval(rewindInterval.value || undefined);
          videoRef.value.pause();
          is_image.value = true; // Switch back to image
        }
      }
    }, 50);
  }
};

const toScope = (url: string) => {
  router.push(`${route.path}/${url}`);
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
      <img
        v-show="is_image"
        :src="imgUrl"
        class="absolute w-full h-full object-fill"
      />
      <video
        v-show="!is_image"
        ref="videoRef"
        :src="videos[currentVideoIndex]"
        class="scope-video"
        @loadedmetadata="handleFirstVideoLoad"
        @ended="handleVideoEnd"
        autoplay
        muted
        playsinline
      ></video>
      <div class="scope-button-home-1">
        <button
          v-for="(item, key) in scope"
          :key="key"
          @mouseover="handleMouseOver(key)"
          @mouseleave="handleMouseLeave"
          @click="toScope(item.url)"
        >
          {{ item.label }}
        </button>
      </div>
      <div class="scope-button-home-2">
        <button>Exhaust Section</button>
        <button>Turbine Section</button>
        <button>Combustion Sec</button>
        <button>Compressor Sec</button>
        <button>Inlet Section</button>
        <button>Generator Sec</button>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
.scope-button-home-1
  @apply absolute z-[11] flex flex-col gap-2 left-[250px] top-[260px] text-center text-sm text-neutral-50 font-bold
  > button
    @apply bg-buttonGray py-2 w-[200px] rounded shadow-md shadow-neutral-950
    &:hover
      @apply bg-cyan-500

.scope-button-home-2
  @apply flex text-sm text-neutral-50 absolute z-[11] bottom-[120px] left-[50%] translate-x-[-50%]
  > button
    @apply px-6 py-2 bg-buttonGray w-[150px] mr-[-22px]
    clip-path: polygon(15% 0, 100% 0, 85% 100%, 0% 100%)
    &:hover
      @apply bg-cyan-500
</style>
