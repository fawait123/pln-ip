<script setup lang="ts">
import InlineSvg from "vue-inline-svg";
import { ref, shallowRef, defineAsyncComponent } from "vue";

const props = defineProps({
  name: {
    type: String,
    default: "default",
  },
  size: {
    type: String,
    default: "",
  },
});

const is_raw = ref(false);
const is_url = ref(false);
const icon: any = shallowRef(checkType());

function checkType() {
  const prefix = props.name?.toLowerCase()?.substr(0, 4);
  if (["<svg", "http"].includes(prefix)) {
    switch (prefix) {
      case "<svg":
        is_raw.value = true;
        break;

      case "http":
        is_url.value = true;
        break;

      default:
        break;
    }
    return props.name;
  }

  return defineAsyncComponent(async () => {
    return await import(`../../assets/icons/${props.name}.svg`)
      .then((res) => {
        return res;
      })
      .catch(() => {
        return defineAsyncComponent(
          async () => await import(`@/assets/icons/shield.svg`)
        );
      });
  });
}
</script>

<template>
  <i class="pln-icon" v-if="is_raw" v-html="name" />
  <i class="pln-icon" v-else-if="is_url">
    <inline-svg :src="name" />
  </i>
  <i class="pln-icon" v-else>
    <component :is="icon" />
  </i>
</template>

<style lang="sass">
.pln-icon
  @apply flex items-center justify-center
  svg
    font-size: 1em
    width: 1em
    height: 1em
</style>
