<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "normal",
    validator: function (value: string) {
      return ["normal", "fullpage"].indexOf(value) !== -1;
    },
  },
  width: {
    type: [String, Number],
    default: 30,
  },
  height: {
    type: [String, Number],
    default: 30,
  },
  text: {
    type: String,
    default: "",
  },
  class: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const styles = computed(() => {
  return {
    height: `${parseInt(props.height.toString())}px`,
    width: `${parseInt(props.width.toString())}px`,
  };
});
</script>

<template>
  <template v-if="type === 'fullpage'">
    <div class="container-loading">
      <div class="pln-loading-wrapper" :class="props.class">
        <div class="pln-loading" :style="styles" />
        <div class="pln-loading-text" v-if="text !== ''">{{ text }}</div>
      </div>
    </div>
  </template>

  <template v-if="type === 'normal'">
    <div class="pln-loading-wrapper" :class="props.class">
      <div class="pln-loading" :style="styles" />
      <div class="pln-loading-text" v-if="text !== ''">{{ text }}</div>
    </div>
  </template>
</template>

<style lang="sass">
.container-loading
  @apply absolute top-0 left-0 bottom-0 right-0 w-full h-full z-[999] flex justify-center items-center
  background: rgba(0, 0, 0, 0.6)

.pln-loading-wrapper
  @apply flex gap-6 items-center relative

.pln-loading
  border-radius: 50%
  display: inline-block
  border-top: 3px solid
  border-right: 3px solid transparent
  box-sizing: border-box
  animation: rotation 1s linear infinite
  border-color: var(--primary-700)

.pln-loading-text
  color: var(--neutral-950)
  display: inline-block
  position: relative
  font-size: 14px
  box-sizing: border-box
  &::after
    content: ''
    width: 2px
    height: 2px
    background: currentColor
    position: absolute
    bottom: 4px
    right: -5px
    box-sizing: border-box
    animation: animloader 1s linear infinite

@keyframes rotation
  0%
    transform: rotate(0deg)
  100%
    transform: rotate(360deg)

@keyframes animloader
  0%
    box-shadow: 7px 0 rgba(255, 255, 255, 0), 15px 0 rgba(255, 255, 255, 0)
  50%
    box-shadow: 7px 0 var(--neutral-950), 15px 0 rgba(255, 255, 255, 0)
  100%
    box-shadow: 7px 0 var(--neutral-950), 15px 0 var(--neutral-950)
</style>
