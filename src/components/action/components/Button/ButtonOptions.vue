<script setup lang="ts">
import { computed, ref, watch, type PropType } from "vue";
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
  options: {
    type: Array as PropType<{ label: string; value: string }[]>,
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
  value: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["select", "save"]);

const modelOpenInputData = ref(false);

const cancel = () => {
  modelOpenInputData.value = false;
};

const clickItem = (e: string) => {
  emit("select", e);
  cancel();
};

const classOptionsItem = (e: string) => {
  if (e === props.value) {
    return "popover-button-options-item-active";
  }
};
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
        {{ value !== "" ? value : placeholder }}
      </button>
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent :side-offset="5" class="popover-button-options-content">
        <div class="popover-button-options">
          <p
            v-for="(item, key) in options"
            :key="key"
            :class="classOptionsItem(item.value)"
            class="popover-button-options-item"
            @click="() => clickItem(item.value)"
          >
            {{ item.label }}
          </p>
        </div>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>

<style lang="sass">
.button-trigger
  @apply bg-transparent border border-neutral-50 rounded-lg px-2 min-w-[100px] text-base text-neutral-50
  &:hover
    @apply bg-cyan-500
.button-trigger-active
  @apply bg-cyan-500

.popover-button-options-content
  @apply rounded mx-4 px-2 py-2 min-w-[200px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade
  .popover-button-options
    @apply flex flex-col gap-1
    .popover-button-options-item
      @apply text-base text-neutral-950 hover:text-cyan-500 cursor-pointer
    .popover-button-options-item-active
      @apply text-cyan-500
</style>
