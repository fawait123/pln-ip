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

// // VIDEO CI
// import CI1 from "@/assets/videos/combustion-inspection/1-manhole-turbine-cylinder.mp4";
// import CI2 from "@/assets/videos/combustion-inspection/2-flame-detector.mp4";
// import CI3 from "@/assets/videos/combustion-inspection/3-flame-igniter.mp4";
// import CI4 from "@/assets/videos/combustion-inspection/4-discavity-temperature.mp4";
// import CI5 from "@/assets/videos/combustion-inspection/5-black-patch-temperature.mp4";
// import CI6 from "@/assets/videos/combustion-inspection/6-fuel-branch-pipe.mp4";
// import CI7 from "@/assets/videos/combustion-inspection/7-cross-flame-tube.mp4";
// import CI8 from "@/assets/videos/combustion-inspection/8-top-hat.mp4";
// import CI9 from "@/assets/videos/combustion-inspection/9-fuel-nozzle.mp4";
// import CI10 from "@/assets/videos/combustion-inspection/10-combuster-basket.mp4";
// import CI11 from "@/assets/videos/combustion-inspection/11-top-hat.mp4";
// import CI12 from "@/assets/videos/combustion-inspection/12-u-support.mp4";
// import CI13 from "@/assets/videos/combustion-inspection/13-bypass-elbow.mp4";
// import CI14 from "@/assets/videos/combustion-inspection/14-transition-piece.mp4";
// import CI15 from "@/assets/videos/combustion-inspection/15.mp4";
// import CI16 from "@/assets/videos/combustion-inspection/16-transition-piece.mp4";
// import CI17 from "@/assets/videos/combustion-inspection/17-u-support.mp4";
// import CI18 from "@/assets/videos/combustion-inspection/18-bypass-elbow.mp4";
// import CI19 from "@/assets/videos/combustion-inspection/19-top-hat.mp4";
// import CI20 from "@/assets/videos/combustion-inspection/20-cross-flame-tube.mp4";
// import CI21 from "@/assets/videos/combustion-inspection/21-flame-detector.mp4";
// import CI22 from "@/assets/videos/combustion-inspection/22-manhole-turbine.mp4";
// import CI23 from "@/assets/videos/combustion-inspection/23-discavity-temperature.mp4";
// import CI24 from "@/assets/videos/combustion-inspection/24-black-patch-temperature.mp4";
// import CI25 from "@/assets/videos/combustion-inspection/25-fuel-branch-pipe.mp4";
// import CI26 from "@/assets/videos/combustion-inspection/26-flame-igniter.mp4";
// import CI27 from "@/assets/videos/combustion-inspection/27.mp4";

// // VIDEO MI
// import MI1 from "@/assets/videos/major-inspection/1-manhole-turbine-cylinder.mp4";
// import MI2 from "@/assets/videos/major-inspection/2-inlet-duct.mp4";
// import MI3 from "@/assets/videos/major-inspection/3-inlet-manifold.mp4";
// import MI4 from "@/assets/videos/major-inspection/4-cover-coupling.mp4";
// import MI5 from "@/assets/videos/major-inspection/5-vapor-pipe.mp4";
// import MI6 from "@/assets/videos/major-inspection/6-coupling-bolt.mp4";
// import MI7 from "@/assets/videos/major-inspection/7-coupling-spacer.mp4";
// import MI8 from "@/assets/videos/major-inspection/8-black-patch-temperature.mp4";
// import MI9 from "@/assets/videos/major-inspection/9-discavity.mp4";
// import MI10 from "@/assets/videos/major-inspection/10-flame-detector.mp4";
// import MI11 from "@/assets/videos/major-inspection/11-flame-igniter.mp4";
// import MI12 from "@/assets/videos/major-inspection/12-cross-flame.mp4";
// import MI13 from "@/assets/videos/major-inspection/13-cooling-pipe.mp4";
// import MI14 from "@/assets/videos/major-inspection/14-fuel-branch-pipe.mp4";
// import MI15 from "@/assets/videos/major-inspection/15-rca-pipe.mp4";
// import MI16 from "@/assets/videos/major-inspection/16-bleed-pipe.mp4";
// import MI17 from "@/assets/videos/major-inspection/17-exhaust-manifold.mp4";
// import MI18 from "@/assets/videos/major-inspection/18-top-hat.mp4";
// import MI19 from "@/assets/videos/major-inspection/19-fuel-nozzle.mp4";
// import MI20 from "@/assets/videos/major-inspection/20-combustor-basket.mp4";
// import MI21 from "@/assets/videos/major-inspection/21-top-hat.mp4";
// import MI22 from "@/assets/videos/major-inspection/22-combustor-basket.mp4";
// import MI23 from "@/assets/videos/major-inspection/23-fuel-nozzle.mp4";
// import MI24 from "@/assets/videos/major-inspection/24-turbine-cylinder.mp4";
// import MI25 from "@/assets/videos/major-inspection/25-bypass-elbow.mp4";
// import MI26 from "@/assets/videos/major-inspection/26-transition-piece.mp4";
// import MI27 from "@/assets/videos/major-inspection/27-u-support.mp4";
// import MI28 from "@/assets/videos/major-inspection/28-bypass-ring.mp4";
// import MI29 from "@/assets/videos/major-inspection/29-turbine-vane-row-1.mp4";
// import MI30 from "@/assets/videos/major-inspection/30-turbine-blade-ring-row-4.mp4";
// import MI31 from "@/assets/videos/major-inspection/31-turbine-blade-ring-row-3.mp4";
// import MI32 from "@/assets/videos/major-inspection/32-turbine-blade-ring-row-2.mp4";
// import MI33 from "@/assets/videos/major-inspection/33-turbine-blade-ring-row-1.mp4";
// import MI34 from "@/assets/videos/major-inspection/34-turbine-seal-housing-row-2.mp4";
// import MI35 from "@/assets/videos/major-inspection/35-turbine-seal-housing-row-3.mp4";
// import MI36 from "@/assets/videos/major-inspection/36-turbine-seal-housing-row-4.mp4";
// import MI37 from "@/assets/videos/major-inspection/37-rca-flexible-pipe-upper.mp4";
// import MI38 from "@/assets/videos/major-inspection/38-compressor-comb-cylinder-upper.mp4";
// import MI39 from "@/assets/videos/major-inspection/39-compressor-blade-ring-row-1-upper.mp4";
// import MI40 from "@/assets/videos/major-inspection/40-compressor-blade-ring-row-2-upper.mp4";
// import MI41 from "@/assets/videos/major-inspection/41-compressor-blade-ring-row-3-upper.mp4";
// import MI42 from "@/assets/videos/major-inspection/42-inlet-casing-upper.mp4";
// import MI43 from "@/assets/videos/major-inspection/43-exhaust-manifold-upper.mp4";
// import MI44 from "@/assets/videos/major-inspection/44-torque-tube-cover-upper.mp4";
// import MI45 from "@/assets/videos/major-inspection/45-seal-housing-torque-tube-cover-upper.mp4";
// import MI46 from "@/assets/videos/major-inspection/46-ost-pipe.mp4";
// import MI47 from "@/assets/videos/major-inspection/47-ost-cover.mp4";
// import MI48 from "@/assets/videos/major-inspection/48-exhaust-cylinder-upper.mp4";
// import MI49 from "@/assets/videos/major-inspection/49-thrust-bearing-cover.mp4";
// import MI50 from "@/assets/videos/major-inspection/50-thrust-bearing-upper.mp4";
// import MI51 from "@/assets/videos/major-inspection/51-thrust-bearing-lower.mp4";
// import MI52 from "@/assets/videos/major-inspection/52-bearing-2-upper.mp4";
// import MI53 from "@/assets/videos/major-inspection/53-bearing-1-upper.mp4";
// import MI54 from "@/assets/videos/major-inspection/54-ost-device.mp4";
// import MI55 from "@/assets/videos/major-inspection/55-turbine-compressor-rotor.mp4";
// import MI56 from "@/assets/videos/major-inspection/56-bearing-2-lower.mp4";
// import MI57 from "@/assets/videos/major-inspection/57-bearing-1-lower.mp4";
// import MI58 from "@/assets/videos/major-inspection/58-turbine-blade-ring-row-2-lower.mp4";
// import MI59 from "@/assets/videos/major-inspection/59-turbine-blade-ring-row-3-lower.mp4";
// import MI60 from "@/assets/videos/major-inspection/60-turbine-blade-ring-row-1-lower.mp4";
// import MI61 from "@/assets/videos/major-inspection/61-turbine-blade-ring-row-4-lower.mp4";
// import MI62 from "@/assets/videos/major-inspection/62-seal-housing-torque-cover-lower.mp4";
// import MI63 from "@/assets/videos/major-inspection/63-compressor-diaphragm-row-1-lower.mp4";
// import MI64 from "@/assets/videos/major-inspection/64-compressor-diaphragm-row-2-lower.mp4";
// import MI65 from "@/assets/videos/major-inspection/65-compressor-diaphragm-row-3-lower.mp4";
// import MI66 from "@/assets/videos/major-inspection/66-compressor-diaphragm-row-4-lower.mp4";
// import MI67 from "@/assets/videos/major-inspection/67-compressor-vane-row-5-lower.mp4";
// import MI68 from "@/assets/videos/major-inspection/68-compressor-vane-row-6-lower.mp4";
// import MI69 from "@/assets/videos/major-inspection/69-compressor-blade-ring-row-1-lower.mp4";
// import MI70 from "@/assets/videos/major-inspection/70-compressor-blade-ring-row-2-lower.mp4";
// import MI71 from "@/assets/videos/major-inspection/71-compressor-blade-ring-row-3-lower.mp4";
// import MI72 from "@/assets/videos/major-inspection/72-inlet-seal-housing-lower.mp4";
// import MI73 from "@/assets/videos/major-inspection/73-igv-link-lower.mp4";
// import MI74 from "@/assets/videos/major-inspection/74-igv-lower.mp4";
// import MI75 from "@/assets/videos/major-inspection/75-turbine-ring-segment-row-1-upper.mp4";
// import MI111 from "@/assets/videos/add-scope/ti/turbine-section/8-turbine-ring-segment-row-4-lower.mp4";
// import MI112 from "@/assets/videos/add-scope/ti/turbine-section/9-turbine-vane-segment-row-4-lower.mp4";
// import MI113 from "@/assets/videos/add-scope/ti/turbine-section/10.mp4";
// import MI114 from "@/assets/videos/add-scope/ti/turbine-section/11-turbine-vane-segment-row-4-lower.mp4";
// import MI115 from "@/assets/videos/add-scope/ti/turbine-section/12-turbine-ring-segment-row-4-lower.mp4";
// import MI116 from "@/assets/videos/add-scope/ti/turbine-section/13-turbine-seal-housing-row-4-lower.mp4";
// import MI117 from "@/assets/videos/major-inspection/117-compressor-diaphragm-row-1-upper.mp4";
// import MI118 from "@/assets/videos/major-inspection/118-compressor-diaphragm-row-2-upper.mp4";
// import MI119 from "@/assets/videos/major-inspection/119-compressor-diaphragm-row-3-upper.mp4";
// import MI120 from "@/assets/videos/major-inspection/120-compressor-diaphragm-row-4-upper.mp4";
// import MI121 from "@/assets/videos/major-inspection/121-compressor-diaphragm-row-5-upper.mp4";
// import MI122 from "@/assets/videos/major-inspection/122-compressor-diaphragm-row-6-upper.mp4";
// import MI123 from "@/assets/videos/major-inspection/123-compressor-diaphragm-row-1-upper.mp4";
// import MI124 from "@/assets/videos/major-inspection/124-compressor-diaphragm-row-2-upper.mp4";
// import MI125 from "@/assets/videos/major-inspection/125-compressor-diaphragm-row-3-upper.mp4";
// import MI126 from "@/assets/videos/major-inspection/126-compressor-diaphragm-row-4-upper.mp4";
// import MI127 from "@/assets/videos/major-inspection/127-compressor-diaphragm-row-5-upper.mp4";
// import MI128 from "@/assets/videos/major-inspection/128-compressor-diaphragm-row-6-upper.mp4";
// import MI129 from "@/assets/videos/major-inspection/129-compressor-diaphragm-row-15-lower.mp4";
// import MI130 from "@/assets/videos/major-inspection/130-compressor-diaphragm-row-16-lower.mp4";
// import MI131 from "@/assets/videos/major-inspection/131-ogv-lower.mp4";
// import MI132 from "@/assets/videos/major-inspection/132.mp4";
// import MI133 from "@/assets/videos/major-inspection/133-ogv-lower.mp4";
// import MI134 from "@/assets/videos/major-inspection/134-compressor-diaphragm-row-17-lower.mp4";
// import MI135 from "@/assets/videos/major-inspection/135-compressor-diaphragm-row-16-lower.mp4";
// import MI136 from "@/assets/videos/major-inspection/136-compressor-diaphragm-row-15-lower.mp4";
// import MI137 from "@/assets/videos/major-inspection/137-compressor-diaphragm-row-14-lower.mp4";
// import MI138 from "@/assets/videos/major-inspection/138-compressor-diaphragm-row-13-lower.mp4";
// import MI139 from "@/assets/videos/major-inspection/139-compressor-diaphragm-row-12-lower.mp4";
// import MI140 from "@/assets/videos/major-inspection/140.mp4";
// import MI141 from "@/assets/videos/major-inspection/141-compressor-diaphragm-row-12-lower.mp4";
// import MI142 from "@/assets/videos/major-inspection/142-compressor-diaphragm-row-13-lower.mp4";
// import MI143 from "@/assets/videos/major-inspection/143-compressor-diaphragm-row-12-lower.mp4";
// import MI144 from "@/assets/videos/major-inspection/144-compressor-diaphragm-row-11-lower.mp4";
// import MI145 from "@/assets/videos/major-inspection/145-compressor-diaphragm-row-10-lower.mp4";
// import MI146 from "@/assets/videos/major-inspection/146-compressor-diaphragm-row-9-lower.mp4";
// import MI147 from "@/assets/videos/major-inspection/147-compressor-diaphragm-row-8-lower.mp4";
// import MI148 from "@/assets/videos/major-inspection/148-compressor-diaphragm-row-7-lower.mp4";
// import MI149 from "@/assets/videos/major-inspection/149.mp4";
// import MI150 from "@/assets/videos/major-inspection/150-compressor-diaphragm-row-7-lower.mp4";
// import MI151 from "@/assets/videos/major-inspection/151-compressor-diaphragm-row-8-lower.mp4";
// import MI152 from "@/assets/videos/major-inspection/152-compressor-diaphragm-row-9-lower.mp4";
// import MI153 from "@/assets/videos/major-inspection/153-compressor-diaphragm-row-10-lower.mp4";
// import MI154 from "@/assets/videos/major-inspection/154-compressor-diaphragm-row-11-lower.mp4";
// import MI155 from "@/assets/videos/major-inspection/155-compressor-diaphragm-row-15-upper.mp4";
// import MI156 from "@/assets/videos/major-inspection/156-compressor-diaphragm-row-16-upper.mp4";
// import MI157 from "@/assets/videos/major-inspection/157-compressor-diaphragm-row-17-upper.mp4";
// import MI158 from "@/assets/videos/major-inspection/158-ogv-upper.mp4";
// import MI159 from "@/assets/videos/major-inspection/159.mp4";
// import MI160 from "@/assets/videos/major-inspection/160-ogv-upper.mp4";
// import MI161 from "@/assets/videos/major-inspection/161-compressor-diaphragm-row-17-upper.mp4";
// import MI162 from "@/assets/videos/major-inspection/162-compressor-diaphragm-row-16-upper.mp4";
// import MI163 from "@/assets/videos/major-inspection/163-compressor-diaphragm-row-14-upper.mp4";
// import MI164 from "@/assets/videos/major-inspection/164-compressor-diaphragm-row-13-upper.mp4";
// import MI165 from "@/assets/videos/major-inspection/165-compressor-diaphragm-row-12-upper.mp4";
// import MI166 from "@/assets/videos/major-inspection/166.mp4";
// import MI167 from "@/assets/videos/major-inspection/167-compressor-diaphragm-row-12-upper.mp4";
// import MI168 from "@/assets/videos/major-inspection/168-compressor-diaphragm-row-13-upper.mp4";
// import MI169 from "@/assets/videos/major-inspection/169-compressor-diaphragm-row-14-upper.mp4";
// import MI170 from "@/assets/videos/major-inspection/170-compressor-diaphragm-row-11-upper.mp4";
// import MI171 from "@/assets/videos/major-inspection/171-compressor-diaphragm-row-10-upper.mp4";
// import MI172 from "@/assets/videos/major-inspection/172-compressor-diaphragm-row-9-upper.mp4";
// import MI173 from "@/assets/videos/major-inspection/173-compressor-diaphragm-row-8-upper.mp4";
// import MI174 from "@/assets/videos/major-inspection/174-compressor-diaphragm-row-7-upper.mp4";
// import MI175 from "@/assets/videos/major-inspection/175.mp4";
// import MI176 from "@/assets/videos/major-inspection/176-compressor-diaphragm-row-7-upper.mp4";
// import MI177 from "@/assets/videos/major-inspection/177-compressor-diaphragm-row-8-upper.mp4";
// import MI178 from "@/assets/videos/major-inspection/178-compressor-diaphragm-row-9-upper.mp4";
// import MI179 from "@/assets/videos/major-inspection/179-compressor-diaphragm-row-10-upper.mp4";
// import MI180 from "@/assets/videos/major-inspection/180-compressor-diaphragm-row-11-upper.mp4";
// import MI181 from "@/assets/videos/major-inspection/181-igv-link.mp4";
// import MI182 from "@/assets/videos/add-scope/ci/compressor-section/6-seal-housing-upper.mp4";
// import MI183 from "@/assets/videos/add-scope/ci/compressor-section/7-igv-upper.mp4";
// import MI184 from "@/assets/videos/add-scope/ci/compressor-section/54-seal-housing.mp4";
// import MI185 from "@/assets/videos/add-scope/ci/compressor-section/55-igv-link.mp4";
// import MI186 from "@/assets/videos/major-inspection/186-turbine-blade-row-4.mp4";
// import MI187 from "@/assets/videos/major-inspection/187-turbine-blade-row-3.mp4";
// import MI188 from "@/assets/videos/major-inspection/188-turbine-blade-row-2.mp4";
// import MI189 from "@/assets/videos/major-inspection/189-turbine-blade-row-1.mp4";
// import MI190 from "@/assets/videos/major-inspection/190-turbine-blade-row-4.mp4";
// import MI191 from "@/assets/videos/major-inspection/191-turbine-blade-row-3.mp4";
// import MI192 from "@/assets/videos/major-inspection/192-turbine-blade-row-2.mp4";
// import MI193 from "@/assets/videos/major-inspection/193-turbine-blade-row-1.mp4";
// import MI194 from "@/assets/videos/major-inspection/194-compressor-blade-row-1.mp4";
// import MI195 from "@/assets/videos/major-inspection/195-compressor-blade-row-2.mp4";
// import MI196 from "@/assets/videos/major-inspection/196-compressor-blade-row-3.mp4";
// import MI197 from "@/assets/videos/major-inspection/197-compressor-blade-row-4.mp4";
// import MI198 from "@/assets/videos/major-inspection/198-compressor-blade-row-5.mp4";
// import MI199 from "@/assets/videos/major-inspection/199-compressor-blade-row-6.mp4";
// import MI200 from "@/assets/videos/major-inspection/200.mp4";
// import MI201 from "@/assets/videos/major-inspection/201-compressor-blade-row-6.mp4";
// import MI202 from "@/assets/videos/major-inspection/202-compressor-blade-row-5.mp4";
// import MI203 from "@/assets/videos/major-inspection/203-compressor-blade-row-4.mp4";
// import MI204 from "@/assets/videos/major-inspection/204-compressor-blade-row-3.mp4";
// import MI205 from "@/assets/videos/major-inspection/205-compressor-blade-row-2.mp4";
// import MI206 from "@/assets/videos/major-inspection/206-compressor-blade-row-1.mp4";
// import MI207 from "@/assets/videos/major-inspection/207-igv-lower.mp4";
// import MI208 from "@/assets/videos/major-inspection/208-igv-link-lower.mp4";
// import MI209 from "@/assets/videos/major-inspection/209-inlet-seal-housing-lower.mp4";
// import MI210 from "@/assets/videos/major-inspection/210-compressor-diaphragm-row-6-lower.mp4";
// import MI211 from "@/assets/videos/major-inspection/211-compressor-diaphragm-row-5-lower.mp4";
// import MI212 from "@/assets/videos/major-inspection/212-compressor-diaphragm-row-4-lower.mp4";
// import MI213 from "@/assets/videos/major-inspection/213-compressor-diaphragm-row-3-lower.mp4";
// import MI214 from "@/assets/videos/major-inspection/214-compressor-diaphragm-row-2-lower.mp4";
// import MI215 from "@/assets/videos/major-inspection/215-compressor-diaphragm-row-1-lower.mp4";
// import MI216 from "@/assets/videos/major-inspection/216-compressor-blade-ring-row-3-lower.mp4";
// import MI217 from "@/assets/videos/major-inspection/217-compressor-blade-ring-row-2-lower.mp4";
// import MI218 from "@/assets/videos/major-inspection/218-compressor-blade-ring-row-1-lower.mp4";
// import MI219 from "@/assets/videos/major-inspection/219-seal-housing-torque-tube-cover-lower.mp4";
// import MI220 from "@/assets/videos/major-inspection/220-turbine-blade-ring-row-4-lower.mp4";
// import MI221 from "@/assets/videos/major-inspection/221-turbine-blade-ring-row-1-lower.mp4";
// import MI222 from "@/assets/videos/major-inspection/222-turbine-blade-ring-row-2-lower.mp4";
// import MI223 from "@/assets/videos/major-inspection/223-turbine-blade-ring-row-2-lower.mp4";
// import MI224 from "@/assets/videos/major-inspection/224-bearing-1-lower .mp4";
// import MI225 from "@/assets/videos/major-inspection/225-bearing-2-lower.mp4";
// import MI226 from "@/assets/videos/major-inspection/226-turbine-compressor-rotor.mp4";
// import MI227 from "@/assets/videos/major-inspection/227-bearing-2-upper.mp4";
// import MI228 from "@/assets/videos/major-inspection/228-bearing-1-upper.mp4";
// import MI229 from "@/assets/videos/major-inspection/229-exhaust-cylinder-upper.mp4";
// import MI230 from "@/assets/videos/major-inspection/230-seal-housing-torque-cover-upper.mp4";
// import MI231 from "@/assets/videos/major-inspection/231-inlet-casing-upper.mp4";
// import MI232 from "@/assets/videos/major-inspection/232-torque-tube-cover-upper.mp4";
// import MI233 from "@/assets/videos/major-inspection/233-compressor-blade-ring-row-1-upper.mp4";
// import MI234 from "@/assets/videos/major-inspection/234-compressor-blade-ring-row-2-upper.mp4";
// import MI235 from "@/assets/videos/major-inspection/235-compressor-blade-ring-row-3-upper.mp4";
// import MI236 from "@/assets/videos/major-inspection/236-compressor-comb-cylinder-upper.mp4";
// import MI237 from "@/assets/videos/major-inspection/237-rca-flexible-pipe-upper.mp4";
// import MI238 from "@/assets/videos/major-inspection/238-turbine-seal-housing-row-2-upper.mp4";
// import MI239 from "@/assets/videos/major-inspection/239-turbine-seal-housing-row-3-upper.mp4";
// import MI240 from "@/assets/videos/major-inspection/240-turbine-seal-housing-row-4-upper.mp4";
// import MI241 from "@/assets/videos/major-inspection/241-turbine-blade-ring-row-4-upper.mp4";
// import MI242 from "@/assets/videos/major-inspection/242-turbine-blade-ring-row-3-upper.mp4";
// import MI243 from "@/assets/videos/major-inspection/243-turbine-blade-ring-row-2-upper.mp4";
// import MI244 from "@/assets/videos/major-inspection/244-turbine-blade-ring-row-1-upper.mp4";
// import MI245 from "@/assets/videos/major-inspection/245-turbine-vane-segment-row-1.mp4";
// import MI246 from "@/assets/videos/major-inspection/246-bypass-ring-upper.mp4";
// import MI247 from "@/assets/videos/major-inspection/247-ost-device.mp4";
// import MI248 from "@/assets/videos/major-inspection/248-ost-cover.mp4";
// import MI249 from "@/assets/videos/major-inspection/249-ost-pipe.mp4";
// import MI250 from "@/assets/videos/major-inspection/250-exhaust-manifold-upper.mp4";
// import MI251 from "@/assets/videos/major-inspection/251-u-support.mp4";
// import MI252 from "@/assets/videos/major-inspection/252-transition-piece.mp4";
// import MI253 from "@/assets/videos/major-inspection/253-bypass-elbow.mp4";
// import MI254 from "@/assets/videos/major-inspection/254-turbine-cylinder-upper.mp4";
// import MI255 from "@/assets/videos/major-inspection/255-top-hat.mp4";
// import MI256 from "@/assets/videos/major-inspection/256-cooling-pipe.mp4";
// import MI257 from "@/assets/videos/major-inspection/257-rca-pipe.mp4";
// import MI258 from "@/assets/videos/major-inspection/258-bleed-pipe.mp4";
// import MI259 from "@/assets/videos/major-inspection/259-fuel-gas-manifold.mp4";
// import MI260 from "@/assets/videos/major-inspection/260-fuel-branch-pipe.mp4";
// import MI261 from "@/assets/videos/major-inspection/261-cross-flame-tube.mp4";
// import MI262 from "@/assets/videos/major-inspection/262-flame-detector.mp4";
// import MI263 from "@/assets/videos/major-inspection/263-manhole-turbine-cylinder.mp4";
// import MI264 from "@/assets/videos/major-inspection/264-discavity-temperature.mp4";
// import MI265 from "@/assets/videos/major-inspection/265-black-patch-temperature.mp4";
// import MI266 from "@/assets/videos/major-inspection/266-flame-igniter.mp4";
// import MI267 from "@/assets/videos/major-inspection/267-thrust-bearing-lower.mp4";
// import MI268 from "@/assets/videos/major-inspection/268-thrust-bearing-upper.mp4";
// import MI269 from "@/assets/videos/major-inspection/269-thrust-bearing-cover.mp4";
// import MI270 from "@/assets/videos/major-inspection/270-coupling-spacer.mp4";
// import MI271 from "@/assets/videos/major-inspection/271-coupling-bolt.mp4";
// import MI272 from "@/assets/videos/major-inspection/272-vapour-pipe.mp4";
// import MI273 from "@/assets/videos/major-inspection/273-coupling-cover-lower.mp4";
// import MI274 from "@/assets/videos/major-inspection/274-coupling-cover-upper.mp4";
// import MI275 from "@/assets/videos/major-inspection/275-inlet-manifold.mp4";
// import MI276 from "@/assets/videos/major-inspection/276-inlet-duct.mp4";

// // VIDEO TI
// import TI1 from "@/assets/videos/combustion-inspection/1-manhole-turbine-cylinder.mp4";
// import TI2 from "@/assets/videos/combustion-inspection/2-flame-detector.mp4";
// import TI3 from "@/assets/videos/combustion-inspection/3-flame-igniter.mp4";
// import TI4 from "@/assets/videos/combustion-inspection/4-discavity-temperature.mp4";
// import TI5 from "@/assets/videos/combustion-inspection/5-black-patch-temperature.mp4";
// import TI6 from "@/assets/videos/combustion-inspection/6-fuel-branch-pipe.mp4";
// import TI7 from "@/assets/videos/combustion-inspection/7-cross-flame-tube.mp4";
// import TI8 from "@/assets/videos/combustion-inspection/8-top-hat.mp4";
// import TI9 from "@/assets/videos/combustion-inspection/9-fuel-nozzle.mp4";
// import TI10 from "@/assets/videos/combustion-inspection/10-combuster-basket.mp4";
// import TI11 from "@/assets/videos/combustion-inspection/11-top-hat.mp4";
// import TI12 from "@/assets/videos/turbine-inspection/12-cooling-pipe.mp4";
// import TI13 from "@/assets/videos/turbine-inspection/13-turbine-cylinder.mp4";
// import TI14 from "@/assets/videos/turbine-inspection/14-bypass-elbow.mp4";
// import TI15 from "@/assets/videos/turbine-inspection/15-transition-piece.mp4";
// import TI16 from "@/assets/videos/turbine-inspection/16-u-support.mp4";
// import TI17 from "@/assets/videos/turbine-inspection/17-bypass-ring.mp4";
// import TI18 from "@/assets/videos/turbine-inspection/18-turbine-vane-row-1-upper.mp4";
// import TI19 from "@/assets/videos/turbine-inspection/19-turbine-vane-row-4-upper.mp4";
// import TI20 from "@/assets/videos/turbine-inspection/20-turbine-vane-row-3-upper.mp4";
// import TI21 from "@/assets/videos/turbine-inspection/21-turbine-vane-row-2-upper.mp4";
// import TI22 from "@/assets/videos/turbine-inspection/22-turbine-blade-ring-1.mp4";
// import TI23 from "@/assets/videos/turbine-inspection/23-turbine-seal-housing-row-2.mp4";
// import TI24 from "@/assets/videos/turbine-inspection/24-turbine-seal-housing-row-3.mp4";
// import TI25 from "@/assets/videos/turbine-inspection/25-turbine-seal-housing-row-4-lower.mp4";
// import TI26 from "@/assets/videos/turbine-inspection/26-turbine-blade-ring-row-1-lower.mp4";
// import TI27 from "@/assets/videos/turbine-inspection/27-turbine-blade-ring-row-2-lower.mp4";
// import TI28 from "@/assets/videos/turbine-inspection/28-turbine-blade-ring-row-3-lower.mp4";
// import TI29 from "@/assets/videos/turbine-inspection/29-turbine-blade-ring-row-4-lower.mp4";
// import TI30 from "@/assets/videos/turbine-inspection/30-turbine-blade-row-1.mp4";
// import TI31 from "@/assets/videos/turbine-inspection/31-turbine-blade-row-2.mp4";
// import TI32 from "@/assets/videos/turbine-inspection/32-turbine-blade-row-3.mp4";
// import TI33 from "@/assets/videos/turbine-inspection/33-turbine-ring-segment-row-1-upper.mp4";
// import TI34 from "@/assets/videos/turbine-inspection/34.mp4";
// import TI35 from "@/assets/videos/turbine-inspection/35-turbine-ring-segment-row-1-upper .mp4";
// import TI36 from "@/assets/videos/turbine-inspection/36-turbine-ring-segment-row-2-upper.mp4";
// import TI37 from "@/assets/videos/turbine-inspection/37-turbine-vane-segment-row-2-upper.mp4";
// import TI38 from "@/assets/videos/turbine-inspection/38.mp4";
// import TI39 from "@/assets/videos/turbine-inspection/39-turbine-vane-segment-row-2-upper.mp4";
// import TI40 from "@/assets/videos/turbine-inspection/40-turbine-ring-segment-row-2-upper.mp4";
// import TI41 from "@/assets/videos/turbine-inspection/41-turbine-ring-segment-row-3-upper.mp4";
// import TI42 from "@/assets/videos/turbine-inspection/42-turbine-vane-segment-row-3-upper.mp4";
// import TI43 from "@/assets/videos/turbine-inspection/43.mp4";
// import TI44 from "@/assets/videos/turbine-inspection/44-turbine-vane-segment-row-3-upper.mp4";
// import TI45 from "@/assets/videos/turbine-inspection/45-turbine-ring-segment-row-3-upper.mp4";
// import TI46 from "@/assets/videos/turbine-inspection/46-turbine-ring-segment-row-4-upper.mp4";
// import TI47 from "@/assets/videos/turbine-inspection/47-turbine-vane-segment-row-4-upper.mp4";
// import TI48 from "@/assets/videos/turbine-inspection/48.mp4";
// import TI49 from "@/assets/videos/turbine-inspection/49-turbine-vane-segment-row-4-upper.mp4";
// import TI50 from "@/assets/videos/turbine-inspection/50-turbine-ring-segment-row-4-upper.mp4";
// import TI51 from "@/assets/videos/turbine-inspection/51-turbine-ring-segment-row-1-lower.mp4";
// import TI52 from "@/assets/videos/turbine-inspection/52.mp4";
// import TI53 from "@/assets/videos/turbine-inspection/53-turbine-ring-segment-row-1-lower.mp4";
// import TI54 from "@/assets/videos/turbine-inspection/54-turbine-seal-housing-row-2-lower.mp4";
// import TI55 from "@/assets/videos/turbine-inspection/55-turbine-ring-segment-row-2-lower.mp4";
// import TI56 from "@/assets/videos/turbine-inspection/56-turbine-vane-segment-row-2-lower.mp4";
// import TI57 from "@/assets/videos/turbine-inspection/57.mp4";
// import TI58 from "@/assets/videos/turbine-inspection/58-turbine-vane-segment-row-2-lower.mp4";
// import TI59 from "@/assets/videos/turbine-inspection/59-turbine-ring-segment-row-2-lower.mp4";
// import TI60 from "@/assets/videos/turbine-inspection/60-turbine-seal-housing-row-2-lower.mp4";
// import TI61 from "@/assets/videos/turbine-inspection/61-turbine-seal-housing-row-3-lower.mp4";
// import TI62 from "@/assets/videos/turbine-inspection/62-turbine-ring-segment-row-3-lower.mp4";
// import TI63 from "@/assets/videos/turbine-inspection/63-turbine-vane-segment-row-3-lower.mp4";
// import TI64 from "@/assets/videos/turbine-inspection/64.mp4";
// import TI65 from "@/assets/videos/turbine-inspection/65-turbine-vane-segment-row-3-lower.mp4";
// import TI66 from "@/assets/videos/turbine-inspection/66-turbine-ring-segment-row-3-lower.mp4";
// import TI67 from "@/assets/videos/turbine-inspection/67-turbine-seal-housing-row-3-lower.mp4";
// import TI68 from "@/assets/videos/turbine-inspection/68-turbine-seal-housing-row-4-lower.mp4";
// import TI69 from "@/assets/videos/add-scope/ti/turbine-section/8-turbine-ring-segment-row-4-lower.mp4";
// import TI70 from "@/assets/videos/add-scope/ti/turbine-section/9-turbine-vane-segment-row-4-lower.mp4";
// import TI71 from "@/assets/videos/add-scope/ti/turbine-section/10.mp4";
// import TI72 from "@/assets/videos/add-scope/ti/turbine-section/11-turbine-vane-segment-row-4-lower.mp4";
// import TI73 from "@/assets/videos/add-scope/ti/turbine-section/12-turbine-ring-segment-row-4-lower.mp4";
// import TI74 from "@/assets/videos/add-scope/ti/turbine-section/13-turbine-seal-housing-row-4-lower.mp4";
// import TI75 from "@/assets/videos/turbine-inspection/75-turbine-blade-row-3.mp4";
// import TI76 from "@/assets/videos/turbine-inspection/76-turbine-blade-row-2.mp4";
// import TI77 from "@/assets/videos/turbine-inspection/77-turbine-blade-row-1.mp4";
// import TI78 from "@/assets/videos/turbine-inspection/78-turbine-blade-ring-row-4-lower.mp4";
// import TI79 from "@/assets/videos/turbine-inspection/79-turbine-blade-ring-row-3-lower.mp4";
// import TI80 from "@/assets/videos/turbine-inspection/80-turbine-blade-ring-row-2-lower.mp4";
// import TI81 from "@/assets/videos/turbine-inspection/81-turbine-blade-ring-row-1-lower.mp4";
// import TI82 from "@/assets/videos/turbine-inspection/82-turbine-seal-housing-row-2-upper.mp4";
// import TI83 from "@/assets/videos/turbine-inspection/83-turbine-seal-housing-row-3-upper.mp4";
// import TI84 from "@/assets/videos/turbine-inspection/84-turbine-seal-housing-row-4-upper.mp4";
// import TI85 from "@/assets/videos/turbine-inspection/85-turbine-blade-ring-row-1-upper.mp4";
// import TI86 from "@/assets/videos/turbine-inspection/86-turbine-blade-ring-row-2-upper.mp4";
// import TI87 from "@/assets/videos/turbine-inspection/87-turbine-blade-ring-row-3-upper.mp4";
// import TI88 from "@/assets/videos/turbine-inspection/88-turbine-blade-ring-row-4-upper.mp4";
// import TI89 from "@/assets/videos/turbine-inspection/89-turbine-van-row-1-upper.mp4";
// import TI90 from "@/assets/videos/turbine-inspection/90-bypass-ring.mp4";
// import TI91 from "@/assets/videos/turbine-inspection/91-turbine-cylinder.mp4";
// import TI92 from "@/assets/videos/turbine-inspection/92-cooling-pipe.mp4";
// import TI93 from "@/assets/videos/turbine-inspection/93-transition-piece.mp4";

const videosData = ref({
  ci: [
    {
      id: 0,
      video: () =>
        import(
          "@/assets/videos/combustion-inspection/1-manhole-turbine-cylinder.mp4"
        ),
      name: "Manhole Turbine Cylinder",
      top: 235,
      left: 545,
    },
    {
      id: 1,
      video: () =>
        import("@/assets/videos/combustion-inspection/2-flame-detector.mp4"),
      name: "Flame Detector",
      top: 222,
      left: 685,
    },
    {
      id: 2,
      video: () =>
        import("@/assets/videos/combustion-inspection/3-flame-igniter.mp4"),
      name: "Flame Igniter",
      top: 235,
      left: 525,
    },
    // {
    //   id: 3,
    //   video: () =>
    //     import(
    //       "@/assets/videos/combustion-inspection/4-discavity-temperature.mp4"
    //     ),
    //   name: "Discavity Temperature",
    //   top: 210,
    //   left: 440,
    // },
    // {
    //   id: 4,
    //   video: () =>
    //     import(
    //       "@/assets/videos/combustion-inspection/5-black-patch-temperature.mp4"
    //     ),
    //   name: "Black Patch Temperature",
    //   top: 238,
    //   left: 420,
    // },
    // {
    //   id: 5,
    //   video: () =>
    //     import("@/assets/videos/combustion-inspection/6-fuel-branch-pipe.mp4"),
    //   name: "Fuel Branch Pipe",
    //   top: 238,
    //   left: 420,
    // },
    // {
    //   id: 6,
    //   video: () =>
    //     import("@/assets/videos/combustion-inspection/7-cross-flame-tube.mp4"),
    //   name: "Cross Flame Tube",
    //   top: 235,
    //   left: 370,
    // },
    // {
    //   id: 7,
    //   video: () =>
    //     import("@/assets/videos/combustion-inspection/8-top-hat.mp4"),
    //   name: "Top Hat",
    //   top: 235,
    //   left: 505,
    // },
    // {
    //   id: 8,
    //   video: () =>
    //     import("@/assets/videos/combustion-inspection/9-fuel-nozzle.mp4"),
    //   name: "Fuel Nozzle",
    //   top: 235,
    //   left: 715,
    // },
    // {
    //   id: 9,
    //   video: () =>
    //     import("@/assets/videos/combustion-inspection/10-combuster-basket.mp4"),
    //   name: "Combuster Basket",
    //   top: 235,
    //   left: 660,
    // },
    // {
    //   id: 10,
    //   video: () =>
    //     import("@/assets/videos/combustion-inspection/11-top-hat.mp4"),
    //   name: "Top Hat",
    //   top: 240,
    //   left: 540,
    // },
    // {
    //   id: 11,
    //   video: () =>
    //     import("@/assets/videos/combustion-inspection/12-u-support.mp4"),
    //   name: "U-Support",
    //   top: 235,
    //   left: 785,
    // },
    // {
    //   id: 12,
    //   video: () =>
    //     import("@/assets/videos/combustion-inspection/13-bypass-elbow.mp4"),
    //   name: "Bypass Elbow",
    //   top: 235,
    //   left: 515,
    // },
    // {
    //   id: 13,
    //   video: () =>
    //     import("@/assets/videos/combustion-inspection/14-transition-piece.mp4"),
    //   name: "Transition Piece",
    //   top: 237,
    //   left: 615,
    // },
    // {
    //   id: 14,
    //   video: () => import("@/assets/videos/combustion-inspection/15.mp4"),
    //   name: "",
    //   top: 0,
    //   left: 0,
    // },
    // {
    //   id: 15,
    //   video: () =>
    //     import("@/assets/videos/combustion-inspection/16-transition-piece.mp4"),
    //   name: "Transition Piece",
    //   top: 237,
    //   left: 615,
    // },
    // {
    //   id: 16,
    //   video: () =>
    //     import("@/assets/videos/combustion-inspection/17-u-support.mp4"),
    //   name: "U-Support",
    //   top: 237,
    //   left: 630,
    // },
    // {
    //   id: 17,
    //   video: () =>
    //     import("@/assets/videos/combustion-inspection/18-bypass-elbow.mp4"),
    //   name: "Bypass Elbow",
    //   top: 235,
    //   left: 790,
    // },
    // {
    //   id: 18,
    //   video: () =>
    //     import("@/assets/videos/combustion-inspection/19-top-hat.mp4"),
    //   name: "Top Hat",
    //   top: 233,
    //   left: 685,
    // },
    // {
    //   id: 19,
    //   video: () =>
    //     import("@/assets/videos/combustion-inspection/20-cross-flame-tube.mp4"),
    //   name: "Cross Flame Tube",
    //   top: 237,
    //   left: 580,
    // },
    // {
    //   id: 20,
    //   video: () =>
    //     import("@/assets/videos/combustion-inspection/21-flame-detector.mp4"),
    //   name: "Flame Detector",
    //   top: 237,
    //   left: 785,
    // },
    // {
    //   id: 21,
    //   video: () =>
    //     import("@/assets/videos/combustion-inspection/22-manhole-turbine.mp4"),
    //   name: "Manhole Turbine",
    //   top: 235,
    //   left: 615,
    // },
    // {
    //   id: 22,
    //   video: () =>
    //     import(
    //       "@/assets/videos/combustion-inspection/23-discavity-temperature.mp4"
    //     ),
    //   name: "Discavity Temperature",
    //   top: 230,
    //   left: 630,
    // },
    // {
    //   id: 23,
    //   video: () =>
    //     import(
    //       "@/assets/videos/combustion-inspection/24-black-patch-temperature.mp4"
    //     ),
    //   name: "Black Patch Temperature",
    //   top: 238,
    //   left: 420,
    // },
    // {
    //   id: 24,
    //   video: () =>
    //     import("@/assets/videos/combustion-inspection/25-fuel-branch-pipe.mp4"),
    //   name: "Fuel Branch Pipe",
    //   top: 237,
    //   left: 420,
    // },
    // {
    //   id: 25,
    //   video: () =>
    //     import("@/assets/videos/combustion-inspection/26-flame-igniter.mp4"),
    //   name: "Flame Igniter",
    //   top: 236,
    //   left: 525,
    // },
    // {
    //   id: 26,
    //   video: () => import("@/assets/videos/combustion-inspection/27.mp4"),
    //   name: "",
    //   top: 0,
    //   left: 0,
    // },
  ],
  // mi: [
  //   {
  //     id: 0,
  //     video: () =>
  //       import(
  //         "@/assets/videos/major-inspection/1-manhole-turbine-cylinder.mp4"
  //       ),
  //     name: "Manhole Turbine Cylinder",
  //     top: 233,
  //     left: 550,
  //   },
  //   {
  //     id: 1,
  //     video: () => import("@/assets/videos/major-inspection/2-inlet-duct.mp4"),
  //     name: "Inlet Duct",
  //     top: 233,
  //     left: 660,
  //   },
  //   {
  //     id: 2,
  //     video: () =>
  //       import("@/assets/videos/major-inspection/3-inlet-manifold.mp4"),
  //     name: "Inlet Manifold",
  //     top: 233,
  //     left: 630,
  //   },
  //   {
  //     id: 3,
  //     video: () =>
  //       import("@/assets/videos/major-inspection/4-cover-coupling.mp4"),
  //     name: "Cover Coupling",
  //     top: 237,
  //     left: 625,
  //   },
  //   {
  //     id: 4,
  //     video: () => import("@/assets/videos/major-inspection/5-vapor-pipe.mp4"),
  //     name: "Vapor Pipe",
  //     top: 237,
  //     left: 585,
  //   },
  //   {
  //     id: 5,
  //     video: () =>
  //       import("@/assets/videos/major-inspection/6-coupling-bolt.mp4"),
  //     name: "Coupling Bolt",
  //     top: 237,
  //     left: 585,
  //   },
  //   {
  //     id: 6,
  //     video: () =>
  //       import("@/assets/videos/major-inspection/7-coupling-spacer.mp4"),
  //     name: "Coupling Spacer",
  //     top: 237,
  //     left: 500,
  //   },
  //   {
  //     id: 7,
  //     video: () =>
  //       import(
  //         "@/assets/videos/major-inspection/8-black-patch-temperature.mp4"
  //       ),
  //     name: "Black Patch Temperature",
  //     top: 235,
  //     left: 505,
  //   },
  //   {
  //     id: 8,
  //     video: () => import("@/assets/videos/major-inspection/9-discavity.mp4"),
  //     name: "Discavity",
  //     top: 210,
  //     left: 535,
  //   },
  //   {
  //     id: 9,
  //     video: () =>
  //       import("@/assets/videos/major-inspection/10-flame-detector.mp4"),
  //     name: "Flame Detector",
  //     top: 225,
  //     left: 690,
  //   },
  //   {
  //     id: 10,
  //     video: () =>
  //       import("@/assets/videos/major-inspection/11-flame-igniter.mp4"),
  //     name: "Flame Igniter",
  //     top: 236,
  //     left: 535,
  //   },
  //   {
  //     id: 11,
  //     video: () =>
  //       import("@/assets/videos/major-inspection/12-cross-flame.mp4"),
  //     name: "Cross Flame",
  //     top: 235,
  //     left: 520,
  //   },
  //   {
  //     id: 12,
  //     video: () =>
  //       import("@/assets/videos/major-inspection/13-cooling-pipe.mp4"),
  //     name: "Cooling Pipe",
  //     top: 236,
  //     left: 600,
  //   },
  //   {
  //     id: 13,
  //     video: () =>
  //       import("@/assets/videos/major-inspection/14-fuel-branch-pipe.mp4"),
  //     name: "Fuel Branch Pipe",
  //     top: 230,
  //     left: 730,
  //   },
  //   {
  //     id: 14,
  //     video: () => import("@/assets/videos/major-inspection/15-rca-pipe.mp4"),
  //     name: "RCA Pipe",
  //     top: 236,
  //     left: 850,
  //   },
  //   {
  //     id: 15,
  //     video: () => import("@/assets/videos/major-inspection/16-bleed-pipe.mp4"),
  //     name: "Bleed Pipe",
  //     top: 235,
  //     left: 615,
  //   },
  //   {
  //     id: 16,
  //     video: MI17,
  //     duration: 5500,
  //     name: "Exhaust Manifold",
  //     top: 235,
  //     left: 565,
  //   },
  //   {
  //     id: 17,
  //     video: MI18,
  //     duration: 5500,
  //     name: "Top Hat",
  //     top: 238,
  //     left: 540,
  //   },
  //   {
  //     id: 18,
  //     video: MI19,
  //     duration: 5500,
  //     name: "Fuel Nozzle",
  //     top: 237,
  //     left: 1180,
  //   },
  //   {
  //     id: 19,
  //     video: MI20,
  //     duration: 5500,
  //     name: "Combustor Basket",
  //     top: 237,
  //     left: 1180,
  //   },
  //   {
  //     id: 20,
  //     video: MI21,
  //     duration: 5500,
  //     name: "Top Hat",
  //     top: 238,
  //     left: 1180,
  //   },
  //   {
  //     id: 21,
  //     video: MI22,
  //     duration: 5500,
  //     name: "Combustor Basket",
  //     top: 238,
  //     left: 1180,
  //   },
  //   {
  //     id: 22,
  //     video: MI23,
  //     duration: 5500,
  //     name: "Fuel Nozzle",
  //     top: 238,
  //     left: 1180,
  //   },
  //   {
  //     id: 23,
  //     video: MI24,
  //     duration: 5500,
  //     name: "Turbine Cylinder",
  //     top: 238,
  //     left: 1140,
  //   },
  //   {
  //     id: 24,
  //     video: MI25,
  //     duration: 5500,
  //     name: "Bypass Elbow",
  //     top: 240,
  //     left: 1080,
  //   },
  //   {
  //     id: 25,
  //     video: MI26,
  //     duration: 5500,
  //     name: "Transition Piece",
  //     top: 240,
  //     left: 1135,
  //   },
  //   {
  //     id: 26,
  //     video: MI27,
  //     duration: 5500,
  //     name: "U-Support",
  //     top: 240,
  //     left: 1210,
  //   },
  //   {
  //     id: 27,
  //     video: MI28,
  //     duration: 5500,
  //     name: "Bypass Ring",
  //     top: 240,
  //     left: 1140,
  //   },
  //   {
  //     id: 28,
  //     video: MI29,
  //     duration: 5500,
  //     name: "Turbine Vane Row 1",
  //     top: 240,
  //     left: 1040,
  //   },
  //   {
  //     id: 29,
  //     video: MI30,
  //     duration: 5500,
  //     name: "Turbine Blade Ring Row 4",
  //     top: 240,
  //     left: 1100,
  //   },
  //   {
  //     id: 30,
  //     video: MI31,
  //     duration: 5500,
  //     name: "Turbine Blade Ring Row 3",
  //     top: 242,
  //     left: 675,
  //   },
  //   {
  //     id: 31,
  //     video: MI32,
  //     duration: 5500,
  //     name: "Turbine Blade Ring Row 2",
  //     top: 240,
  //     left: 720,
  //   },
  //   {
  //     id: 32,
  //     video: MI33,
  //     duration: 5500,
  //     name: "Turbine Blade Ring Row 1",
  //     top: 240,
  //     left: 660,
  //   },
  //   {
  //     id: 33,
  //     video: MI34,
  //     duration: 5500,
  //     name: "Turbine Seal Housing Row 2",
  //     top: 240,
  //     left: 610,
  //   },
  //   {
  //     id: 34,
  //     video: MI35,
  //     duration: 5500,
  //     name: "Turbine Seal Housing Row 3",
  //     top: 240,
  //     left: 610,
  //   },
  //   {
  //     id: 35,
  //     video: MI36,
  //     duration: 5500,
  //     name: "Turbine Seal Housing Row 4",
  //     top: 242,
  //     left: 1180,
  //   },
  //   {
  //     id: 36,
  //     video: MI37,
  //     duration: 5500,
  //     name: "RCA Flexible Pipe Upper",
  //     top: 238,
  //     left: 1030,
  //   },
  //   {
  //     id: 37,
  //     video: MI38,
  //     duration: 5500,
  //     name: "Compressor-Comb Cylinder Upper",
  //     top: 240,
  //     left: 1050,
  //   },
  //   {
  //     id: 38,
  //     video: MI39,
  //     duration: 5500,
  //     name: "Compressor Blade Ring Row 1 Upper",
  //     top: 240,
  //     left: 1180,
  //   },
  //   {
  //     id: 39,
  //     video: MI40,
  //     duration: 5500,
  //     name: "Compressor Blade Ring Row 2 Upper",
  //     top: 240,
  //     left: 1180,
  //   },
  //   {
  //     id: 40,
  //     video: MI41,
  //     duration: 5500,
  //     name: "Compressor Blade Ring Row 3 Upper",
  //     top: 240,
  //     left: 1060,
  //   },
  //   {
  //     id: 41,
  //     video: MI42,
  //     duration: 5500,
  //     name: "Inlet Casing Upper",
  //     top: 238,
  //     left: 1180,
  //   },
  //   {
  //     id: 42,
  //     video: MI43,
  //     duration: 5500,
  //     name: "Exhaust Manifold Upper",
  //     top: 238,
  //     left: 1180,
  //   },
  //   {
  //     id: 43,
  //     video: MI44,
  //     duration: 5500,
  //     name: "Torque Tube Cover Upper",
  //     top: 240,
  //     left: 1010,
  //   },
  //   {
  //     id: 44,
  //     video: MI45,
  //     duration: 5500,
  //     name: "Seal Housing Torque Tube Cover Upper",
  //     top: 238,
  //     left: 1100,
  //   },
  //   {
  //     id: 45,
  //     video: MI46,
  //     duration: 5500,
  //     name: "OST Pipe",
  //     top: 240,
  //     left: 780,
  //   },
  //   {
  //     id: 46,
  //     video: MI47,
  //     duration: 5500,
  //     name: "OST Cover",
  //     top: 238,
  //     left: 740,
  //   },
  //   {
  //     id: 47,
  //     video: MI48,
  //     duration: 5500,
  //     name: "Exhaust Cylinder Upper",
  //     top: 240,
  //     left: 1000,
  //   },
  //   {
  //     id: 48,
  //     video: MI49,
  //     duration: 5500,
  //     name: "Thrust Bearing Cover",
  //     top: 240,
  //     left: 640,
  //   },
  //   {
  //     id: 49,
  //     video: MI50,
  //     duration: 5500,
  //     name: "Thrust Bearing Upper",
  //     top: 240,
  //     left: 700,
  //   },
  //   {
  //     id: 50,
  //     video: MI51,
  //     duration: 5500,
  //     name: "Thrust Bearing Lower",
  //     top: 240,
  //     left: 630,
  //   },
  //   {
  //     id: 51,
  //     video: MI52,
  //     duration: 5500,
  //     name: "Bearing 2 Upper",
  //     top: 240,
  //     left: 950,
  //   },
  //   {
  //     id: 52,
  //     video: MI53,
  //     duration: 5500,
  //     name: "Bearing 1 Upper",
  //     top: 237,
  //     left: 965,
  //   },
  //   {
  //     id: 53,
  //     video: MI54,
  //     duration: 5500,
  //     name: "OST Device",
  //     top: 240,
  //     left: 1070,
  //   },
  //   {
  //     id: 54,
  //     video: MI55,
  //     duration: 5500,
  //     name: "Turbine Compressor Rotor",
  //     top: 242,
  //     left: 820,
  //   },
  //   {
  //     id: 55,
  //     video: MI56,
  //     duration: 5500,
  //     name: "Bearing 2 Lower",
  //     top: 239,
  //     left: 1100,
  //   },
  //   {
  //     id: 56,
  //     video: MI57,
  //     duration: 5500,
  //     name: "Bearing 1 Lower",
  //     top: 237,
  //     left: 1260,
  //   },
  //   {
  //     id: 57,
  //     video: MI58,
  //     duration: 5500,
  //     name: "Turbine Blade Ring Row 2 Lower",
  //     top: 237,
  //     left: 1190,
  //   },
  //   {
  //     id: 58,
  //     video: MI59,
  //     duration: 5500,
  //     name: "Turbine Blade Ring Row 3 Lower",
  //     top: 240,
  //     left: 1080,
  //   },
  //   {
  //     id: 59,
  //     video: MI60,
  //     duration: 5500,
  //     name: "Turbine Blade Ring Row 1 Lower",
  //     top: 240,
  //     left: 1150,
  //   },
  //   {
  //     id: 60,
  //     video: MI61,
  //     duration: 5500,
  //     name: "Turbine Blade Ring Row 4 Lower",
  //     top: 237,
  //     left: 905,
  //   },
  //   {
  //     id: 61,
  //     video: MI62,
  //     duration: 5500,
  //     name: "Seal Housing Torque Cover Lower",
  //     top: 240,
  //     left: 1160,
  //   },
  //   {
  //     id: 62,
  //     video: MI63,
  //     duration: 5500,
  //     name: "Compressor Diaphragm Row 1 Lower",
  //     top: 238,
  //     left: 1170,
  //   },
  //   {
  //     id: 63,
  //     video: MI64,
  //     duration: 5500,
  //     name: "Compressor Diaphragm Row 2 Lower",
  //     top: 238,
  //     left: 1110,
  //   },
  //   {
  //     id: 64,
  //     video: MI65,
  //     duration: 5500,
  //     name: "Compressor Diaphragm Row 3 Lower",
  //     top: 238,
  //     left: 1110,
  //   },
  //   {
  //     id: 65,
  //     video: MI66,
  //     duration: 5500,
  //     name: "Compressor Diaphragm Row 4 Lower",
  //     top: 238,
  //     left: 1050,
  //   },
  //   {
  //     id: 66,
  //     video: MI67,
  //     duration: 5500,
  //     name: "Compressor Vane Row 5 Lower",
  //     top: 239,
  //     left: 965,
  //   },
  //   {
  //     id: 67,
  //     video: MI68,
  //     duration: 5500,
  //     name: "Compressor Vane Row 6 Lower",
  //     top: 239,
  //     left: 910,
  //   },
  //   {
  //     id: 68,
  //     video: MI69,
  //     duration: 5500,
  //     name: "Compressor Blade Ring Row 1 Lower",
  //     top: 237,
  //     left: 1270,
  //   },
  //   {
  //     id: 69,
  //     video: MI70,
  //     duration: 5500,
  //     name: "Compressor Blade Ring Row 2 Lower",
  //     top: 239,
  //     left: 1150,
  //   },
  //   {
  //     id: 70,
  //     video: MI71,
  //     duration: 5500,
  //     name: "Compressor Blade Ring Row 3 Lower",
  //     top: 239,
  //     left: 1070,
  //   },
  //   {
  //     id: 71,
  //     video: MI72,
  //     duration: 5500,
  //     name: "Inlet Seal Housing Lower",
  //     top: 238,
  //     left: 1160,
  //   },
  //   {
  //     id: 72,
  //     video: MI73,
  //     duration: 5500,
  //     name: "IGV Link Lower",
  //     top: 237,
  //     left: 1120,
  //   },
  //   {
  //     id: 73,
  //     video: MI74,
  //     duration: 5500,
  //     name: "IGV Lower",
  //     top: 239,
  //     left: 1040,
  //   },
  //   {
  //     id: 74,
  //     video: MI75,
  //     duration: 5500,
  //     name: "Turbine Ring Segment Row 1 Upper",
  //     top: 239,
  //     left: 875,
  //   },
  //   {
  //     id: 75,
  //     video: TI34,
  //     duration: 1500,
  //     name: "",
  //     top: 0,
  //     left: 0,
  //   },
  //   {
  //     id: 76,
  //     video: TI35,
  //     duration: 1500,
  //     name: "Turbine Ring Segment Row 1 Upper",
  //     top: 240,
  //     left: 725,
  //   },
  //   {
  //     id: 77,
  //     video: TI36,
  //     duration: 1500,
  //     name: "Turbine Ring Segment Row 2 Upper",
  //     top: 240,
  //     left: 770,
  //   },
  //   {
  //     id: 78,
  //     video: TI37,
  //     duration: 1500,
  //     name: "Turbine Vane Segment Row 2 Upper",
  //     top: 240,
  //     left: 890,
  //   },
  //   {
  //     id: 79,
  //     video: TI38,
  //     duration: 1500,
  //     name: "",
  //     top: 0,
  //     left: 0,
  //   },
  //   {
  //     id: 80,
  //     video: TI39,
  //     duration: 1500,
  //     name: "Turbine Vane Segment Row 2 Upper",
  //     top: 240,
  //     left: 890,
  //   },
  //   {
  //     id: 81,
  //     video: TI40,
  //     duration: 1500,
  //     name: "Turbine Ring Segment Row 2 Upper",
  //     top: 240,
  //     left: 770,
  //   },
  //   {
  //     id: 82,
  //     video: TI41,
  //     duration: 1500,
  //     name: "Turbine Ring Segment Row 3 Upper",
  //     top: 241,
  //     left: 680,
  //   },
  //   {
  //     id: 83,
  //     video: TI42,
  //     duration: 1500,
  //     name: "Turbine Vane Segment Row 3 Upper",
  //     top: 241,
  //     left: 890,
  //   },
  //   {
  //     id: 84,
  //     video: TI43,
  //     duration: 1500,
  //     name: "",
  //     top: 0,
  //     left: 0,
  //   },
  //   {
  //     id: 85,
  //     video: TI44,
  //     duration: 1500,
  //     name: "Turbine Vane Segment Row 3 Upper",
  //     top: 241,
  //     left: 890,
  //   },
  //   {
  //     id: 86,
  //     video: TI45,
  //     duration: 1500,
  //     name: "Turbine Ring Segment Row 3 Upper",
  //     top: 241,
  //     left: 690,
  //   },
  //   {
  //     id: 87,
  //     video: TI46,
  //     duration: 1500,
  //     name: "Turbine Ring Segment Row 4 Upper",
  //     top: 241,
  //     left: 690,
  //   },
  //   {
  //     id: 88,
  //     video: TI47,
  //     duration: 1500,
  //     name: "Turbine Vane Segment Row 4 Upper",
  //     top: 241,
  //     left: 890,
  //   },
  //   {
  //     id: 89,
  //     video: TI48,
  //     duration: 1500,
  //     name: "",
  //     top: 0,
  //     left: 0,
  //   },
  //   {
  //     id: 90,
  //     video: TI49,
  //     duration: 1500,
  //     name: "Turbine Vane Segment Row 4 Upper",
  //     top: 241,
  //     left: 890,
  //   },
  //   {
  //     id: 91,
  //     video: TI50,
  //     duration: 1500,
  //     name: "Turbine Ring Segment Row 4 Upper",
  //     top: 241,
  //     left: 690,
  //   },
  //   {
  //     id: 92,
  //     video: TI51,
  //     duration: 1500,
  //     name: "Turbine Ring Segment Row 1 Lower",
  //     top: 241,
  //     left: 690,
  //   },
  //   {
  //     id: 93,
  //     video: TI52,
  //     duration: 1500,
  //     name: "",
  //     top: 0,
  //     left: 0,
  //   },
  //   {
  //     id: 94,
  //     video: TI53,
  //     duration: 1500,
  //     name: "Turbine Ring Segment Row 1 Lower",
  //     top: 241,
  //     left: 690,
  //   },
  //   {
  //     id: 95,
  //     video: TI54,
  //     duration: 1500,
  //     name: "Turbine Seal Housing Row 2 Lower",
  //     top: 241,
  //     left: 930,
  //   },
  //   {
  //     id: 96,
  //     video: TI55,
  //     duration: 1500,
  //     name: "Turbine Ring Segment Row 2 Lower",
  //     top: 241,
  //     left: 730,
  //   },
  //   {
  //     id: 97,
  //     video: TI56,
  //     duration: 1500,
  //     name: "Turbine Vane Segment Row 2 Lower",
  //     top: 240,
  //     left: 810,
  //   },
  //   {
  //     id: 98,
  //     video: TI57,
  //     duration: 1500,
  //     name: "",
  //     top: 0,
  //     left: 0,
  //   },
  //   {
  //     id: 99,
  //     video: TI58,
  //     duration: 1500,
  //     name: "Turbine Vane Segment Row 2 Lower",
  //     top: 240,
  //     left: 810,
  //   },
  //   {
  //     id: 100,
  //     video: TI59,
  //     duration: 1500,
  //     name: "Turbine Ring Segment Row 2 Lower",
  //     top: 240,
  //     left: 730,
  //   },
  //   {
  //     id: 101,
  //     video: TI60,
  //     duration: 1500,
  //     name: "Turbine Seal Housing Row 2 Lower",
  //     top: 241,
  //     left: 935,
  //   },
  //   {
  //     id: 102,
  //     video: TI61,
  //     duration: 1500,
  //     name: "Turbine Seal Housing Row 3 Lower",
  //     top: 242,
  //     left: 1110,
  //   },
  //   {
  //     id: 103,
  //     video: TI62,
  //     duration: 1500,
  //     name: "Turbine Ring Segment Row 3 Lower",
  //     top: 241,
  //     left: 860,
  //   },
  //   {
  //     id: 104,
  //     video: TI63,
  //     duration: 1500,
  //     name: "Turbine Vane Segment Row 3 Lower",
  //     top: 241,
  //     left: 1005,
  //   },
  //   {
  //     id: 105,
  //     video: TI64,
  //     duration: 1500,
  //     name: "",
  //     top: 0,
  //     left: 0,
  //   },
  //   {
  //     id: 106,
  //     video: TI65,
  //     duration: 1500,
  //     name: "Turbine Vane Segment Row 3 Lower",
  //     top: 241,
  //     left: 1010,
  //   },
  //   {
  //     id: 107,
  //     video: TI66,
  //     duration: 1500,
  //     name: "Turbine Ring Segment Row 3 Lower",
  //     top: 241,
  //     left: 860,
  //   },
  //   {
  //     id: 108,
  //     video: TI67,
  //     duration: 1500,
  //     name: "Turbine Seal Housing Row 3 Lower",
  //     top: 242,
  //     left: 1110,
  //   },
  //   {
  //     id: 109,
  //     video: TI68,
  //     duration: 1500,
  //     name: "Turbine Seal Housing Row 4 Lower",
  //     top: 241,
  //     left: 1090,
  //   },
  //   {
  //     id: 110,
  //     video: MI111,
  //     duration: 155000,
  //     name: "Ring Segment Row 4 Lower",
  //     top: 240,
  //     left: 750,
  //   },
  //   {
  //     id: 111,
  //     video: MI112,
  //     duration: 155000,
  //     name: "Vane Segment Row 4 Lower",
  //     top: 240,
  //     left: 940,
  //   },
  //   {
  //     id: 112,
  //     video: MI113,
  //     duration: 155000,
  //     name: "",
  //     top: 0,
  //     left: 0,
  //   },
  //   {
  //     id: 113,
  //     video: MI114,
  //     duration: 155000,
  //     name: "Vane Segment Row 4 Lower",
  //     top: 241,
  //     left: 940,
  //   },
  //   {
  //     id: 114,
  //     video: MI115,
  //     duration: 155000,
  //     name: "Ring Segment Row 4 Lower",
  //     top: 240,
  //     left: 750,
  //   },
  //   {
  //     id: 115,
  //     video: MI116,
  //     duration: 155000,
  //     name: "Seal Housing Row 4 Lower",
  //     top: 241,
  //     left: 1140,
  //   },
  //   {
  //     id: 116,
  //     video: MI117,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 1 Upper",
  //     top: 239,
  //     left: 750,
  //   },
  //   {
  //     id: 117,
  //     video: MI118,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 2 Upper",
  //     top: 239,
  //     left: 630,
  //   },
  //   {
  //     id: 118,
  //     video: MI119,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 3 Upper",
  //     top: 239,
  //     left: 550,
  //   },
  //   {
  //     id: 119,
  //     video: MI120,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 4 Upper",
  //     top: 239,
  //     left: 640,
  //   },
  //   {
  //     id: 120,
  //     video: MI121,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 5 Upper",
  //     top: 239,
  //     left: 580,
  //   },
  //   {
  //     id: 121,
  //     video: MI122,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 6 Upper",
  //     top: 239,
  //     left: 520,
  //   },
  //   {
  //     id: 122,
  //     video: MI123,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 1 Upper",
  //     top: 240,
  //     left: 900,
  //   },
  //   {
  //     id: 123,
  //     video: MI124,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 2 Upper",
  //     top: 240,
  //     left: 790,
  //   },
  //   {
  //     id: 124,
  //     video: MI125,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 3 Upper",
  //     top: 241,
  //     left: 700,
  //   },
  //   {
  //     id: 125,
  //     video: MI126,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 4 Upper",
  //     top: 241,
  //     left: 640,
  //   },
  //   {
  //     id: 126,
  //     video: MI127,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 5 Upper",
  //     top: 241,
  //     left: 570,
  //   },
  //   {
  //     id: 127,
  //     video: MI128,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 6 Upper",
  //     top: 240,
  //     left: 520,
  //   },
  //   {
  //     id: 128,
  //     video: MI129,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 15 Lower",
  //     top: 241,
  //     left: 990,
  //   },
  //   {
  //     id: 129,
  //     video: MI130,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 16 Lower",
  //     top: 241,
  //     left: 985,
  //   },
  //   {
  //     id: 130,
  //     video: MI131,
  //     duration: 155000,
  //     name: "OGV Lower",
  //     top: 239,
  //     left: 970,
  //   },
  //   {
  //     id: 131,
  //     video: MI132,
  //     duration: 155000,
  //     name: "",
  //     top: 0,
  //     left: 0,
  //   },
  //   {
  //     id: 132,
  //     video: MI133,
  //     duration: 155000,
  //     name: "OGV Lower",
  //     top: 239,
  //     left: 970,
  //   },
  //   {
  //     id: 133,
  //     video: MI134,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 17 Lower",
  //     top: 243,
  //     left: 1140,
  //   },
  //   {
  //     id: 134,
  //     video: MI135,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 16 Lower",
  //     top: 241,
  //     left: 980,
  //   },
  //   {
  //     id: 135,
  //     video: MI136,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 15 Lower",
  //     top: 241,
  //     left: 985,
  //   },
  //   {
  //     id: 136,
  //     video: MI137,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 14 Lower",
  //     top: 241,
  //     left: 1010,
  //   },
  //   {
  //     id: 137,
  //     video: MI138,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 13 Lower",
  //     top: 239,
  //     left: 1010,
  //   },
  //   {
  //     id: 138,
  //     video: MI139,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 12 Lower",
  //     top: 240,
  //     left: 1090,
  //   },
  //   {
  //     id: 139,
  //     video: MI140,
  //     duration: 155000,
  //     name: "",
  //     top: 0,
  //     left: 0,
  //   },
  //   {
  //     id: 140,
  //     video: MI141,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 12 Lower",
  //     top: 240,
  //     left: 1090,
  //   },
  //   {
  //     id: 141,
  //     video: MI142,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 13 Lower",
  //     top: 240,
  //     left: 1010,
  //   },
  //   {
  //     id: 142,
  //     video: MI143,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 12 Lower",
  //     top: 239,
  //     left: 970,
  //   },
  //   {
  //     id: 143,
  //     video: MI144,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 11 Lower",
  //     top: 241,
  //     left: 1205,
  //   },
  //   {
  //     id: 144,
  //     video: MI145,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 10 Lower",
  //     top: 239,
  //     left: 1205,
  //   },
  //   {
  //     id: 145,
  //     video: MI146,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 9 Lower",
  //     top: 239,
  //     left: 1205,
  //   },
  //   {
  //     id: 146,
  //     video: MI147,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 8 Lower",
  //     top: 237,
  //     left: 1205,
  //   },
  //   {
  //     id: 147,
  //     video: MI148,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 7 Lower",
  //     top: 237,
  //     left: 1200,
  //   },
  //   {
  //     id: 148,
  //     video: MI149,
  //     duration: 155000,
  //     name: "",
  //     top: 0,
  //     left: 0,
  //   },
  //   {
  //     id: 149,
  //     video: MI150,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 7 Lower",
  //     top: 237,
  //     left: 1190,
  //   },
  //   {
  //     id: 150,
  //     video: MI151,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 8 Lower",
  //     top: 237,
  //     left: 1205,
  //   },
  //   {
  //     id: 151,
  //     video: MI152,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 9 Lower",
  //     top: 238,
  //     left: 1205,
  //   },
  //   {
  //     id: 152,
  //     video: MI153,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 10 Lower",
  //     top: 238,
  //     left: 1205,
  //   },
  //   {
  //     id: 153,
  //     video: MI154,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 11 Lower",
  //     top: 240,
  //     left: 1205,
  //   },
  //   {
  //     id: 154,
  //     video: MI155,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 15 Upper",
  //     top: 241,
  //     left: 1210,
  //   },
  //   {
  //     id: 155,
  //     video: MI156,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 16 Upper",
  //     top: 240,
  //     left: 1195,
  //   },
  //   {
  //     id: 156,
  //     video: MI157,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 17 Upper",
  //     top: 240,
  //     left: 1210,
  //   },
  //   {
  //     id: 157,
  //     video: MI158,
  //     duration: 155000,
  //     name: "OGV Upper",
  //     top: 237,
  //     left: 1210,
  //   },
  //   {
  //     id: 158,
  //     video: MI159,
  //     duration: 155000,
  //     name: "",
  //     top: 0,
  //     left: 0,
  //   },
  //   {
  //     id: 159,
  //     video: MI160,
  //     duration: 155000,
  //     name: "OGV Upper",
  //     top: 237,
  //     left: 1210,
  //   },
  //   {
  //     id: 160,
  //     video: MI161,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 17 Upper",
  //     top: 240,
  //     left: 1210,
  //   },
  //   {
  //     id: 161,
  //     video: MI162,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 16 Upper",
  //     top: 240,
  //     left: 1195,
  //   },
  //   {
  //     id: 162,
  //     video: MI163,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 14 Upper",
  //     top: 238,
  //     left: 1090,
  //   },
  //   {
  //     id: 163,
  //     video: MI164,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 13 Upper",
  //     top: 241,
  //     left: 1090,
  //   },
  //   {
  //     id: 164,
  //     video: MI165,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 12 Upper",
  //     top: 240,
  //     left: 1090,
  //   },
  //   {
  //     id: 165,
  //     video: MI166,
  //     duration: 155000,
  //     name: "",
  //     top: 0,
  //     left: 0,
  //   },
  //   {
  //     id: 166,
  //     video: MI167,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 12 Upper",
  //     top: 241,
  //     left: 1090,
  //   },
  //   {
  //     id: 167,
  //     video: MI168,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 13 Upper",
  //     top: 241,
  //     left: 1090,
  //   },
  //   {
  //     id: 168,
  //     video: MI169,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 14 Upper",
  //     top: 238,
  //     left: 1090,
  //   },
  //   {
  //     id: 169,
  //     video: MI170,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 11 Upper",
  //     top: 240,
  //     left: 1100,
  //   },
  //   {
  //     id: 170,
  //     video: MI171,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 10 Upper",
  //     top: 240,
  //     left: 1090,
  //   },
  //   {
  //     id: 171,
  //     video: MI172,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 9 Upper",
  //     top: 238,
  //     left: 1090,
  //   },
  //   {
  //     id: 172,
  //     video: MI173,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 8 Upper",
  //     top: 241,
  //     left: 1160,
  //   },
  //   {
  //     id: 173,
  //     video: MI174,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 7 Upper",
  //     top: 241,
  //     left: 1160,
  //   },
  //   {
  //     id: 174,
  //     video: MI175,
  //     duration: 155000,
  //     name: "",
  //     top: 0,
  //     left: 0,
  //   },
  //   {
  //     id: 175,
  //     video: MI176,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 7 Upper",
  //     top: 241,
  //     left: 1155,
  //   },
  //   {
  //     id: 176,
  //     video: MI177,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 8 Upper",
  //     top: 241,
  //     left: 1160,
  //   },
  //   {
  //     id: 177,
  //     video: MI178,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 9 Upper",
  //     top: 238,
  //     left: 1090,
  //   },
  //   {
  //     id: 178,
  //     video: MI179,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 10 Upper",
  //     top: 239,
  //     left: 1090,
  //   },
  //   {
  //     id: 179,
  //     video: MI180,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 11 Upper",
  //     top: 240,
  //     left: 1100,
  //   },
  //   {
  //     id: 180,
  //     video: MI181,
  //     duration: 155000,
  //     name: "IGV Link",
  //     top: 241,
  //     left: 840,
  //   },
  //   {
  //     id: 181,
  //     video: MI182,
  //     duration: 155000,
  //     name: "Seal Housing Upper",
  //     top: 235,
  //     left: 510,
  //   },
  //   {
  //     id: 182,
  //     video: MI183,
  //     duration: 155000,
  //     name: "IGV Upper",
  //     top: 235,
  //     left: 570,
  //   },
  //   {
  //     id: 183,
  //     video: MI184,
  //     duration: 155000,
  //     name: "Seal Housing Upper",
  //     top: 236,
  //     left: 515,
  //   },
  //   {
  //     id: 184,
  //     video: MI185,
  //     duration: 155000,
  //     name: "IGV Link",
  //     top: 233,
  //     left: 810,
  //   },
  //   {
  //     id: 185,
  //     video: MI186,
  //     duration: 155000,
  //     name: "Turbine Blade Row 4",
  //     top: 238,
  //     left: 890,
  //   },
  //   {
  //     id: 186,
  //     video: MI187,
  //     duration: 155000,
  //     name: "Turbine Blade Row 3",
  //     top: 238,
  //     left: 990,
  //   },
  //   {
  //     id: 187,
  //     video: MI188,
  //     duration: 155000,
  //     name: "Turbine Blade Row 2",
  //     top: 238,
  //     left: 1090,
  //   },
  //   {
  //     id: 188,
  //     video: MI189,
  //     duration: 155000,
  //     name: "Turbine Blade Row 1",
  //     top: 238,
  //     left: 1175,
  //   },
  //   {
  //     id: 189,
  //     video: MI190,
  //     duration: 155000,
  //     name: "Turbine Blade Row 4",
  //     top: 238,
  //     left: 895,
  //   },
  //   {
  //     id: 190,
  //     video: MI191,
  //     duration: 155000,
  //     name: "Turbine Blade Row 3",
  //     top: 238,
  //     left: 990,
  //   },
  //   {
  //     id: 191,
  //     video: MI192,
  //     duration: 155000,
  //     name: "Turbine Blade Row 2",
  //     top: 237,
  //     left: 1090,
  //   },
  //   {
  //     id: 192,
  //     video: MI193,
  //     duration: 155000,
  //     name: "Turbine Blade Row 1",
  //     top: 237,
  //     left: 1180,
  //   },
  //   {
  //     id: 193,
  //     video: MI194,
  //     duration: 155000,
  //     name: "Compressor Blade Row 1",
  //     top: 238,
  //     left: 1310,
  //   },
  //   {
  //     id: 194,
  //     video: MI195,
  //     duration: 155000,
  //     name: "Compressor Blade Row 2",
  //     top: 236,
  //     left: 1100,
  //   },
  //   {
  //     id: 195,
  //     video: MI196,
  //     duration: 155000,
  //     name: "Compressor Blade Row 3",
  //     top: 237,
  //     left: 940,
  //   },
  //   {
  //     id: 196,
  //     video: MI197,
  //     duration: 155000,
  //     name: "Compressor Blade Row 4",
  //     top: 237,
  //     left: 830,
  //   },
  //   {
  //     id: 197,
  //     video: MI198,
  //     duration: 155000,
  //     name: "Compressor Blade Row 5",
  //     top: 237,
  //     left: 730,
  //   },
  //   {
  //     id: 198,
  //     video: MI199,
  //     duration: 155000,
  //     name: "Compressor Blade Row 6",
  //     top: 238,
  //     left: 620,
  //   },
  //   {
  //     id: 199,
  //     video: MI200,
  //     duration: 155000,
  //     name: "",
  //     top: 0,
  //     left: 0,
  //   },
  //   {
  //     id: 200,
  //     video: MI201,
  //     duration: 155000,
  //     name: "Compressor Blade Row 6",
  //     top: 238,
  //     left: 620,
  //   },
  //   {
  //     id: 201,
  //     video: MI202,
  //     duration: 155000,
  //     name: "Compressor Blade Row 5",
  //     top: 238,
  //     left: 730,
  //   },
  //   {
  //     id: 202,
  //     video: MI203,
  //     duration: 155000,
  //     name: "Compressor Blade Row 4",
  //     top: 238,
  //     left: 830,
  //   },
  //   {
  //     id: 203,
  //     video: MI204,
  //     duration: 155000,
  //     name: "Compressor Blade Row 3",
  //     top: 237,
  //     left: 940,
  //   },
  //   {
  //     id: 204,
  //     video: MI205,
  //     duration: 155000,
  //     name: "Compressor Blade Row 2",
  //     top: 237,
  //     left: 1100,
  //   },
  //   {
  //     id: 205,
  //     video: MI206,
  //     duration: 155000,
  //     name: "Compressor Blade Row 1",
  //     top: 238,
  //     left: 1310,
  //   },

  //   {
  //     id: 206,
  //     video: MI207,
  //     duration: 155000,
  //     name: "IGV Lower",
  //     top: 238,
  //     left: 1185,
  //   },
  //   {
  //     id: 207,
  //     video: MI208,
  //     duration: 155000,
  //     name: "IGV Link Lower",
  //     top: 238,
  //     left: 1185,
  //   },
  //   {
  //     id: 208,
  //     video: MI209,
  //     duration: 155000,
  //     name: "Inlet Seal Housing Lower",
  //     top: 238,
  //     left: 1185,
  //   },
  //   {
  //     id: 209,
  //     video: MI210,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 6 Lower",
  //     top: 238,
  //     left: 1185,
  //   },
  //   {
  //     id: 210,
  //     video: MI211,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 5 Lower",
  //     top: 238,
  //     left: 1120,
  //   },
  //   {
  //     id: 211,
  //     video: MI212,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 4 Lower",
  //     top: 238,
  //     left: 1120,
  //   },
  //   {
  //     id: 212,
  //     video: MI213,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 3 Lower",
  //     top: 238,
  //     left: 1120,
  //   },
  //   {
  //     id: 213,
  //     video: MI214,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 2 Lower",
  //     top: 238,
  //     left: 1120,
  //   },
  //   {
  //     id: 214,
  //     video: MI215,
  //     duration: 155000,
  //     name: "Compressor Diaphragm Row 1 Lower",
  //     top: 238,
  //     left: 1120,
  //   },
  //   {
  //     id: 215,
  //     video: MI216,
  //     duration: 155000,
  //     name: "Compressor Blade Ring Row 3 Lower",
  //     top: 238,
  //     left: 1120,
  //   },
  //   {
  //     id: 216,
  //     video: MI217,
  //     duration: 155000,
  //     name: "Compressor Blade Ring Row 2 Lower",
  //     top: 238,
  //     left: 1120,
  //   },
  //   {
  //     id: 217,
  //     video: MI218,
  //     duration: 155000,
  //     name: "Compressor Blade Ring Row 1 Lower",
  //     top: 238,
  //     left: 1120,
  //   },
  //   {
  //     id: 218,
  //     video: MI219,
  //     duration: 155000,
  //     name: "Seal Housing Torque Tube Cover Lower",
  //     top: 238,
  //     left: 665,
  //   },
  //   {
  //     id: 219,
  //     video: MI220,
  //     duration: 155000,
  //     name: "Turbine Blade Ring Row 4 Lower",
  //     top: 238,
  //     left: 870,
  //   },
  //   {
  //     id: 220,
  //     video: MI221,
  //     duration: 155000,
  //     name: "Turbine Blade Ring Row 1 Lower",
  //     top: 238,
  //     left: 1270,
  //   },
  //   {
  //     id: 221,
  //     video: MI222,
  //     duration: 155000,
  //     name: "Turbine Blade Ring Row 2 Lower",
  //     top: 238,
  //     left: 1270,
  //   },
  //   {
  //     id: 222,
  //     video: MI223,
  //     duration: 155000,
  //     name: "Turbine Blade Ring Row 2 Lower",
  //     top: 239,
  //     left: 940,
  //   },
  //   {
  //     id: 223,
  //     video: MI224,
  //     duration: 155000,
  //     name: "Bearing 1 Lower",
  //     top: 238,
  //     left: 1290,
  //   },
  //   {
  //     id: 224,
  //     video: MI225,
  //     duration: 155000,
  //     name: "Bearing 2 Lower",
  //     top: 238,
  //     left: 1290,
  //   },
  //   {
  //     id: 225,
  //     video: MI226,
  //     duration: 155000,
  //     name: "Turbine Compressor Rotor",
  //     top: 238,
  //     left: 760,
  //   },
  //   {
  //     id: 226,
  //     video: MI227,
  //     duration: 155000,
  //     name: "Bearing 2 Upper",
  //     top: 239,
  //     left: 910,
  //   },
  //   {
  //     id: 227,
  //     video: MI228,
  //     duration: 155000,
  //     name: "Bearing 1 Upper",
  //     top: 238,
  //     left: 1070,
  //   },
  //   {
  //     id: 228,
  //     video: MI229,
  //     duration: 155000,
  //     name: "Exhaust Cylinder Upper",
  //     top: 237,
  //     left: 1070,
  //   },
  //   {
  //     id: 229,
  //     video: MI230,
  //     duration: 155000,
  //     name: "Seal Housing Torque Cover Upper",
  //     top: 238,
  //     left: 1110,
  //   },
  //   {
  //     id: 230,
  //     video: MI231,
  //     duration: 155000,
  //     name: "Inlet Casing Upper",
  //     top: 238,
  //     left: 1290,
  //   },
  //   {
  //     id: 231,
  //     video: MI232,
  //     duration: 155000,
  //     name: "Torque Tube Cover Upper",
  //     top: 240,
  //     left: 1110,
  //   },
  //   {
  //     id: 232,
  //     video: MI233,
  //     duration: 155000,
  //     name: "Compressor Blade Ring Row 1 Upper",
  //     top: 239,
  //     left: 1320,
  //   },
  //   {
  //     id: 233,
  //     video: MI234,
  //     duration: 155000,
  //     name: "Compressor Blade Ring Row 2 Upper",
  //     top: 239,
  //     left: 1160,
  //   },
  //   {
  //     id: 234,
  //     video: MI235,
  //     duration: 155000,
  //     name: "Compressor Blade Ring Row 3 Upper",
  //     top: 239,
  //     left: 1180,
  //   },
  //   {
  //     id: 235,
  //     video: MI236,
  //     duration: 155000,
  //     name: "Compressor-comb Cylinder Upper",
  //     top: 240,
  //     left: 1270,
  //   },
  //   {
  //     id: 236,
  //     video: MI237,
  //     duration: 155000,
  //     name: "RCA Flexible Pipe Upper",
  //     top: 239,
  //     left: 1210,
  //   },
  //   {
  //     id: 237,
  //     video: MI238,
  //     duration: 155000,
  //     name: "Turbine Seal Housing Row 2 Upper",
  //     top: 239,
  //     left: 1210,
  //   },
  //   {
  //     id: 238,
  //     video: MI239,
  //     duration: 155000,
  //     name: "Compressor Blade Ring Row 3 Upper",
  //     top: 239,
  //     left: 1180,
  //   },
  //   {
  //     id: 239,
  //     video: MI240,
  //     duration: 155000,
  //     name: "Compressor Blade Ring Row 4 Upper",
  //     top: 239,
  //     left: 1210,
  //   },
  //   {
  //     id: 240,
  //     video: MI241,
  //     duration: 155000,
  //     name: "Turbine Blade Ring Row 4 Upper",
  //     top: 239,
  //     left: 1210,
  //   },
  //   {
  //     id: 241,
  //     video: MI242,
  //     duration: 155000,
  //     name: "Turbine Blade Ring Row 3 Upper",
  //     top: 239,
  //     left: 1210,
  //   },
  //   {
  //     id: 242,
  //     video: MI243,
  //     duration: 155000,
  //     name: "Turbine Blade Ring Row 2 Upper",
  //     top: 239,
  //     left: 1320,
  //   },
  //   {
  //     id: 243,
  //     video: MI244,
  //     duration: 155000,
  //     name: "Turbine Blade Ring Row 1 Upper",
  //     top: 239,
  //     left: 1320,
  //   },
  //   {
  //     id: 244,
  //     video: MI245,
  //     duration: 155000,
  //     name: "Turbine Vane Segment Row 1",
  //     top: 239,
  //     left: 1420,
  //   },
  //   {
  //     id: 245,
  //     video: MI246,
  //     duration: 155000,
  //     name: "Bypass Ring Upper",
  //     top: 239,
  //     left: 1540,
  //   },
  //   {
  //     id: 246,
  //     video: MI247,
  //     duration: 155000,
  //     name: "OST Device",
  //     top: 239,
  //     left: 1260,
  //   },
  //   {
  //     id: 247,
  //     video: MI248,
  //     duration: 155000,
  //     name: "OST Cover",
  //     top: 239,
  //     left: 1400,
  //   },
  //   {
  //     id: 248,
  //     video: MI249,
  //     duration: 155000,
  //     name: "OST Pipe",
  //     top: 239,
  //     left: 1280,
  //   },
  //   {
  //     id: 249,
  //     video: MI250,
  //     duration: 155000,
  //     name: "Exhaust Manifold Upper",
  //     top: 239,
  //     left: 1350,
  //   },
  //   {
  //     id: 250,
  //     video: MI251,
  //     duration: 155000,
  //     name: "U-Support",
  //     top: 239,
  //     left: 1420,
  //   },
  //   {
  //     id: 251,
  //     video: MI252,
  //     duration: 155000,
  //     name: "Transition Piece",
  //     top: 239,
  //     left: 1360,
  //   },
  //   {
  //     id: 252,
  //     video: MI253,
  //     duration: 155000,
  //     name: "Bypass Elbow",
  //     top: 239,
  //     left: 1290,
  //   },
  //   {
  //     id: 253,
  //     video: MI254,
  //     duration: 155000,
  //     name: "Turbine Cylinder Upper",
  //     top: 239,
  //     left: 1350,
  //   },
  //   {
  //     id: 254,
  //     video: MI255,
  //     duration: 155000,
  //     name: "Top Hat",
  //     top: 239,
  //     left: 1340,
  //   },
  //   {
  //     id: 255,
  //     video: MI256,
  //     duration: 155000,
  //     name: "Cooling Pipe",
  //     top: 239,
  //     left: 1260,
  //   },
  //   {
  //     id: 256,
  //     video: MI257,
  //     duration: 155000,
  //     name: "RCA Pipe",
  //     top: 239,
  //     left: 1420,
  //   },
  //   {
  //     id: 257,
  //     video: MI258,
  //     duration: 155000,
  //     name: "Bleed Pipe",
  //     top: 239,
  //     left: 1320,
  //   },
  //   {
  //     id: 258,
  //     video: MI259,
  //     duration: 155000,
  //     name: "Fuel Gas Manifold",
  //     top: 239,
  //     left: 1355,
  //   },
  //   {
  //     id: 259,
  //     video: MI260,
  //     duration: 155000,
  //     name: "Fuel Branch Pipe",
  //     top: 239,
  //     left: 1340,
  //   },
  //   {
  //     id: 260,
  //     video: MI261,
  //     duration: 155000,
  //     name: "Cross Flame Tube",
  //     top: 239,
  //     left: 1210,
  //   },
  //   {
  //     id: 261,
  //     video: MI262,
  //     duration: 155000,
  //     name: "Flame Detector",
  //     top: 239,
  //     left: 1535,
  //   },
  //   {
  //     id: 262,
  //     video: MI263,
  //     duration: 155000,
  //     name: "Manhole Turbine Cylinder",
  //     top: 239,
  //     left: 1350,
  //   },
  //   {
  //     id: 263,
  //     video: MI264,
  //     duration: 155000,
  //     name: "Discavity Temperature",
  //     top: 239,
  //     left: 1300,
  //   },
  //   {
  //     id: 264,
  //     video: MI265,
  //     duration: 155000,
  //     name: "Black Patch Temperature",
  //     top: 239,
  //     left: 1270,
  //   },
  //   {
  //     id: 265,
  //     video: MI266,
  //     duration: 155000,
  //     name: "Flame Igniter",
  //     top: 239,
  //     left: 1320,
  //   },
  //   {
  //     id: 266,
  //     video: MI267,
  //     duration: 155000,
  //     name: "Thrust Bearing Lower",
  //     top: 239,
  //     left: 1470,
  //   },
  //   {
  //     id: 267,
  //     video: MI268,
  //     duration: 155000,
  //     name: "Thrust Bearing Upper",
  //     top: 239,
  //     left: 1420,
  //   },
  //   {
  //     id: 268,
  //     video: MI269,
  //     duration: 155000,
  //     name: "Thrust Bearing Cover",
  //     top: 239,
  //     left: 1210,
  //   },
  //   {
  //     id: 269,
  //     video: MI270,
  //     duration: 155000,
  //     name: "Coupling Spacer",
  //     top: 239,
  //     left: 1145,
  //   },
  //   {
  //     id: 270,
  //     video: MI271,
  //     duration: 155000,
  //     name: "Coupling Bolt",
  //     top: 239,
  //     left: 1230,
  //   },
  //   {
  //     id: 271,
  //     video: MI272,
  //     duration: 155000,
  //     name: "Vapour Pipe",
  //     top: 239,
  //     left: 1180,
  //   },
  //   {
  //     id: 272,
  //     video: MI273,
  //     duration: 155000,
  //     name: "Coupling Cover Lower",
  //     top: 239,
  //     left: 1210,
  //   },
  //   {
  //     id: 273,
  //     video: MI274,
  //     duration: 155000,
  //     name: "Coupling Cover Upper",
  //     top: 239,
  //     left: 1310,
  //   },
  //   {
  //     id: 274,
  //     video: MI275,
  //     duration: 155000,
  //     name: "Inlet Manifold",
  //     top: 239,
  //     left: 1210,
  //   },
  //   {
  //     id: 275,
  //     video: MI276,
  //     duration: 155000,
  //     name: "Inlet Duct",
  //     top: 239,
  //     left: 1215,
  //   },
  // ],
  // ti: [
  //   {
  //     id: 0,
  //     video: CI1,
  //     duration: 5500,
  //     name: "Manhole Turbine Cylinder",
  //     top: 235,
  //     left: 545,
  //   },
  //   {
  //     id: 1,
  //     video: CI2,
  //     duration: 5500,
  //     name: "Flame Detector",
  //     top: 222,
  //     left: 685,
  //   },
  //   {
  //     id: 2,
  //     video: CI3,
  //     duration: 7500,
  //     name: "Flame Igniter",
  //     top: 235,
  //     left: 525,
  //   },
  //   {
  //     id: 3,
  //     video: CI4,
  //     duration: 4500,
  //     name: "Discavity Temperature",
  //     top: 210,
  //     left: 440,
  //   },
  //   {
  //     id: 4,
  //     video: CI5,
  //     duration: 5500,
  //     name: "Black Patch Temperature",
  //     top: 238,
  //     left: 420,
  //   },
  //   {
  //     id: 5,
  //     video: CI6,
  //     duration: 3500,
  //     name: "Fuel Branch Pipe",
  //     top: 238,
  //     left: 420,
  //   },
  //   {
  //     id: 6,
  //     video: CI7,
  //     duration: 7500,
  //     name: "Cross Flame Tube",
  //     top: 235,
  //     left: 370,
  //   },
  //   { id: 7, video: CI8, duration: 5500, name: "Top Hat", top: 235, left: 505 },
  //   {
  //     id: 8,
  //     video: CI9,
  //     duration: 4500,
  //     name: "Fuel Nozzle",
  //     top: 235,
  //     left: 715,
  //   },
  //   {
  //     id: 9,
  //     video: CI10,
  //     duration: 4500,
  //     name: "Combuster Basket",
  //     top: 235,
  //     left: 660,
  //   },
  //   {
  //     id: 10,
  //     video: CI11,
  //     duration: 1500,
  //     name: "Top Hat",
  //     top: 240,
  //     left: 540,
  //   },
  //   {
  //     id: 11,
  //     video: TI12,
  //     duration: 1500,
  //     name: "Cooling Pipe",
  //     top: 240,
  //     left: 700,
  //   },
  //   {
  //     id: 12,
  //     video: TI13,
  //     duration: 1500,
  //     name: "Turbine Cylinder",
  //     top: 241,
  //     left: 1010,
  //   },
  //   {
  //     id: 13,
  //     video: TI14,
  //     duration: 1500,
  //     name: "Bypass Elbow",
  //     top: 240,
  //     left: 970,
  //   },
  //   {
  //     id: 14,
  //     video: TI15,
  //     duration: 1500,
  //     name: "Transition Piece",
  //     top: 240,
  //     left: 1010,
  //   },
  //   {
  //     id: 15,
  //     video: TI16,
  //     duration: 1500,
  //     name: "U Support",
  //     top: 240,
  //     left: 1180,
  //   },
  //   {
  //     id: 16,
  //     video: TI17,
  //     duration: 1500,
  //     name: "Bypass Ring",
  //     top: 240,
  //     left: 960,
  //   },
  //   {
  //     id: 17,
  //     video: TI18,
  //     duration: 1500,
  //     name: "Turbine Vane Row 1 Upper",
  //     top: 240,
  //     left: 770,
  //   },
  //   {
  //     id: 18,
  //     video: TI19,
  //     duration: 1500,
  //     name: "Turbine Vane Row 4 Upper",
  //     top: 240,
  //     left: 860,
  //   },
  //   {
  //     id: 19,
  //     video: TI20,
  //     duration: 1500,
  //     name: "Turbine Vane Row 3 Upper",
  //     top: 240,
  //     left: 980,
  //   },
  //   {
  //     id: 20,
  //     video: TI21,
  //     duration: 1500,
  //     name: "Turbine Vane Row 2 Upper",
  //     top: 240,
  //     left: 640,
  //   },
  //   {
  //     id: 21,
  //     video: TI22,
  //     duration: 1500,
  //     name: "Turbine Blade Ring 1",
  //     top: 240,
  //     left: 815,
  //   },
  //   {
  //     id: 22,
  //     video: TI23,
  //     duration: 1500,
  //     name: "Turbine Seal Housing Row 2",
  //     top: 240,
  //     left: 690,
  //   },
  //   {
  //     id: 23,
  //     video: TI24,
  //     duration: 1500,
  //     name: "Turbine Seal Housing Row 3",
  //     top: 240,
  //     left: 1100,
  //   },
  //   {
  //     id: 24,
  //     video: TI25,
  //     duration: 1500,
  //     name: "Turbine Seal Housing Row 4 Lower",
  //     top: 240,
  //     left: 1090,
  //   },
  //   {
  //     id: 25,
  //     video: TI26,
  //     duration: 1500,
  //     name: "Turbine Blade Ring Row 1 Lower",
  //     top: 428,
  //     left: 780,
  //   },
  //   {
  //     id: 26,
  //     video: TI27,
  //     duration: 1500,
  //     name: "Turbine Blade Ring Row 2 Lower",
  //     top: 240,
  //     left: 610,
  //   },
  //   {
  //     id: 27,
  //     video: TI28,
  //     duration: 1500,
  //     name: "Turbine Blade Ring Row 3 Lower",
  //     top: 240,
  //     left: 1000,
  //   },
  //   {
  //     id: 28,
  //     video: TI29,
  //     duration: 1500,
  //     name: "Turbine Blade Ring Row 4 Lower",
  //     top: 241,
  //     left: 830,
  //   },
  //   {
  //     id: 29,
  //     video: TI30,
  //     duration: 1500,
  //     name: "Turbine Blade Row 1",
  //     top: 243,
  //     left: 750,
  //   },
  //   {
  //     id: 30,
  //     video: TI31,
  //     duration: 1500,
  //     name: "Turbine Blade Row 2",
  //     top: 242,
  //     left: 640,
  //   },
  //   {
  //     id: 31,
  //     video: TI32,
  //     duration: 1500,
  //     name: "Turbine Blade Row 3",
  //     top: 241,
  //     left: 950,
  //   },
  //   {
  //     id: 32,
  //     video: TI33,
  //     duration: 1500,
  //     name: "Turbine Ring Segment Row 1 Upper",
  //     top: 240,
  //     left: 880,
  //   },
  //   {
  //     id: 33,
  //     video: TI34,
  //     duration: 1500,
  //     name: "",
  //     top: 0,
  //     left: 0,
  //   },
  //   {
  //     id: 34,
  //     video: TI35,
  //     duration: 1500,
  //     name: "Turbine Ring Segment Row 1 Upper",
  //     top: 240,
  //     left: 725,
  //   },
  //   {
  //     id: 35,
  //     video: TI36,
  //     duration: 1500,
  //     name: "Turbine Ring Segment Row 2 Upper",
  //     top: 240,
  //     left: 770,
  //   },
  //   {
  //     id: 36,
  //     video: TI37,
  //     duration: 1500,
  //     name: "Turbine Vane Segment Row 2 Upper",
  //     top: 240,
  //     left: 890,
  //   },
  //   {
  //     id: 37,
  //     video: TI38,
  //     duration: 1500,
  //     name: "",
  //     top: 0,
  //     left: 0,
  //   },
  //   {
  //     id: 38,
  //     video: TI39,
  //     duration: 1500,
  //     name: "Turbine Vane Segment Row 2 Upper",
  //     top: 240,
  //     left: 890,
  //   },
  //   {
  //     id: 39,
  //     video: TI40,
  //     duration: 1500,
  //     name: "Turbine Ring Segment Row 2 Upper",
  //     top: 240,
  //     left: 770,
  //   },
  //   {
  //     id: 40,
  //     video: TI41,
  //     duration: 1500,
  //     name: "Turbine Ring Segment Row 3 Upper",
  //     top: 241,
  //     left: 680,
  //   },
  //   {
  //     id: 41,
  //     video: TI42,
  //     duration: 1500,
  //     name: "Turbine Vane Segment Row 3 Upper",
  //     top: 241,
  //     left: 890,
  //   },
  //   {
  //     id: 42,
  //     video: TI43,
  //     duration: 1500,
  //     name: "",
  //     top: 0,
  //     left: 0,
  //   },
  //   {
  //     id: 43,
  //     video: TI44,
  //     duration: 1500,
  //     name: "Turbine Vane Segment Row 3 Upper",
  //     top: 241,
  //     left: 890,
  //   },
  //   {
  //     id: 44,
  //     video: TI45,
  //     duration: 1500,
  //     name: "Turbine Ring Segment Row 3 Upper",
  //     top: 241,
  //     left: 690,
  //   },
  //   {
  //     id: 45,
  //     video: TI46,
  //     duration: 1500,
  //     name: "Turbine Ring Segment Row 4 Upper",
  //     top: 241,
  //     left: 690,
  //   },
  //   {
  //     id: 46,
  //     video: TI47,
  //     duration: 1500,
  //     name: "Turbine Vane Segment Row 4 Upper",
  //     top: 241,
  //     left: 890,
  //   },
  //   {
  //     id: 47,
  //     video: TI48,
  //     duration: 1500,
  //     name: "",
  //     top: 0,
  //     left: 0,
  //   },
  //   {
  //     id: 48,
  //     video: TI49,
  //     duration: 1500,
  //     name: "Turbine Vane Segment Row 4 Upper",
  //     top: 241,
  //     left: 890,
  //   },
  //   {
  //     id: 49,
  //     video: TI50,
  //     duration: 1500,
  //     name: "Turbine Ring Segment Row 4 Upper",
  //     top: 241,
  //     left: 690,
  //   },
  //   {
  //     id: 50,
  //     video: TI51,
  //     duration: 1500,
  //     name: "Turbine Ring Segment Row 1 Lower",
  //     top: 241,
  //     left: 690,
  //   },
  //   {
  //     id: 51,
  //     video: TI52,
  //     duration: 1500,
  //     name: "",
  //     top: 0,
  //     left: 0,
  //   },
  //   {
  //     id: 52,
  //     video: TI53,
  //     duration: 1500,
  //     name: "Turbine Ring Segment Row 1 Lower",
  //     top: 241,
  //     left: 690,
  //   },
  //   {
  //     id: 53,
  //     video: TI54,
  //     duration: 1500,
  //     name: "Turbine Seal Housing Row 2 Lower",
  //     top: 241,
  //     left: 930,
  //   },
  //   {
  //     id: 54,
  //     video: TI55,
  //     duration: 1500,
  //     name: "Turbine Ring Segment Row 2 Lower",
  //     top: 241,
  //     left: 730,
  //   },
  //   {
  //     id: 55,
  //     video: TI56,
  //     duration: 1500,
  //     name: "Turbine Vane Segment Row 2 Lower",
  //     top: 240,
  //     left: 810,
  //   },
  //   {
  //     id: 56,
  //     video: TI57,
  //     duration: 1500,
  //     name: "",
  //     top: 0,
  //     left: 0,
  //   },
  //   {
  //     id: 57,
  //     video: TI58,
  //     duration: 1500,
  //     name: "Turbine Vane Segment Row 2 Lower",
  //     top: 240,
  //     left: 810,
  //   },
  //   {
  //     id: 58,
  //     video: TI59,
  //     duration: 1500,
  //     name: "Turbine Ring Segment Row 2 Lower",
  //     top: 240,
  //     left: 730,
  //   },
  //   {
  //     id: 59,
  //     video: TI60,
  //     duration: 1500,
  //     name: "Turbine Seal Housing Row 2 Lower",
  //     top: 241,
  //     left: 935,
  //   },
  //   {
  //     id: 60,
  //     video: TI61,
  //     duration: 1500,
  //     name: "Turbine Seal Housing Row 3 Lower",
  //     top: 242,
  //     left: 1110,
  //   },
  //   {
  //     id: 61,
  //     video: TI62,
  //     duration: 1500,
  //     name: "Turbine Ring Segment Row 3 Lower",
  //     top: 241,
  //     left: 860,
  //   },
  //   {
  //     id: 62,
  //     video: TI63,
  //     duration: 1500,
  //     name: "Turbine Vane Segment Row 3 Lower",
  //     top: 241,
  //     left: 1005,
  //   },
  //   {
  //     id: 63,
  //     video: TI64,
  //     duration: 1500,
  //     name: "",
  //     top: 0,
  //     left: 0,
  //   },
  //   {
  //     id: 64,
  //     video: TI65,
  //     duration: 1500,
  //     name: "Turbine Vane Segment Row 3 Lower",
  //     top: 241,
  //     left: 1010,
  //   },
  //   {
  //     id: 65,
  //     video: TI66,
  //     duration: 1500,
  //     name: "Turbine Ring Segment Row 3 Lower",
  //     top: 241,
  //     left: 860,
  //   },
  //   {
  //     id: 66,
  //     video: TI67,
  //     duration: 1500,
  //     name: "Turbine Seal Housing Row 3 Lower",
  //     top: 242,
  //     left: 1110,
  //   },
  //   {
  //     id: 67,
  //     video: TI68,
  //     duration: 1500,
  //     name: "Turbine Seal Housing Row 4 Lower",
  //     top: 241,
  //     left: 1090,
  //   },
  //   {
  //     id: 68,
  //     video: TI69,
  //     duration: 155000,
  //     name: "Turbine Ring Segment Row 4 Lower",
  //     top: 240,
  //     left: 750,
  //   },
  //   {
  //     id: 69,
  //     video: TI70,
  //     duration: 155000,
  //     name: "Turbine Vane Segment Row 4 Lower",
  //     top: 240,
  //     left: 940,
  //   },
  //   {
  //     id: 70,
  //     video: TI71,
  //     duration: 155000,
  //     name: "",
  //     top: 0,
  //     left: 0,
  //   },
  //   {
  //     id: 71,
  //     video: TI72,
  //     duration: 155000,
  //     name: "Turbine Vane Segment Row 4 Lower",
  //     top: 241,
  //     left: 940,
  //   },
  //   {
  //     id: 72,
  //     video: TI73,
  //     duration: 155000,
  //     name: "Turbine Ring Segment Row 4 Lower",
  //     top: 240,
  //     left: 750,
  //   },
  //   {
  //     id: 73,
  //     video: TI74,
  //     duration: 155000,
  //     name: "Turbine Seal Housing Row 4 Lower",
  //     top: 241,
  //     left: 1140,
  //   },
  //   {
  //     id: 74,
  //     video: TI75,
  //     duration: 155000,
  //     name: "Turbine Blade Row 3",
  //     top: 241,
  //     left: 1090,
  //   },
  //   {
  //     id: 75,
  //     video: TI76,
  //     duration: 155000,
  //     name: "Turbine Blade Row 2",
  //     top: 240,
  //     left: 620,
  //   },
  //   {
  //     id: 76,
  //     video: TI77,
  //     duration: 155000,
  //     name: "Turbine Blade Row 1",
  //     top: 240,
  //     left: 785,
  //   },
  //   {
  //     id: 77,
  //     video: TI78,
  //     duration: 155000,
  //     name: "Turbine Blade Ring Row 4 Lower",
  //     top: 241,
  //     left: 920,
  //   },
  //   {
  //     id: 78,
  //     video: TI79,
  //     duration: 155000,
  //     name: "Turbine Blade Ring Row 3 Lower",
  //     top: 241,
  //     left: 1120,
  //   },
  //   {
  //     id: 79,
  //     video: TI80,
  //     duration: 155000,
  //     name: "Turbine Blade Ring Row 2 Lower",
  //     top: 241,
  //     left: 545,
  //   },
  //   {
  //     id: 80,
  //     video: TI81,
  //     duration: 155000,
  //     name: "Turbine Blade Ring Row 1 Lower",
  //     top: 241,
  //     left: 645,
  //   },
  //   {
  //     id: 81,
  //     video: TI82,
  //     duration: 155000,
  //     name: "Turbine Seal Housing Row 2 Upper",
  //     top: 241,
  //     left: 550,
  //   },
  //   {
  //     id: 82,
  //     video: TI83,
  //     duration: 155000,
  //     name: "Turbine Seal Housing Row 3 Upper",
  //     top: 241,
  //     left: 445,
  //   },
  //   {
  //     id: 83,
  //     video: TI84,
  //     duration: 155000,
  //     name: "Turbine Seal Housing Row 4 Upper",
  //     top: 240,
  //     left: 1030,
  //   },
  //   {
  //     id: 84,
  //     video: TI85,
  //     duration: 155000,
  //     name: "Turbine Blade Ring Row 1 Upper",
  //     top: 238,
  //     left: 620,
  //   },
  //   {
  //     id: 85,
  //     video: TI86,
  //     duration: 155000,
  //     name: "Turbine Blade Ring Row 2 Upper",
  //     top: 238,
  //     left: 1120,
  //   },
  //   {
  //     id: 86,
  //     video: TI87,
  //     duration: 155000,
  //     name: "Turbine Blade Ring Row 3 Upper",
  //     top: 239,
  //     left: 990,
  //   },
  //   {
  //     id: 87,
  //     video: TI88,
  //     duration: 155000,
  //     name: "Turbine Blade Ring Row 4 Upper",
  //     top: 239,
  //     left: 850,
  //   },
  //   {
  //     id: 88,
  //     video: TI89,
  //     duration: 155000,
  //     name: "Turbine Van Row 1 Upper",
  //     top: 239,
  //     left: 710,
  //   },
  //   {
  //     id: 89,
  //     video: TI90,
  //     duration: 155000,
  //     name: "Bypass Ring",
  //     top: 238,
  //     left: 840,
  //   },
  //   {
  //     id: 90,
  //     video: TI91,
  //     duration: 155000,
  //     name: "Turbine Cylinder",
  //     top: 238,
  //     left: 1085,
  //   },
  //   {
  //     id: 91,
  //     video: TI92,
  //     duration: 155000,
  //     name: "Cooling Pipe",
  //     top: 238,
  //     left: 1060,
  //   },
  //   {
  //     id: 92,
  //     video: TI93,
  //     duration: 155000,
  //     name: "Transition Piece",
  //     top: 241,
  //     left: 1090,
  //   },
  //   {
  //     id: 93,
  //     video: CI12,
  //     duration: 3500,
  //     name: "U-Support",
  //     top: 235,
  //     left: 785,
  //   },
  //   {
  //     id: 94,
  //     video: CI13,
  //     duration: 3500,
  //     name: "Bypass Elbow",
  //     top: 235,
  //     left: 515,
  //   },
  //   {
  //     id: 95,
  //     video: CI14,
  //     duration: 3500,
  //     name: "Transition Piece",
  //     top: 237,
  //     left: 615,
  //   },
  //   { id: 96, video: CI15, duration: 3500, name: "", top: 0, left: 0 },
  //   {
  //     id: 97,
  //     video: CI16,
  //     duration: 2500,
  //     name: "Transition Piece",
  //     top: 237,
  //     left: 615,
  //   },
  //   {
  //     id: 98,
  //     video: CI17,
  //     duration: 2500,
  //     name: "U-Support",
  //     top: 237,
  //     left: 630,
  //   },
  //   {
  //     id: 99,
  //     video: CI18,
  //     duration: 5500,
  //     name: "Bypass Elbow",
  //     top: 235,
  //     left: 790,
  //   },
  //   {
  //     id: 100,
  //     video: CI19,
  //     duration: 5500,
  //     name: "Top Hat",
  //     top: 233,
  //     left: 685,
  //   },
  //   {
  //     id: 101,
  //     video: CI20,
  //     duration: 4500,
  //     name: "Cross Flame Tube",
  //     top: 237,
  //     left: 580,
  //   },
  //   {
  //     id: 102,
  //     video: CI21,
  //     duration: 5500,
  //     name: "Flame Detector",
  //     top: 237,
  //     left: 785,
  //   },
  //   {
  //     id: 103,
  //     video: CI22,
  //     duration: 8500,
  //     name: "Manhole Turbine",
  //     top: 235,
  //     left: 615,
  //   },
  //   {
  //     id: 104,
  //     video: CI23,
  //     duration: 5500,
  //     name: "Discavity Temperature",
  //     top: 230,
  //     left: 630,
  //   },
  //   {
  //     id: 105,
  //     video: CI24,
  //     duration: 3500,
  //     name: "Black Patch Temperature",
  //     top: 238,
  //     left: 420,
  //   },
  //   {
  //     id: 106,
  //     video: CI25,
  //     duration: 5500,
  //     name: "Fuel Branch Pipe",
  //     top: 237,
  //     left: 420,
  //   },
  //   {
  //     id: 107,
  //     video: CI26,
  //     duration: 4500,
  //     name: "Flame Igniter",
  //     top: 236,
  //     left: 525,
  //   },
  //   { id: 108, video: CI27, duration: 4500, name: "", top: 0, left: 0 },
  // ],
});

const videos: any = computed(() => {
  return videosData.value[(route.params.menu as string) || "ci"];
});

const currentVideo = computed(() => videos.value[currentVideoIndex.value]);

const videoSrc = ref<string | null>(null);

const loadVideo = async () => {
  if (currentVideo.value) {
    videoSrc.value = (await currentVideo.value.video()).default;
  }
};

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
        `/${route.params.id}/create/unit/${route.params.id_unit}/ci/scope`
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
    `/${route.params.id}/create/unit/${route.params.id_unit}/add-scope`
  );
};

const handleSave = () => {
  router.push(`/${route.params.id}/create/unit/${route.params.id_unit}/result`);
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

watch(
  currentVideoIndex,
  (value) => {
    console.log("OII");
    loadVideo();
  },
  { immediate: true }
);

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
        :src="videoSrc as string"
        @ended="handleVideoEnd"
        autoplay
        muted
        playsinline
        class="scope-video"
      ></video>
      <!-- <div v-for="(item, key) in videos" :key="key">
        <div
          v-if="
            isButtonVisible && currentVideoIndex === key && item.name !== ''
          "
          class="absolute"
          :style="{ top: `${item.top}px`, left: `${item.left}px` }"
        >
          <ButtonPart :text="item.name" />
        </div>
      </div> -->
    </div>
  </div>

  <!-- <DialogRoot v-model:open="openStep">
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
          <ul
            v-if="route.params.menu === 'ci'"
            class="mt-2 max-h-[calc(100vh-220px)] overflow-y-auto"
          >
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
          <ul v-else class="mt-2 max-h-[calc(100vh-220px)] overflow-y-auto">
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
  </DialogRoot> -->
</template>

<style lang="sass" scoped>
.wrapper-bid
  @apply absolute top-[120px] left-10 z-[100]
</style>
