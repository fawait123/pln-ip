<script setup lang="ts">
import { Icon, Loading } from "@/components";
import { computed, type PropType } from "vue";
import { RouterLink } from "vue-router";

type Size = "lg" | "md" | "sm";
type Variant = "primary" | "secondary" | "skin" | "danger";
type Color = "default" | "green";
type Type = "button" | "submit" | "reset" | undefined;
type Rounded = "none" | "default" | "sm" | "md" | "lg" | "xl" | "full";

const props = defineProps({
  size: {
    type: String as PropType<Size>,
    default: "md",
    validator: function (value: string) {
      return ["lg", "md", "sm"].indexOf(value) !== -1;
    },
  },
  variant: {
    type: String as PropType<Variant>,
    default: "primary",
    validator: function (value: string) {
      return ["primary", "secondary", "skin", "danger"].indexOf(value) !== -1;
    },
  },
  color: {
    type: String as PropType<Color>,
    default: "default",
    validator: function (value: string) {
      return ["default", "green"].indexOf(value) !== -1;
    },
  },
  text: {
    type: String,
    default: "",
  },
  type: {
    type: String as PropType<Type>,
    default: "button",
    validator: function (value: string) {
      return ["button", "submit", "reset"].indexOf(value) !== -1;
    },
  },
  icon_only: {
    type: String,
    default: "",
  },
  icon_before: {
    type: String,
    default: "",
  },
  icon_after: {
    type: String,
    default: "",
  },
  as_link: {
    type: Boolean,
    default: false,
  },
  url: {
    type: String,
    default: "/",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  rounded: {
    type: String as PropType<Rounded>,
    default: "default",
    validator: function (value: string) {
      return (
        ["none", "default", "sm", "md", "lg", "xl", "full"].indexOf(value) !==
        -1
      );
    },
  },
  class: {
    type: String,
    default: "",
  },
});

const classButton = computed(() => {
  return props.class;
});

const buttonsDesign = computed(() => {
  let disabled = "";
  let loading = "";
  let btn_icon = "";
  let btn_icon_before = "";
  let btn_icon_after = "";
  let btn_size = "";
  let btn_variant = "";
  let btn_rounded = "";

  if (props.size) {
    btn_size = "pln-btn--" + props.size;
  }

  if (props.variant) {
    btn_variant = "pln-btn--" + props.variant + "--" + props.color;
  }

  if (props.disabled === true) {
    btn_variant = "";
    disabled = "pln-btn--" + props.variant + "--" + props.color + "--disabled";
  } else {
    disabled = "";
  }

  if (props.loading === true) {
    loading = "pln-btn--" + props.variant + "--" + props.color + "--loading";
  } else {
    loading = "";
  }

  if (props.icon_before) {
    btn_icon_before = "pln-btn--icon-before";
  }

  if (props.icon_after) {
    btn_icon_after = "pln-btn--icon-after";
  }

  if (props.icon_only) {
    btn_icon = "pln-btn--icon-only";
  }

  if (props.rounded) {
    btn_rounded = "pln-btn--rounded--" + props.rounded;
  }

  return (
    btn_size +
    " " +
    btn_icon +
    " " +
    btn_icon_before +
    " " +
    btn_icon_after +
    " " +
    disabled +
    " " +
    loading +
    " " +
    btn_variant +
    " " +
    btn_rounded
  );
});

const widthLoading = computed(() => {
  return props.size === "sm" ? 12 : props.size === "md" ? 20 : 25;
});

const heightLoading = computed(() => {
  return props.size === "sm" ? 12 : props.size === "md" ? 20 : 25;
});
</script>

<template>
  <template v-if="as_link">
    <RouterLink :to="url" class="pln-btn" :class="[buttonsDesign, classButton]">
      <template v-if="loading">
        <div class="flex items-center gap-2">
          <span>{{ text }}</span>
          <Loading
            :disabled="disabled"
            :width="widthLoading"
            :height="heightLoading"
          />
        </div>
      </template>
      <template
        v-else-if="icon_only !== '' && icon_before === '' && icon_after === ''"
      >
        <Icon :name="icon_only" />
      </template>
      <template
        v-else-if="icon_before !== '' && icon_after === '' && icon_only === ''"
      >
        <Icon :name="icon_before" />
        <span>{{ text }}</span>
      </template>
      <template
        v-else-if="icon_after !== '' && icon_before === '' && icon_only === ''"
      >
        <span>{{ text }}</span>
        <Icon :name="icon_after" />
      </template>
      <template
        v-else-if="icon_after !== '' && icon_before !== '' && icon_only === ''"
      >
        <Icon :name="icon_before" />
        <span>{{ text }}</span>
        <Icon :name="icon_after" />
      </template>
      <template v-else>
        <span>{{ text }}</span>
      </template>
    </RouterLink>
  </template>

  <template v-else>
    <button class="pln-btn" :class="[buttonsDesign, classButton]" :type="type">
      <template v-if="loading">
        <div class="flex items-center gap-2">
          <span>{{ text }}</span>
          <Loading
            :disabled="disabled"
            :width="widthLoading"
            :height="heightLoading"
          />
        </div>
      </template>
      <template
        v-else-if="icon_only !== '' && icon_before === '' && icon_after === ''"
      >
        <Icon :name="icon_only" />
      </template>
      <template
        v-else-if="icon_before !== '' && icon_after === '' && icon_only === ''"
      >
        <Icon :name="icon_before" />
        <span>{{ text }}</span>
      </template>
      <template
        v-else-if="icon_after !== '' && icon_before === '' && icon_only === ''"
      >
        <span>{{ text }}</span>
        <Icon :name="icon_after" />
      </template>
      <template
        v-else-if="icon_after !== '' && icon_before !== '' && icon_only === ''"
      >
        <Icon :name="icon_before" />
        <span>{{ text }}</span>
        <Icon :name="icon_after" />
      </template>
      <template v-else>
        <span>{{ text }}</span>
      </template>
    </button>
  </template>
</template>

<style lang="sass">
.pln-btn
  @apply border inline-flex items-center justify-center transition-all text-base font-semibold

  &--lg
    @apply px-2.5 py-2.5 text-base font-extrabold leading-[25.6px]
    .pln-icon
      @apply w-4 h-4 flex justify-center items-center

  &--md
    @apply px-2.5 py-2 text-sm font-extrabold leading-[22.4px]
    .pln-icon
      @apply w-4 h-4 flex justify-center items-center

  &--sm
    @apply px-2 py-2 text-[10px] font-extrabold leading-[12px]
    .pln-icon
      @apply w-3 h-3 flex justify-center items-center

  &--icon-after,
  &--icon-before
    @apply gap-1

  &--icon-only
    @apply p-0 h-10 w-10

  &--rounded
    &--none
      @apply rounded-none
    &--default
      @apply rounded
    &--sm
      @apply rounded-sm
    &--md
      @apply rounded-md
    &--lg
      @apply rounded-lg
    &--xl
      @apply rounded-xl
    &--full
      @apply rounded-full

  &--primary
    &--default
      @apply bg-cyan-500 border-cyan-500 text-cyan-50
      &:hover
        @apply bg-cyan-600 border-cyan-600
      &--disabled
        @apply pointer-events-none shadow-none bg-cyan-300 border-cyan-300 text-neutral-50 #{!important}
      &--loading
        @apply border-cyan-500 bg-cyan-300 text-neutral-50
    &--green
      @apply bg-green-500 border-green-500 text-green-50
      &:hover
        @apply bg-green-600 border-green-600
      &--disabled
        @apply pointer-events-none shadow-none bg-green-300 border-green-300 text-neutral-50 #{!important}
      &--loading
        @apply border-green-500 bg-green-300 text-neutral-50
  &--secondary
    &--default
      @apply bg-transparent border-cyan-500 text-cyan-500
      &:hover
        @apply border-cyan-600 text-cyan-600
      &--disabled
        @apply bg-transparent pointer-events-none shadow-none border-cyan-300 text-cyan-300 #{!important}
      &--loading
        @apply bg-transparent border-cyan-500 text-cyan-500
    &--default
      @apply bg-transparent border-green-500 text-green-500
      &:hover
        @apply border-green-600 text-green-600
      &--disabled
        @apply bg-transparent pointer-events-none shadow-none border-green-300 text-green-300 #{!important}
      &--loading
        @apply bg-transparent border-green-500 text-green-500
  &--skin
    &--default
      @apply bg-transparent border-transparent text-cyan-500
      &:hover
        @apply bg-transparent border-transparent text-cyan-600
      &--disabled
        @apply bg-transparent border-transparent pointer-events-none text-cyan-300 #{!important}
      &--loading
        @apply bg-transparent border-transparent text-cyan-500
    &--default
      @apply bg-transparent border-transparent text-green-500
      &:hover
        @apply bg-transparent border-transparent text-green-600
      &--disabled
        @apply bg-transparent border-transparent pointer-events-none text-green-300 #{!important}
      &--loading
        @apply bg-transparent border-transparent text-green-500
</style>
