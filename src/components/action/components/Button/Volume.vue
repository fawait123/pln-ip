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

const Options = {
  material: [
    {
      label: "Can",
      value: "Can",
    },
    {
      label: "Kg",
      value: "Kg",
    },
    {
      label: "Pcs",
      value: "Pcs",
    },
    {
      label: "Set",
      value: "Set",
    },
    {
      label: "Batang",
      value: "Batang",
    },
    {
      label: "Box",
      value: "Box",
    },
  ],
  part: [
    {
      label: "Pcs",
      value: "Pcs",
    },
    {
      label: "Set",
      value: "Set",
    },
  ],
};

const props = defineProps({
  value: {
    type: String,
    default: "",
  },
  type: {
    type: String as PropType<"material" | "part">,
    default: "material",
  },
});

const emit = defineEmits(["save"]);

const modelOpenInputData = ref(false);

const cancel = () => {
  modelOpenInputData.value = false;
};

const clickItem = (e: string) => {
  emit("save", { volume: e });
  cancel();
};

const classOptionsItem = (e: string) => {
  if (e === props.value) {
    return "popover-options-volume-item-active";
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
        {{ value !== "" ? value : "+" }}
      </button>
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent :side-offset="5" class="popover-content-volume">
        <div class="popover-options-volume">
          <p
            v-for="(item, key) in Options[type]"
            :key="key"
            :class="classOptionsItem(item.value)"
            class="popover-options-volume-item"
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

.popover-content-volume
  @apply rounded mx-4 px-2 py-2 min-w-[200px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade
  .popover-options-volume
    @apply flex flex-col gap-1
    .popover-options-volume-item
      @apply text-base text-neutral-950 hover:text-cyan-500 cursor-pointer
    .popover-options-volume-item-active
      @apply text-cyan-500
</style>
