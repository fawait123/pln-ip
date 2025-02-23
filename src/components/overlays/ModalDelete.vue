<script setup lang="ts">
import { computed } from "vue";

import { Modal, Icon, Button } from "@/components";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "cancel", "delete"]);

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const handleCancel = () => {
  emit("update:modelValue", false);
  emit("cancel");
};

const handleDelete = () => {
  emit("delete");
};
</script>

<template>
  <Modal width="440" height="200" :showButtonClose="false" v-model="model">
    <div class="modal-delete">
      <h1 class="modal-delete--title">Confirm Delete</h1>
      <p class="modal-delete--description">
        Are you sure you want to delete "{{ title }}"?
      </p>
      <div class="modal-delete--action">
        <slot name="action">
          <Button
            text="Cancel"
            size="sm"
            rounded="full"
            color="grey"
            :disabled="loading"
            @click="handleCancel"
          />
          <Button
            text="Delete"
            size="sm"
            rounded="full"
            variant="danger"
            :disabled="loading"
            :loading="loading"
            @click="handleDelete"
          />
        </slot>
      </div>
    </div>
  </Modal>
</template>

<style lang="sass">
.modal-delete
  @apply flex flex-col
  &--icon
    @apply text-[50px] text-[var(--yellow-text)]
  &--title
    @apply text-2xl font-bold text-neutral-950 text-center mt-6
  &--description
    @apply text-base text-neutral-950 text-center mt-2
  &--action
    @apply flex items-center gap-2 mt-10 justify-center
    button
      @apply w-[100px]
</style>
