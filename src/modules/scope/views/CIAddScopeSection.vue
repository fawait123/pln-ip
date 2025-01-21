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
import Sidebar from "@/components/layouts/Sidebar.vue";

// CI
// VIDEO INLET
import CIInletSection1 from "@/assets/videos/add-scope/ci/inlet-section/1-inlet-duct.mp4";
import CIInletSection2 from "@/assets/videos/add-scope/ci/inlet-section/2-inlet-manifold.mp4";
import CIInletSection3 from "@/assets/videos/add-scope/ci/inlet-section/3-vapour-pipe.mp4";
import CIInletSection4 from "@/assets/videos/add-scope/ci/inlet-section/4-casing-upper.mp4";
import CIInletSection5 from "@/assets/videos/add-scope/ci/inlet-section/5-igv-link.mp4";
import CIInletSection6 from "@/assets/videos/add-scope/ci/inlet-section/6-seal-housing-upper.mp4";
import CIInletSection7 from "@/assets/videos/add-scope/ci/inlet-section/7-igv-upper.mp4";
import CIInletSection8 from "@/assets/videos/add-scope/ci/inlet-section/8.mov";
import CIInletSection9 from "@/assets/videos/add-scope/ci/inlet-section/9-igv-upper.mp4";

// VIDEO COMPRESSOR
import CICompressorSection1 from "@/assets/videos/add-scope/ci/compressor-section/1-compressor.mp4";
import CICompressorSection2 from "@/assets/videos/add-scope/ci/compressor-section/2-compressor.mp4";
import CICompressorSection3 from "@/assets/videos/add-scope/ci/compressor-section/3-compressor.mp4";
import CICompressorSection4 from "@/assets/videos/add-scope/ci/compressor-section/4-compressor.mp4";
import CICompressorSection5 from "@/assets/videos/add-scope/ci/compressor-section/5-compressor.mp4";
import CICompressorSection6 from "@/assets/videos/add-scope/ci/compressor-section/6-compressor.mp4";
import CICompressorSection7 from "@/assets/videos/add-scope/ci/compressor-section/7-compressor.mp4";
import CICompressorSection8 from "@/assets/videos/add-scope/ci/compressor-section/8-compressor.mp4";
import CICompressorSection9 from "@/assets/videos/add-scope/ci/compressor-section/9-compressor.mp4";
import CICompressorSection10 from "@/assets/videos/add-scope/ci/compressor-section/10-compressor.mp4";
import CICompressorSection11 from "@/assets/videos/add-scope/ci/compressor-section/11-compressor.mp4";
import CICompressorSection12 from "@/assets/videos/add-scope/ci/compressor-section/12-compressor.mp4";
import CICompressorSection13 from "@/assets/videos/add-scope/ci/compressor-section/13-compressor.mp4";
import CICompressorSection14 from "@/assets/videos/add-scope/ci/compressor-section/14-compressor.mp4";
import CICompressorSection15 from "@/assets/videos/add-scope/ci/compressor-section/15-compressor-vane-row-1-upper.mp4";
import CICompressorSection16 from "@/assets/videos/add-scope/ci/compressor-section/16-compressor-vane-row-2-upper.mp4";
import CICompressorSection17 from "@/assets/videos/add-scope/ci/compressor-section/17-compressor-vane-row-3-upper.mp4";
import CICompressorSection18 from "@/assets/videos/add-scope/ci/compressor-section/18-compressor-vane-row-4-upper.mp4";
import CICompressorSection19 from "@/assets/videos/add-scope/ci/compressor-section/19-compressor-vane-row-5-upper.mp4";
import CICompressorSection20 from "@/assets/videos/add-scope/ci/compressor-section/20-compressor-vane-row-6-upper.mp4";
import CICompressorSection21 from "@/assets/videos/add-scope/ci/compressor-section/21-compressor-blade-row-1.mp4";
import CICompressorSection22 from "@/assets/videos/add-scope/ci/compressor-section/22-compressor-blade-row-2.mp4";
import CICompressorSection23 from "@/assets/videos/add-scope/ci/compressor-section/23-compressor-blade-row-3.mp4";
import CICompressorSection24 from "@/assets/videos/add-scope/ci/compressor-section/24-compressor-blade-row-4.mp4";
import CICompressorSection25 from "@/assets/videos/add-scope/ci/compressor-section/25-compressor-blade-row-5.mp4";
import CICompressorSection26 from "@/assets/videos/add-scope/ci/compressor-section/26-compressor-blade-row-6.mp4";
import CICompressorSection27 from "@/assets/videos/add-scope/ci/compressor-section/27.mov";
import CICompressorSection28 from "@/assets/videos/add-scope/ci/compressor-section/28-compressor-blade-row-6.mp4";
import CICompressorSection29 from "@/assets/videos/add-scope/ci/compressor-section/29-compressor-blade-row-5.mp4";
import CICompressorSection30 from "@/assets/videos/add-scope/ci/compressor-section/30-compressor-blade-row-4.mp4";
import CICompressorSection31 from "@/assets/videos/add-scope/ci/compressor-section/31-compressor-blade-row-3.mp4";
import CICompressorSection32 from "@/assets/videos/add-scope/ci/compressor-section/32-compressor-blade-row-2.mp4";
import CICompressorSection33 from "@/assets/videos/add-scope/ci/compressor-section/33-compressor-blade-row-1.mp4";
import CICompressorSection34 from "@/assets/videos/add-scope/ci/compressor-section/34-compressor-vane-row-1-upper.mp4";
import CICompressorSection35 from "@/assets/videos/add-scope/ci/compressor-section/35-compressor-vane-row-2-upper.mp4";
import CICompressorSection36 from "@/assets/videos/add-scope/ci/compressor-section/36-compressor-vane-row-3-upper.mp4";
import CICompressorSection37 from "@/assets/videos/add-scope/ci/compressor-section/37-compressor-vane-row-4-upper.mp4";
import CICompressorSection38 from "@/assets/videos/add-scope/ci/compressor-section/38-compressor-vane-row-5-upper.mp4";
import CICompressorSection39 from "@/assets/videos/add-scope/ci/compressor-section/39-compressor-vane-row-6-upper.mp4";
import CICompressorSection40 from "@/assets/videos/add-scope/ci/compressor-section/40-compressor-vane-row-1-lower.mp4";
import CICompressorSection41 from "@/assets/videos/add-scope/ci/compressor-section/41-compressor-vane-row-2-lower.mp4";
import CICompressorSection42 from "@/assets/videos/add-scope/ci/compressor-section/42-compressor-vane-row-3-lower.mp4";
import CICompressorSection43 from "@/assets/videos/add-scope/ci/compressor-section/43-compressor-vane-row-4-lower.mp4";
import CICompressorSection44 from "@/assets/videos/add-scope/ci/compressor-section/44-compressor-vane-row-5-lower.mp4";
import CICompressorSection45 from "@/assets/videos/add-scope/ci/compressor-section/45-compressor-vane-row-6-lower.mp4";
import CICompressorSection46 from "@/assets/videos/add-scope/ci/compressor-section/46-compressor-cylinder.mp4";
import CICompressorSection47 from "@/assets/videos/add-scope/ci/compressor-section/47-rca-pipe.mp4";
import CICompressorSection48 from "@/assets/videos/add-scope/ci/compressor-section/48-cooling-pipe.mp4";
import CICompressorSection49 from "@/assets/videos/add-scope/ci/compressor-section/49-fuel-manifold.mp4";
import CICompressorSection50 from "@/assets/videos/add-scope/ci/compressor-section/50-igv-upper.mp4";
import CICompressorSection51 from "@/assets/videos/add-scope/ci/compressor-section/51-seal-housing.mp4";
import CICompressorSection52 from "@/assets/videos/add-scope/ci/compressor-section/52-igv-link.mp4";
import CICompressorSection53 from "@/assets/videos/add-scope/ci/compressor-section/53-casing-upper.mp4";
import CICompressorSection54 from "@/assets/videos/add-scope/ci/compressor-section/54-vapour-pipe.mp4";
import CICompressorSection55 from "@/assets/videos/add-scope/ci/compressor-section/55-inlet-manifold.mp4";
import CICompressorSection56 from "@/assets/videos/add-scope/ci/compressor-section/56-inlet-duct.mp4";

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
import GeneratorSection21 from "@/assets/videos/add-scope/generator-section/21-lower-outer-bracket-nde.mp4";
import GeneratorSection22 from "@/assets/videos/add-scope/generator-section/22-lower-bearing-3.mp4";
import GeneratorSection23 from "@/assets/videos/add-scope/generator-section/23-lower-outer-bracket-nde.mp4";
import GeneratorSection24 from "@/assets/videos/add-scope/generator-section/24-rotor-generator.mp4";
import GeneratorSection25 from "@/assets/videos/add-scope/generator-section/25-rotor-generator.mp4";
import GeneratorSection26 from "@/assets/videos/add-scope/generator-section/26-lower-outer-bracket-nde.mp4";
import GeneratorSection27 from "@/assets/videos/add-scope/generator-section/27-lower-bearing-3.mp4";
import GeneratorSection28 from "@/assets/videos/add-scope/generator-section/28-lower-outer-bracket-nde.mp4";
import GeneratorSection29 from "@/assets/videos/add-scope/generator-section/29-lower-bearing-4.mp4";
import GeneratorSection30 from "@/assets/videos/add-scope/generator-section/30-upper-bearing-4.mp4";
import GeneratorSection31 from "@/assets/videos/add-scope/generator-section/31-upper-outer-bracket-nde.mp4";
import GeneratorSection32 from "@/assets/videos/add-scope/generator-section/32-upper-bearing-3.mp4";
import GeneratorSection33 from "@/assets/videos/add-scope/generator-section/33-upper-outer-bracket-nde.mp4";
import GeneratorSection34 from "@/assets/videos/add-scope/generator-section/34-outer-oil-deflector-de.mp4";
import GeneratorSection35 from "@/assets/videos/add-scope/generator-section/35-outer-oil-deflector-nde.mp4";
import GeneratorSection36 from "@/assets/videos/add-scope/generator-section/36-base-plate-bearing-5.mp4";
import GeneratorSection37 from "@/assets/videos/add-scope/generator-section/37-brush-rigging.mp4";
import GeneratorSection38 from "@/assets/videos/add-scope/generator-section/38-brush.mp4";
import GeneratorSection39 from "@/assets/videos/add-scope/generator-section/39-cover-fan-outer-seal.mp4";
import GeneratorSection40 from "@/assets/videos/add-scope/generator-section/40-pedestal-bearing-5.mp4";
import GeneratorSection41 from "@/assets/videos/add-scope/generator-section/41-bearing-5.mp4";
import GeneratorSection42 from "@/assets/videos/add-scope/generator-section/42-cover-bearing-5.mp4";
import GeneratorSection43 from "@/assets/videos/add-scope/generator-section/43-cover-exciter.mp4";
import GeneratorSection44 from "@/assets/videos/add-scope/generator-section/44-air-seal-cover-exciter.mp4";
import GeneratorSection45 from "@/assets/videos/add-scope/generator-section/45-base-plate-turning-device.mp4";
import GeneratorSection46 from "@/assets/videos/add-scope/generator-section/46-housing-coupling-turning-device.mp4";
import GeneratorSection47 from "@/assets/videos/add-scope/generator-section/47-turning-device.mp4";
import GeneratorSection48 from "@/assets/videos/add-scope/generator-section/48-cover-coupling-turning-device.mp4";

// TI
// VIDEO GENERATOR

// MI
// VIDEO GENERATOR

// MI
const videosData = ref({
  ci: {
    ["inlet-section"]: [
      {
        id: 0,
        video: CIInletSection1,
        duration: 155000,
        name: "Inlet Duct",
        top: 235,
        left: 560,
      },
      {
        id: 1,
        video: CIInletSection2,
        duration: 155000,
        name: "Inlet manifold",
        top: 235,
        left: 530,
      },
      {
        id: 2,
        video: CIInletSection3,
        duration: 155000,
        name: "Vapour Pipe",
        top: 230,
        left: 700,
      },
      {
        id: 3,
        video: CIInletSection4,
        duration: 155000,
        name: "Casing Upper",
        top: 235,
        left: 550,
      },
      {
        id: 4,
        video: CIInletSection5,
        duration: 155000,
        name: "IGV Link",
        top: 233,
        left: 815,
      },
      {
        id: 5,
        video: CIInletSection6,
        duration: 155000,
        name: "Seal Housing Upper",
        top: 235,
        left: 510,
      },
      {
        id: 6,
        video: CIInletSection7,
        duration: 155000,
        name: "IGV Upper",
        top: 235,
        left: 570,
      },
      {
        id: 7,
        video: CIInletSection8,
        duration: 155000,
        name: "",
        top: 0,
        left: 0,
      },
      {
        id: 8,
        video: CIInletSection9,
        duration: 155000,
        name: "IGV Upper",
        top: 232,
        left: 795,
      },
    ],
    ["compressor-section"]: [
      {
        id: 0,
        video: CICompressorSection1,
        duration: 155000,
        name: "Inlet Duct",
        top: 235,
        left: 560,
      },
      {
        id: 1,
        video: CICompressorSection2,
        duration: 155000,
        name: "Inlet manifold",
        top: 235,
        left: 530,
      },
      {
        id: 2,
        video: CICompressorSection3,
        duration: 155000,
        name: "Vapour Pipe",
        top: 230,
        left: 700,
      },
      {
        id: 3,
        video: CICompressorSection4,
        duration: 155000,
        name: "Casing Upper",
        top: 235,
        left: 550,
      },
      {
        id: 4,
        video: CICompressorSection5,
        duration: 155000,
        name: "Seal Housing Upper",
        top: 235,
        left: 510,
      },
      {
        id: 5,
        video: CICompressorSection6,
        duration: 155000,
        name: "Bleed Pipe",
        top: 235,
        left: 410,
      },
      {
        id: 6,
        video: CICompressorSection7,
        duration: 165000,
        name: "RCA Pipe",
        top: 235,
        left: 550,
      },
      {
        id: 7,
        video: CICompressorSection8,
        duration: 155000,
        name: "Compressor Cylinder",
        top: 235,
        left: 470,
      },
      {
        id: 8,
        video: CICompressorSection9,
        duration: 155000,
        name: "Compressor Vane Row 1 Lower",
        top: 238,
        left: 735,
      },
      {
        id: 9,
        video: CICompressorSection10,
        duration: 155000,
        name: "Compressor Vane Row 2 Lower",
        top: 238,
        left: 730,
      },
      {
        id: 10,
        video: CICompressorSection11,
        duration: 155000,
        name: "Compressor Vane Row 3 Lower",
        top: 235,
        left: 470,
      },
      {
        id: 11,
        video: CICompressorSection12,
        duration: 155000,
        name: "Compressor Vane Row 4 Lower",
        top: 235,
        left: 360,
      },
      {
        id: 12,
        video: CICompressorSection13,
        duration: 155000,
        name: "Compressor Vane Row 5 Lower",
        top: 238,
        left: 360,
      },
      {
        id: 13,
        video: CICompressorSection14,
        duration: 155000,
        name: "Compressor Vane Row 6 Lower",
        top: 235,
        left: 265,
      },
      {
        id: 14,
        video: CICompressorSection15,
        duration: 155000,
        name: "Compressor Vane Row 1 Upper",
        top: 237,
        left: 780,
      },
      {
        id: 15,
        video: CICompressorSection16,
        duration: 155000,
        name: "Compressor Vane Row 2 Upper",
        top: 235,
        left: 410,
      },
      {
        id: 16,
        video: CICompressorSection17,
        duration: 155000,
        name: "Compressor Vane Row 3 Upper",
        top: 235,
        left: 420,
      },
      {
        id: 17,
        video: CICompressorSection18,
        duration: 155000,
        name: "Compressor Vane Row 4 Upper",
        top: 235,
        left: 435,
      },
      {
        id: 18,
        video: CICompressorSection19,
        duration: 155000,
        name: "Compressor Vane Row 5 Upper",
        top: 225,
        left: 520,
      },
      {
        id: 19,
        video: CICompressorSection20,
        duration: 155000,
        name: "Compressor Vane Row 6 Upper",
        top: 236,
        left: 540,
      },
      {
        id: 20,
        video: CICompressorSection21,
        duration: 155000,
        name: "Compressor Blade Row 1",
        top: 233,
        left: 620,
      },
      {
        id: 21,
        video: CICompressorSection22,
        duration: 155000,
        name: "Compressor Blade Row 2",
        top: 237,
        left: 560,
      },
      {
        id: 22,
        video: CICompressorSection23,
        duration: 155000,
        name: "Compressor Blade Row 3",
        top: 236,
        left: 480,
      },
      {
        id: 23,
        video: CICompressorSection24,
        duration: 155000,
        name: "Compressor Blade Row 4",
        top: 233,
        left: 480,
      },
      {
        id: 24,
        video: CICompressorSection25,
        duration: 155000,
        name: "Compressor Blade Row 5",
        top: 235,
        left: 390,
      },
      {
        id: 25,
        video: CICompressorSection26,
        duration: 155000,
        name: "Compressor Blade Row 6",
        top: 235,
        left: 295,
      },
      {
        id: 26,
        video: CICompressorSection27,
        duration: 155000,
        name: "",
        top: 0,
        left: 0,
      },
      {
        id: 27,
        video: CICompressorSection28,
        duration: 155000,
        name: "Compressor Blade Row 6",
        top: 235,
        left: 290,
      },
      {
        id: 28,
        video: CICompressorSection29,
        duration: 155000,
        name: "Compressor Blade Row 5",
        top: 235,
        left: 380,
      },
      {
        id: 29,
        video: CICompressorSection30,
        duration: 155000,
        name: "Compressor Blade Row 4",
        top: 233,
        left: 480,
      },
      {
        id: 30,
        video: CICompressorSection31,
        duration: 155000,
        name: "Compressor Blade Row 3",
        top: 237,
        left: 480,
      },
      {
        id: 31,
        video: CICompressorSection32,
        duration: 155000,
        name: "Compressor Blade Row 2",
        top: 236,
        left: 560,
      },
      {
        id: 32,
        video: CICompressorSection33,
        duration: 155000,
        name: "Compressor Blade Row 1",
        top: 233,
        left: 620,
      },
      {
        id: 33,
        video: CICompressorSection34,
        duration: 155000,
        name: "Compressor Vane Row 1 Upper",
        top: 242,
        left: 350,
      },
      {
        id: 34,
        video: CICompressorSection35,
        duration: 155000,
        name: "Compressor Vane Row 2 Upper",
        top: 238,
        left: 350,
      },
      {
        id: 35,
        video: CICompressorSection36,
        duration: 155000,
        name: "Compressor Vane Row 3 Upper",
        top: 237,
        left: 380,
      },
      {
        id: 36,
        video: CICompressorSection37,
        duration: 155000,
        name: "Compressor Vane Row 4 Upper",
        top: 238,
        left: 1050,
      },
      {
        id: 37,
        video: CICompressorSection38,
        duration: 155000,
        name: "Compressor Vane Row 5 Upper",
        top: 237,
        left: 1090,
      },
      {
        id: 38,
        video: CICompressorSection39,
        duration: 155000,
        name: "Compressor Vane Row 6 Upper",
        top: 237,
        left: 550,
      },
      {
        id: 39,
        video: CICompressorSection40,
        duration: 155000,
        name: "Compressor Vane Row 1 Lower",
        top: 240,
        left: 730,
      },
      {
        id: 40,
        video: CICompressorSection41,
        duration: 155000,
        name: "Compressor Vane Row 2 Lower",
        top: 240,
        left: 580,
      },
      {
        id: 41,
        video: CICompressorSection42,
        duration: 155000,
        name: "Compressor Vane Row 3 Lower",
        top: 233,
        left: 470,
      },
      {
        id: 42,
        video: CICompressorSection43,
        duration: 155000,
        name: "Compressor Vane Row 4 Lower",
        top: 232,
        left: 1010,
      },
      {
        id: 43,
        video: CICompressorSection44,
        duration: 155000,
        name: "Compressor Vane Row 5 Lower",
        top: 237,
        left: 910,
      },
      {
        id: 44,
        video: CICompressorSection45,
        duration: 155000,
        name: "Compressor Vane Row 6 Lower",
        top: 237,
        left: 720,
      },
      {
        id: 45,
        video: CICompressorSection46,
        duration: 155000,
        name: "Compressor Cylinder",
        top: 236,
        left: 870,
      },
      {
        id: 46,
        video: CICompressorSection47,
        duration: 155000,
        name: "RCA Pipe",
        top: 237,
        left: 870,
      },
      {
        id: 47,
        video: CICompressorSection48,
        duration: 155000,
        name: "Cooling Pipe",
        top: 237,
        left: 740,
      },
      {
        id: 48,
        video: CICompressorSection49,
        duration: 155000,
        name: "Fuel Manifold",
        top: 236,
        left: 910,
      },
      {
        id: 49,
        video: CICompressorSection50,
        duration: 155000,
        name: "IGV Upper",
        top: 237,
        left: 575,
      },
      {
        id: 50,
        video: CICompressorSection51,
        duration: 155000,
        name: "Seal Housing",
        top: 236,
        left: 560,
      },
      {
        id: 51,
        video: CICompressorSection52,
        duration: 155000,
        name: "IGV Link",
        top: 233,
        left: 810,
      },
      {
        id: 52,
        video: CICompressorSection53,
        duration: 155000,
        name: "Casing Upper",
        top: 235,
        left: 1000,
      },
      {
        id: 53,
        video: CICompressorSection54,
        duration: 155000,
        name: "Vapour Piper",
        top: 240,
        left: 595,
      },
      {
        id: 54,
        video: CICompressorSection55,
        duration: 155000,
        name: "Inlet Manifold",
        top: 238,
        left: 520,
      },
      {
        id: 55,
        video: CICompressorSection56,
        duration: 155000,
        name: "Inlet Duct",
        top: 238,
        left: 560,
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
      {
        id: 20,
        video: GeneratorSection21,
        duration: 155000,
        name: "Lower Outer Bracket NDE",
        top: 238,
        left: 590,
      },
      {
        id: 21,
        video: GeneratorSection22,
        duration: 155000,
        name: "Lower Bearing 3",
        top: 238,
        left: 580,
      },
      {
        id: 22,
        video: GeneratorSection23,
        duration: 155000,
        name: "Lower Outer Bracket NDE",
        top: 236,
        left: 535,
      },
      {
        id: 23,
        video: GeneratorSection24,
        duration: 155000,
        name: "Rotor Generator",
        top: 236,
        left: 740,
      },
      {
        id: 24,
        video: GeneratorSection25,
        duration: 155000,
        name: "Rotor Generator",
        top: 238,
        left: 700,
      },
      {
        id: 25,
        video: GeneratorSection26,
        duration: 155000,
        name: "Lower Outer Bracket NDE",
        top: 238,
        left: 595,
      },
      {
        id: 26,
        video: GeneratorSection27,
        duration: 155000,
        name: "Lower Bearing 3",
        top: 237,
        left: 580,
      },
      {
        id: 27,
        video: GeneratorSection28,
        duration: 155000,
        name: "Lower Outer Bracket NDE",
        top: 236,
        left: 590,
      },
      {
        id: 28,
        video: GeneratorSection29,
        duration: 155000,
        name: "Lower Bearing 4",
        top: 236,
        left: 660,
      },
      {
        id: 29,
        video: GeneratorSection30,
        duration: 155000,
        name: "Upper Bearing 4",
        top: 236,
        left: 660,
      },
      {
        id: 30,
        video: GeneratorSection31,
        duration: 155000,
        name: "Upper Outer Bracket NDE",
        top: 235,
        left: 560,
      },
      {
        id: 31,
        video: GeneratorSection32,
        duration: 155000,
        name: "Upper Bearing 3",
        top: 236,
        left: 580,
      },
      {
        id: 32,
        video: GeneratorSection33,
        duration: 155000,
        name: "Upper Outer Bracket NDE",
        top: 236,
        left: 560,
      },
      {
        id: 33,
        video: GeneratorSection34,
        duration: 155000,
        name: "Outer Oil Deflector DE",
        top: 236,
        left: 620,
      },
      {
        id: 34,
        video: GeneratorSection35,
        duration: 155000,
        name: "Outer Oil Deflector NDE",
        top: 236,
        left: 615,
      },
      {
        id: 35,
        video: GeneratorSection36,
        duration: 155000,
        name: "Base Plate Bearing 5",
        top: 236,
        left: 580,
      },
      {
        id: 36,
        video: GeneratorSection37,
        duration: 155000,
        name: "Brush Rigging",
        top: 236,
        left: 660,
      },
      {
        id: 37,
        video: GeneratorSection38,
        duration: 155000,
        name: "Brush",
        top: 236,
        left: 710,
      },
      {
        id: 38,
        video: GeneratorSection39,
        duration: 155000,
        name: "Cover Fan Outer Seal",
        top: 235,
        left: 570,
      },
      {
        id: 39,
        video: GeneratorSection40,
        duration: 155000,
        name: "Pedestal Bearing 5",
        top: 235,
        left: 570,
      },
      {
        id: 40,
        video: GeneratorSection41,
        duration: 155000,
        name: "Bearing 5",
        top: 240,
        left: 630,
      },
      {
        id: 41,
        video: GeneratorSection42,
        duration: 155000,
        name: "Cover Bearing 5",
        top: 236,
        left: 585,
      },
      {
        id: 42,
        video: GeneratorSection43,
        duration: 155000,
        name: "Cover Exciter",
        top: 235,
        left: 590,
      },
      {
        id: 43,
        video: GeneratorSection44,
        duration: 155000,
        name: "Air Seal Cover Exciter",
        top: 235,
        left: 530,
      },
      {
        id: 44,
        video: GeneratorSection45,
        duration: 155000,
        name: "Base Plate Turning Device",
        top: 237,
        left: 415,
      },
      {
        id: 45,
        video: GeneratorSection46,
        duration: 155000,
        name: "Housing Coupling Turning Device",
        top: 235,
        left: 470,
      },
      {
        id: 46,
        video: GeneratorSection47,
        duration: 155000,
        name: "Turning Device",
        top: 233,
        left: 545,
      },
      {
        id: 47,
        video: GeneratorSection48,
        duration: 155000,
        name: "Cover Coupling Turning Device",
        top: 235,
        left: 465,
      },
    ],
  },
  mi: {
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
      {
        id: 20,
        video: GeneratorSection21,
        duration: 155000,
        name: "Lower Outer Bracket NDE",
        top: 238,
        left: 590,
      },
      {
        id: 21,
        video: GeneratorSection22,
        duration: 155000,
        name: "Lower Bearing 3",
        top: 238,
        left: 580,
      },
      {
        id: 22,
        video: GeneratorSection23,
        duration: 155000,
        name: "Lower Outer Bracket NDE",
        top: 236,
        left: 535,
      },
      {
        id: 23,
        video: GeneratorSection24,
        duration: 155000,
        name: "Rotor Generator",
        top: 236,
        left: 740,
      },
      {
        id: 24,
        video: GeneratorSection25,
        duration: 155000,
        name: "Rotor Generator",
        top: 238,
        left: 700,
      },
      {
        id: 25,
        video: GeneratorSection26,
        duration: 155000,
        name: "Lower Outer Bracket NDE",
        top: 238,
        left: 595,
      },
      {
        id: 26,
        video: GeneratorSection27,
        duration: 155000,
        name: "Lower Bearing 3",
        top: 237,
        left: 580,
      },
      {
        id: 27,
        video: GeneratorSection28,
        duration: 155000,
        name: "Lower Outer Bracket NDE",
        top: 236,
        left: 590,
      },
      {
        id: 28,
        video: GeneratorSection29,
        duration: 155000,
        name: "Lower Bearing 4",
        top: 236,
        left: 660,
      },
      {
        id: 29,
        video: GeneratorSection30,
        duration: 155000,
        name: "Upper Bearing 4",
        top: 236,
        left: 660,
      },
      {
        id: 30,
        video: GeneratorSection31,
        duration: 155000,
        name: "Upper Outer Bracket NDE",
        top: 235,
        left: 560,
      },
      {
        id: 31,
        video: GeneratorSection32,
        duration: 155000,
        name: "Upper Bearing 3",
        top: 236,
        left: 580,
      },
      {
        id: 32,
        video: GeneratorSection33,
        duration: 155000,
        name: "Upper Outer Bracket NDE",
        top: 236,
        left: 560,
      },
      {
        id: 33,
        video: GeneratorSection34,
        duration: 155000,
        name: "Outer Oil Deflector DE",
        top: 236,
        left: 620,
      },
      {
        id: 34,
        video: GeneratorSection35,
        duration: 155000,
        name: "Outer Oil Deflector NDE",
        top: 236,
        left: 615,
      },
      {
        id: 35,
        video: GeneratorSection36,
        duration: 155000,
        name: "Base Plate Bearing 5",
        top: 236,
        left: 580,
      },
      {
        id: 36,
        video: GeneratorSection37,
        duration: 155000,
        name: "Brush Rigging",
        top: 236,
        left: 660,
      },
      {
        id: 37,
        video: GeneratorSection38,
        duration: 155000,
        name: "Brush",
        top: 236,
        left: 710,
      },
      {
        id: 38,
        video: GeneratorSection39,
        duration: 155000,
        name: "Cover Fan Outer Seal",
        top: 235,
        left: 570,
      },
      {
        id: 39,
        video: GeneratorSection40,
        duration: 155000,
        name: "Pedestal Bearing 5",
        top: 235,
        left: 570,
      },
      {
        id: 40,
        video: GeneratorSection41,
        duration: 155000,
        name: "Bearing 5",
        top: 240,
        left: 630,
      },
      {
        id: 41,
        video: GeneratorSection42,
        duration: 155000,
        name: "Cover Bearing 5",
        top: 236,
        left: 585,
      },
      {
        id: 42,
        video: GeneratorSection43,
        duration: 155000,
        name: "Cover Exciter",
        top: 235,
        left: 590,
      },
      {
        id: 43,
        video: GeneratorSection44,
        duration: 155000,
        name: "Air Seal Cover Exciter",
        top: 235,
        left: 530,
      },
      {
        id: 44,
        video: GeneratorSection45,
        duration: 155000,
        name: "Base Plate Turning Device",
        top: 237,
        left: 415,
      },
      {
        id: 45,
        video: GeneratorSection46,
        duration: 155000,
        name: "Housing Coupling Turning Device",
        top: 235,
        left: 470,
      },
      {
        id: 46,
        video: GeneratorSection47,
        duration: 155000,
        name: "Turning Device",
        top: 233,
        left: 545,
      },
      {
        id: 47,
        video: GeneratorSection48,
        duration: 155000,
        name: "Cover Coupling Turning Device",
        top: 235,
        left: 465,
      },
    ],
  },
  ti: {
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
      {
        id: 20,
        video: GeneratorSection21,
        duration: 155000,
        name: "Lower Outer Bracket NDE",
        top: 238,
        left: 590,
      },
      {
        id: 21,
        video: GeneratorSection22,
        duration: 155000,
        name: "Lower Bearing 3",
        top: 238,
        left: 580,
      },
      {
        id: 22,
        video: GeneratorSection23,
        duration: 155000,
        name: "Lower Outer Bracket NDE",
        top: 236,
        left: 535,
      },
      {
        id: 23,
        video: GeneratorSection24,
        duration: 155000,
        name: "Rotor Generator",
        top: 236,
        left: 740,
      },
      {
        id: 24,
        video: GeneratorSection25,
        duration: 155000,
        name: "Rotor Generator",
        top: 238,
        left: 700,
      },
      {
        id: 25,
        video: GeneratorSection26,
        duration: 155000,
        name: "Lower Outer Bracket NDE",
        top: 238,
        left: 595,
      },
      {
        id: 26,
        video: GeneratorSection27,
        duration: 155000,
        name: "Lower Bearing 3",
        top: 237,
        left: 580,
      },
      {
        id: 27,
        video: GeneratorSection28,
        duration: 155000,
        name: "Lower Outer Bracket NDE",
        top: 236,
        left: 590,
      },
      {
        id: 28,
        video: GeneratorSection29,
        duration: 155000,
        name: "Lower Bearing 4",
        top: 236,
        left: 660,
      },
      {
        id: 29,
        video: GeneratorSection30,
        duration: 155000,
        name: "Upper Bearing 4",
        top: 236,
        left: 660,
      },
      {
        id: 30,
        video: GeneratorSection31,
        duration: 155000,
        name: "Upper Outer Bracket NDE",
        top: 235,
        left: 560,
      },
      {
        id: 31,
        video: GeneratorSection32,
        duration: 155000,
        name: "Upper Bearing 3",
        top: 236,
        left: 580,
      },
      {
        id: 32,
        video: GeneratorSection33,
        duration: 155000,
        name: "Upper Outer Bracket NDE",
        top: 236,
        left: 560,
      },
      {
        id: 33,
        video: GeneratorSection34,
        duration: 155000,
        name: "Outer Oil Deflector DE",
        top: 236,
        left: 620,
      },
      {
        id: 34,
        video: GeneratorSection35,
        duration: 155000,
        name: "Outer Oil Deflector NDE",
        top: 236,
        left: 615,
      },
      {
        id: 35,
        video: GeneratorSection36,
        duration: 155000,
        name: "Base Plate Bearing 5",
        top: 236,
        left: 580,
      },
      {
        id: 36,
        video: GeneratorSection37,
        duration: 155000,
        name: "Brush Rigging",
        top: 236,
        left: 660,
      },
      {
        id: 37,
        video: GeneratorSection38,
        duration: 155000,
        name: "Brush",
        top: 236,
        left: 710,
      },
      {
        id: 38,
        video: GeneratorSection39,
        duration: 155000,
        name: "Cover Fan Outer Seal",
        top: 235,
        left: 570,
      },
      {
        id: 39,
        video: GeneratorSection40,
        duration: 155000,
        name: "Pedestal Bearing 5",
        top: 235,
        left: 570,
      },
      {
        id: 40,
        video: GeneratorSection41,
        duration: 155000,
        name: "Bearing 5",
        top: 240,
        left: 630,
      },
      {
        id: 41,
        video: GeneratorSection42,
        duration: 155000,
        name: "Cover Bearing 5",
        top: 236,
        left: 585,
      },
      {
        id: 42,
        video: GeneratorSection43,
        duration: 155000,
        name: "Cover Exciter",
        top: 235,
        left: 590,
      },
      {
        id: 43,
        video: GeneratorSection44,
        duration: 155000,
        name: "Air Seal Cover Exciter",
        top: 235,
        left: 530,
      },
      {
        id: 44,
        video: GeneratorSection45,
        duration: 155000,
        name: "Base Plate Turning Device",
        top: 237,
        left: 415,
      },
      {
        id: 45,
        video: GeneratorSection46,
        duration: 155000,
        name: "Housing Coupling Turning Device",
        top: 235,
        left: 470,
      },
      {
        id: 46,
        video: GeneratorSection47,
        duration: 155000,
        name: "Turning Device",
        top: 233,
        left: 545,
      },
      {
        id: 47,
        video: GeneratorSection48,
        duration: 155000,
        name: "Cover Coupling Turning Device",
        top: 235,
        left: 465,
      },
    ],
  },
});

const route = useRoute();
const videos: any = computed(() => {
  return videosData.value[(route.params.menu as string) || "ci"][
    (route.params.section as string) || "inlet-section"
  ];
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
  //   {
  //     name: "Add Scope",
  //     as_link: false,
  //     url: "",
  //   },
  // ];
  // titleHeader.value = convertToOriginalFormat(route.params.section as string);

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
    <div>
      <Sidebar />
    </div>
    <!-- <div class="scope-breadcrumb">
      <Breadcrumb :items="breadcrumb" />
    </div> -->
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
