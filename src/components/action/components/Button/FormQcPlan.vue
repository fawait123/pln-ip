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
import { Input, Icon, Upload } from "@/components";
import type { ValueUploadType } from "@/components/fields/Upload.vue";

const props = defineProps({
  value: {
    type: Object as PropType<ValueUploadType[]>,
  },
  label: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["save"]);

const modelOpenInputData = ref(false);
const modelUpload = ref<ValueUploadType[]>([]);

const cancel = () => {
  modelOpenInputData.value = false;
  modelUpload.value = [];
};

const save = () => {
  emit("save", modelUpload.value);
  modelOpenInputData.value = false;
};

watch(
  () => props.value,
  (val) => {
    if (val) {
      modelUpload.value = val;
    } else {
      modelUpload.value = [];
    }
  },
  { deep: true }
);

watch(modelOpenInputData, (val) => {
  if (props.value) {
    modelUpload.value = props.value;
  } else {
    modelUpload.value = [];
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
          value && value?.length > 0 ? 'button-trigger-active' : '',
        ]"
      >
        {{ value && value?.length > 0 ? "Active" : "QC Plan" }}
      </button>
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent :side-offset="5" class="popover-content-upload-qc-plan">
        <div class="mt-4">
          <Upload v-model="modelUpload" multiple />
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

.popover-content-upload-qc-plan
  @apply rounded mx-4 px-2 pt-2 pb-4 min-w-[400px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade
</style>
