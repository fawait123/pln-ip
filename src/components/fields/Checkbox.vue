<script setup lang="ts">
import { computed, ref } from "vue";
import { CheckboxIndicator, CheckboxRoot } from "radix-vue";
import { v4 as uuidv4 } from "uuid";

import { Icon } from "@/components";

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: Boolean,
  },
  checked: {
    type: Boolean,
    default: false,
  },
  notes: {
    type: String,
  },
  disabled: {
    type: Boolean,
  },
});

const emit = defineEmits(["update:modelValue", "change"]);

const id = ref(uuidv4());

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const classes = computed(() => {
  return props.disabled ? "is-disabled" : "is-default";
});

const check = computed(() => {
  if (!props.modelValue) {
    return props.checked;
  } else {
    return props.modelValue;
  }
});
</script>

<template>
  <div class="pln-checkbox">
    <div class="pln-checkbox--wrapper" :class="classes" @click.stop>
      <CheckboxRoot
        class="pln-checkbox-root"
        :id="id"
        :disabled="props.disabled"
        :class="[
          { 'root-unchecked': !model && !check },
          { 'is-disabled': disabled },
        ]"
        v-model:checked="model"
        @update:checked="(e) => $emit('change', e)"
      >
        <CheckboxIndicator class="pln-checkbox-indicator">
          <Icon name="check" class="pln-checkbox-icon" />
        </CheckboxIndicator>
      </CheckboxRoot>
      <label v-if="label !== ''" :for="id" class="pln-checkbox-text">
        {{ label }}
      </label>
    </div>
    <span v-if="notes !== undefined" class="pln-checkbox--notes">
      {{ notes }}
    </span>
  </div>
</template>

<style lang="sass">
.pln-checkbox
  @apply flex flex-col w-full
  &--wrapper
    @apply flex flex-row gap-2 items-center w-fit
    .pln-checkbox-root
      @apply flex h-4 w-4 appearance-none items-center justify-center rounded outline-none
      .pln-checkbox-indicator
        @apply h-4 w-4 rounded flex items-center justify-center border outline-none border-cyan-600
        .pln-checkbox-icon
          @apply h-4 w-4 text-cyan-600
      &:hover
        &.root-unchecked
          @apply border-cyan-600

    .root-unchecked
      @apply min-h-4 min-w-4 rounded flex items-center justify-center border outline-none border-neutral-400
    .pln-checkbox-text
      @apply select-none text-sm w-fit text-neutral-950
    &.is-default
      .pln-checkbox-text
        @apply cursor-pointer text-neutral-950
    .is-disabled
      @apply cursor-not-allowed
  &--notes
    @apply text-xs mt-1 pl-6 text-neutral-500
</style>
