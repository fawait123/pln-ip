<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

import { Button, Template, Icon } from "@/components";
import CombustionInspection1 from "@/assets/videos/combustion-inspection/1-combustion-inspection.mp4";
import CombustionInspection2 from "@/assets/videos/combustion-inspection/2-remove-comp-comb-&-comp-cylinder-section.mp4";
import { useRouter } from "vue-router";

const videos = [CombustionInspection1, CombustionInspection2];

const router = useRouter();
const currentVideoIndex = ref(0);
const videoRef = ref<HTMLVideoElement | null>(null);
const isVideoEnded = ref(false);
const isRewinding = ref(false);

const initializeFromURL = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const videoParam = urlParams.get("video");
  if (videoParam) {
    const parsedIndex = parseInt(videoParam, 10) - 1;
    if (parsedIndex >= 0 && parsedIndex < videos.length) {
      currentVideoIndex.value = parsedIndex;
    }
  }
};

const updateURLParameter = () => {
  const url = new URL(window.location.href);
  url.searchParams.set("video", (currentVideoIndex.value + 1).toString());
  window.history.replaceState({}, "", url);
};

const handleFirstVideoLoad = () => {
  if (currentVideoIndex.value === 0 && videoRef.value) {
    videoRef.value.currentTime = videoRef.value.duration - 1;
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

const goToNextVideo = () => {
  if (currentVideoIndex.value < videos.length - 1) {
    currentVideoIndex.value++;
    isVideoEnded.value = false;
    updateURLParameter();
  }
};

const goToPreviousVideo = () => {
  if (currentVideoIndex.value > 0) {
    if (videoRef.value) {
      isRewinding.value = true;
      videoRef.value.currentTime = videoRef.value.duration;
      // videoRef.value.playbackRate = -1;
      videoRef.value.play();
    }
    currentVideoIndex.value--;
    isVideoEnded.value = false;
    updateURLParameter();
  }
};

onMounted(() => {
  initializeFromURL();
  window.addEventListener("popstate", initializeFromURL);
});

onUnmounted(() => {
  window.removeEventListener("popstate", initializeFromURL);
});

const back = () => {
  router.go(-1);
};
</script>

<template>
  <Template @back="back"></Template>
  <div class="video-container">
    <div class="video-section">
      <video
        ref="videoRef"
        :src="videos[currentVideoIndex]"
        @loadedmetadata="handleFirstVideoLoad"
        @ended="handleVideoEnd"
        autoplay
        muted
        playsinline
      ></video>
    </div>

    <div class="navigation-section">
      <p class="navigation-title">GT 1.1 ABB13E1</p>
      <div v-if="currentVideoIndex === 0" class="navigation-home">
        <div class="navigation-home-button">
          <div class="navigation-home-button__wrapper">
            <div class="navigation-home-button__text">
              <p>CI</p>
              <p>Combustion Inspection</p>
            </div>
            <Icon class="text-cyan-500 text-[24px]" name="caret-right" />
          </div>
        </div>
        <div class="navigation-home-button">
          <div class="navigation-home-button__wrapper">
            <div class="navigation-home-button__text">
              <p>TI</p>
              <p>Turbine Inspection</p>
            </div>
            <Icon class="text-cyan-500 text-[24px]" name="caret-right" />
          </div>
        </div>
        <div class="navigation-home-button">
          <div class="navigation-home-button__wrapper">
            <div class="navigation-home-button__text">
              <p>MI</p>
              <p>Major Inspection</p>
            </div>
            <Icon class="text-cyan-500 text-[24px]" name="caret-right" />
          </div>
        </div>
      </div>
      <!-- <button
        v-if="isVideoEnded && currentVideoIndex > 0"
        @click="goToPreviousVideo()"
      >
        Back
      </button>
      <button
        v-if="isVideoEnded && currentVideoIndex < videos.length - 1"
        @click="goToNextVideo()"
      >
        Next
      </button> -->
    </div>
  </div>
</template>

<style lang="sass">
.video-container
  @apply flex gap-10
  .video-section
    @apply flex-[3]
    video
      @apply max-w-full h-auto
  .navigation-section
    @apply flex-[2]
    .navigation-title
      @apply text-2xl font-semibold text-neutral-950 mb-10
    .navigation-home
      @apply flex flex-col gap-4
      .navigation-home-button
        @apply relative p-[2px]
        &::before
          content: ''
          @apply w-full h-full inset-0 absolute bg-neutral-200 dark:bg-white rounded-lg opacity-0 transition-all ease-in-out
          background: linear-gradient(225deg, #4285F4 8.2%, #641EEE 46.31%, #00DE9C 82.79%)
          animation: gradient 3s ease infinite
          background-size: 150% 150%
        &__wrapper
          @apply bg-white relative z-10 w-full rounded-lg p-4 flex justify-between items-center overflow-hidden border border-cyan-500 cursor-pointer
        &__text
          > p
            &:first-child
              @apply text-base font-bold text-neutral-950
            &:last-child
              @apply text-base font-medium text-neutral-500
        &:hover
          .navigation-home-button__wrapper
            @apply border-white
          &::before
            @apply opacity-100
</style>
