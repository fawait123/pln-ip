<script setup lang="ts">
import { reactive, ref, computed, type PropType, watch } from "vue";

import { Button, Input, Modal, Select, Textarea } from "@/components";
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";

import type {
  LocationCreateInterface,
  LocationInterface,
} from "../types/LocationType";

const props = defineProps({
  selected_value: {
    type: Object as PropType<LocationInterface>,
  },
});

const modelValue = defineModel<boolean>({ default: false });
const OptionsType = [
  {
    label: "PLTG/U",
    value: "#D84040",
  },
  {
    label: "PLTU",
    value: "#000000",
  },
  {
    label: "PLTA",
    value: "#EB5A3C",
  },
  {
    label: "PLTP",
    value: "#7E5CAD",
  },
  {
    label: "PLTD/G",
    value: "#ECE852",
  },
  {
    label: "PLTMG",
    value: "#FFFFFF",
  },
];

const model = ref<LocationCreateInterface>({
  name: "",
  lat: "",
  lon: "",
  slug: "",
  description: "",
  color: "",
});
const v$_form = reactive(useVuelidate());
const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage(`This field is required`, required),
    },
    lat: {
      required: helpers.withMessage(`This field is required`, required),
    },
    lon: {
      required: helpers.withMessage(`This field is required`, required),
    },
    slug: {
      required: helpers.withMessage(`This field is required`, required),
    },
    description: {
      required: helpers.withMessage(`This field is required`, required),
    },
    color: {
      required: helpers.withMessage(`This field is required`, required),
    },
  };
});

const handleSubmit = async () => {
  const isValid = await v$_form.value.$validate();

  if (!isValid) return;
};

watch(modelValue, (value) => {
  if (!value) {
    model.value = {
      name: "",
      lat: "",
      lon: "",
      slug: "",
      description: "",
      color: "",
    };
  }
});
</script>

<template>
  <Modal
    width="440"
    height="200"
    :showButtonClose="false"
    title="Tambah Location"
    v-model="modelValue"
  >
    <form
      class="flex flex-col gap-4 max-h-[calc(100vh-200px)] overflow-y-auto mx-[-20px] px-5"
      @submit.prevent="handleSubmit"
    >
      <Input v-model="model.name" :rules="rules.name" label="Nama" />
      <Input v-model="model.lat" :rules="rules.lat" label="Latitude" />
      <Input v-model="model.lon" :rules="rules.lon" label="Longitude" />
      <Input v-model="model.slug" :rules="rules.slug" label="Slug" />
      <Textarea
        v-model="model.description"
        label="Deskripsi"
        :rules="rules.description"
        :rows="3"
      />
      <Select
        v-model="model.color"
        label="Jenis Pembangkit"
        options_label="label"
        options_value="value"
        :rules="rules.color"
        :options="OptionsType"
      />

      <div class="w-full flex items-center gap-4 mt-4">
        <Button
          text="Batal"
          class="w-full"
          variant="secondary"
          @click="modelValue = false"
        />
        <Button type="submit" text="Simpan" class="w-full" color="blue" />
      </div>
    </form>
  </Modal>
</template>
