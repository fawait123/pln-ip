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
import { Input, Icon, Select } from "@/components";
import type { ValueUploadType } from "@/components/fields/Upload.vue";

const dataManPower = [
  {
    label: "Mechanical - QC",
    value: "Mechanical - QC",
  },
  {
    label: "Mechanical Project Leader",
    value: "Mechanical Project Leader",
  },
  {
    label: "Helper",
    value: "Helper",
  },
];

const props = defineProps({
  value: {
    type: Object as PropType<
      | {
          id: number;
          manpower: string;
          quantity: string;
        }[]
      | []
    >,
  },
  label: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["save"]);

const modelOpenInputData = ref(false);
const model = ref({
  manpower: "",
  quantity: "",
});
const results = ref<{ id: number; manpower: string; quantity: string }[]>([]);

const add = () => {
  if (model.value.manpower !== "" && model.value.quantity !== "") {
    results.value.push({
      id: results.value?.length + 1,
      manpower: model.value.manpower,
      quantity: model.value.quantity,
    });
    model.value.manpower = "";
    model.value.quantity = "";
  }
};

const handleDelete = (id: number) => {
  results.value = results.value.filter((item) => item.id !== id);
};

const cancel = () => {
  modelOpenInputData.value = false;
  results.value = [];
};

const save = () => {
  emit("save", results.value);
  modelOpenInputData.value = false;
};

watch(
  () => props.value,
  (val) => {
    if (val) {
      results.value = val;
    } else {
      results.value = [];
    }
  },
  { deep: true }
);

watch(modelOpenInputData, (val) => {
  if (props.value) {
    results.value = props.value;
  } else {
    results.value = [];
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
        {{ value && value?.length > 0 ? "Active" : "Manpower" }}
      </button>
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent :side-offset="5" class="popover-form-manpower">
        <p class="popover-title">{{ label }}</p>
        <div class="popover-input mt-4">
          <div class="w-[200px]">
            <Input
              id="input-manpower"
              size="sm"
              label="Manpower"
              v-model="model.manpower"
            />
          </div>
          <div class="w-[100px]">
            <Input
              id="input-quantity"
              size="sm"
              label="Quantity"
              v-model="model.quantity"
            />
          </div>
          <p class="text-sm text-neutral-950 font-bold mt-5">People</p>
          <button class="popover-button-trigger mt-5" @click="add">Add</button>
        </div>
        <div class="popover-body">
          <p class="popover-body-title">Manpower</p>
          <div class="popover-body-list">
            <div v-if="results?.length === 0" class="popover-body-empty">
              <p>Tidak ada data</p>
            </div>
            <div
              v-else
              v-for="(item, key) in results"
              :key="key"
              class="w-full flex justify-between items-center gap-6"
            >
              <p>
                {{ key + 1 }}. {{ item.manpower }} {{ item.quantity }} people
              </p>
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
  @apply bg-transparent border border-neutral-50 rounded-lg px-2 min-w-[120px] text-base text-neutral-50
  &:hover
    @apply bg-cyan-500
.button-trigger-active
  @apply bg-cyan-500

.popover-form-manpower
  @apply rounded mx-4 px-2 pt-2 pb-4 min-w-[500px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade
  .popover-title
    @apply text-base font-medium text-neutral-950
</style>
