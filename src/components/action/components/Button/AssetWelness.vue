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
import { Input, Icon } from "@/components";

const props = defineProps({
  value: {
    type: Object as PropType<{
      color: string;
      result: { id: number; note: string }[];
    } | null>,
  },
  label: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["save"]);

const modelOpenInputData = ref(false);
const buttonActive = ref<"red" | "green" | "yellow" | "">("");
const model = ref("");
const resultSaved = ref<{ id: number; note: string }[]>([]);

const add = () => {
  if (model.value !== "") {
    resultSaved.value.push({
      id: resultSaved.value?.length + 1,
      note: model.value,
    });
    model.value = "";
  }
};

const handleDelete = (id: number) => {
  resultSaved.value = resultSaved.value.filter((item) => item.id !== id);
};

const cancel = () => {
  modelOpenInputData.value = false;
  resultSaved.value = [];
};

const save = () => {
  emit("save", { color: buttonActive.value, result: resultSaved.value });
  modelOpenInputData.value = false;
};

const onClear = () => {
  buttonActive.value = "";
};

watch(
  () => props.value,
  (val) => {
    if (val) {
      buttonActive.value = val?.color as "red" | "green" | "yellow";
      resultSaved.value = val.result;
    } else {
      buttonActive.value = "";
      resultSaved.value = [];
    }
  },
  { deep: true }
);

watch(modelOpenInputData, (val) => {
  if (props.value) {
    buttonActive.value = props.value.color as "red" | "green" | "yellow";
    resultSaved.value = props.value.result;
  } else {
    buttonActive.value = "";
    resultSaved.value = [];
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
          (value && value?.color !== '') || (value && value?.result?.length > 0)
            ? value?.color === 'red'
              ? '!bg-red-500'
              : value?.color === 'yellow'
              ? '!bg-yellow-500'
              : value?.color === 'green'
              ? '!bg-green-500'
              : ''
            : '',
        ]"
      >
        {{
          (value && value?.color !== "") || (value && value?.result?.length > 0)
            ? value.color === "red"
              ? "Red"
              : value.color === "yellow"
              ? "Yellow"
              : value.color === "green"
              ? "Green"
              : ""
            : "Add"
        }}
      </button>
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent :side-offset="5" class="popover-content">
        <p class="popover-title">{{ label }}</p>
        <div class="button-colors">
          <button
            class="button-red"
            :class="{ 'red-active': buttonActive === 'red' }"
            @click="buttonActive = 'red'"
          >
            Red
          </button>
          <button
            class="button-yellow"
            :class="{ 'yellow-active': buttonActive === 'yellow' }"
            @click="buttonActive = 'yellow'"
          >
            Yellow
          </button>
          <button
            class="button-green"
            :class="{ 'green-active': buttonActive === 'green' }"
            @click="buttonActive = 'green'"
          >
            Green
          </button>
          <button class="button-clear" @click="onClear">Clear</button>
        </div>
        <div class="popover-input mt-4">
          <div class="w-[400px]">
            <Input id="input-note" size="sm" v-model="model" />
          </div>
          <button class="popover-button-trigger" @click="add">Add</button>
        </div>
        <div class="popover-body">
          <p class="popover-body-title">Note</p>
          <div class="popover-body-list">
            <div v-if="resultSaved?.length === 0" class="popover-body-empty">
              <p>Tidak ada data</p>
            </div>
            <div
              v-else
              v-for="(item, key) in resultSaved"
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
  @apply bg-transparent border border-neutral-50 rounded-lg px-2 min-w-[100px] text-base text-neutral-50 hover:bg-cyan-500

.button-trigger-active
  @apply bg-cyan-500

.popover-content
  @apply rounded mx-4 px-2 pt-2 pb-4 min-w-[400px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade
  .popover-title
    @apply text-base font-medium text-neutral-950
  .button-colors
    @apply flex items-center gap-2 mt-2
    > button
      @apply min-w-[100px] rounded-lg bg-buttonGray py-1 px-3 cursor-pointer text-[13px] text-neutral-50
    .button-red
      @apply hover:bg-red-500
    .button-yellow
      @apply hover:bg-yellow-400
    .button-green
      @apply hover:bg-green-500
    .button-clear
      @apply hover:bg-cyan-500
    .red-active
      @apply bg-red-500
    .yellow-active
      @apply bg-yellow-400
    .green-active
      @apply bg-green-500
</style>
