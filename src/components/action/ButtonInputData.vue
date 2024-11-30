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
import ManPower from "./components/ManPower.vue";
import Material from "./components/Material.vue";
import Tools from "./components/Tools.vue";
import IkOnline from "./components/IkOnline.vue";
import Duration from "./components/Duration.vue";

const modelTabs = ref("");
const modelOpen = ref(false);
</script>

<template>
  <PopoverRoot v-model:open="modelOpen">
    <PopoverTrigger>
      <button class="button-id">Input Data</button>
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent :side-offset="5" class="popover-id">
        <TabsRoot v-model="modelTabs">
          <TabsList class="popover-id--tablist">
            <TabsTrigger
              value="man-power"
              class="popover-id--trigger"
              :class="{ 'trigger-active': modelTabs === 'man-power' }"
            >
              Man Power
            </TabsTrigger>
            <TabsTrigger
              value="duration"
              class="popover-id--trigger"
              :class="{ 'trigger-active': modelTabs === 'duration' }"
            >
              Duration
            </TabsTrigger>
            <TabsTrigger
              value="material"
              class="popover-id--trigger"
              :class="{ 'trigger-active': modelTabs === 'material' }"
            >
              Material
            </TabsTrigger>
            <TabsTrigger
              value="tools"
              class="popover-id--trigger"
              :class="{ 'trigger-active': modelTabs === 'tools' }"
            >
              Tools
            </TabsTrigger>
            <TabsTrigger
              value="ik-online"
              class="popover-id--trigger"
              :class="{ 'trigger-active': modelTabs === 'ik-online' }"
            >
              IK Online
            </TabsTrigger>
          </TabsList>
          <TabsContent value="man-power" forceMount>
            <ManPower @cancel="modelOpen = false" @save="modelOpen = false" />
          </TabsContent>
          <TabsContent value="duration" forceMount><Duration /> </TabsContent>
          <TabsContent value="material" forceMount>
            <Material @cancel="modelOpen = false" @save="modelOpen = false"
          /></TabsContent>
          <TabsContent value="tools" forceMount
            ><Tools @cancel="modelOpen = false" @save="modelOpen = false"
          /></TabsContent>
          <TabsContent value="ik-online" forceMount
            ><IkOnline @download="modelOpen = false" @view="modelOpen = false"
          /></TabsContent>
        </TabsRoot>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>

<style lang="sass">
.button-id
  @apply rounded-full bg-buttonGray py-1 px-6 cursor-pointer text-sm text-neutral-50 shadow-lg shadow-neutral-700
  &:hover
    @apply bg-cyan-500

.popover-id
  @apply rounded mx-4 p-5 w-[600px] bg-neutral-500 bg-opacity-80 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade
  &--tablist
    @apply flex items-center justify-end gap-2
  .trigger-active
    @apply bg-yellow-500
  &--trigger
    @apply shadow-lg shadow-neutral-700 rounded-full py-1 px-4 bg-buttonGray cursor-pointer text-sm text-neutral-50
    &:hover
      @apply bg-yellow-500
</style>
