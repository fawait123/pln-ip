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
    type: Object as PropType<{
      result: { id: number; note: string }[];
      file: ValueUploadType[];
    } | null>,
  },
  label: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["save"]);

const modelOpenInputData = ref(false);
const modelNote = ref("");
const resultNote = ref<{ id: number; note: string }[]>([]);
const modelUpload = ref<ValueUploadType[]>([]);

const add = () => {
  if (modelNote.value !== "") {
    resultNote.value.push({
      id: resultNote.value?.length + 1,
      note: modelNote.value,
    });
    modelNote.value = "";
  }
};

const handleDelete = (id: number) => {
  resultNote.value = resultNote.value.filter((item) => item.id !== id);
};

const cancel = () => {
  modelOpenInputData.value = false;
  resultNote.value = [];
};

const save = () => {
  emit("save", { result: resultNote.value, file: modelUpload.value });
  modelOpenInputData.value = false;
};

watch(
  () => props.value,
  (val) => {
    if (val) {
      resultNote.value = val.result;
      modelUpload.value = val.file;
    } else {
      resultNote.value = [];
      modelUpload.value = [];
    }
  },
  { deep: true }
);

watch(modelOpenInputData, (val) => {
  if (props.value) {
    resultNote.value = props.value.result;
    modelUpload.value = props.value.file;
  } else {
    resultNote.value = [];
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
          (value && value?.file?.length > 0) ||
          (value && value?.result?.length > 0)
            ? 'button-trigger-active'
            : '',
        ]"
      >
        {{
          (value && value?.file?.length > 0) ||
          (value && value?.result?.length > 0)
            ? "Active"
            : "Add"
        }}
      </button>
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent :side-offset="5" class="popover-content-file">
        <p class="popover-title">{{ label }}</p>
        <div class="popover-input mt-4">
          <div class="w-[400px]">
            <Input id="input-note" size="sm" v-model="modelNote" />
          </div>
          <button class="popover-button-trigger" @click="add">Add</button>
        </div>
        <div class="popover-body">
          <p class="popover-body-title">Note</p>
          <div class="popover-body-list">
            <div v-if="resultNote?.length === 0" class="popover-body-empty">
              <p>Tidak ada data</p>
            </div>
            <div
              v-else
              v-for="(item, key) in resultNote"
              :key="key"
              class="w-full flex justify-between items-center gap-6"
            >
              <p>{{ key + 1 }}. {{ item.note }}</p>
              <Icon
                name="trash"
                class="mr-2 cursor-pointer text-neutral-500 hover:text-neutral-950"
                @click="handleDelete(item.id)"
              />
            </div>
          </div>
        </div>
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

.popover-content-file
  @apply rounded mx-4 px-2 pt-2 pb-4 min-w-[400px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade
  .popover-title
    @apply text-base font-medium text-neutral-950
</style>
