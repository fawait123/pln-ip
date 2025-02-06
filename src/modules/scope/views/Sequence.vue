<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import { useGlobalStore } from "@/stores/GlobalStore";
// import type { BreadcrumbType } from "@/components/navigations/Breadcrumb.vue";
import { convertToOriginalFormat } from "@/helpers/global";
import { Icon } from "@/components";
import eventBus from "@/utils/eventBus";
import {
  DialogContent,
  DialogDescription,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  VisuallyHidden,
} from "radix-vue";
import Sidebar from "@/components/layouts/Sidebar.vue";

import ButtonPart from "../components/ButtonPart.vue";

// VIDEO CI
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

// VIDEO MI
import MI1 from "@/assets/videos/major-inspection/1-manhole-turbine-cylinder.mp4";
import MI2 from "@/assets/videos/major-inspection/2-inlet-duct.mp4";
import MI3 from "@/assets/videos/major-inspection/3-inlet-manifold.mp4";
import MI4 from "@/assets/videos/major-inspection/4-cover-coupling.mp4";
import MI5 from "@/assets/videos/major-inspection/5-vapor-pipe.mp4";
import MI6 from "@/assets/videos/major-inspection/6-coupling-bolt.mp4";
import MI7 from "@/assets/videos/major-inspection/7-coupling-spacer.mp4";
import MI8 from "@/assets/videos/major-inspection/8-black-patch-temperature.mp4";

// VIDEO TI
import TI1 from "@/assets/videos/combustion-inspection/1-manhole-turbine-cylinder.mp4";
import TI2 from "@/assets/videos/combustion-inspection/2-flame-detector.mp4";
import TI3 from "@/assets/videos/combustion-inspection/3-flame-igniter.mp4";
import TI4 from "@/assets/videos/combustion-inspection/4-discavity-temperature.mp4";
import TI5 from "@/assets/videos/combustion-inspection/5-black-patch-temperature.mp4";
import TI6 from "@/assets/videos/combustion-inspection/6-fuel-branch-pipe.mp4";
import TI7 from "@/assets/videos/combustion-inspection/7-cross-flame-tube.mp4";
import TI8 from "@/assets/videos/combustion-inspection/8-top-hat.mp4";
import TI9 from "@/assets/videos/combustion-inspection/9-fuel-nozzle.mp4";
import TI10 from "@/assets/videos/combustion-inspection/10-combuster-basket.mp4";
import TI11 from "@/assets/videos/combustion-inspection/11-top-hat.mp4";
import TI12 from "@/assets/videos/turbine-inspection/12-cooling-pipe.mp4";
import TI13 from "@/assets/videos/turbine-inspection/13-turbine-cylinder.mp4";
import TI14 from "@/assets/videos/turbine-inspection/14-bypass-elbow.mp4";
import TI15 from "@/assets/videos/turbine-inspection/15-transition-piece.mp4";
import TI16 from "@/assets/videos/turbine-inspection/16-u-support.mp4";
import TI17 from "@/assets/videos/turbine-inspection/17-bypass-ring.mp4";
import TI18 from "@/assets/videos/turbine-inspection/18-turbine-vane-row-1-upper.mp4";
import TI19 from "@/assets/videos/turbine-inspection/19-turbine-vane-row-4-upper.mp4";
import TI20 from "@/assets/videos/turbine-inspection/20-turbine-vane-row-3-upper.mp4";
import TI21 from "@/assets/videos/turbine-inspection/21-turbine-vane-row-2-upper.mp4";
import TI22 from "@/assets/videos/turbine-inspection/22-turbine-blade-ring-1.mp4";
import TI23 from "@/assets/videos/turbine-inspection/23-turbine-seal-housing-row-2.mp4";
import TI24 from "@/assets/videos/turbine-inspection/24-turbine-seal-housing-row-3.mp4";
import TI25 from "@/assets/videos/turbine-inspection/25-turbine-seal-housing-row-4-lower.mp4";
import TI26 from "@/assets/videos/turbine-inspection/26-turbine-blade-ring-row-1-lower.mp4";
import TI27 from "@/assets/videos/turbine-inspection/27-turbine-blade-ring-row-2-lower.mp4";
import TI28 from "@/assets/videos/turbine-inspection/28-turbine-blade-ring-row-3-lower.mp4";
import TI29 from "@/assets/videos/turbine-inspection/29-turbine-blade-ring-row-4-lower.mp4";
import TI30 from "@/assets/videos/turbine-inspection/30-turbine-blade-row-1.mp4";
import TI31 from "@/assets/videos/turbine-inspection/31-turbine-blade-row-2.mp4";
import TI32 from "@/assets/videos/turbine-inspection/32-turbine-blade-row-3.mp4";
import TI33 from "@/assets/videos/turbine-inspection/33-turbine-ring-segment-row-1-upper.mp4";
import TI34 from "@/assets/videos/turbine-inspection/34.mp4";
import TI35 from "@/assets/videos/turbine-inspection/35-turbine-ring-segment-row-1-upper .mp4";
import TI36 from "@/assets/videos/turbine-inspection/36-turbine-ring-segment-row-2-upper.mp4";
import TI37 from "@/assets/videos/turbine-inspection/37-turbine-vane-segment-row-2-upper.mp4";
import TI38 from "@/assets/videos/turbine-inspection/38.mp4";
import TI39 from "@/assets/videos/turbine-inspection/39-turbine-vane-segment-row-2-upper.mp4";
import TI40 from "@/assets/videos/turbine-inspection/40-turbine-ring-segment-row-2-upper.mp4";
import TI41 from "@/assets/videos/turbine-inspection/41-turbine-ring-segment-row-3-upper.mp4";

const videosData = ref({
  ci: [
    {
      id: 0,
      video: CI1,
      duration: 5500,
      name: "Manhole Turbine Cylinder",
      top: 235,
      left: 545,
    },
    {
      id: 1,
      video: CI2,
      duration: 5500,
      name: "Flame Detector",
      top: 222,
      left: 685,
    },
    {
      id: 2,
      video: CI3,
      duration: 7500,
      name: "Flame Igniter",
      top: 235,
      left: 525,
    },
    {
      id: 3,
      video: CI4,
      duration: 4500,
      name: "Discavity Temperature",
      top: 210,
      left: 440,
    },
    {
      id: 4,
      video: CI5,
      duration: 5500,
      name: "Black Patch Temperature",
      top: 238,
      left: 420,
    },
    {
      id: 5,
      video: CI6,
      duration: 3500,
      name: "Fuel Branch Pipe",
      top: 238,
      left: 420,
    },
    {
      id: 6,
      video: CI7,
      duration: 7500,
      name: "Cross Flame Tube",
      top: 235,
      left: 370,
    },
    { id: 7, video: CI8, duration: 5500, name: "Top Hat", top: 235, left: 505 },
    {
      id: 8,
      video: CI9,
      duration: 4500,
      name: "Fuel Nozzle",
      top: 235,
      left: 715,
    },
    {
      id: 9,
      video: CI10,
      duration: 4500,
      name: "Combuster Basket",
      top: 235,
      left: 660,
    },
    {
      id: 10,
      video: CI11,
      duration: 1500,
      name: "Top Hat",
      top: 240,
      left: 540,
    },
    {
      id: 11,
      video: CI12,
      duration: 3500,
      name: "U-Support",
      top: 235,
      left: 785,
    },
    {
      id: 12,
      video: CI13,
      duration: 3500,
      name: "Bypass Elbow",
      top: 235,
      left: 515,
    },
    {
      id: 13,
      video: CI14,
      duration: 3500,
      name: "Transition Piece",
      top: 237,
      left: 615,
    },
    { id: 14, video: CI15, duration: 3500, name: "", top: 0, left: 0 },
    {
      id: 15,
      video: CI16,
      duration: 2500,
      name: "Transition Piece",
      top: 237,
      left: 615,
    },
    {
      id: 16,
      video: CI17,
      duration: 2500,
      name: "U-Support",
      top: 237,
      left: 630,
    },
    {
      id: 17,
      video: CI18,
      duration: 5500,
      name: "Bypass Elbow",
      top: 235,
      left: 790,
    },
    {
      id: 18,
      video: CI19,
      duration: 5500,
      name: "Top Hat",
      top: 233,
      left: 685,
    },
    {
      id: 19,
      video: CI20,
      duration: 4500,
      name: "Cross Flame Tube",
      top: 237,
      left: 580,
    },
    {
      id: 20,
      video: CI21,
      duration: 5500,
      name: "Flame Detector",
      top: 237,
      left: 785,
    },
    {
      id: 21,
      video: CI22,
      duration: 8500,
      name: "Manhole Turbine",
      top: 235,
      left: 615,
    },
    {
      id: 22,
      video: CI23,
      duration: 5500,
      name: "Discavity Temperature",
      top: 230,
      left: 630,
    },
    {
      id: 23,
      video: CI24,
      duration: 3500,
      name: "Black Patch Temperature",
      top: 238,
      left: 420,
    },
    {
      id: 24,
      video: CI25,
      duration: 5500,
      name: "Fuel Branch Pipe",
      top: 237,
      left: 420,
    },
    {
      id: 25,
      video: CI26,
      duration: 4500,
      name: "Flame Igniter",
      top: 236,
      left: 525,
    },
    { id: 26, video: CI27, duration: 4500, name: "", top: 0, left: 0 },
  ],
  mi: [
    {
      id: 0,
      video: MI1,
      duration: 5500,
      name: "Manhole Turbine Cylinder",
      top: 233,
      left: 550,
    },
    {
      id: 1,
      video: MI2,
      duration: 5500,
      name: "Inlet Duct",
      top: 233,
      left: 660,
    },
    {
      id: 2,
      video: MI3,
      duration: 7500,
      name: "Inlet Manifold",
      top: 233,
      left: 630,
    },
    {
      id: 3,
      video: MI4,
      duration: 4500,
      name: "Cover Coupling",
      top: 237,
      left: 625,
    },
    {
      id: 4,
      video: MI5,
      duration: 5500,
      name: "Vapor Pipe",
      top: 237,
      left: 585,
    },
    {
      id: 5,
      video: MI6,
      duration: 3500,
      name: "Coupling Bolt",
      top: 237,
      left: 585,
    },
    {
      id: 6,
      video: MI7,
      duration: 7500,
      name: "Coupling Spacer",
      top: 237,
      left: 500,
    },
    {
      id: 7,
      video: MI8,
      duration: 5500,
      name: "Black Patch Temperature",
      top: 235,
      left: 505,
    },
  ],
  ti: [
    {
      id: 0,
      video: CI1,
      duration: 5500,
      name: "Manhole Turbine Cylinder",
      top: 235,
      left: 545,
    },
    {
      id: 1,
      video: CI2,
      duration: 5500,
      name: "Flame Detector",
      top: 222,
      left: 685,
    },
    {
      id: 2,
      video: CI3,
      duration: 7500,
      name: "Flame Igniter",
      top: 235,
      left: 525,
    },
    {
      id: 3,
      video: CI4,
      duration: 4500,
      name: "Discavity Temperature",
      top: 210,
      left: 440,
    },
    {
      id: 4,
      video: CI5,
      duration: 5500,
      name: "Black Patch Temperature",
      top: 238,
      left: 420,
    },
    {
      id: 5,
      video: CI6,
      duration: 3500,
      name: "Fuel Branch Pipe",
      top: 238,
      left: 420,
    },
    {
      id: 6,
      video: CI7,
      duration: 7500,
      name: "Cross Flame Tube",
      top: 235,
      left: 370,
    },
    { id: 7, video: CI8, duration: 5500, name: "Top Hat", top: 235, left: 505 },
    {
      id: 8,
      video: CI9,
      duration: 4500,
      name: "Fuel Nozzle",
      top: 235,
      left: 715,
    },
    {
      id: 9,
      video: CI10,
      duration: 4500,
      name: "Combuster Basket",
      top: 235,
      left: 660,
    },
    {
      id: 10,
      video: CI11,
      duration: 1500,
      name: "Top Hat",
      top: 240,
      left: 540,
    },
    {
      id: 11,
      video: TI12,
      duration: 1500,
      name: "Cooling Pipe",
      top: 240,
      left: 700,
    },
    {
      id: 12,
      video: TI13,
      duration: 1500,
      name: "Turbine Cylinder",
      top: 241,
      left: 1010,
    },
    {
      id: 13,
      video: TI14,
      duration: 1500,
      name: "Bypass Elbow",
      top: 240,
      left: 970,
    },
    {
      id: 14,
      video: TI15,
      duration: 1500,
      name: "Transition Piece",
      top: 240,
      left: 1010,
    },
    {
      id: 15,
      video: TI16,
      duration: 1500,
      name: "U Support",
      top: 240,
      left: 1180,
    },
    {
      id: 16,
      video: TI17,
      duration: 1500,
      name: "Bypass Ring",
      top: 240,
      left: 960,
    },
    {
      id: 17,
      video: TI18,
      duration: 1500,
      name: "Turbine Vane Row 1 Upper",
      top: 240,
      left: 770,
    },
    {
      id: 18,
      video: TI19,
      duration: 1500,
      name: "Turbine Vane Row 4 Upper",
      top: 240,
      left: 860,
    },
    {
      id: 19,
      video: TI20,
      duration: 1500,
      name: "Turbine Vane Row 3 Upper",
      top: 240,
      left: 980,
    },
    {
      id: 20,
      video: TI21,
      duration: 1500,
      name: "Turbine Vane Row 2 Upper",
      top: 240,
      left: 640,
    },
    {
      id: 21,
      video: TI22,
      duration: 1500,
      name: "Turbine Blade Ring 1",
      top: 240,
      left: 815,
    },
    {
      id: 22,
      video: TI23,
      duration: 1500,
      name: "Turbine Seal Housing Row 2",
      top: 240,
      left: 690,
    },
    {
      id: 23,
      video: TI24,
      duration: 1500,
      name: "Turbine Seal Housing Row 3",
      top: 240,
      left: 1100,
    },
    {
      id: 24,
      video: TI25,
      duration: 1500,
      name: "Turbine Seal Housing Row 4 Lower",
      top: 240,
      left: 1090,
    },
    {
      id: 25,
      video: TI26,
      duration: 1500,
      name: "Turbine Blade Ring Row 1 Lower",
      top: 428,
      left: 780,
    },
    {
      id: 26,
      video: TI27,
      duration: 1500,
      name: "Turbine Blade Ring Row 2 Lower",
      top: 240,
      left: 610,
    },
    {
      id: 27,
      video: TI28,
      duration: 1500,
      name: "Turbine Blade Ring Row 3 Lower",
      top: 240,
      left: 1000,
    },
    {
      id: 28,
      video: TI29,
      duration: 1500,
      name: "Turbine Blade Ring Row 4 Lower",
      top: 241,
      left: 830,
    },
    {
      id: 29,
      video: TI30,
      duration: 1500,
      name: "Turbine Blade Row 1",
      top: 243,
      left: 750,
    },
    {
      id: 30,
      video: TI31,
      duration: 1500,
      name: "Turbine Blade Row 2",
      top: 242,
      left: 640,
    },
    {
      id: 31,
      video: TI32,
      duration: 1500,
      name: "Turbine Blade Row 3",
      top: 241,
      left: 950,
    },
    {
      id: 32,
      video: TI33,
      duration: 1500,
      name: "Turbine Ring Segment Row 1 Upper",
      top: 240,
      left: 880,
    },
    {
      id: 33,
      video: TI34,
      duration: 1500,
      name: "",
      top: 0,
      left: 0,
    },
    {
      id: 34,
      video: TI35,
      duration: 1500,
      name: "Turbine Ring Segment Row 1 Upper",
      top: 240,
      left: 725,
    },
    {
      id: 35,
      video: TI36,
      duration: 1500,
      name: "Turbine Ring Segment Row 2 Upper",
      top: 240,
      left: 770,
    },
    {
      id: 36,
      video: TI37,
      duration: 1500,
      name: "Turbine Vane Segment Row 2 Upper",
      top: 240,
      left: 890,
    },
    {
      id: 37,
      video: TI38,
      duration: 1500,
      name: "",
      top: 0,
      left: 0,
    },
    {
      id: 38,
      video: TI39,
      duration: 1500,
      name: "Turbine Vane Segment Row 2 Upper",
      top: 240,
      left: 890,
    },
    {
      id: 39,
      video: TI40,
      duration: 1500,
      name: "Turbine Ring Segment Row 2 Upper",
      top: 240,
      left: 770,
    },
    {
      id: 40,
      video: TI41,
      duration: 1500,
      name: "Turbine Ring Segment Row 3 Upper",
      top: 241,
      left: 680,
    },
  ],
});

const videos: any = computed(() => {
  return videosData.value[(route.params.menu as string) || "ci"];
});

const router = useRouter();
const route = useRoute();
const globalStore = useGlobalStore();
const {
  titleHeader,
  disabledBack,
  disabledNext,
  isFinish,
  isAddScope,
  isStepNavigation,
} = storeToRefs(globalStore);

// const breadcrumb = ref<BreadcrumbType[]>([]);
const currentVideoIndex = ref(0);
const videoRef = ref<HTMLVideoElement | null>(null);
const isButtonVisible = ref(false);
const openStep = ref(false);
const isReversing = ref(false);
let reverseInterval: number | null = null;

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
  isFinish.value = index === videos.value.length - 1;
  isAddScope.value = index === videos.value.length - 1;

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
      router.push(
        `/${route.params.id}/create/unit/${route.params.scope}/ci/scope`
      );
      return;
    }

    currentVideoIndex.value = prevIndex;
    updateURLParameter(prevIndex, true);
    initializeVideo(prevIndex, true);
    return;
  }

  videoRef.value.currentTime = Math.max(0, videoRef.value.currentTime - 0.1);
};

const handleBack = async () => {
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
  )
    return;

  const nextIndex = currentVideoIndex.value + 1;
  updateURLParameter(nextIndex);
  await initializeVideo(nextIndex);
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

const handleAddScope = () => {
  router.push(
    `/${route.params.id}/create/unit/${route.params.scope}/add-scope`
  );
};

const handleSave = () => {
  router.push(`/${route.params.id}/create/unit/${route.params.scope}/result`);
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
  // breadcrumb.value = [
  //   {
  //     name: "UBP Priok",
  //     as_link: false,
  //     url: "",
  //   },
  //   {
  //     name: convertToOriginalFormat(route.params.scope as string),
  //     as_link: false,
  //     url: "",
  //   },
  //   {
  //     name: "Scope Overhaul",
  //     as_link: false,
  //     url: "",
  //   },
  //   {
  //     name: "CI",
  //     as_link: false,
  //     url: "",
  //   },
  // ];

  titleHeader.value =
    route.params.menu === "ci"
      ? "Combustion Inspection"
      : route.params.menu === "ti"
      ? "Turbine Inspection"
      : route.params.menu === "mi"
      ? "Major Inspection"
      : "";

  disabledNext.value = true;
  disabledBack.value = true;
  isStepNavigation.value = true;

  initializeFromURL();

  window.addEventListener("popstate", initializeFromURL);
  eventBus.on("next", handleNext);
  eventBus.on("back", handleBack);
  eventBus.on("save", handleSave);
  eventBus.on("addScope", handleAddScope);
  eventBus.on("stepNavigation", handleStepNavigation);

  // if (videoRef.value) {
  //   videoRef.value.addEventListener("timeupdate", handleVideoTimeUpdate);
  // }
});

onUnmounted(() => {
  window.removeEventListener("popstate", initializeFromURL);
  eventBus.off("next", handleNext);
  eventBus.off("back", handleBack);
  eventBus.off("save", handleSave);
  eventBus.off("addScope", handleAddScope);
  eventBus.off("stepNavigation", handleStepNavigation);

  // if (videoRef.value) {
  //   videoRef.value.removeEventListener("timeupdate", handleVideoTimeUpdate);
  // }
});
</script>

<template>
  <div class="scope-container">
    <div>
      <Sidebar />
    </div>
    <!-- <div class="scope-breadcrumb">
      <Breadcrumb :items="breadcrumb" />
    </div> -->
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

  <DialogRoot v-model:open="openStep">
    <DialogPortal>
      <DialogContent
        class="v-drawer-content"
        @interact-outside="() => (openStep = false)"
      >
        <VisuallyHidden>
          <DialogTitle />
          <DialogDescription />
        </VisuallyHidden>
        <div class="p-4">
          <div class="flex justify-start">
            <Icon
              name="double-arrow-right"
              class="text-[24px] text-neutral-50 cursor-pointer hover:text-cyan-500"
              @click="handleCloseStep"
            />
          </div>
          <p class="mt-6 text-2xl text-neutral-50 font-bold">
            Inspection Sequences:
          </p>
          <ul class="mt-2 max-h-[calc(100vh-220px)] overflow-y-auto">
            <p class="text-neutral-50 text-lg font-bold mt-1">Disassembly</p>
            <li
              v-for="(item, key) in videos.slice(0, 14)"
              :key="item.id"
              class="list-disc list-inside mt-1"
              :class="{ hidden: item.name === '' }"
              @click="handleJumpStep(item.id + 1)"
            >
              <a class="text-neutral-50 hover:text-cyan-500 cursor-pointer">
                {{ item.name }}
              </a>
            </li>

            <p class="text-neutral-50 text-lg font-bold mt-2">Assembly</p>
            <li
              v-for="(item, key) in videos.slice(15, 27)"
              :key="item.id"
              class="list-disc list-inside mt-1"
              :class="{ hidden: item.name === '' }"
              @click="handleJumpStep(item.id + 1)"
            >
              <a class="text-neutral-50 hover:text-cyan-500 cursor-pointer">
                {{ item.name }}
              </a>
            </li>
          </ul>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style lang="sass" scoped>
.wrapper-bid
  @apply absolute top-[120px] left-10 z-[100]
</style>
