<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";

import eventBus from "@/utils/eventBus";
// import { Breadcrumb } from "@/components";
import { useGlobalStore } from "@/stores/GlobalStore";
// import { convertToOriginalFormat } from "@/helpers/global";
import type { BreadcrumbType } from "@/components/navigations/Breadcrumb.vue";
import ButtonPart from "../components/ButtonPart.vue";
import Sidebar from "@/components/layouts/Sidebar.vue";
import {
  DialogContent,
  DialogDescription,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  VisuallyHidden,
} from "radix-vue";

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
import CICompressorSection1 from "@/assets/videos/add-scope/ci/compressor-section/1-inlet-duct.mp4";
import CICompressorSection2 from "@/assets/videos/add-scope/ci/compressor-section/2-inlet-manifold.mp4";
import CICompressorSection3 from "@/assets/videos/add-scope/ci/compressor-section/3-vapour-pipe.mp4";
import CICompressorSection4 from "@/assets/videos/add-scope/ci/compressor-section/4-casing-upper.mp4";
import CICompressorSection5 from "@/assets/videos/add-scope/ci/compressor-section/5-igv-link.mp4";
import CICompressorSection6 from "@/assets/videos/add-scope/ci/compressor-section/6-seal-housing-upper.mp4";
import CICompressorSection7 from "@/assets/videos/add-scope/ci/compressor-section/7-igv-upper.mp4";
import CICompressorSection8 from "@/assets/videos/add-scope/ci/compressor-section/8-fuel-manifold.mp4";
import CICompressorSection9 from "@/assets/videos/add-scope/ci/compressor-section/9-bleed-pipe.mp4";
import CICompressorSection10 from "@/assets/videos/add-scope/ci/compressor-section/10-rca-pipe.mp4";
import CICompressorSection11 from "@/assets/videos/add-scope/ci/compressor-section/11-compressor-cylinder.mp4";
import CICompressorSection12 from "@/assets/videos/add-scope/ci/compressor-section/12-compressor-vane-row-1-lower.mp4";
import CICompressorSection13 from "@/assets/videos/add-scope/ci/compressor-section/13-compressor-vane-row-2-lower.mp4";
import CICompressorSection14 from "@/assets/videos/add-scope/ci/compressor-section/14-compressor-vane-row-3-lower.mp4";
import CICompressorSection15 from "@/assets/videos/add-scope/ci/compressor-section/15-compressor-vane-row-4-lower.mp4";
import CICompressorSection16 from "@/assets/videos/add-scope/ci/compressor-section/16-compressor-vane-row-5-lower.mp4";
import CICompressorSection17 from "@/assets/videos/add-scope/ci/compressor-section/17-compressor-vane-row-6-lower.mp4";
import CICompressorSection18 from "@/assets/videos/add-scope/ci/compressor-section/18-compressor-vane-row-1-upper.mp4";
import CICompressorSection19 from "@/assets/videos/add-scope/ci/compressor-section/19-compressor-vane-row-2-upper.mp4";
import CICompressorSection20 from "@/assets/videos/add-scope/ci/compressor-section/20-compressor-vane-row-3-upper.mp4";
import CICompressorSection21 from "@/assets/videos/add-scope/ci/compressor-section/21-compressor-vane-row-4-upper.mp4";
import CICompressorSection22 from "@/assets/videos/add-scope/ci/compressor-section/22-compressor-vane-row-5-upper.mp4";
import CICompressorSection23 from "@/assets/videos/add-scope/ci/compressor-section/23-compressor-vane-row-6-upper.mp4";
import CICompressorSection24 from "@/assets/videos/add-scope/ci/compressor-section/24-compressor-blade-row-1.mp4";
import CICompressorSection25 from "@/assets/videos/add-scope/ci/compressor-section/25-compressor-blade-row-2.mp4";
import CICompressorSection26 from "@/assets/videos/add-scope/ci/compressor-section/26-compressor-blade-row-3.mp4";
import CICompressorSection27 from "@/assets/videos/add-scope/ci/compressor-section/27-compressor-blade-row-4.mp4";
import CICompressorSection28 from "@/assets/videos/add-scope/ci/compressor-section/28-compressor-blade-row-5.mp4";
import CICompressorSection29 from "@/assets/videos/add-scope/ci/compressor-section/29-compressor-blade-row-6.mp4";
import CICompressorSection30 from "@/assets/videos/add-scope/ci/compressor-section/30.mov";
import CICompressorSection31 from "@/assets/videos/add-scope/ci/compressor-section/31-compressor-blade-row-6.mp4";
import CICompressorSection32 from "@/assets/videos/add-scope/ci/compressor-section/32-compressor-blade-row-5.mp4";
import CICompressorSection33 from "@/assets/videos/add-scope/ci/compressor-section/33-compressor-blade-row-4.mp4";
import CICompressorSection34 from "@/assets/videos/add-scope/ci/compressor-section/34-compressor-blade-row-3.mp4";
import CICompressorSection35 from "@/assets/videos/add-scope/ci/compressor-section/35-compressor-blade-row-2.mp4";
import CICompressorSection36 from "@/assets/videos/add-scope/ci/compressor-section/36-compressor-blade-row-1.mp4";
import CICompressorSection37 from "@/assets/videos/add-scope/ci/compressor-section/37-compressor-vane-row-1-upper.mp4";
import CICompressorSection38 from "@/assets/videos/add-scope/ci/compressor-section/38-compressor-vane-row-2-upper.mp4";
import CICompressorSection39 from "@/assets/videos/add-scope/ci/compressor-section/39-compressor-vane-row-3-upper.mp4";
import CICompressorSection40 from "@/assets/videos/add-scope/ci/compressor-section/40-compressor-vane-row-4-upper.mp4";
import CICompressorSection41 from "@/assets/videos/add-scope/ci/compressor-section/41-compressor-vane-row-5-upper.mp4";
import CICompressorSection42 from "@/assets/videos/add-scope/ci/compressor-section/42-compressor-vane-row-6-upper.mp4";
import CICompressorSection43 from "@/assets/videos/add-scope/ci/compressor-section/43-compressor-vane-row-1-lower.mp4";
import CICompressorSection44 from "@/assets/videos/add-scope/ci/compressor-section/44-compressor-vane-row-2-lower.mp4";
import CICompressorSection45 from "@/assets/videos/add-scope/ci/compressor-section/45-compressor-vane-row-3-lower.mp4";
import CICompressorSection46 from "@/assets/videos/add-scope/ci/compressor-section/46-compressor-vane-row-4-lower.mp4";
import CICompressorSection47 from "@/assets/videos/add-scope/ci/compressor-section/47-compressor-vane-row-5-lower.mp4";
import CICompressorSection48 from "@/assets/videos/add-scope/ci/compressor-section/48-compressor-vane-row-6-lower.mp4";
import CICompressorSection49 from "@/assets/videos/add-scope/ci/compressor-section/49-compressor-cylinder.mp4";
import CICompressorSection50 from "@/assets/videos/add-scope/ci/compressor-section/50-rca-pipe.mp4";
import CICompressorSection51 from "@/assets/videos/add-scope/ci/compressor-section/51-cooling-pipe.mp4";
import CICompressorSection52 from "@/assets/videos/add-scope/ci/compressor-section/52-fuel-manifold.mp4";
import CICompressorSection53 from "@/assets/videos/add-scope/ci/compressor-section/53-igv-upper.mp4";
import CICompressorSection54 from "@/assets/videos/add-scope/ci/compressor-section/54-seal-housing.mp4";
import CICompressorSection55 from "@/assets/videos/add-scope/ci/compressor-section/55-igv-link.mp4";
import CICompressorSection56 from "@/assets/videos/add-scope/ci/compressor-section/56-casing-upper.mp4";
import CICompressorSection57 from "@/assets/videos/add-scope/ci/compressor-section/57-vapour-pipe.mp4";
import CICompressorSection58 from "@/assets/videos/add-scope/ci/compressor-section/58-inlet-manifold.mp4";
import CICompressorSection59 from "@/assets/videos/add-scope/ci/compressor-section/59-inlet-duct.mp4";
// VIDEO TURBINE
import CITurbineSection1 from "@/assets/videos/turbine-inspection/12-cooling-pipe.mp4";
import CITurbineSection2 from "@/assets/videos/turbine-inspection/13-turbine-cylinder.mp4";
import CITurbineSection3 from "@/assets/videos/turbine-inspection/17-bypass-ring.mp4";
import CITurbineSection4 from "@/assets/videos/turbine-inspection/18-turbine-vane-row-1-upper.mp4";
import CITurbineSection5 from "@/assets/videos/turbine-inspection/19-turbine-vane-row-4-upper.mp4";
import CITurbineSection6 from "@/assets/videos/turbine-inspection/20-turbine-vane-row-3-upper.mp4";
import CITurbineSection7 from "@/assets/videos/turbine-inspection/21-turbine-vane-row-2-upper.mp4";
import CITurbineSection8 from "@/assets/videos/turbine-inspection/22-turbine-blade-ring-1.mp4";
import CITurbineSection9 from "@/assets/videos/turbine-inspection/23-turbine-seal-housing-row-2.mp4";
import CITurbineSection10 from "@/assets/videos/turbine-inspection/24-turbine-seal-housing-row-3.mp4";
import CITurbineSection11 from "@/assets/videos/turbine-inspection/25-turbine-seal-housing-row-4-lower.mp4";
import CITurbineSection12 from "@/assets/videos/turbine-inspection/26-turbine-blade-ring-row-1-lower.mp4";
import CITurbineSection13 from "@/assets/videos/turbine-inspection/27-turbine-blade-ring-row-2-lower.mp4";
import CITurbineSection14 from "@/assets/videos/turbine-inspection/28-turbine-blade-ring-row-3-lower.mp4";
import CITurbineSection15 from "@/assets/videos/turbine-inspection/29-turbine-blade-ring-row-4-lower.mp4";
import CITurbineSection16 from "@/assets/videos/turbine-inspection/30-turbine-blade-row-1.mp4";
import CITurbineSection17 from "@/assets/videos/turbine-inspection/31-turbine-blade-row-2.mp4";
import CITurbineSection18 from "@/assets/videos/turbine-inspection/32-turbine-blade-row-3.mp4";
import CITurbineSection19 from "@/assets/videos/add-scope/ci/turbine-section/19-turbine-blade-row-4.mp4";
import CITurbineSection20 from "@/assets/videos/add-scope/ci/turbine-section/20.mp4";
import CITurbineSection21 from "@/assets/videos/add-scope/ci/turbine-section/21-turbine-blade-row-4.mp4";
import CITurbineSection22 from "@/assets/videos/turbine-inspection/75-turbine-blade-row-3.mp4";
import CITurbineSection23 from "@/assets/videos/turbine-inspection/76-turbine-blade-row-2.mp4";
import CITurbineSection24 from "@/assets/videos/turbine-inspection/77-turbine-blade-row-1.mp4";
import CITurbineSection25 from "@/assets/videos/turbine-inspection/78-turbine-blade-ring-row-4-lower.mp4";
import CITurbineSection26 from "@/assets/videos/turbine-inspection/79-turbine-blade-ring-row-3-lower.mp4";
import CITurbineSection27 from "@/assets/videos/turbine-inspection/80-turbine-blade-ring-row-2-lower.mp4";
import CITurbineSection28 from "@/assets/videos/turbine-inspection/81-turbine-blade-ring-row-1-lower.mp4";
import CITurbineSection29 from "@/assets/videos/turbine-inspection/82-turbine-seal-housing-row-2-upper.mp4";
import CITurbineSection30 from "@/assets/videos/turbine-inspection/83-turbine-seal-housing-row-3-upper.mp4";
import CITurbineSection31 from "@/assets/videos/turbine-inspection/84-turbine-seal-housing-row-4-upper.mp4";
import CITurbineSection32 from "@/assets/videos/turbine-inspection/85-turbine-blade-ring-row-1-upper.mp4";
import CITurbineSection33 from "@/assets/videos/turbine-inspection/86-turbine-blade-ring-row-2-upper.mp4";
import CITurbineSection34 from "@/assets/videos/turbine-inspection/87-turbine-blade-ring-row-3-upper.mp4";
import CITurbineSection35 from "@/assets/videos/turbine-inspection/88-turbine-blade-ring-row-4-upper.mp4";
import CITurbineSection36 from "@/assets/videos/turbine-inspection/89-turbine-van-row-1-upper.mp4";
import CITurbineSection37 from "@/assets/videos/turbine-inspection/90-bypass-ring.mp4";
import CITurbineSection38 from "@/assets/videos/turbine-inspection/91-turbine-cylinder.mp4";
import CITurbineSection39 from "@/assets/videos/turbine-inspection/92-cooling-pipe.mp4";
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
// VIDEO ECHAUST
import TI12 from "@/assets/videos/turbine-inspection/12-cooling-pipe.mp4";
import TI13 from "@/assets/videos/turbine-inspection/13-turbine-cylinder.mp4";
import CIExhaustSection3 from "@/assets/videos/add-scope/ci/exhaust-section/3-bypass-ring.mp4";
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
import TI75 from "@/assets/videos/turbine-inspection/75-turbine-blade-row-3.mp4";
import TI76 from "@/assets/videos/turbine-inspection/76-turbine-blade-row-2.mp4";
import TI77 from "@/assets/videos/turbine-inspection/77-turbine-blade-row-1.mp4";
import TI78 from "@/assets/videos/turbine-inspection/78-turbine-blade-ring-row-4-lower.mp4";
import TI79 from "@/assets/videos/turbine-inspection/79-turbine-blade-ring-row-3-lower.mp4";
import TI80 from "@/assets/videos/turbine-inspection/80-turbine-blade-ring-row-2-lower.mp4";
import TI81 from "@/assets/videos/turbine-inspection/81-turbine-blade-ring-row-1-lower.mp4";
import TI82 from "@/assets/videos/turbine-inspection/82-turbine-seal-housing-row-2-upper.mp4";
import TI83 from "@/assets/videos/turbine-inspection/83-turbine-seal-housing-row-3-upper.mp4";
import TI84 from "@/assets/videos/turbine-inspection/84-turbine-seal-housing-row-4-upper.mp4";
import TI85 from "@/assets/videos/turbine-inspection/85-turbine-blade-ring-row-1-upper.mp4";
import TI86 from "@/assets/videos/turbine-inspection/86-turbine-blade-ring-row-2-upper.mp4";
import TI87 from "@/assets/videos/turbine-inspection/87-turbine-blade-ring-row-3-upper.mp4";
import TI88 from "@/assets/videos/turbine-inspection/88-turbine-blade-ring-row-4-upper.mp4";
import TI89 from "@/assets/videos/turbine-inspection/89-turbine-van-row-1-upper.mp4";
import TI90 from "@/assets/videos/turbine-inspection/90-bypass-ring.mp4";
import TI91 from "@/assets/videos/turbine-inspection/91-turbine-cylinder.mp4";
import TI92 from "@/assets/videos/turbine-inspection/92-cooling-pipe.mp4";

// TI
// VIDEO EXHAUST
import TIExhaustSection1 from "@/assets/videos/add-scope/ti/exhaust-section/1-exhaust-manifold.mp4";
import TIExhaustSection2 from "@/assets/videos/add-scope/ti/exhaust-section/2-ost-pipe.mp4";
import TIExhaustSection3 from "@/assets/videos/add-scope/ti/exhaust-section/3-ost-cover.mp4";
import TIExhaustSection4 from "@/assets/videos/add-scope/ti/exhaust-section/4-ost-device.mp4";
import TIExhaustSection5 from "@/assets/videos/add-scope/ti/exhaust-section/5-exhaust-cylinder.mp4";
import TIExhaustSection6 from "@/assets/videos/add-scope/ti/exhaust-section/6-upper-bearing-1.mp4";
import TIExhaustSection7 from "@/assets/videos/add-scope/ti/exhaust-section/7.mp4";
import TIExhaustSection8 from "@/assets/videos/add-scope/ti/exhaust-section/8-upper-bearing-1.mp4";
import TIExhaustSection9 from "@/assets/videos/add-scope/ti/exhaust-section/9-exhaust-cylinder.mp4";
import TIExhaustSection10 from "@/assets/videos/add-scope/ti/exhaust-section/10-ost-device.mp4";
import TIExhaustSection11 from "@/assets/videos/add-scope/ti/exhaust-section/11-ost-cover.mp4";
import TIExhaustSection12 from "@/assets/videos/add-scope/ti/exhaust-section/12-ost-pipe.mp4";
import TIExhaustSection13 from "@/assets/videos/add-scope/ti/exhaust-section/13-exhaust-manifold.mp4";
// VIDEO INLET
import TIInletSection1 from "@/assets/videos/add-scope/ti/inlet-section/1-inlet-duct.mp4";
import TIInletSection2 from "@/assets/videos/add-scope/ti/inlet-section/2-inlet-manifold.mp4";
import TIInletSection3 from "@/assets/videos/add-scope/ti/inlet-section/3-vapour-pipe.mp4";
import TIInletSection4 from "@/assets/videos/add-scope/ti/inlet-section/4-casing-upper.mp4";
import TIInletSection5 from "@/assets/videos/add-scope/ti/inlet-section/5-igv-link.mp4";
import TIInletSection6 from "@/assets/videos/add-scope/ti/inlet-section/6-seal-housing-upper.mp4";
import TIInletSection7 from "@/assets/videos/add-scope/ti/inlet-section/7-igv-upper.mp4";
import TIInletSection8 from "@/assets/videos/add-scope/ti/inlet-section/8.mp4";
import TIInletSection9 from "@/assets/videos/add-scope/ti/inlet-section/9-igv-upper.mp4";
import TIInletSection10 from "@/assets/videos/add-scope/ti/inlet-section/10-seal-housing.mp4";
import TIInletSection11 from "@/assets/videos/add-scope/ti/inlet-section/11-igv-link.mp4";
import TIInletSection12 from "@/assets/videos/add-scope/ti/inlet-section/12-casing-upper.mp4";
import TIInletSection13 from "@/assets/videos/add-scope/ti/inlet-section/13-vapour-pipe.mp4";
import TIInletSection14 from "@/assets/videos/add-scope/ti/inlet-section/14-inlet-manifold.mp4";
import TIInletSection15 from "@/assets/videos/add-scope/ti/inlet-section/15-inlet-duct.mp4";
// VIDEO TURBINE
import TITurbineSection1 from "@/assets/videos/add-scope/ti/turbine-section/1-turbine-blade-row-4.mp4";
import TITurbineSection2 from "@/assets/videos/add-scope/ti/turbine-section/2-turbine-ring-segment-row-4-upper.mp4";
import TITurbineSection3 from "@/assets/videos/add-scope/ti/turbine-section/3-turbine-vane-segment-row-4-upper.mp4";
import TITurbineSection4 from "@/assets/videos/add-scope/ti/turbine-section/4.mp4";
import TITurbineSection5 from "@/assets/videos/add-scope/ti/turbine-section/5-turbine-vane-segment-row-4-upper.mp4";
import TITurbineSection6 from "@/assets/videos/add-scope/ti/turbine-section/6-turbine-ring-segment-row-4-upper.mp4";
import TITurbineSection7 from "@/assets/videos/add-scope/ti/turbine-section/7-turbine-seal-housing-row-4-lower.mp4";
import TITurbineSection8 from "@/assets/videos/add-scope/ti/turbine-section/8-turbine-ring-segment-row-4-lower.mp4";
import TITurbineSection9 from "@/assets/videos/add-scope/ti/turbine-section/9-turbine-vane-segment-row-4-lower.mp4";
import TITurbineSection10 from "@/assets/videos/add-scope/ti/turbine-section/10.mp4";
import TITurbineSection11 from "@/assets/videos/add-scope/ti/turbine-section/11-turbine-vane-segment-row-4-lower.mp4";
import TITurbineSection12 from "@/assets/videos/add-scope/ti/turbine-section/12-turbine-ring-segment-row-4-lower.mp4";
import TITurbineSection13 from "@/assets/videos/add-scope/ti/turbine-section/13-turbine-seal-housing-row-4-lower.mp4";
import TITurbineSection14 from "@/assets/videos/add-scope/ti/turbine-section/14-turbine-blade-row-4.mp4";
// VIDEO COMPRESSOR
import TICompressorSection8 from "@/assets/videos/add-scope/ti/compressor-section/8-fuel-manifold.mp4";
import TICompressorSection9 from "@/assets/videos/add-scope/ti/compressor-section/9-bleed-pipe.mp4";
import TICompressorSection10 from "@/assets/videos/add-scope/ti/compressor-section/10-rca-pipe.mp4";
import TICompressorSection11 from "@/assets/videos/add-scope/ti/compressor-section/11-compressor-cylinder.mp4";
import TICompressorSection12 from "@/assets/videos/add-scope/ti/compressor-section/12-compressor-vane-row-1-lower.mp4";
import TICompressorSection49 from "@/assets/videos/add-scope/ti/compressor-section/49-compressor-cylinder.mp4";
import TICompressorSection50 from "@/assets/videos/add-scope/ti/compressor-section/50-rca-pipe.mp4";
import TICompressorSection51 from "@/assets/videos/add-scope/ti/compressor-section/51-bleed-pipe.mp4";
import TICompressorSection52 from "@/assets/videos/add-scope/ti/compressor-section/52-fuel-manifold.mp4";

// MI
// VIDEO COMPRESSOR
import MI1 from "@/assets/videos/major-inspection/1-manhole-turbine-cylinder.mp4";
import MI2 from "@/assets/videos/major-inspection/2-inlet-duct.mp4";
import MI3 from "@/assets/videos/major-inspection/3-inlet-manifold.mp4";
import MI4 from "@/assets/videos/major-inspection/4-cover-coupling.mp4";
import MI5 from "@/assets/videos/major-inspection/5-vapor-pipe.mp4";
import MI6 from "@/assets/videos/major-inspection/6-coupling-bolt.mp4";
import MI7 from "@/assets/videos/major-inspection/7-coupling-spacer.mp4";
import MI8 from "@/assets/videos/major-inspection/8-black-patch-temperature.mp4";
import MI9 from "@/assets/videos/major-inspection/9-discavity.mp4";
import MI10 from "@/assets/videos/major-inspection/10-flame-detector.mp4";
import MI11 from "@/assets/videos/major-inspection/11-flame-igniter.mp4";
import MI12 from "@/assets/videos/major-inspection/12-cross-flame.mp4";
import MI13 from "@/assets/videos/major-inspection/13-cooling-pipe.mp4";
import MI14 from "@/assets/videos/major-inspection/14-fuel-branch-pipe.mp4";
import MI15 from "@/assets/videos/major-inspection/15-rca-pipe.mp4";
import MI16 from "@/assets/videos/major-inspection/16-bleed-pipe.mp4";
import MI17 from "@/assets/videos/major-inspection/17-exhaust-manifold.mp4";
import MI18 from "@/assets/videos/major-inspection/18-top-hat.mp4";
import MI19 from "@/assets/videos/major-inspection/19-fuel-nozzle.mp4";
import MI20 from "@/assets/videos/major-inspection/20-combustor-basket.mp4";
import MI21 from "@/assets/videos/major-inspection/21-top-hat.mp4";
import MI22 from "@/assets/videos/major-inspection/22-combustor-basket.mp4";
import MI23 from "@/assets/videos/major-inspection/23-fuel-nozzle.mp4";
import MI24 from "@/assets/videos/major-inspection/24-turbine-cylinder.mp4";
import MI25 from "@/assets/videos/major-inspection/25-bypass-elbow.mp4";
import MI26 from "@/assets/videos/major-inspection/26-transition-piece.mp4";
import MI27 from "@/assets/videos/major-inspection/27-u-support.mp4";
import MI28 from "@/assets/videos/major-inspection/28-bypass-ring.mp4";
import MI29 from "@/assets/videos/major-inspection/29-turbine-vane-row-1.mp4";
import MI30 from "@/assets/videos/major-inspection/30-turbine-blade-ring-row-4.mp4";
import MI31 from "@/assets/videos/major-inspection/31-turbine-blade-ring-row-3.mp4";
import MI32 from "@/assets/videos/major-inspection/32-turbine-blade-ring-row-2.mp4";
import MI33 from "@/assets/videos/major-inspection/33-turbine-blade-ring-row-1.mp4";
import MI34 from "@/assets/videos/major-inspection/34-turbine-seal-housing-row-2.mp4";
import MI35 from "@/assets/videos/major-inspection/35-turbine-seal-housing-row-3.mp4";
import MI36 from "@/assets/videos/major-inspection/36-turbine-seal-housing-row-4.mp4";
import MI37 from "@/assets/videos/major-inspection/37-rca-flexible-pipe-upper.mp4";
import MI38 from "@/assets/videos/major-inspection/38-compressor-comb-cylinder-upper.mp4";
import MI39 from "@/assets/videos/major-inspection/39-compressor-blade-ring-row-1-upper.mp4";
import MI40 from "@/assets/videos/major-inspection/40-compressor-blade-ring-row-2-upper.mp4";
import MI41 from "@/assets/videos/major-inspection/41-compressor-blade-ring-row-3-upper.mp4";
import MI42 from "@/assets/videos/major-inspection/42-inlet-casing-upper.mp4";
import MI43 from "@/assets/videos/major-inspection/43-exhaust-manifold-upper.mp4";
import MI44 from "@/assets/videos/major-inspection/44-torque-tube-cover-upper.mp4";
import MI45 from "@/assets/videos/major-inspection/45-seal-housing-torque-tube-cover-upper.mp4";
import MI46 from "@/assets/videos/major-inspection/46-ost-pipe.mp4";
import MI47 from "@/assets/videos/major-inspection/47-ost-cover.mp4";
import MI48 from "@/assets/videos/major-inspection/48-exhaust-cylinder-upper.mp4";
import MI49 from "@/assets/videos/major-inspection/49-thrust-bearing-cover.mp4";
import MI50 from "@/assets/videos/major-inspection/50-thrust-bearing-upper.mp4";
import MI51 from "@/assets/videos/major-inspection/51-thrust-bearing-lower.mp4";
import MI52 from "@/assets/videos/major-inspection/52-bearing-2-upper.mp4";
import MI53 from "@/assets/videos/major-inspection/53-bearing-1-upper.mp4";
import MI54 from "@/assets/videos/major-inspection/54-ost-device.mp4";
import MI55 from "@/assets/videos/major-inspection/55-turbine-compressor-rotor.mp4";
import MI56 from "@/assets/videos/major-inspection/56-bearing-2-lower.mp4";
import MI57 from "@/assets/videos/major-inspection/57-bearing-1-lower.mp4";
import MI58 from "@/assets/videos/major-inspection/58-turbine-blade-ring-row-2-lower.mp4";
import MI59 from "@/assets/videos/major-inspection/59-turbine-blade-ring-row-3-lower.mp4";
import MI60 from "@/assets/videos/major-inspection/60-turbine-blade-ring-row-1-lower.mp4";
import MI61 from "@/assets/videos/major-inspection/61-turbine-blade-ring-row-4-lower.mp4";
import MI62 from "@/assets/videos/major-inspection/62-seal-housing-torque-cover-lower.mp4";
import MI63 from "@/assets/videos/major-inspection/63-compressor-diaphragm-row-1-lower.mp4";
import MI64 from "@/assets/videos/major-inspection/64-compressor-diaphragm-row-2-lower.mp4";
import MI65 from "@/assets/videos/major-inspection/65-compressor-diaphragm-row-3-lower.mp4";
import MI66 from "@/assets/videos/major-inspection/66-compressor-diaphragm-row-4-lower.mp4";
import MI67 from "@/assets/videos/major-inspection/67-compressor-vane-row-5-lower.mp4";
import MI68 from "@/assets/videos/major-inspection/68-compressor-vane-row-6-lower.mp4";
import MI69 from "@/assets/videos/major-inspection/69-compressor-blade-ring-row-1-lower.mp4";
import MI70 from "@/assets/videos/major-inspection/70-compressor-blade-ring-row-2-lower.mp4";
import MI71 from "@/assets/videos/major-inspection/71-compressor-blade-ring-row-3-lower.mp4";
import MI72 from "@/assets/videos/major-inspection/72-inlet-seal-housing-lower.mp4";
import MI73 from "@/assets/videos/major-inspection/73-igv-link-lower.mp4";
import MI74 from "@/assets/videos/major-inspection/74-igv-lower.mp4";
import MI75 from "@/assets/videos/major-inspection/75-turbine-ring-segment-row-1-upper.mp4";
import TI34 from "@/assets/videos/turbine-inspection/34.mp4";
import TI35 from "@/assets/videos/turbine-inspection/35-turbine-ring-segment-row-1-upper .mp4";
import TI36 from "@/assets/videos/turbine-inspection/36-turbine-ring-segment-row-2-upper.mp4";
import TI37 from "@/assets/videos/turbine-inspection/37-turbine-vane-segment-row-2-upper.mp4";
import TI38 from "@/assets/videos/turbine-inspection/38.mp4";
import TI39 from "@/assets/videos/turbine-inspection/39-turbine-vane-segment-row-2-upper.mp4";
import TI40 from "@/assets/videos/turbine-inspection/40-turbine-ring-segment-row-2-upper.mp4";
import TI41 from "@/assets/videos/turbine-inspection/41-turbine-ring-segment-row-3-upper.mp4";
import TI42 from "@/assets/videos/turbine-inspection/42-turbine-vane-segment-row-3-upper.mp4";
import TI43 from "@/assets/videos/turbine-inspection/43.mp4";
import TI44 from "@/assets/videos/turbine-inspection/44-turbine-vane-segment-row-3-upper.mp4";
import TI45 from "@/assets/videos/turbine-inspection/45-turbine-ring-segment-row-3-upper.mp4";
import TI46 from "@/assets/videos/turbine-inspection/46-turbine-ring-segment-row-4-upper.mp4";
import TI47 from "@/assets/videos/turbine-inspection/47-turbine-vane-segment-row-4-upper.mp4";
import TI48 from "@/assets/videos/turbine-inspection/48.mp4";
import TI49 from "@/assets/videos/turbine-inspection/49-turbine-vane-segment-row-4-upper.mp4";
import TI50 from "@/assets/videos/turbine-inspection/50-turbine-ring-segment-row-4-upper.mp4";
import TI51 from "@/assets/videos/turbine-inspection/51-turbine-ring-segment-row-1-lower.mp4";
import TI52 from "@/assets/videos/turbine-inspection/52.mp4";
import TI53 from "@/assets/videos/turbine-inspection/53-turbine-ring-segment-row-1-lower.mp4";
import TI54 from "@/assets/videos/turbine-inspection/54-turbine-seal-housing-row-2-lower.mp4";
import TI55 from "@/assets/videos/turbine-inspection/55-turbine-ring-segment-row-2-lower.mp4";
import TI56 from "@/assets/videos/turbine-inspection/56-turbine-vane-segment-row-2-lower.mp4";
import TI57 from "@/assets/videos/turbine-inspection/57.mp4";
import TI58 from "@/assets/videos/turbine-inspection/58-turbine-vane-segment-row-2-lower.mp4";
import TI59 from "@/assets/videos/turbine-inspection/59-turbine-ring-segment-row-2-lower.mp4";
import TI60 from "@/assets/videos/turbine-inspection/60-turbine-seal-housing-row-2-lower.mp4";
import TI61 from "@/assets/videos/turbine-inspection/61-turbine-seal-housing-row-3-lower.mp4";
import TI62 from "@/assets/videos/turbine-inspection/62-turbine-ring-segment-row-3-lower.mp4";
import TI63 from "@/assets/videos/turbine-inspection/63-turbine-vane-segment-row-3-lower.mp4";
import TI64 from "@/assets/videos/turbine-inspection/64.mp4";
import TI65 from "@/assets/videos/turbine-inspection/65-turbine-vane-segment-row-3-lower.mp4";
import TI66 from "@/assets/videos/turbine-inspection/66-turbine-ring-segment-row-3-lower.mp4";
import TI67 from "@/assets/videos/turbine-inspection/67-turbine-seal-housing-row-3-lower.mp4";
import TI68 from "@/assets/videos/turbine-inspection/68-turbine-seal-housing-row-4-lower.mp4";
import MI111 from "@/assets/videos/add-scope/ti/turbine-section/8-turbine-ring-segment-row-4-lower.mp4";
import MI112 from "@/assets/videos/add-scope/ti/turbine-section/9-turbine-vane-segment-row-4-lower.mp4";
import MI113 from "@/assets/videos/add-scope/ti/turbine-section/10.mp4";
import MI114 from "@/assets/videos/add-scope/ti/turbine-section/11-turbine-vane-segment-row-4-lower.mp4";
import MI115 from "@/assets/videos/add-scope/ti/turbine-section/12-turbine-ring-segment-row-4-lower.mp4";
import MI116 from "@/assets/videos/add-scope/ti/turbine-section/13-turbine-seal-housing-row-4-lower.mp4";
import MI117 from "@/assets/videos/major-inspection/117-compressor-diaphragm-row-1-upper.mp4";
import MI118 from "@/assets/videos/major-inspection/118-compressor-diaphragm-row-2-upper.mp4";
import MI119 from "@/assets/videos/major-inspection/119-compressor-diaphragm-row-3-upper.mp4";
import MI120 from "@/assets/videos/major-inspection/120-compressor-diaphragm-row-4-upper.mp4";
import MI121 from "@/assets/videos/major-inspection/121-compressor-diaphragm-row-5-upper.mp4";
import MI122 from "@/assets/videos/major-inspection/122-compressor-diaphragm-row-6-upper.mp4";
import MI123 from "@/assets/videos/major-inspection/123-compressor-diaphragm-row-1-upper.mp4";
import MI124 from "@/assets/videos/major-inspection/124-compressor-diaphragm-row-2-upper.mp4";
import MI125 from "@/assets/videos/major-inspection/125-compressor-diaphragm-row-3-upper.mp4";
import MI126 from "@/assets/videos/major-inspection/126-compressor-diaphragm-row-4-upper.mp4";
import MI127 from "@/assets/videos/major-inspection/127-compressor-diaphragm-row-5-upper.mp4";
import MI128 from "@/assets/videos/major-inspection/128-compressor-diaphragm-row-6-upper.mp4";
import MI129 from "@/assets/videos/major-inspection/129-compressor-diaphragm-row-15-lower.mp4";
import MI130 from "@/assets/videos/major-inspection/130-compressor-diaphragm-row-16-lower.mp4";
import MI131 from "@/assets/videos/major-inspection/131-ogv-lower.mp4";
import MI132 from "@/assets/videos/major-inspection/132.mp4";
import MI133 from "@/assets/videos/major-inspection/133-ogv-lower.mp4";
import MI134 from "@/assets/videos/major-inspection/134-compressor-diaphragm-row-17-lower.mp4";
import MI135 from "@/assets/videos/major-inspection/135-compressor-diaphragm-row-16-lower.mp4";
import MI136 from "@/assets/videos/major-inspection/136-compressor-diaphragm-row-15-lower.mp4";
import MI137 from "@/assets/videos/major-inspection/137-compressor-diaphragm-row-14-lower.mp4";
import MI138 from "@/assets/videos/major-inspection/138-compressor-diaphragm-row-13-lower.mp4";
import MI139 from "@/assets/videos/major-inspection/139-compressor-diaphragm-row-12-lower.mp4";
import MI140 from "@/assets/videos/major-inspection/140.mp4";
import MI141 from "@/assets/videos/major-inspection/141-compressor-diaphragm-row-12-lower.mp4";
import MI142 from "@/assets/videos/major-inspection/142-compressor-diaphragm-row-13-lower.mp4";
import MI143 from "@/assets/videos/major-inspection/143-compressor-diaphragm-row-12-lower.mp4";
import MI144 from "@/assets/videos/major-inspection/144-compressor-diaphragm-row-11-lower.mp4";
import MI145 from "@/assets/videos/major-inspection/145-compressor-diaphragm-row-10-lower.mp4";
import MI146 from "@/assets/videos/major-inspection/146-compressor-diaphragm-row-9-lower.mp4";
import MI147 from "@/assets/videos/major-inspection/147-compressor-diaphragm-row-8-lower.mp4";
import MI148 from "@/assets/videos/major-inspection/148-compressor-diaphragm-row-7-lower.mp4";
import MI149 from "@/assets/videos/major-inspection/149.mp4";
import MI150 from "@/assets/videos/major-inspection/150-compressor-diaphragm-row-7-lower.mp4";
import MI151 from "@/assets/videos/major-inspection/151-compressor-diaphragm-row-8-lower.mp4";
import MI152 from "@/assets/videos/major-inspection/152-compressor-diaphragm-row-9-lower.mp4";
import MI153 from "@/assets/videos/major-inspection/153-compressor-diaphragm-row-10-lower.mp4";
import MI154 from "@/assets/videos/major-inspection/154-compressor-diaphragm-row-11-lower.mp4";
import MI155 from "@/assets/videos/major-inspection/155-compressor-diaphragm-row-15-upper.mp4";
import MI156 from "@/assets/videos/major-inspection/156-compressor-diaphragm-row-16-upper.mp4";
import MI157 from "@/assets/videos/major-inspection/157-compressor-diaphragm-row-17-upper.mp4";
import MI158 from "@/assets/videos/major-inspection/158-ogv-upper.mp4";
import MI159 from "@/assets/videos/major-inspection/159.mp4";
import MI160 from "@/assets/videos/major-inspection/160-ogv-upper.mp4";
import MI161 from "@/assets/videos/major-inspection/161-compressor-diaphragm-row-17-upper.mp4";
import MI162 from "@/assets/videos/major-inspection/162-compressor-diaphragm-row-16-upper.mp4";
import MI163 from "@/assets/videos/major-inspection/163-compressor-diaphragm-row-14-upper.mp4";
import MI164 from "@/assets/videos/major-inspection/164-compressor-diaphragm-row-13-upper.mp4";
import MI165 from "@/assets/videos/major-inspection/165-compressor-diaphragm-row-12-upper.mp4";
import MI166 from "@/assets/videos/major-inspection/166.mp4";
import MI167 from "@/assets/videos/major-inspection/167-compressor-diaphragm-row-12-upper.mp4";
import MI168 from "@/assets/videos/major-inspection/168-compressor-diaphragm-row-13-upper.mp4";
import MI169 from "@/assets/videos/major-inspection/169-compressor-diaphragm-row-14-upper.mp4";
import MI170 from "@/assets/videos/major-inspection/170-compressor-diaphragm-row-11-upper.mp4";
import MI171 from "@/assets/videos/major-inspection/171-compressor-diaphragm-row-10-upper.mp4";
import MI172 from "@/assets/videos/major-inspection/172-compressor-diaphragm-row-9-upper.mp4";
import MI173 from "@/assets/videos/major-inspection/173-compressor-diaphragm-row-8-upper.mp4";
import MI174 from "@/assets/videos/major-inspection/174-compressor-diaphragm-row-7-upper.mp4";
import MI175 from "@/assets/videos/major-inspection/175.mp4";
import MI176 from "@/assets/videos/major-inspection/176-compressor-diaphragm-row-7-upper.mp4";
import MI177 from "@/assets/videos/major-inspection/177-compressor-diaphragm-row-8-upper.mp4";
import MI178 from "@/assets/videos/major-inspection/178-compressor-diaphragm-row-9-upper.mp4";
import MI179 from "@/assets/videos/major-inspection/179-compressor-diaphragm-row-10-upper.mp4";
import MI180 from "@/assets/videos/major-inspection/180-compressor-diaphragm-row-11-upper.mp4";
import MI181 from "@/assets/videos/major-inspection/181-igv-link.mp4";
import MI182 from "@/assets/videos/add-scope/ci/compressor-section/6-seal-housing-upper.mp4";
import MI183 from "@/assets/videos/add-scope/ci/compressor-section/7-igv-upper.mp4";
import MI184 from "@/assets/videos/add-scope/ci/compressor-section/54-seal-housing.mp4";
import MI185 from "@/assets/videos/add-scope/ci/compressor-section/55-igv-link.mp4";
import MICompressorSection1 from "@/assets/videos/add-scope/mi/compressor-section/1-compressor-blade-row-1.mp4";
import MICompressorSection2 from "@/assets/videos/add-scope/mi/compressor-section/2-compressor-blade-row-2.mp4";
import MICompressorSection3 from "@/assets/videos/add-scope/mi/compressor-section/3-compressor-blade-row-3.mp4";
import MICompressorSection4 from "@/assets/videos/add-scope/mi/compressor-section/4-compressor-blade-row-4.mp4";
import MICompressorSection5 from "@/assets/videos/add-scope/mi/compressor-section/5-compressor-blade-row-5.mp4";
import MICompressorSection6 from "@/assets/videos/add-scope/mi/compressor-section/6-compressor-blade-row-6.mp4";
import MICompressorSection7 from "@/assets/videos/add-scope/mi/compressor-section/7.mp4";
import MICompressorSection8 from "@/assets/videos/add-scope/mi/compressor-section/8-compressor-blade-row-6.mp4";
import MICompressorSection9 from "@/assets/videos/add-scope/mi/compressor-section/9-compressor-blade-row-5.mp4";
import MICompressorSection10 from "@/assets/videos/add-scope/mi/compressor-section/10-compressor-blade-row-4.mp4";
import MICompressorSection11 from "@/assets/videos/add-scope/mi/compressor-section/11-compressor-blade-row-3.mp4";
import MICompressorSection12 from "@/assets/videos/add-scope/mi/compressor-section/12-compressor-blade-row-2.mp4";
import MICompressorSection13 from "@/assets/videos/add-scope/mi/compressor-section/13-compressor-blade-row-1.mp4";
import MI207 from "@/assets/videos/major-inspection/207-igv-lower.mp4";
import MI208 from "@/assets/videos/major-inspection/208-igv-link-lower.mp4";
import MI209 from "@/assets/videos/major-inspection/209-inlet-seal-housing-lower.mp4";
import MI210 from "@/assets/videos/major-inspection/210-compressor-diaphragm-row-6-lower.mp4";
import MI211 from "@/assets/videos/major-inspection/211-compressor-diaphragm-row-5-lower.mp4";
import MI212 from "@/assets/videos/major-inspection/212-compressor-diaphragm-row-4-lower.mp4";
import MI213 from "@/assets/videos/major-inspection/213-compressor-diaphragm-row-3-lower.mp4";
import MI214 from "@/assets/videos/major-inspection/214-compressor-diaphragm-row-2-lower.mp4";
import MI215 from "@/assets/videos/major-inspection/215-compressor-diaphragm-row-1-lower.mp4";
import MI216 from "@/assets/videos/major-inspection/216-compressor-blade-ring-row-3-lower.mp4";
import MI217 from "@/assets/videos/major-inspection/217-compressor-blade-ring-row-2-lower.mp4";
import MI218 from "@/assets/videos/major-inspection/218-compressor-blade-ring-row-1-lower.mp4";
import MI219 from "@/assets/videos/major-inspection/219-seal-housing-torque-tube-cover-lower.mp4";
import MI220 from "@/assets/videos/major-inspection/220-turbine-blade-ring-row-4-lower.mp4";
import MI221 from "@/assets/videos/major-inspection/221-turbine-blade-ring-row-1-lower.mp4";
import MI222 from "@/assets/videos/major-inspection/222-turbine-blade-ring-row-2-lower.mp4";
import MI223 from "@/assets/videos/major-inspection/223-turbine-blade-ring-row-2-lower.mp4";
import MI224 from "@/assets/videos/major-inspection/224-bearing-1-lower .mp4";
import MI225 from "@/assets/videos/major-inspection/225-bearing-2-lower.mp4";
import MI226 from "@/assets/videos/major-inspection/226-turbine-compressor-rotor.mp4";
import MI227 from "@/assets/videos/major-inspection/227-bearing-2-upper.mp4";
import MI228 from "@/assets/videos/major-inspection/228-bearing-1-upper.mp4";
import MI229 from "@/assets/videos/major-inspection/229-exhaust-cylinder-upper.mp4";
import MI230 from "@/assets/videos/major-inspection/230-seal-housing-torque-cover-upper.mp4";
import MI231 from "@/assets/videos/major-inspection/231-inlet-casing-upper.mp4";
import MI232 from "@/assets/videos/major-inspection/232-torque-tube-cover-upper.mp4";
import MI233 from "@/assets/videos/major-inspection/233-compressor-blade-ring-row-1-upper.mp4";
import MI234 from "@/assets/videos/major-inspection/234-compressor-blade-ring-row-2-upper.mp4";
import MI235 from "@/assets/videos/major-inspection/235-compressor-blade-ring-row-3-upper.mp4";
import MI236 from "@/assets/videos/major-inspection/236-compressor-comb-cylinder-upper.mp4";
import MI237 from "@/assets/videos/major-inspection/237-rca-flexible-pipe-upper.mp4";
import MI238 from "@/assets/videos/major-inspection/238-turbine-seal-housing-row-2-upper.mp4";
import MI239 from "@/assets/videos/major-inspection/239-turbine-seal-housing-row-3-upper.mp4";
import MI240 from "@/assets/videos/major-inspection/240-turbine-seal-housing-row-4-upper.mp4";
import MI241 from "@/assets/videos/major-inspection/241-turbine-blade-ring-row-4-upper.mp4";
import MI242 from "@/assets/videos/major-inspection/242-turbine-blade-ring-row-3-upper.mp4";
import MI243 from "@/assets/videos/major-inspection/243-turbine-blade-ring-row-2-upper.mp4";
import MI244 from "@/assets/videos/major-inspection/244-turbine-blade-ring-row-1-upper.mp4";
import MI245 from "@/assets/videos/major-inspection/245-turbine-vane-segment-row-1.mp4";
import MI246 from "@/assets/videos/major-inspection/246-bypass-ring-upper.mp4";
import MI247 from "@/assets/videos/major-inspection/247-ost-device.mp4";
import MI248 from "@/assets/videos/major-inspection/248-ost-cover.mp4";
import MI249 from "@/assets/videos/major-inspection/249-ost-pipe.mp4";
import MI250 from "@/assets/videos/major-inspection/250-exhaust-manifold-upper.mp4";
import MI251 from "@/assets/videos/major-inspection/251-u-support.mp4";
import MI252 from "@/assets/videos/major-inspection/252-transition-piece.mp4";
import MI253 from "@/assets/videos/major-inspection/253-bypass-elbow.mp4";
import MI254 from "@/assets/videos/major-inspection/254-turbine-cylinder-upper.mp4";
import MI255 from "@/assets/videos/major-inspection/255-top-hat.mp4";
import MI256 from "@/assets/videos/major-inspection/256-cooling-pipe.mp4";
import MI257 from "@/assets/videos/major-inspection/257-rca-pipe.mp4";
import MI258 from "@/assets/videos/major-inspection/258-bleed-pipe.mp4";
import MI259 from "@/assets/videos/major-inspection/259-fuel-gas-manifold.mp4";
import MI260 from "@/assets/videos/major-inspection/260-fuel-branch-pipe.mp4";
import MI261 from "@/assets/videos/major-inspection/261-cross-flame-tube.mp4";
import MI262 from "@/assets/videos/major-inspection/262-flame-detector.mp4";
import MI263 from "@/assets/videos/major-inspection/263-manhole-turbine-cylinder.mp4";
import MI264 from "@/assets/videos/major-inspection/264-discavity-temperature.mp4";
import MI265 from "@/assets/videos/major-inspection/265-black-patch-temperature.mp4";
import MI266 from "@/assets/videos/major-inspection/266-flame-igniter.mp4";
import MI267 from "@/assets/videos/major-inspection/267-thrust-bearing-lower.mp4";
import MI268 from "@/assets/videos/major-inspection/268-thrust-bearing-upper.mp4";
import MI269 from "@/assets/videos/major-inspection/269-thrust-bearing-cover.mp4";
import MI270 from "@/assets/videos/major-inspection/270-coupling-spacer.mp4";
import MI271 from "@/assets/videos/major-inspection/271-coupling-bolt.mp4";
import MI272 from "@/assets/videos/major-inspection/272-vapour-pipe.mp4";
import MI273 from "@/assets/videos/major-inspection/273-coupling-cover-lower.mp4";
import MI274 from "@/assets/videos/major-inspection/274-coupling-cover-upper.mp4";
import MI275 from "@/assets/videos/major-inspection/275-inlet-manifold.mp4";
import MI276 from "@/assets/videos/major-inspection/276-inlet-duct.mp4";

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
        name: "IGV Link",
        top: 232,
        left: 810,
      },
      {
        id: 5,
        video: CICompressorSection6,
        duration: 155000,
        name: "Seal Housing Upper",
        top: 235,
        left: 510,
      },
      {
        id: 6,
        video: CICompressorSection7,
        duration: 155000,
        name: "IGV Upper",
        top: 235,
        left: 570,
      },
      {
        id: 7,
        video: CICompressorSection8,
        duration: 155000,
        name: "Fuel Manifold",
        top: 233,
        left: 490,
      },
      {
        id: 8,
        video: CICompressorSection9,
        duration: 155000,
        name: "Bleed Pipe",
        top: 235,
        left: 410,
      },
      {
        id: 9,
        video: CICompressorSection10,
        duration: 165000,
        name: "RCA Pipe",
        top: 235,
        left: 550,
      },
      {
        id: 10,
        video: CICompressorSection11,
        duration: 155000,
        name: "Compressor Cylinder",
        top: 235,
        left: 470,
      },
      {
        id: 11,
        video: CICompressorSection12,
        duration: 155000,
        name: "Compressor Vane Row 1 Lower",
        top: 238,
        left: 735,
      },
      {
        id: 12,
        video: CICompressorSection13,
        duration: 155000,
        name: "Compressor Vane Row 2 Lower",
        top: 238,
        left: 730,
      },
      {
        id: 13,
        video: CICompressorSection14,
        duration: 155000,
        name: "Compressor Vane Row 3 Lower",
        top: 235,
        left: 470,
      },
      {
        id: 14,
        video: CICompressorSection15,
        duration: 155000,
        name: "Compressor Vane Row 4 Lower",
        top: 235,
        left: 360,
      },
      {
        id: 15,
        video: CICompressorSection16,
        duration: 155000,
        name: "Compressor Vane Row 5 Lower",
        top: 238,
        left: 360,
      },
      {
        id: 16,
        video: CICompressorSection17,
        duration: 155000,
        name: "Compressor Vane Row 6 Lower",
        top: 235,
        left: 265,
      },
      {
        id: 17,
        video: CICompressorSection18,
        duration: 155000,
        name: "Compressor Vane Row 1 Upper",
        top: 237,
        left: 780,
      },
      {
        id: 18,
        video: CICompressorSection19,
        duration: 155000,
        name: "Compressor Vane Row 2 Upper",
        top: 235,
        left: 410,
      },
      {
        id: 19,
        video: CICompressorSection20,
        duration: 155000,
        name: "Compressor Vane Row 3 Upper",
        top: 235,
        left: 420,
      },
      {
        id: 20,
        video: CICompressorSection21,
        duration: 155000,
        name: "Compressor Vane Row 4 Upper",
        top: 235,
        left: 435,
      },
      {
        id: 21,
        video: CICompressorSection22,
        duration: 155000,
        name: "Compressor Vane Row 5 Upper",
        top: 225,
        left: 520,
      },
      {
        id: 22,
        video: CICompressorSection23,
        duration: 155000,
        name: "Compressor Vane Row 6 Upper",
        top: 236,
        left: 540,
      },
      {
        id: 23,
        video: CICompressorSection24,
        duration: 155000,
        name: "Compressor Blade Row 1",
        top: 233,
        left: 620,
      },
      {
        id: 24,
        video: CICompressorSection25,
        duration: 155000,
        name: "Compressor Blade Row 2",
        top: 237,
        left: 560,
      },
      {
        id: 25,
        video: CICompressorSection26,
        duration: 155000,
        name: "Compressor Blade Row 3",
        top: 236,
        left: 480,
      },
      {
        id: 26,
        video: CICompressorSection27,
        duration: 155000,
        name: "Compressor Blade Row 4",
        top: 233,
        left: 480,
      },
      {
        id: 27,
        video: CICompressorSection28,
        duration: 155000,
        name: "Compressor Blade Row 5",
        top: 235,
        left: 390,
      },
      {
        id: 28,
        video: CICompressorSection29,
        duration: 155000,
        name: "Compressor Blade Row 6",
        top: 235,
        left: 295,
      },
      {
        id: 29,
        video: CICompressorSection30,
        duration: 155000,
        name: "",
        top: 0,
        left: 0,
      },
      {
        id: 30,
        video: CICompressorSection31,
        duration: 155000,
        name: "Compressor Blade Row 6",
        top: 235,
        left: 290,
      },
      {
        id: 31,
        video: CICompressorSection32,
        duration: 155000,
        name: "Compressor Blade Row 5",
        top: 235,
        left: 380,
      },
      {
        id: 32,
        video: CICompressorSection33,
        duration: 155000,
        name: "Compressor Blade Row 4",
        top: 233,
        left: 480,
      },
      {
        id: 33,
        video: CICompressorSection34,
        duration: 155000,
        name: "Compressor Blade Row 3",
        top: 237,
        left: 480,
      },
      {
        id: 34,
        video: CICompressorSection35,
        duration: 155000,
        name: "Compressor Blade Row 2",
        top: 236,
        left: 560,
      },
      {
        id: 35,
        video: CICompressorSection36,
        duration: 155000,
        name: "Compressor Blade Row 1",
        top: 233,
        left: 620,
      },
      {
        id: 36,
        video: CICompressorSection37,
        duration: 155000,
        name: "Compressor Vane Row 1 Upper",
        top: 242,
        left: 350,
      },
      {
        id: 37,
        video: CICompressorSection38,
        duration: 155000,
        name: "Compressor Vane Row 2 Upper",
        top: 238,
        left: 350,
      },
      {
        id: 38,
        video: CICompressorSection39,
        duration: 155000,
        name: "Compressor Vane Row 3 Upper",
        top: 237,
        left: 380,
      },
      {
        id: 39,
        video: CICompressorSection40,
        duration: 155000,
        name: "Compressor Vane Row 4 Upper",
        top: 238,
        left: 1050,
      },
      {
        id: 40,
        video: CICompressorSection41,
        duration: 155000,
        name: "Compressor Vane Row 5 Upper",
        top: 237,
        left: 1090,
      },
      {
        id: 41,
        video: CICompressorSection42,
        duration: 155000,
        name: "Compressor Vane Row 6 Upper",
        top: 237,
        left: 550,
      },
      {
        id: 42,
        video: CICompressorSection43,
        duration: 155000,
        name: "Compressor Vane Row 1 Lower",
        top: 240,
        left: 730,
      },
      {
        id: 43,
        video: CICompressorSection44,
        duration: 155000,
        name: "Compressor Vane Row 2 Lower",
        top: 240,
        left: 580,
      },
      {
        id: 44,
        video: CICompressorSection45,
        duration: 155000,
        name: "Compressor Vane Row 3 Lower",
        top: 233,
        left: 470,
      },
      {
        id: 45,
        video: CICompressorSection46,
        duration: 155000,
        name: "Compressor Vane Row 4 Lower",
        top: 232,
        left: 1010,
      },
      {
        id: 46,
        video: CICompressorSection47,
        duration: 155000,
        name: "Compressor Vane Row 5 Lower",
        top: 237,
        left: 910,
      },
      {
        id: 47,
        video: CICompressorSection48,
        duration: 155000,
        name: "Compressor Vane Row 6 Lower",
        top: 237,
        left: 720,
      },
      {
        id: 48,
        video: CICompressorSection49,
        duration: 155000,
        name: "Compressor Cylinder",
        top: 236,
        left: 870,
      },
      {
        id: 49,
        video: CICompressorSection50,
        duration: 155000,
        name: "RCA Pipe",
        top: 237,
        left: 870,
      },
      {
        id: 50,
        video: CICompressorSection51,
        duration: 155000,
        name: "Cooling Pipe",
        top: 237,
        left: 740,
      },
      {
        id: 51,
        video: CICompressorSection52,
        duration: 155000,
        name: "Fuel Manifold",
        top: 236,
        left: 910,
      },
      {
        id: 52,
        video: CICompressorSection53,
        duration: 155000,
        name: "IGV Upper",
        top: 237,
        left: 575,
      },
      {
        id: 53,
        video: CICompressorSection54,
        duration: 155000,
        name: "Seal Housing",
        top: 236,
        left: 560,
      },
      {
        id: 54,
        video: CICompressorSection55,
        duration: 155000,
        name: "IGV Link",
        top: 233,
        left: 810,
      },
      {
        id: 55,
        video: CICompressorSection56,
        duration: 155000,
        name: "Casing Upper",
        top: 235,
        left: 1000,
      },
      {
        id: 56,
        video: CICompressorSection57,
        duration: 155000,
        name: "Vapour Piper",
        top: 240,
        left: 595,
      },
      {
        id: 57,
        video: CICompressorSection58,
        duration: 155000,
        name: "Inlet Manifold",
        top: 238,
        left: 520,
      },
      {
        id: 58,
        video: CICompressorSection59,
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
    ["turbine-section"]: [
      {
        id: 0,
        video: CITurbineSection1,
        duration: 1500,
        name: "Cooling Pipe",
        top: 240,
        left: 700,
      },
      {
        id: 1,
        video: CITurbineSection2,
        duration: 1500,
        name: "Turbine Cylinder",
        top: 241,
        left: 1010,
      },
      {
        id: 2,
        video: CITurbineSection3,
        duration: 1500,
        name: "Bypass Ring",
        top: 240,
        left: 960,
      },
      {
        id: 3,
        video: CITurbineSection4,
        duration: 1500,
        name: "Turbine Vane Row 1 Upper",
        top: 240,
        left: 770,
      },
      {
        id: 4,
        video: CITurbineSection5,
        duration: 1500,
        name: "Turbine Vane Row 4 Upper",
        top: 240,
        left: 860,
      },
      {
        id: 5,
        video: CITurbineSection6,
        duration: 1500,
        name: "Turbine Vane Row 3 Upper",
        top: 240,
        left: 980,
      },
      {
        id: 6,
        video: CITurbineSection7,
        duration: 1500,
        name: "Turbine Vane Row 2 Upper",
        top: 240,
        left: 640,
      },
      {
        id: 7,
        video: CITurbineSection8,
        duration: 1500,
        name: "Turbine Blade Ring 1",
        top: 240,
        left: 815,
      },
      {
        id: 8,
        video: CITurbineSection9,
        duration: 1500,
        name: "Turbine Seal Housing Row 2",
        top: 240,
        left: 690,
      },
      {
        id: 9,
        video: CITurbineSection10,
        duration: 1500,
        name: "Turbine Seal Housing Row 3",
        top: 240,
        left: 1100,
      },
      {
        id: 10,
        video: CITurbineSection11,
        duration: 1500,
        name: "Turbine Seal Housing Row 4 Lower",
        top: 240,
        left: 1090,
      },
      {
        id: 11,
        video: CITurbineSection12,
        duration: 1500,
        name: "Turbine Blade Ring Row 1 Lower",
        top: 428,
        left: 780,
      },
      {
        id: 12,
        video: CITurbineSection13,
        duration: 1500,
        name: "Turbine Blade Ring Row 2 Lower",
        top: 240,
        left: 610,
      },
      {
        id: 13,
        video: CITurbineSection14,
        duration: 1500,
        name: "Turbine Blade Ring Row 3 Lower",
        top: 240,
        left: 1000,
      },
      {
        id: 14,
        video: CITurbineSection15,
        duration: 1500,
        name: "Turbine Blade Ring Row 4 Lower",
        top: 241,
        left: 830,
      },
      {
        id: 15,
        video: CITurbineSection16,
        duration: 1500,
        name: "Turbine Blade Row 1",
        top: 243,
        left: 750,
      },
      {
        id: 16,
        video: CITurbineSection17,
        duration: 1500,
        name: "Turbine Blade Row 2",
        top: 242,
        left: 640,
      },
      {
        id: 17,
        video: CITurbineSection18,
        duration: 1500,
        name: "Turbine Blade Row 3",
        top: 241,
        left: 950,
      },
      {
        id: 18,
        video: CITurbineSection19,
        duration: 1500,
        name: "Turbine Blade Row 4",
        top: 241,
        left: 900,
      },
      {
        id: 19,
        video: CITurbineSection20,
        duration: 1500,
        name: "",
        top: 0,
        left: 0,
      },
      {
        id: 20,
        video: CITurbineSection21,
        duration: 1500,
        name: "Turbine Blade Row 4",
        top: 241,
        left: 900,
      },
      {
        id: 21,
        video: CITurbineSection22,
        duration: 155000,
        name: "Turbine Blade Row 3",
        top: 241,
        left: 1090,
      },
      {
        id: 22,
        video: CITurbineSection23,
        duration: 155000,
        name: "Turbine Blade Row 2",
        top: 240,
        left: 620,
      },
      {
        id: 23,
        video: CITurbineSection24,
        duration: 155000,
        name: "Turbine Blade Row 1",
        top: 240,
        left: 785,
      },
      {
        id: 24,
        video: CITurbineSection25,
        duration: 155000,
        name: "Turbine Blade Ring Row 4 Lower",
        top: 241,
        left: 920,
      },
      {
        id: 25,
        video: CITurbineSection26,
        duration: 155000,
        name: "Turbine Blade Ring Row 3 Lower",
        top: 241,
        left: 1120,
      },
      {
        id: 26,
        video: CITurbineSection27,
        duration: 155000,
        name: "Turbine Blade Ring Row 2 Lower",
        top: 241,
        left: 545,
      },
      {
        id: 27,
        video: CITurbineSection28,
        duration: 155000,
        name: "Turbine Blade Ring Row 1 Lower",
        top: 241,
        left: 645,
      },
      {
        id: 28,
        video: CITurbineSection29,
        duration: 155000,
        name: "Turbine Seal Housing Row 2 Upper",
        top: 241,
        left: 550,
      },
      {
        id: 29,
        video: CITurbineSection30,
        duration: 155000,
        name: "Turbine Seal Housing Row 3 Upper",
        top: 241,
        left: 445,
      },
      {
        id: 30,
        video: CITurbineSection31,
        duration: 155000,
        name: "Turbine Seal Housing Row 4 Upper",
        top: 240,
        left: 1030,
      },
      {
        id: 31,
        video: CITurbineSection32,
        duration: 155000,
        name: "Turbine Blade Ring Row 1 Upper",
        top: 238,
        left: 620,
      },
      {
        id: 32,
        video: CITurbineSection33,
        duration: 155000,
        name: "Turbine Blade Ring Row 2 Upper",
        top: 238,
        left: 1120,
      },
      {
        id: 33,
        video: CITurbineSection34,
        duration: 155000,
        name: "Turbine Blade Ring Row 3 Upper",
        top: 239,
        left: 990,
      },
      {
        id: 34,
        video: CITurbineSection35,
        duration: 155000,
        name: "Turbine Blade Ring Row 4 Upper",
        top: 239,
        left: 850,
      },
      {
        id: 35,
        video: CITurbineSection36,
        duration: 155000,
        name: "Turbine Van Row 1 Upper",
        top: 239,
        left: 710,
      },
      {
        id: 36,
        video: CITurbineSection37,
        duration: 155000,
        name: "Bypass Ring",
        top: 238,
        left: 840,
      },
      {
        id: 37,
        video: CITurbineSection38,
        duration: 155000,
        name: "Turbine Cylinder",
        top: 238,
        left: 1085,
      },
      {
        id: 38,
        video: CITurbineSection39,
        duration: 155000,
        name: "Cooling Pipe",
        top: 238,
        left: 1060,
      },
    ],
    ["exhaust-section"]: [
      {
        id: 0,
        video: TI12,
        duration: 1500,
        name: "Cooling Pipe",
        top: 240,
        left: 700,
      },
      {
        id: 1,
        video: TI13,
        duration: 1500,
        name: "Turbine Cylinder",
        top: 241,
        left: 1010,
      },
      {
        id: 2,
        video: CIExhaustSection3,
        duration: 1500,
        name: "Bypass Ring",
        top: 241,
        left: 960,
      },
      {
        id: 3,
        video: TI18,
        duration: 1500,
        name: "Turbine Vane Row 1 Upper",
        top: 240,
        left: 770,
      },
      {
        id: 4,
        video: TI19,
        duration: 1500,
        name: "Turbine Vane Row 4 Upper",
        top: 240,
        left: 860,
      },
      {
        id: 5,
        video: TI20,
        duration: 1500,
        name: "Turbine Vane Row 3 Upper",
        top: 240,
        left: 980,
      },
      {
        id: 6,
        video: TI21,
        duration: 1500,
        name: "Turbine Vane Row 2 Upper",
        top: 240,
        left: 640,
      },
      {
        id: 7,
        video: TI22,
        duration: 1500,
        name: "Turbine Blade Ring 1",
        top: 240,
        left: 815,
      },
      {
        id: 8,
        video: TI23,
        duration: 1500,
        name: "Turbine Seal Housing Row 2",
        top: 240,
        left: 690,
      },
      {
        id: 9,
        video: TI24,
        duration: 1500,
        name: "Turbine Seal Housing Row 3",
        top: 240,
        left: 1100,
      },
      {
        id: 10,
        video: TI25,
        duration: 1500,
        name: "Turbine Seal Housing Row 4 Lower",
        top: 240,
        left: 1090,
      },
      {
        id: 11,
        video: TI26,
        duration: 1500,
        name: "Turbine Blade Ring Row 1 Lower",
        top: 428,
        left: 780,
      },
      {
        id: 12,
        video: TI27,
        duration: 1500,
        name: "Turbine Blade Ring Row 2 Lower",
        top: 240,
        left: 610,
      },
      {
        id: 13,
        video: TI28,
        duration: 1500,
        name: "Turbine Blade Ring Row 3 Lower",
        top: 240,
        left: 1000,
      },
      {
        id: 14,
        video: TI29,
        duration: 1500,
        name: "Turbine Blade Ring Row 4 Lower",
        top: 241,
        left: 830,
      },
      {
        id: 15,
        video: TI30,
        duration: 1500,
        name: "Turbine Blade Row 1",
        top: 243,
        left: 750,
      },
      {
        id: 16,
        video: TI31,
        duration: 1500,
        name: "Turbine Blade Row 2",
        top: 242,
        left: 640,
      },
      {
        id: 17,
        video: TI32,
        duration: 1500,
        name: "Turbine Blade Row 3",
        top: 241,
        left: 950,
      },
      {
        id: 18,
        video: CITurbineSection19,
        duration: 1500,
        name: "Turbine Blade Row 4",
        top: 241,
        left: 900,
      },
      {
        id: 19,
        video: TIExhaustSection1,
        duration: 155000,
        name: "Exhaust Manifold",
        top: 237,
        left: 910,
      },
      {
        id: 20,
        video: TIExhaustSection2,
        duration: 155000,
        name: "OST Pipe",
        top: 238,
        left: 1110,
      },
      {
        id: 21,
        video: TIExhaustSection3,
        duration: 155000,
        name: "OST Cover",
        top: 242,
        left: 850,
      },
      {
        id: 22,
        video: TIExhaustSection4,
        duration: 155000,
        name: "OST Device",
        top: 240,
        left: 830,
      },
      {
        id: 23,
        video: TIExhaustSection5,
        duration: 155000,
        name: "Exhaust Cylinder",
        top: 238,
        left: 1170,
      },
      {
        id: 24,
        video: TIExhaustSection6,
        duration: 155000,
        name: "Upper Bearing 1",
        top: 238,
        left: 810,
      },
      {
        id: 25,
        video: TIExhaustSection7,
        duration: 155000,
        name: "",
        top: 0,
        left: 0,
      },
      {
        id: 26,
        video: TIExhaustSection8,
        duration: 155000,
        name: "Upper Bearing 1",
        top: 238,
        left: 810,
      },
      {
        id: 27,
        video: TIExhaustSection9,
        duration: 155000,
        name: "Exhaust Cylinder",
        top: 238,
        left: 590,
      },
      {
        id: 28,
        video: TIExhaustSection10,
        duration: 155000,
        name: "OST Device",
        top: 240,
        left: 830,
      },
      {
        id: 29,
        video: TIExhaustSection11,
        duration: 155000,
        name: "OST Cover",
        top: 242,
        left: 850,
      },
      {
        id: 30,
        video: TIExhaustSection12,
        duration: 155000,
        name: "OST Pipe",
        top: 238,
        left: 1110,
      },
      {
        id: 31,
        video: TIExhaustSection13,
        duration: 155000,
        name: "Exhaust Manifold",
        top: 238,
        left: 910,
      },
      {
        id: 32,
        video: CITurbineSection21,
        duration: 1500,
        name: "Turbine Blade Row 4",
        top: 241,
        left: 900,
      },
      {
        id: 33,
        video: TI75,
        duration: 155000,
        name: "Turbine Blade Row 3",
        top: 241,
        left: 1090,
      },
      {
        id: 34,
        video: TI76,
        duration: 155000,
        name: "Turbine Blade Row 2",
        top: 240,
        left: 620,
      },
      {
        id: 35,
        video: TI77,
        duration: 155000,
        name: "Turbine Blade Row 1",
        top: 240,
        left: 785,
      },
      {
        id: 36,
        video: TI78,
        duration: 155000,
        name: "Turbine Blade Ring Row 4 Lower",
        top: 241,
        left: 920,
      },
      {
        id: 37,
        video: TI79,
        duration: 155000,
        name: "Turbine Blade Ring Row 3 Lower",
        top: 241,
        left: 1120,
      },
      {
        id: 38,
        video: TI80,
        duration: 155000,
        name: "Turbine Blade Ring Row 2 Lower",
        top: 241,
        left: 545,
      },
      {
        id: 39,
        video: TI81,
        duration: 155000,
        name: "Turbine Blade Ring Row 1 Lower",
        top: 241,
        left: 645,
      },
      {
        id: 40,
        video: TI82,
        duration: 155000,
        name: "Turbine Seal Housing Row 2 Upper",
        top: 241,
        left: 550,
      },
      {
        id: 41,
        video: TI83,
        duration: 155000,
        name: "Turbine Seal Housing Row 3 Upper",
        top: 241,
        left: 445,
      },
      {
        id: 42,
        video: TI84,
        duration: 155000,
        name: "Turbine Seal Housing Row 4 Upper",
        top: 240,
        left: 1030,
      },
      {
        id: 43,
        video: TI85,
        duration: 155000,
        name: "Turbine Blade Ring Row 1 Upper",
        top: 238,
        left: 620,
      },
      {
        id: 44,
        video: TI86,
        duration: 155000,
        name: "Turbine Blade Ring Row 2 Upper",
        top: 238,
        left: 1120,
      },
      {
        id: 45,
        video: TI87,
        duration: 155000,
        name: "Turbine Blade Ring Row 3 Upper",
        top: 239,
        left: 990,
      },
      {
        id: 46,
        video: TI88,
        duration: 155000,
        name: "Turbine Blade Ring Row 4 Upper",
        top: 239,
        left: 850,
      },
      {
        id: 47,
        video: TI89,
        duration: 155000,
        name: "Turbine Van Row 1 Upper",
        top: 239,
        left: 710,
      },
      {
        id: 48,
        video: TI90,
        duration: 155000,
        name: "Bypass Ring",
        top: 238,
        left: 840,
      },
      {
        id: 49,
        video: TI91,
        duration: 155000,
        name: "Turbine Cylinder",
        top: 238,
        left: 1085,
      },
      {
        id: 50,
        video: TI92,
        duration: 155000,
        name: "Cooling Pipe",
        top: 238,
        left: 1060,
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
    ["compressor-section"]: [
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
      {
        id: 8,
        video: MI9,
        duration: 5500,
        name: "Discavity",
        top: 210,
        left: 535,
      },
      {
        id: 9,
        video: MI10,
        duration: 5500,
        name: "Flame Detector",
        top: 225,
        left: 690,
      },
      {
        id: 10,
        video: MI11,
        duration: 5500,
        name: "Flame Igniter",
        top: 236,
        left: 535,
      },
      {
        id: 11,
        video: MI12,
        duration: 5500,
        name: "Cross Flame",
        top: 235,
        left: 520,
      },
      {
        id: 12,
        video: MI13,
        duration: 5500,
        name: "Cooling Pipe",
        top: 236,
        left: 600,
      },
      {
        id: 13,
        video: MI14,
        duration: 5500,
        name: "Fuel Branch Pipe",
        top: 230,
        left: 730,
      },
      {
        id: 14,
        video: MI15,
        duration: 5500,
        name: "RCA Pipe",
        top: 236,
        left: 850,
      },
      {
        id: 15,
        video: MI16,
        duration: 5500,
        name: "Bleed Pipe",
        top: 235,
        left: 615,
      },
      {
        id: 16,
        video: MI17,
        duration: 5500,
        name: "Exhaust Manifold",
        top: 235,
        left: 565,
      },
      {
        id: 17,
        video: MI18,
        duration: 5500,
        name: "Top Hat",
        top: 238,
        left: 540,
      },
      {
        id: 18,
        video: MI19,
        duration: 5500,
        name: "Fuel Nozzle",
        top: 237,
        left: 1180,
      },
      {
        id: 19,
        video: MI20,
        duration: 5500,
        name: "Combustor Basket",
        top: 237,
        left: 1180,
      },
      {
        id: 20,
        video: MI21,
        duration: 5500,
        name: "Top Hat",
        top: 238,
        left: 1180,
      },
      {
        id: 21,
        video: MI22,
        duration: 5500,
        name: "Combustor Basket",
        top: 238,
        left: 1180,
      },
      {
        id: 22,
        video: MI23,
        duration: 5500,
        name: "Fuel Nozzle",
        top: 238,
        left: 1180,
      },
      {
        id: 23,
        video: MI24,
        duration: 5500,
        name: "Turbine Cylinder",
        top: 238,
        left: 1140,
      },
      {
        id: 24,
        video: MI25,
        duration: 5500,
        name: "Bypass Elbow",
        top: 240,
        left: 1080,
      },
      {
        id: 25,
        video: MI26,
        duration: 5500,
        name: "Transition Piece",
        top: 240,
        left: 1135,
      },
      {
        id: 26,
        video: MI27,
        duration: 5500,
        name: "U-Support",
        top: 240,
        left: 1210,
      },
      {
        id: 27,
        video: MI28,
        duration: 5500,
        name: "Bypass Ring",
        top: 240,
        left: 1140,
      },
      {
        id: 28,
        video: MI29,
        duration: 5500,
        name: "Turbine Vane Row 1",
        top: 240,
        left: 1040,
      },
      {
        id: 29,
        video: MI30,
        duration: 5500,
        name: "Turbine Blade Ring Row 4",
        top: 240,
        left: 1100,
      },
      {
        id: 30,
        video: MI31,
        duration: 5500,
        name: "Turbine Blade Ring Row 3",
        top: 242,
        left: 675,
      },
      {
        id: 31,
        video: MI32,
        duration: 5500,
        name: "Turbine Blade Ring Row 2",
        top: 240,
        left: 720,
      },
      {
        id: 32,
        video: MI33,
        duration: 5500,
        name: "Turbine Blade Ring Row 1",
        top: 240,
        left: 660,
      },
      {
        id: 33,
        video: MI34,
        duration: 5500,
        name: "Turbine Seal Housing Row 2",
        top: 240,
        left: 610,
      },
      {
        id: 34,
        video: MI35,
        duration: 5500,
        name: "Turbine Seal Housing Row 3",
        top: 240,
        left: 610,
      },
      {
        id: 35,
        video: MI36,
        duration: 5500,
        name: "Turbine Seal Housing Row 4",
        top: 242,
        left: 1180,
      },
      {
        id: 36,
        video: MI37,
        duration: 5500,
        name: "RCA Flexible Pipe Upper",
        top: 238,
        left: 1030,
      },
      {
        id: 37,
        video: MI38,
        duration: 5500,
        name: "Compressor-Comb Cylinder Upper",
        top: 240,
        left: 1050,
      },
      {
        id: 38,
        video: MI39,
        duration: 5500,
        name: "Compressor Blade Ring Row 1 Upper",
        top: 240,
        left: 1180,
      },
      {
        id: 39,
        video: MI40,
        duration: 5500,
        name: "Compressor Blade Ring Row 2 Upper",
        top: 240,
        left: 1180,
      },
      {
        id: 40,
        video: MI41,
        duration: 5500,
        name: "Compressor Blade Ring Row 3 Upper",
        top: 240,
        left: 1060,
      },
      {
        id: 41,
        video: MI42,
        duration: 5500,
        name: "Inlet Casing Upper",
        top: 238,
        left: 1180,
      },
      {
        id: 42,
        video: MI43,
        duration: 5500,
        name: "Exhaust Manifold Upper",
        top: 238,
        left: 1180,
      },
      {
        id: 43,
        video: MI44,
        duration: 5500,
        name: "Torque Tube Cover Upper",
        top: 240,
        left: 1010,
      },
      {
        id: 44,
        video: MI45,
        duration: 5500,
        name: "Seal Housing Torque Tube Cover Upper",
        top: 238,
        left: 1100,
      },
      {
        id: 45,
        video: MI46,
        duration: 5500,
        name: "OST Pipe",
        top: 240,
        left: 780,
      },
      {
        id: 46,
        video: MI47,
        duration: 5500,
        name: "OST Cover",
        top: 238,
        left: 740,
      },
      {
        id: 47,
        video: MI48,
        duration: 5500,
        name: "Exhaust Cylinder Upper",
        top: 240,
        left: 1000,
      },
      {
        id: 48,
        video: MI49,
        duration: 5500,
        name: "Thrust Bearing Cover",
        top: 240,
        left: 640,
      },
      {
        id: 49,
        video: MI50,
        duration: 5500,
        name: "Thrust Bearing Upper",
        top: 240,
        left: 700,
      },
      {
        id: 50,
        video: MI51,
        duration: 5500,
        name: "Thrust Bearing Lower",
        top: 240,
        left: 630,
      },
      {
        id: 51,
        video: MI52,
        duration: 5500,
        name: "Bearing 2 Upper",
        top: 240,
        left: 950,
      },
      {
        id: 52,
        video: MI53,
        duration: 5500,
        name: "Bearing 1 Upper",
        top: 237,
        left: 965,
      },
      {
        id: 53,
        video: MI54,
        duration: 5500,
        name: "OST Device",
        top: 240,
        left: 1070,
      },
      {
        id: 54,
        video: MI55,
        duration: 5500,
        name: "Turbine Compressor Rotor",
        top: 242,
        left: 820,
      },
      {
        id: 55,
        video: MI56,
        duration: 5500,
        name: "Bearing 2 Lower",
        top: 239,
        left: 1100,
      },
      {
        id: 56,
        video: MI57,
        duration: 5500,
        name: "Bearing 1 Lower",
        top: 237,
        left: 1260,
      },
      {
        id: 57,
        video: MI58,
        duration: 5500,
        name: "Turbine Blade Ring Row 2 Lower",
        top: 237,
        left: 1190,
      },
      {
        id: 58,
        video: MI59,
        duration: 5500,
        name: "Turbine Blade Ring Row 3 Lower",
        top: 240,
        left: 1080,
      },
      {
        id: 59,
        video: MI60,
        duration: 5500,
        name: "Turbine Blade Ring Row 1 Lower",
        top: 240,
        left: 1150,
      },
      {
        id: 60,
        video: MI61,
        duration: 5500,
        name: "Turbine Blade Ring Row 4 Lower",
        top: 237,
        left: 905,
      },
      {
        id: 61,
        video: MI62,
        duration: 5500,
        name: "Seal Housing Torque Cover Lower",
        top: 240,
        left: 1160,
      },
      {
        id: 62,
        video: MI63,
        duration: 5500,
        name: "Compressor Diaphragm Row 1 Lower",
        top: 238,
        left: 1170,
      },
      {
        id: 63,
        video: MI64,
        duration: 5500,
        name: "Compressor Diaphragm Row 2 Lower",
        top: 238,
        left: 1110,
      },
      {
        id: 64,
        video: MI65,
        duration: 5500,
        name: "Compressor Diaphragm Row 3 Lower",
        top: 238,
        left: 1110,
      },
      {
        id: 65,
        video: MI66,
        duration: 5500,
        name: "Compressor Diaphragm Row 4 Lower",
        top: 238,
        left: 1050,
      },
      {
        id: 66,
        video: MI67,
        duration: 5500,
        name: "Compressor Vane Row 5 Lower",
        top: 239,
        left: 965,
      },
      {
        id: 67,
        video: MI68,
        duration: 5500,
        name: "Compressor Vane Row 6 Lower",
        top: 239,
        left: 910,
      },
      {
        id: 68,
        video: MI69,
        duration: 5500,
        name: "Compressor Blade Ring Row 1 Lower",
        top: 237,
        left: 1270,
      },
      {
        id: 69,
        video: MI70,
        duration: 5500,
        name: "Compressor Blade Ring Row 2 Lower",
        top: 239,
        left: 1150,
      },
      {
        id: 70,
        video: MI71,
        duration: 5500,
        name: "Compressor Blade Ring Row 3 Lower",
        top: 239,
        left: 1070,
      },
      {
        id: 71,
        video: MI72,
        duration: 5500,
        name: "Inlet Seal Housing Lower",
        top: 238,
        left: 1160,
      },
      {
        id: 72,
        video: MI73,
        duration: 5500,
        name: "IGV Link Lower",
        top: 237,
        left: 1120,
      },
      {
        id: 73,
        video: MI74,
        duration: 5500,
        name: "IGV Lower",
        top: 239,
        left: 1040,
      },
      {
        id: 74,
        video: MI75,
        duration: 5500,
        name: "Turbine Ring Segment Row 1 Upper",
        top: 239,
        left: 875,
      },
      {
        id: 75,
        video: TI34,
        duration: 1500,
        name: "",
        top: 0,
        left: 0,
      },
      {
        id: 76,
        video: TI35,
        duration: 1500,
        name: "Turbine Ring Segment Row 1 Upper",
        top: 240,
        left: 725,
      },
      {
        id: 77,
        video: TI36,
        duration: 1500,
        name: "Turbine Ring Segment Row 2 Upper",
        top: 240,
        left: 770,
      },
      {
        id: 78,
        video: TI37,
        duration: 1500,
        name: "Turbine Vane Segment Row 2 Upper",
        top: 240,
        left: 890,
      },
      {
        id: 79,
        video: TI38,
        duration: 1500,
        name: "",
        top: 0,
        left: 0,
      },
      {
        id: 80,
        video: TI39,
        duration: 1500,
        name: "Turbine Vane Segment Row 2 Upper",
        top: 240,
        left: 890,
      },
      {
        id: 81,
        video: TI40,
        duration: 1500,
        name: "Turbine Ring Segment Row 2 Upper",
        top: 240,
        left: 770,
      },
      {
        id: 82,
        video: TI41,
        duration: 1500,
        name: "Turbine Ring Segment Row 3 Upper",
        top: 241,
        left: 680,
      },
      {
        id: 83,
        video: TI42,
        duration: 1500,
        name: "Turbine Vane Segment Row 3 Upper",
        top: 241,
        left: 890,
      },
      {
        id: 84,
        video: TI43,
        duration: 1500,
        name: "",
        top: 0,
        left: 0,
      },
      {
        id: 85,
        video: TI44,
        duration: 1500,
        name: "Turbine Vane Segment Row 3 Upper",
        top: 241,
        left: 890,
      },
      {
        id: 86,
        video: TI45,
        duration: 1500,
        name: "Turbine Ring Segment Row 3 Upper",
        top: 241,
        left: 690,
      },
      {
        id: 87,
        video: TI46,
        duration: 1500,
        name: "Turbine Ring Segment Row 4 Upper",
        top: 241,
        left: 690,
      },
      {
        id: 88,
        video: TI47,
        duration: 1500,
        name: "Turbine Vane Segment Row 4 Upper",
        top: 241,
        left: 890,
      },
      {
        id: 89,
        video: TI48,
        duration: 1500,
        name: "",
        top: 0,
        left: 0,
      },
      {
        id: 90,
        video: TI49,
        duration: 1500,
        name: "Turbine Vane Segment Row 4 Upper",
        top: 241,
        left: 890,
      },
      {
        id: 91,
        video: TI50,
        duration: 1500,
        name: "Turbine Ring Segment Row 4 Upper",
        top: 241,
        left: 690,
      },
      {
        id: 92,
        video: TI51,
        duration: 1500,
        name: "Turbine Ring Segment Row 1 Lower",
        top: 241,
        left: 690,
      },
      {
        id: 93,
        video: TI52,
        duration: 1500,
        name: "",
        top: 0,
        left: 0,
      },
      {
        id: 94,
        video: TI53,
        duration: 1500,
        name: "Turbine Ring Segment Row 1 Lower",
        top: 241,
        left: 690,
      },
      {
        id: 95,
        video: TI54,
        duration: 1500,
        name: "Turbine Seal Housing Row 2 Lower",
        top: 241,
        left: 930,
      },
      {
        id: 96,
        video: TI55,
        duration: 1500,
        name: "Turbine Ring Segment Row 2 Lower",
        top: 241,
        left: 730,
      },
      {
        id: 97,
        video: TI56,
        duration: 1500,
        name: "Turbine Vane Segment Row 2 Lower",
        top: 240,
        left: 810,
      },
      {
        id: 98,
        video: TI57,
        duration: 1500,
        name: "",
        top: 0,
        left: 0,
      },
      {
        id: 99,
        video: TI58,
        duration: 1500,
        name: "Turbine Vane Segment Row 2 Lower",
        top: 240,
        left: 810,
      },
      {
        id: 100,
        video: TI59,
        duration: 1500,
        name: "Turbine Ring Segment Row 2 Lower",
        top: 240,
        left: 730,
      },
      {
        id: 101,
        video: TI60,
        duration: 1500,
        name: "Turbine Seal Housing Row 2 Lower",
        top: 241,
        left: 935,
      },
      {
        id: 102,
        video: TI61,
        duration: 1500,
        name: "Turbine Seal Housing Row 3 Lower",
        top: 242,
        left: 1110,
      },
      {
        id: 103,
        video: TI62,
        duration: 1500,
        name: "Turbine Ring Segment Row 3 Lower",
        top: 241,
        left: 860,
      },
      {
        id: 104,
        video: TI63,
        duration: 1500,
        name: "Turbine Vane Segment Row 3 Lower",
        top: 241,
        left: 1005,
      },
      {
        id: 105,
        video: TI64,
        duration: 1500,
        name: "",
        top: 0,
        left: 0,
      },
      {
        id: 106,
        video: TI65,
        duration: 1500,
        name: "Turbine Vane Segment Row 3 Lower",
        top: 241,
        left: 1010,
      },
      {
        id: 107,
        video: TI66,
        duration: 1500,
        name: "Turbine Ring Segment Row 3 Lower",
        top: 241,
        left: 860,
      },
      {
        id: 108,
        video: TI67,
        duration: 1500,
        name: "Turbine Seal Housing Row 3 Lower",
        top: 242,
        left: 1110,
      },
      {
        id: 109,
        video: TI68,
        duration: 1500,
        name: "Turbine Seal Housing Row 4 Lower",
        top: 241,
        left: 1090,
      },
      {
        id: 110,
        video: MI111,
        duration: 155000,
        name: "Ring Segment Row 4 Lower",
        top: 240,
        left: 750,
      },
      {
        id: 111,
        video: MI112,
        duration: 155000,
        name: "Vane Segment Row 4 Lower",
        top: 240,
        left: 940,
      },
      {
        id: 112,
        video: MI113,
        duration: 155000,
        name: "",
        top: 0,
        left: 0,
      },
      {
        id: 113,
        video: MI114,
        duration: 155000,
        name: "Vane Segment Row 4 Lower",
        top: 241,
        left: 940,
      },
      {
        id: 114,
        video: MI115,
        duration: 155000,
        name: "Ring Segment Row 4 Lower",
        top: 240,
        left: 750,
      },
      {
        id: 115,
        video: MI116,
        duration: 155000,
        name: "Seal Housing Row 4 Lower",
        top: 241,
        left: 1140,
      },
      {
        id: 116,
        video: MI117,
        duration: 155000,
        name: "Compressor Diaphragm Row 1 Upper",
        top: 239,
        left: 750,
      },
      {
        id: 117,
        video: MI118,
        duration: 155000,
        name: "Compressor Diaphragm Row 2 Upper",
        top: 239,
        left: 630,
      },
      {
        id: 118,
        video: MI119,
        duration: 155000,
        name: "Compressor Diaphragm Row 3 Upper",
        top: 239,
        left: 550,
      },
      {
        id: 119,
        video: MI120,
        duration: 155000,
        name: "Compressor Diaphragm Row 4 Upper",
        top: 239,
        left: 640,
      },
      {
        id: 120,
        video: MI121,
        duration: 155000,
        name: "Compressor Diaphragm Row 5 Upper",
        top: 239,
        left: 580,
      },
      {
        id: 121,
        video: MI122,
        duration: 155000,
        name: "Compressor Diaphragm Row 6 Upper",
        top: 239,
        left: 520,
      },
      {
        id: 122,
        video: MI123,
        duration: 155000,
        name: "Compressor Diaphragm Row 1 Upper",
        top: 240,
        left: 900,
      },
      {
        id: 123,
        video: MI124,
        duration: 155000,
        name: "Compressor Diaphragm Row 2 Upper",
        top: 240,
        left: 790,
      },
      {
        id: 124,
        video: MI125,
        duration: 155000,
        name: "Compressor Diaphragm Row 3 Upper",
        top: 241,
        left: 700,
      },
      {
        id: 125,
        video: MI126,
        duration: 155000,
        name: "Compressor Diaphragm Row 4 Upper",
        top: 241,
        left: 640,
      },
      {
        id: 126,
        video: MI127,
        duration: 155000,
        name: "Compressor Diaphragm Row 5 Upper",
        top: 241,
        left: 570,
      },
      {
        id: 127,
        video: MI128,
        duration: 155000,
        name: "Compressor Diaphragm Row 6 Upper",
        top: 240,
        left: 520,
      },
      {
        id: 128,
        video: MI129,
        duration: 155000,
        name: "Compressor Diaphragm Row 15 Lower",
        top: 241,
        left: 990,
      },
      {
        id: 129,
        video: MI130,
        duration: 155000,
        name: "Compressor Diaphragm Row 16 Lower",
        top: 241,
        left: 985,
      },
      {
        id: 130,
        video: MI131,
        duration: 155000,
        name: "OGV Lower",
        top: 239,
        left: 970,
      },
      {
        id: 131,
        video: MI132,
        duration: 155000,
        name: "",
        top: 0,
        left: 0,
      },
      {
        id: 132,
        video: MI133,
        duration: 155000,
        name: "OGV Lower",
        top: 239,
        left: 970,
      },
      {
        id: 133,
        video: MI134,
        duration: 155000,
        name: "Compressor Diaphragm Row 17 Lower",
        top: 243,
        left: 1140,
      },
      {
        id: 134,
        video: MI135,
        duration: 155000,
        name: "Compressor Diaphragm Row 16 Lower",
        top: 241,
        left: 980,
      },
      {
        id: 135,
        video: MI136,
        duration: 155000,
        name: "Compressor Diaphragm Row 15 Lower",
        top: 241,
        left: 985,
      },
      {
        id: 136,
        video: MI137,
        duration: 155000,
        name: "Compressor Diaphragm Row 14 Lower",
        top: 241,
        left: 1010,
      },
      {
        id: 137,
        video: MI138,
        duration: 155000,
        name: "Compressor Diaphragm Row 13 Lower",
        top: 239,
        left: 1010,
      },
      {
        id: 138,
        video: MI139,
        duration: 155000,
        name: "Compressor Diaphragm Row 12 Lower",
        top: 240,
        left: 1090,
      },
      {
        id: 139,
        video: MI140,
        duration: 155000,
        name: "",
        top: 0,
        left: 0,
      },
      {
        id: 140,
        video: MI141,
        duration: 155000,
        name: "Compressor Diaphragm Row 12 Lower",
        top: 240,
        left: 1090,
      },
      {
        id: 141,
        video: MI142,
        duration: 155000,
        name: "Compressor Diaphragm Row 13 Lower",
        top: 240,
        left: 1010,
      },
      {
        id: 142,
        video: MI143,
        duration: 155000,
        name: "Compressor Diaphragm Row 12 Lower",
        top: 239,
        left: 970,
      },
      {
        id: 143,
        video: MI144,
        duration: 155000,
        name: "Compressor Diaphragm Row 11 Lower",
        top: 241,
        left: 1205,
      },
      {
        id: 144,
        video: MI145,
        duration: 155000,
        name: "Compressor Diaphragm Row 10 Lower",
        top: 239,
        left: 1205,
      },
      {
        id: 145,
        video: MI146,
        duration: 155000,
        name: "Compressor Diaphragm Row 9 Lower",
        top: 239,
        left: 1205,
      },
      {
        id: 146,
        video: MI147,
        duration: 155000,
        name: "Compressor Diaphragm Row 8 Lower",
        top: 237,
        left: 1205,
      },
      {
        id: 147,
        video: MI148,
        duration: 155000,
        name: "Compressor Diaphragm Row 7 Lower",
        top: 237,
        left: 1200,
      },
      {
        id: 148,
        video: MI149,
        duration: 155000,
        name: "",
        top: 0,
        left: 0,
      },
      {
        id: 149,
        video: MI150,
        duration: 155000,
        name: "Compressor Diaphragm Row 7 Lower",
        top: 237,
        left: 1190,
      },
      {
        id: 150,
        video: MI151,
        duration: 155000,
        name: "Compressor Diaphragm Row 8 Lower",
        top: 237,
        left: 1205,
      },
      {
        id: 151,
        video: MI152,
        duration: 155000,
        name: "Compressor Diaphragm Row 9 Lower",
        top: 238,
        left: 1205,
      },
      {
        id: 152,
        video: MI153,
        duration: 155000,
        name: "Compressor Diaphragm Row 10 Lower",
        top: 238,
        left: 1205,
      },
      {
        id: 153,
        video: MI154,
        duration: 155000,
        name: "Compressor Diaphragm Row 11 Lower",
        top: 240,
        left: 1205,
      },
      {
        id: 154,
        video: MI155,
        duration: 155000,
        name: "Compressor Diaphragm Row 15 Upper",
        top: 241,
        left: 1210,
      },
      {
        id: 155,
        video: MI156,
        duration: 155000,
        name: "Compressor Diaphragm Row 16 Upper",
        top: 240,
        left: 1195,
      },
      {
        id: 156,
        video: MI157,
        duration: 155000,
        name: "Compressor Diaphragm Row 17 Upper",
        top: 240,
        left: 1210,
      },
      {
        id: 157,
        video: MI158,
        duration: 155000,
        name: "OGV Upper",
        top: 237,
        left: 1210,
      },
      {
        id: 158,
        video: MI159,
        duration: 155000,
        name: "",
        top: 0,
        left: 0,
      },
      {
        id: 159,
        video: MI160,
        duration: 155000,
        name: "OGV Upper",
        top: 237,
        left: 1210,
      },
      {
        id: 160,
        video: MI161,
        duration: 155000,
        name: "Compressor Diaphragm Row 17 Upper",
        top: 240,
        left: 1210,
      },
      {
        id: 161,
        video: MI162,
        duration: 155000,
        name: "Compressor Diaphragm Row 16 Upper",
        top: 240,
        left: 1195,
      },
      {
        id: 162,
        video: MI163,
        duration: 155000,
        name: "Compressor Diaphragm Row 14 Upper",
        top: 238,
        left: 1090,
      },
      {
        id: 163,
        video: MI164,
        duration: 155000,
        name: "Compressor Diaphragm Row 13 Upper",
        top: 241,
        left: 1090,
      },
      {
        id: 164,
        video: MI165,
        duration: 155000,
        name: "Compressor Diaphragm Row 12 Upper",
        top: 240,
        left: 1090,
      },
      {
        id: 165,
        video: MI166,
        duration: 155000,
        name: "",
        top: 0,
        left: 0,
      },
      {
        id: 166,
        video: MI167,
        duration: 155000,
        name: "Compressor Diaphragm Row 12 Upper",
        top: 241,
        left: 1090,
      },
      {
        id: 167,
        video: MI168,
        duration: 155000,
        name: "Compressor Diaphragm Row 13 Upper",
        top: 241,
        left: 1090,
      },
      {
        id: 168,
        video: MI169,
        duration: 155000,
        name: "Compressor Diaphragm Row 14 Upper",
        top: 238,
        left: 1090,
      },
      {
        id: 169,
        video: MI170,
        duration: 155000,
        name: "Compressor Diaphragm Row 11 Upper",
        top: 240,
        left: 1100,
      },
      {
        id: 170,
        video: MI171,
        duration: 155000,
        name: "Compressor Diaphragm Row 10 Upper",
        top: 240,
        left: 1090,
      },
      {
        id: 171,
        video: MI172,
        duration: 155000,
        name: "Compressor Diaphragm Row 9 Upper",
        top: 238,
        left: 1090,
      },
      {
        id: 172,
        video: MI173,
        duration: 155000,
        name: "Compressor Diaphragm Row 8 Upper",
        top: 241,
        left: 1160,
      },
      {
        id: 173,
        video: MI174,
        duration: 155000,
        name: "Compressor Diaphragm Row 7 Upper",
        top: 241,
        left: 1160,
      },
      {
        id: 174,
        video: MI175,
        duration: 155000,
        name: "",
        top: 0,
        left: 0,
      },
      {
        id: 175,
        video: MI176,
        duration: 155000,
        name: "Compressor Diaphragm Row 7 Upper",
        top: 241,
        left: 1155,
      },
      {
        id: 176,
        video: MI177,
        duration: 155000,
        name: "Compressor Diaphragm Row 8 Upper",
        top: 241,
        left: 1160,
      },
      {
        id: 177,
        video: MI178,
        duration: 155000,
        name: "Compressor Diaphragm Row 9 Upper",
        top: 238,
        left: 1090,
      },
      {
        id: 178,
        video: MI179,
        duration: 155000,
        name: "Compressor Diaphragm Row 10 Upper",
        top: 239,
        left: 1090,
      },
      {
        id: 179,
        video: MI180,
        duration: 155000,
        name: "Compressor Diaphragm Row 11 Upper",
        top: 240,
        left: 1100,
      },
      {
        id: 180,
        video: MI181,
        duration: 155000,
        name: "IGV Link",
        top: 241,
        left: 840,
      },
      {
        id: 181,
        video: MI182,
        duration: 155000,
        name: "Seal Housing Upper",
        top: 235,
        left: 510,
      },
      {
        id: 182,
        video: MI183,
        duration: 155000,
        name: "IGV Upper",
        top: 235,
        left: 570,
      },
      {
        id: 183,
        video: MI184,
        duration: 155000,
        name: "Seal Housing Upper",
        top: 236,
        left: 515,
      },
      {
        id: 184,
        video: MI185,
        duration: 155000,
        name: "IGV Link",
        top: 233,
        left: 810,
      },
      {
        id: 185,
        video: MICompressorSection1,
        duration: 155000,
        name: "Compressor Blade Row 1",
        top: 238,
        left: 1400,
      },
      {
        id: 186,
        video: MICompressorSection2,
        duration: 155000,
        name: "Compressor Blade Row 2",
        top: 238,
        left: 1220,
      },
      {
        id: 187,
        video: MICompressorSection3,
        duration: 155000,
        name: "Compressor Blade Row 3",
        top: 238,
        left: 1100,
      },
      {
        id: 188,
        video: MICompressorSection4,
        duration: 155000,
        name: "Compressor Blade Row 4",
        top: 238,
        left: 1015,
      },
      {
        id: 189,
        video: MICompressorSection5,
        duration: 155000,
        name: "Compressor Blade Row 5",
        top: 238,
        left: 950,
      },
      {
        id: 190,
        video: MICompressorSection6,
        duration: 155000,
        name: "Compressor Blade Row 6",
        top: 238,
        left: 880,
      },
      {
        id: 191,
        video: MICompressorSection7,
        duration: 155000,
        name: "",
        top: 0,
        left: 0,
      },
      {
        id: 192,
        video: MICompressorSection8,
        duration: 155000,
        name: "Compressor Blade Row 6",
        top: 238,
        left: 880,
      },
      {
        id: 193,
        video: MICompressorSection9,
        duration: 155000,
        name: "Compressor Blade Row 5",
        top: 238,
        left: 950,
      },
      {
        id: 194,
        video: MICompressorSection10,
        duration: 155000,
        name: "Compressor Blade Row 4",
        top: 238,
        left: 1015,
      },
      {
        id: 195,
        video: MICompressorSection11,
        duration: 155000,
        name: "Compressor Blade Row 3",
        top: 238,
        left: 1105,
      },
      {
        id: 196,
        video: MICompressorSection12,
        duration: 155000,
        name: "Compressor Blade Row 2",
        top: 238,
        left: 1220,
      },
      {
        id: 197,
        video: MICompressorSection13,
        duration: 155000,
        name: "Compressor Blade Row 1",
        top: 238,
        left: 1400,
      },
      {
        id: 206,
        video: MI207,
        duration: 155000,
        name: "IGV Lower",
        top: 238,
        left: 1185,
      },
      {
        id: 207,
        video: MI208,
        duration: 155000,
        name: "IGV Link Lower",
        top: 238,
        left: 1185,
      },
      {
        id: 208,
        video: MI209,
        duration: 155000,
        name: "Inlet Seal Housing Lower",
        top: 238,
        left: 1185,
      },
      {
        id: 209,
        video: MI210,
        duration: 155000,
        name: "Compressor Diaphragm Row 6 Lower",
        top: 238,
        left: 1185,
      },
      {
        id: 210,
        video: MI211,
        duration: 155000,
        name: "Compressor Diaphragm Row 5 Lower",
        top: 238,
        left: 1120,
      },
      {
        id: 211,
        video: MI212,
        duration: 155000,
        name: "Compressor Diaphragm Row 4 Lower",
        top: 238,
        left: 1120,
      },
      {
        id: 212,
        video: MI213,
        duration: 155000,
        name: "Compressor Diaphragm Row 3 Lower",
        top: 238,
        left: 1120,
      },
      {
        id: 213,
        video: MI214,
        duration: 155000,
        name: "Compressor Diaphragm Row 2 Lower",
        top: 238,
        left: 1120,
      },
      {
        id: 214,
        video: MI215,
        duration: 155000,
        name: "Compressor Diaphragm Row 1 Lower",
        top: 238,
        left: 1120,
      },
      {
        id: 215,
        video: MI216,
        duration: 155000,
        name: "Compressor Blade Ring Row 3 Lower",
        top: 238,
        left: 1120,
      },
      {
        id: 216,
        video: MI217,
        duration: 155000,
        name: "Compressor Blade Ring Row 2 Lower",
        top: 238,
        left: 1120,
      },
      {
        id: 217,
        video: MI218,
        duration: 155000,
        name: "Compressor Blade Ring Row 1 Lower",
        top: 238,
        left: 1120,
      },
      {
        id: 218,
        video: MI219,
        duration: 155000,
        name: "Seal Housing Torque Tube Cover Lower",
        top: 238,
        left: 665,
      },
      {
        id: 219,
        video: MI220,
        duration: 155000,
        name: "Turbine Blade Ring Row 4 Lower",
        top: 238,
        left: 870,
      },
      {
        id: 220,
        video: MI221,
        duration: 155000,
        name: "Turbine Blade Ring Row 1 Lower",
        top: 238,
        left: 1270,
      },
      {
        id: 221,
        video: MI222,
        duration: 155000,
        name: "Turbine Blade Ring Row 2 Lower",
        top: 238,
        left: 1270,
      },
      {
        id: 222,
        video: MI223,
        duration: 155000,
        name: "Turbine Blade Ring Row 2 Lower",
        top: 239,
        left: 940,
      },
      {
        id: 223,
        video: MI224,
        duration: 155000,
        name: "Bearing 1 Lower",
        top: 238,
        left: 1290,
      },
      {
        id: 224,
        video: MI225,
        duration: 155000,
        name: "Bearing 2 Lower",
        top: 238,
        left: 1290,
      },
      {
        id: 225,
        video: MI226,
        duration: 155000,
        name: "Turbine Compressor Rotor",
        top: 238,
        left: 760,
      },
      {
        id: 226,
        video: MI227,
        duration: 155000,
        name: "Bearing 2 Upper",
        top: 239,
        left: 910,
      },
      {
        id: 227,
        video: MI228,
        duration: 155000,
        name: "Bearing 1 Upper",
        top: 238,
        left: 1070,
      },
      {
        id: 228,
        video: MI229,
        duration: 155000,
        name: "Exhaust Cylinder Upper",
        top: 237,
        left: 1070,
      },
      {
        id: 229,
        video: MI230,
        duration: 155000,
        name: "Seal Housing Torque Cover Upper",
        top: 238,
        left: 1110,
      },
      {
        id: 230,
        video: MI231,
        duration: 155000,
        name: "Inlet Casing Upper",
        top: 238,
        left: 1290,
      },
      {
        id: 231,
        video: MI232,
        duration: 155000,
        name: "Torque Tube Cover Upper",
        top: 240,
        left: 1110,
      },
      {
        id: 232,
        video: MI233,
        duration: 155000,
        name: "Compressor Blade Ring Row 1 Upper",
        top: 239,
        left: 1320,
      },
      {
        id: 233,
        video: MI234,
        duration: 155000,
        name: "Compressor Blade Ring Row 2 Upper",
        top: 239,
        left: 1160,
      },
      {
        id: 234,
        video: MI235,
        duration: 155000,
        name: "Compressor Blade Ring Row 3 Upper",
        top: 239,
        left: 1180,
      },
      {
        id: 235,
        video: MI236,
        duration: 155000,
        name: "Compressor-comb Cylinder Upper",
        top: 240,
        left: 1270,
      },
      {
        id: 236,
        video: MI237,
        duration: 155000,
        name: "RCA Flexible Pipe Upper",
        top: 239,
        left: 1210,
      },
      {
        id: 237,
        video: MI238,
        duration: 155000,
        name: "Turbine Seal Housing Row 2 Upper",
        top: 239,
        left: 1210,
      },
      {
        id: 238,
        video: MI239,
        duration: 155000,
        name: "Compressor Blade Ring Row 3 Upper",
        top: 239,
        left: 1180,
      },
      {
        id: 239,
        video: MI240,
        duration: 155000,
        name: "Compressor Blade Ring Row 4 Upper",
        top: 239,
        left: 1210,
      },
      {
        id: 240,
        video: MI241,
        duration: 155000,
        name: "Turbine Blade Ring Row 4 Upper",
        top: 239,
        left: 1210,
      },
      {
        id: 241,
        video: MI242,
        duration: 155000,
        name: "Turbine Blade Ring Row 3 Upper",
        top: 239,
        left: 1210,
      },
      {
        id: 242,
        video: MI243,
        duration: 155000,
        name: "Turbine Blade Ring Row 2 Upper",
        top: 239,
        left: 1320,
      },
      {
        id: 243,
        video: MI244,
        duration: 155000,
        name: "Turbine Blade Ring Row 1 Upper",
        top: 239,
        left: 1320,
      },
      {
        id: 244,
        video: MI245,
        duration: 155000,
        name: "Turbine Vane Segment Row 1",
        top: 239,
        left: 1420,
      },
      {
        id: 245,
        video: MI246,
        duration: 155000,
        name: "Bypass Ring Upper",
        top: 239,
        left: 1540,
      },
      {
        id: 246,
        video: MI247,
        duration: 155000,
        name: "OST Device",
        top: 239,
        left: 1260,
      },
      {
        id: 247,
        video: MI248,
        duration: 155000,
        name: "OST Cover",
        top: 239,
        left: 1400,
      },
      {
        id: 248,
        video: MI249,
        duration: 155000,
        name: "OST Pipe",
        top: 239,
        left: 1280,
      },
      {
        id: 249,
        video: MI250,
        duration: 155000,
        name: "Exhaust Manifold Upper",
        top: 239,
        left: 1350,
      },
      {
        id: 250,
        video: MI251,
        duration: 155000,
        name: "U-Support",
        top: 239,
        left: 1420,
      },
      {
        id: 251,
        video: MI252,
        duration: 155000,
        name: "Transition Piece",
        top: 239,
        left: 1360,
      },
      {
        id: 252,
        video: MI253,
        duration: 155000,
        name: "Bypass Elbow",
        top: 239,
        left: 1290,
      },
      {
        id: 253,
        video: MI254,
        duration: 155000,
        name: "Turbine Cylinder Upper",
        top: 239,
        left: 1350,
      },
      {
        id: 254,
        video: MI255,
        duration: 155000,
        name: "Top Hat",
        top: 239,
        left: 1340,
      },
      {
        id: 255,
        video: MI256,
        duration: 155000,
        name: "Cooling Pipe",
        top: 239,
        left: 1260,
      },
      {
        id: 256,
        video: MI257,
        duration: 155000,
        name: "RCA Pipe",
        top: 239,
        left: 1420,
      },
      {
        id: 257,
        video: MI258,
        duration: 155000,
        name: "Bleed Pipe",
        top: 239,
        left: 1320,
      },
      {
        id: 258,
        video: MI259,
        duration: 155000,
        name: "Fuel Gas Manifold",
        top: 239,
        left: 1355,
      },
      {
        id: 259,
        video: MI260,
        duration: 155000,
        name: "Fuel Branch Pipe",
        top: 239,
        left: 1340,
      },
      {
        id: 260,
        video: MI261,
        duration: 155000,
        name: "Cross Flame Tube",
        top: 239,
        left: 1210,
      },
      {
        id: 261,
        video: MI262,
        duration: 155000,
        name: "Flame Detector",
        top: 239,
        left: 1535,
      },
      {
        id: 262,
        video: MI263,
        duration: 155000,
        name: "Manhole Turbine Cylinder",
        top: 239,
        left: 1350,
      },
      {
        id: 263,
        video: MI264,
        duration: 155000,
        name: "Discavity Temperature",
        top: 239,
        left: 1300,
      },
      {
        id: 264,
        video: MI265,
        duration: 155000,
        name: "Black Patch Temperature",
        top: 239,
        left: 1270,
      },
      {
        id: 265,
        video: MI266,
        duration: 155000,
        name: "Flame Igniter",
        top: 239,
        left: 1320,
      },
      {
        id: 266,
        video: MI267,
        duration: 155000,
        name: "Thrust Bearing Lower",
        top: 239,
        left: 1470,
      },
      {
        id: 267,
        video: MI268,
        duration: 155000,
        name: "Thrust Bearing Upper",
        top: 239,
        left: 1420,
      },
      {
        id: 268,
        video: MI269,
        duration: 155000,
        name: "Thrust Bearing Cover",
        top: 239,
        left: 1210,
      },
      {
        id: 269,
        video: MI270,
        duration: 155000,
        name: "Coupling Spacer",
        top: 239,
        left: 1145,
      },
      {
        id: 270,
        video: MI271,
        duration: 155000,
        name: "Coupling Bolt",
        top: 239,
        left: 1230,
      },
      {
        id: 271,
        video: MI272,
        duration: 155000,
        name: "Vapour Pipe",
        top: 239,
        left: 1180,
      },
      {
        id: 272,
        video: MI273,
        duration: 155000,
        name: "Coupling Cover Lower",
        top: 239,
        left: 1210,
      },
      {
        id: 273,
        video: MI274,
        duration: 155000,
        name: "Coupling Cover Upper",
        top: 239,
        left: 1310,
      },
      {
        id: 274,
        video: MI275,
        duration: 155000,
        name: "Inlet Manifold",
        top: 239,
        left: 1210,
      },
      {
        id: 275,
        video: MI276,
        duration: 155000,
        name: "Inlet Duct",
        top: 239,
        left: 1215,
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
    ["exhaust-section"]: [
      {
        id: 0,
        video: TIExhaustSection1,
        duration: 155000,
        name: "Exhaust Manifold",
        top: 237,
        left: 910,
      },
      {
        id: 1,
        video: TIExhaustSection2,
        duration: 155000,
        name: "OST Pipe",
        top: 238,
        left: 1110,
      },
      {
        id: 2,
        video: TIExhaustSection3,
        duration: 155000,
        name: "OST Cover",
        top: 242,
        left: 850,
      },
      {
        id: 3,
        video: TIExhaustSection4,
        duration: 155000,
        name: "OST Device",
        top: 240,
        left: 830,
      },
      {
        id: 4,
        video: TIExhaustSection5,
        duration: 155000,
        name: "Exhaust Cylinder",
        top: 238,
        left: 1170,
      },
      {
        id: 5,
        video: TIExhaustSection6,
        duration: 155000,
        name: "Upper Bearing 1",
        top: 238,
        left: 810,
      },
      {
        id: 6,
        video: TIExhaustSection7,
        duration: 155000,
        name: "",
        top: 0,
        left: 0,
      },
      {
        id: 7,
        video: TIExhaustSection8,
        duration: 155000,
        name: "Upper Bearing 1",
        top: 238,
        left: 810,
      },
      {
        id: 8,
        video: TIExhaustSection9,
        duration: 155000,
        name: "Exhaust Cylinder",
        top: 238,
        left: 590,
      },
      {
        id: 9,
        video: TIExhaustSection10,
        duration: 155000,
        name: "OST Device",
        top: 240,
        left: 830,
      },
      {
        id: 10,
        video: TIExhaustSection11,
        duration: 155000,
        name: "OST Cover",
        top: 242,
        left: 850,
      },
      {
        id: 11,
        video: TIExhaustSection12,
        duration: 155000,
        name: "OST Pipe",
        top: 238,
        left: 1110,
      },
      {
        id: 12,
        video: TIExhaustSection13,
        duration: 155000,
        name: "Exhaust Manifold",
        top: 238,
        left: 910,
      },
    ],
    ["inlet-section"]: [
      {
        id: 0,
        video: TIInletSection1,
        duration: 155000,
        name: "Inlet Duct",
        top: 237,
        left: 555,
      },
      {
        id: 1,
        video: TIInletSection2,
        duration: 155000,
        name: "Inlet Manifold",
        top: 240,
        left: 520,
      },
      {
        id: 2,
        video: TIInletSection3,
        duration: 155000,
        name: "Vapour Pipe",
        top: 239,
        left: 700,
      },
      {
        id: 3,
        video: TIInletSection4,
        duration: 155000,
        name: "Casing Upper",
        top: 235,
        left: 1000,
      },
      {
        id: 4,
        video: TIInletSection5,
        duration: 155000,
        name: "IGV Link",
        top: 232,
        left: 810,
      },
      {
        id: 5,
        video: TIInletSection6,
        duration: 155000,
        name: "Seal Housing Upper",
        top: 236,
        left: 510,
      },
      {
        id: 6,
        video: TIInletSection7,
        duration: 155000,
        name: "IGV Upper",
        top: 236,
        left: 570,
      },
      {
        id: 7,
        video: TIInletSection8,
        duration: 155000,
        name: "",
        top: 0,
        left: 0,
      },
      {
        id: 8,
        video: TIInletSection9,
        duration: 155000,
        name: "IGV Upper",
        top: 232,
        left: 800,
      },
      {
        id: 9,
        video: TIInletSection10,
        duration: 155000,
        name: "Seal Housing Upper",
        top: 236,
        left: 560,
      },
      {
        id: 10,
        video: TIInletSection11,
        duration: 155000,
        name: "IGV Link",
        top: 233,
        left: 810,
      },
      {
        id: 11,
        video: TIInletSection12,
        duration: 155000,
        name: "Casing Upper",
        top: 240,
        left: 980,
      },
      {
        id: 12,
        video: TIInletSection13,
        duration: 155000,
        name: "Vapour Pipe",
        top: 241,
        left: 670,
      },
      {
        id: 13,
        video: TIInletSection14,
        duration: 155000,
        name: "Inlet Manifold",
        top: 238,
        left: 585,
      },
      {
        id: 14,
        video: TIInletSection15,
        duration: 155000,
        name: "Inlet Duct",
        top: 237,
        left: 560,
      },
    ],
    ["turbine-section"]: [
      {
        id: 0,
        video: TITurbineSection1,
        duration: 155000,
        name: "Blade Row 4",
        top: 238,
        left: 900,
      },
      {
        id: 1,
        video: TITurbineSection2,
        duration: 155000,
        name: "Ring Segment Row 4 Upper",
        top: 240,
        left: 630,
      },
      {
        id: 2,
        video: TITurbineSection3,
        duration: 155000,
        name: "Vane Segment Row 4 Upper",
        top: 240,
        left: 780,
      },
      {
        id: 3,
        video: TITurbineSection4,
        duration: 155000,
        name: "",
        top: 0,
        left: 0,
      },
      {
        id: 4,
        video: TITurbineSection5,
        duration: 155000,
        name: "Vane Segment Row 4 Upper",
        top: 240,
        left: 780,
      },
      {
        id: 5,
        video: TITurbineSection6,
        duration: 155000,
        name: "Ring Segment Row 4 Upper",
        top: 240,
        left: 630,
      },
      {
        id: 6,
        video: TITurbineSection7,
        duration: 155000,
        name: "Seal Housing Row 4 Lower",
        top: 241,
        left: 1140,
      },
      {
        id: 7,
        video: TITurbineSection8,
        duration: 155000,
        name: "Ring Segment Row 4 Lower",
        top: 240,
        left: 750,
      },
      {
        id: 8,
        video: TITurbineSection9,
        duration: 155000,
        name: "Vane Segment Row 4 Lower",
        top: 240,
        left: 940,
      },
      {
        id: 9,
        video: TITurbineSection10,
        duration: 155000,
        name: "",
        top: 0,
        left: 0,
      },
      {
        id: 10,
        video: TITurbineSection11,
        duration: 155000,
        name: "Vane Segment Row 4 Lower",
        top: 241,
        left: 940,
      },
      {
        id: 11,
        video: TITurbineSection12,
        duration: 155000,
        name: "Ring Segment Row 4 Lower",
        top: 240,
        left: 750,
      },
      {
        id: 12,
        video: TITurbineSection13,
        duration: 155000,
        name: "Seal Housing Row 4 Lower",
        top: 241,
        left: 1140,
      },
      {
        id: 13,
        video: TITurbineSection14,
        duration: 155000,
        name: "Blade Row 4",
        top: 238,
        left: 900,
      },
    ],
    ["compressor-section"]: [
      {
        id: 0,
        video: TIInletSection1,
        duration: 155000,
        name: "Inlet Duct",
        top: 237,
        left: 555,
      },
      {
        id: 1,
        video: TIInletSection2,
        duration: 155000,
        name: "Inlet Manifold",
        top: 240,
        left: 520,
      },
      {
        id: 2,
        video: TIInletSection3,
        duration: 155000,
        name: "Vapour Pipe",
        top: 239,
        left: 700,
      },
      {
        id: 3,
        video: TIInletSection4,
        duration: 155000,
        name: "Casing Upper",
        top: 235,
        left: 1000,
      },
      {
        id: 4,
        video: TIInletSection5,
        duration: 155000,
        name: "IGV Link",
        top: 232,
        left: 810,
      },
      {
        id: 5,
        video: CICompressorSection6,
        duration: 155000,
        name: "Seal Housing Upper",
        top: 235,
        left: 510,
      },
      {
        id: 6,
        video: CICompressorSection7,
        duration: 155000,
        name: "IGV Upper",
        top: 235,
        left: 570,
      },
      {
        id: 7,
        video: TICompressorSection8,
        duration: 155000,
        name: "Fuel Manifold",
        top: 238,
        left: 1220,
      },
      {
        id: 8,
        video: TICompressorSection9,
        duration: 155000,
        name: "Bleed Pipe",
        top: 237,
        left: 1080,
      },
      {
        id: 9,
        video: TICompressorSection10,
        duration: 155000,
        name: "RCA Pipe",
        top: 237,
        left: 1080,
      },
      {
        id: 10,
        video: TICompressorSection11,
        duration: 155000,
        name: "Compressor Cylinder",
        top: 237,
        left: 1080,
      },
      {
        id: 11,
        video: TICompressorSection12,
        duration: 155000,
        name: "Compressor Vane Row 1 Lower",
        top: 237,
        left: 545,
      },
      {
        id: 12,
        video: CICompressorSection13,
        duration: 155000,
        name: "Compressor Vane Row 2 Lower",
        top: 238,
        left: 730,
      },
      {
        id: 13,
        video: CICompressorSection14,
        duration: 155000,
        name: "Compressor Vane Row 3 Lower",
        top: 235,
        left: 470,
      },
      {
        id: 14,
        video: CICompressorSection15,
        duration: 155000,
        name: "Compressor Vane Row 4 Lower",
        top: 235,
        left: 360,
      },
      {
        id: 15,
        video: CICompressorSection16,
        duration: 155000,
        name: "Compressor Vane Row 5 Lower",
        top: 238,
        left: 360,
      },
      {
        id: 16,
        video: CICompressorSection17,
        duration: 155000,
        name: "Compressor Vane Row 6 Lower",
        top: 235,
        left: 265,
      },
      {
        id: 17,
        video: CICompressorSection18,
        duration: 155000,
        name: "Compressor Vane Row 1 Upper",
        top: 237,
        left: 780,
      },
      {
        id: 18,
        video: CICompressorSection19,
        duration: 155000,
        name: "Compressor Vane Row 2 Upper",
        top: 235,
        left: 410,
      },
      {
        id: 19,
        video: CICompressorSection20,
        duration: 155000,
        name: "Compressor Vane Row 3 Upper",
        top: 235,
        left: 420,
      },
      {
        id: 20,
        video: CICompressorSection21,
        duration: 155000,
        name: "Compressor Vane Row 4 Upper",
        top: 235,
        left: 435,
      },
      {
        id: 21,
        video: CICompressorSection22,
        duration: 155000,
        name: "Compressor Vane Row 5 Upper",
        top: 225,
        left: 520,
      },
      {
        id: 22,
        video: CICompressorSection23,
        duration: 155000,
        name: "Compressor Vane Row 6 Upper",
        top: 236,
        left: 540,
      },
      {
        id: 23,
        video: CICompressorSection24,
        duration: 155000,
        name: "Compressor Blade Row 1",
        top: 233,
        left: 620,
      },
      {
        id: 24,
        video: CICompressorSection25,
        duration: 155000,
        name: "Compressor Blade Row 2",
        top: 237,
        left: 560,
      },
      {
        id: 25,
        video: CICompressorSection26,
        duration: 155000,
        name: "Compressor Blade Row 3",
        top: 236,
        left: 480,
      },
      {
        id: 26,
        video: CICompressorSection27,
        duration: 155000,
        name: "Compressor Blade Row 4",
        top: 233,
        left: 480,
      },
      {
        id: 27,
        video: CICompressorSection28,
        duration: 155000,
        name: "Compressor Blade Row 5",
        top: 235,
        left: 390,
      },
      {
        id: 28,
        video: CICompressorSection29,
        duration: 155000,
        name: "Compressor Blade Row 6",
        top: 235,
        left: 295,
      },
      {
        id: 29,
        video: CICompressorSection30,
        duration: 155000,
        name: "",
        top: 0,
        left: 0,
      },
      {
        id: 30,
        video: CICompressorSection31,
        duration: 155000,
        name: "Compressor Blade Row 6",
        top: 235,
        left: 290,
      },
      {
        id: 31,
        video: CICompressorSection32,
        duration: 155000,
        name: "Compressor Blade Row 5",
        top: 235,
        left: 380,
      },
      {
        id: 32,
        video: CICompressorSection33,
        duration: 155000,
        name: "Compressor Blade Row 4",
        top: 233,
        left: 480,
      },
      {
        id: 33,
        video: CICompressorSection34,
        duration: 155000,
        name: "Compressor Blade Row 3",
        top: 237,
        left: 480,
      },
      {
        id: 34,
        video: CICompressorSection35,
        duration: 155000,
        name: "Compressor Blade Row 2",
        top: 236,
        left: 560,
      },
      {
        id: 35,
        video: CICompressorSection36,
        duration: 155000,
        name: "Compressor Blade Row 1",
        top: 233,
        left: 620,
      },
      {
        id: 36,
        video: CICompressorSection37,
        duration: 155000,
        name: "Compressor Vane Row 1 Upper",
        top: 242,
        left: 350,
      },
      {
        id: 37,
        video: CICompressorSection38,
        duration: 155000,
        name: "Compressor Vane Row 2 Upper",
        top: 238,
        left: 350,
      },
      {
        id: 38,
        video: CICompressorSection39,
        duration: 155000,
        name: "Compressor Vane Row 3 Upper",
        top: 237,
        left: 380,
      },
      {
        id: 39,
        video: CICompressorSection40,
        duration: 155000,
        name: "Compressor Vane Row 4 Upper",
        top: 238,
        left: 1050,
      },
      {
        id: 40,
        video: CICompressorSection41,
        duration: 155000,
        name: "Compressor Vane Row 5 Upper",
        top: 237,
        left: 1090,
      },
      {
        id: 41,
        video: CICompressorSection42,
        duration: 155000,
        name: "Compressor Vane Row 6 Upper",
        top: 237,
        left: 550,
      },
      {
        id: 42,
        video: CICompressorSection43,
        duration: 155000,
        name: "Compressor Vane Row 1 Lower",
        top: 240,
        left: 730,
      },
      {
        id: 43,
        video: CICompressorSection44,
        duration: 155000,
        name: "Compressor Vane Row 2 Lower",
        top: 240,
        left: 580,
      },
      {
        id: 44,
        video: CICompressorSection45,
        duration: 155000,
        name: "Compressor Vane Row 3 Lower",
        top: 233,
        left: 470,
      },
      {
        id: 45,
        video: CICompressorSection46,
        duration: 155000,
        name: "Compressor Vane Row 4 Lower",
        top: 232,
        left: 1010,
      },
      {
        id: 46,
        video: CICompressorSection47,
        duration: 155000,
        name: "Compressor Vane Row 5 Lower",
        top: 237,
        left: 910,
      },
      {
        id: 47,
        video: CICompressorSection48,
        duration: 155000,
        name: "Compressor Vane Row 6 Lower",
        top: 237,
        left: 720,
      },
      {
        id: 48,
        video: TICompressorSection49,
        duration: 155000,
        name: "Compressor Cylinder",
        top: 236,
        left: 1070,
      },
      {
        id: 49,
        video: TICompressorSection50,
        duration: 155000,
        name: "RCA Pipe",
        top: 235,
        left: 1070,
      },
      {
        id: 50,
        video: TICompressorSection51,
        duration: 155000,
        name: "Bleed Pipe",
        top: 235,
        left: 1000,
      },
      {
        id: 51,
        video: TICompressorSection52,
        duration: 155000,
        name: "Fuel Manifold",
        top: 235,
        left: 1000,
      },
      {
        id: 52,
        video: TIInletSection9,
        duration: 155000,
        name: "IGV Upper",
        top: 232,
        left: 800,
      },
      {
        id: 53,
        video: CICompressorSection54,
        duration: 155000,
        name: "Seal Housing",
        top: 236,
        left: 560,
      },
      {
        id: 54,
        video: CICompressorSection55,
        duration: 155000,
        name: "IGV Link",
        top: 233,
        left: 810,
      },
      {
        id: 55,
        video: TIInletSection12,
        duration: 155000,
        name: "Casing Upper",
        top: 240,
        left: 980,
      },
      {
        id: 56,
        video: TIInletSection13,
        duration: 155000,
        name: "Vapour Pipe",
        top: 241,
        left: 670,
      },
      {
        id: 57,
        video: TIInletSection14,
        duration: 155000,
        name: "Inlet Manifold",
        top: 238,
        left: 585,
      },
      {
        id: 58,
        video: TIInletSection15,
        duration: 155000,
        name: "Inlet Duct",
        top: 237,
        left: 560,
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
          `/${route.params.id}/create/unit/${route.params.id_unit}/${route.params.menu}/${route?.params?.id_project}/add-scope-squences`
        );
      } else {
        router.push(
          `/${route.params.id}/create/unit/${route.params.id_unit}/add-scope`
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
        `/${route.params.id}/create/unit/${route.params.id_unit}/${route.params.menu}/add-scope-squences/${route.params.section}/result`
      );
    } else {
      router.push(
        `/${route.params.id}/create/unit/${route.params.id_unit}/add-scope/${route.params.section}/result`
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
  //     name: convertToOriginalFormat(route.params.id_unit as string),
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
            <li
              v-for="(item, key) in videos"
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

<style lang="sass"></style>
