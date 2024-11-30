<script setup lang="ts">
import {
  PopoverArrow,
  PopoverClose,
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsRoot,
  TabsTrigger,
} from "radix-vue";
import { Select, Input } from "@/components";
import { ref } from "vue";
import ManPower from "./components/InputData/ManPower.vue";
import Material from "./components/InputData/Material.vue";
import Tools from "./components/InputData/Tools.vue";
import IkOnline from "./components/InputData/IkOnline.vue";
import Duration from "./components/InputData/Duration.vue";

import AssetWelness from "./components/AssetCondition/AssetWelness.vue";
import OhRecom from "./components/AssetCondition/OhRecom.vue";
import WoPriority from "./components/AssetCondition/WoPriority.vue";
import History from "./components/AssetCondition/History.vue";
import PDM from "./components/AssetCondition/PDM.vue";
import RLA from "./components/AssetCondition/RLA.vue";

const modelOpenInputData = ref(false);
const modelTabsInputData = ref("");
const modelOpenAssetCondition = ref(false);
const modelTabsAssetCondition = ref("");
</script>

<template>
  <div class="flex gap-2">
    <PopoverRoot v-model:open="modelOpenInputData">
      <PopoverTrigger>
        <button
          class="bp-trigger"
          :class="{
            'bp-trigger-active': modelOpenInputData === true,
          }"
        >
          Input Data
        </button>
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent :side-offset="5" class="bp-content">
          <TabsRoot v-model="modelTabsInputData">
            <TabsList class="bp-content--tablist">
              <div class="bp-content--tablist-wrapper">
                <TabsTrigger
                  value="man-power"
                  class="bp-content--trigger"
                  :class="{
                    'trigger-active': modelTabsInputData === 'man-power',
                  }"
                >
                  Man Power
                </TabsTrigger>
                <TabsTrigger
                  value="duration"
                  class="bp-content--trigger"
                  :class="{
                    'trigger-active': modelTabsInputData === 'duration',
                  }"
                >
                  Duration
                </TabsTrigger>
                <TabsTrigger
                  value="material"
                  class="bp-content--trigger"
                  :class="{
                    'trigger-active': modelTabsInputData === 'material',
                  }"
                >
                  Material
                </TabsTrigger>
                <TabsTrigger
                  value="tools"
                  class="bp-content--trigger"
                  :class="{ 'trigger-active': modelTabsInputData === 'tools' }"
                >
                  Tools
                </TabsTrigger>
                <TabsTrigger
                  value="ik-online"
                  class="bp-content--trigger"
                  :class="{
                    'trigger-active': modelTabsInputData === 'ik-online',
                  }"
                >
                  IK Online
                </TabsTrigger>
              </div>
            </TabsList>
            <TabsContent value="man-power" forceMount>
              <ManPower
                @cancel="modelOpenInputData = false"
                @save="modelOpenInputData = false"
              />
            </TabsContent>
            <TabsContent value="duration" forceMount><Duration /> </TabsContent>
            <TabsContent value="material" forceMount>
              <Material
                @cancel="modelOpenInputData = false"
                @save="modelOpenInputData = false"
            /></TabsContent>
            <TabsContent value="tools" forceMount
              ><Tools
                @cancel="modelOpenInputData = false"
                @save="modelOpenInputData = false"
            /></TabsContent>
            <TabsContent value="ik-online" forceMount
              ><IkOnline
                @download="modelOpenInputData = false"
                @view="modelOpenInputData = false"
            /></TabsContent>
          </TabsRoot>
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
    <PopoverRoot v-model:open="modelOpenAssetCondition">
      <PopoverTrigger>
        <button
          class="bp-trigger"
          :class="{
            'bp-trigger-active': modelOpenAssetCondition === true,
          }"
        >
          Asset Condition
        </button>
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent :side-offset="5" class="bp-content">
          <TabsRoot v-model="modelTabsAssetCondition">
            <TabsList class="bp-content--tablist">
              <div class="bp-content--tablist-wrapper">
                <TabsTrigger
                  value="asset-welness"
                  class="bp-content--trigger"
                  :class="{
                    'trigger-active':
                      modelTabsAssetCondition === 'asset-welness',
                  }"
                >
                  Asset Welness
                </TabsTrigger>
                <TabsTrigger
                  value="oh-recom"
                  class="bp-content--trigger"
                  :class="{
                    'trigger-active': modelTabsAssetCondition === 'oh-recom',
                  }"
                >
                  OH Recom
                </TabsTrigger>
                <TabsTrigger
                  value="wo-priority"
                  class="bp-content--trigger"
                  :class="{
                    'trigger-active': modelTabsAssetCondition === 'wo-priority',
                  }"
                >
                  WO Priority
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  class="bp-content--trigger"
                  :class="{
                    'trigger-active': modelTabsAssetCondition === 'history',
                  }"
                >
                  History
                </TabsTrigger>
                <TabsTrigger
                  value="pdm"
                  class="bp-content--trigger"
                  :class="{
                    'trigger-active': modelTabsAssetCondition === 'pdm',
                  }"
                >
                  PDM
                </TabsTrigger>
                <TabsTrigger
                  value="rla"
                  class="bp-content--trigger"
                  :class="{
                    'trigger-active': modelTabsAssetCondition === 'rla',
                  }"
                >
                  RLA
                </TabsTrigger>
              </div>
            </TabsList>
            <TabsContent value="asset-welness" forceMount>
              <AssetWelness
                @cancel="modelOpenAssetCondition = false"
                @save="modelOpenAssetCondition = false"
              />
            </TabsContent>
            <TabsContent value="oh-recom" forceMount>
              <OhRecom
                @cancel="modelOpenAssetCondition = false"
                @save="modelOpenAssetCondition = false"
              />
            </TabsContent>
            <TabsContent value="wo-priority" forceMount>
              <WoPriority
                @cancel="modelOpenAssetCondition = false"
                @save="modelOpenAssetCondition = false"
              />
            </TabsContent>
            <TabsContent value="history" forceMount>
              <History
                @cancel="modelOpenAssetCondition = false"
                @save="modelOpenAssetCondition = false"
              />
            </TabsContent>
            <TabsContent value="pdm" forceMount>
              <PDM
                @cancel="modelOpenAssetCondition = false"
                @save="modelOpenAssetCondition = false"
              />
            </TabsContent>
            <TabsContent value="rla" forceMount>
              <RLA
                @cancel="modelOpenAssetCondition = false"
                @save="modelOpenAssetCondition = false"
              />
            </TabsContent>
          </TabsRoot>
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
  </div>
</template>

<style lang="sass">
.bp-trigger
  @apply rounded-full bg-buttonGray py-1 px-6 cursor-pointer text-sm text-neutral-50 shadow-lg shadow-neutral-700
  &:hover
    @apply bg-cyan-500
.bp-trigger-active
  @apply bg-cyan-500

.bp-content
  @apply rounded mx-4 p-5 min-w-[600px] bg-neutral-500 bg-opacity-80 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade
  &--tablist
    @apply flex items-center justify-end min-w-[700px]
    &-wrapper
      @apply grid grid-cols-5 gap-2
  .trigger-active
    @apply bg-yellow-500
  &--trigger
    @apply w-[125px] shadow-lg shadow-neutral-700 rounded-full py-1 px-4 bg-buttonGray cursor-pointer text-sm text-neutral-50
    &:hover
      @apply bg-yellow-500
</style>
