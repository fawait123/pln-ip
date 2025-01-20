<script setup lang="ts">
import { ref, watch, type PropType } from "vue";
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
import { Input } from "@/components";
import { numbers_positive_negative } from "@/helpers/global";

const props = defineProps({
  value: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["save"]);

const modelOpenInputData = ref(false);
const modelDuration = ref("");

const cancel = () => {
  modelOpenInputData.value = false;
  modelDuration.value = "";
};

const save = () => {
  emit("save", modelDuration.value);
  modelOpenInputData.value = false;
};

watch(
  () => props.value,
  (val) => {
    if (val) {
      modelDuration.value = val;
    } else {
      modelDuration.value = "";
    }
  },
  { deep: true }
);

watch(modelOpenInputData, (val) => {
  if (props.value) {
    modelDuration.value = props.value;
  } else {
    modelDuration.value = "";
  }
});
</script>

<template>
  <PopoverRoot v-model:open="modelOpenInputData">
    <PopoverTrigger>
      <button
        class="button-trigger"
        :class="[
          {
            'button-trigger-active': modelOpenInputData === true,
          },
        ]"
      >
        {{ value !== "" ? value : "Duration" }}
      </button>
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent :side-offset="5" class="popover-content-duration">
        <div class="mt-4 flex items-center gap-3">
          <Input
            v-model="modelDuration"
            type="text"
            :custom_symbols="numbers_positive_negative"
            label="Duration"
          />
          <p class="text-sm text-neutral-950 font-bold mt-6">Minute</p>
        </div>
        <div class="popover-footer">
          <button class="popover-footer--cancel" @click="cancel">Cancel</button>
          <button class="popover-footer--save" @click="save">Save</button>
        </div>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>

<style lang="sass">
.button-trigger
  @apply bg-transparent border border-neutral-50 rounded-lg px-2 min-w-[120px] text-base text-neutral-50
  &:hover
    @apply bg-cyan-500
.button-trigger-active
  @apply bg-cyan-500
.value-trigger
  @apply text-base text-neutral-50

.popover-content-duration
  @apply rounded mx-4 px-2 pt-2 pb-4 min-w-[250px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade
</style>
