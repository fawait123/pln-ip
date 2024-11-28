<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

import { useGlobalStore } from "@/stores/GlobalStore";
import { Breadcrumb } from "@/components";

const imgUrl = new URL("@/assets/images/priok-unit.png", import.meta.url).href;

const globalStore = useGlobalStore();
const { titleHeader } = storeToRefs(globalStore);
const breadcrumb = ref([
  {
    name: "UBP Priok",
    as_link: false,
    url: "",
  },
  {
    name: "Unit",
    as_link: false,
    url: "",
  },
]);
const buttonActive = ref<number | null>(null);

const data = ref([
  {
    id: 1,
    name: "Blok 1/2",
    children: [
      {
        name: "GT 1.1 ABB 13E1",
      },
      {
        name: "GT 1.2 ABB 13E1",
      },
      {
        name: "GT 1.3 ABB 13E1",
      },
      {
        name: "GT 1.4 ABB 13E1",
      },
      {
        name: "GT 2.1 ABB 13E1",
      },
      {
        name: "GT 2.2 ABB 13E1",
      },
      {
        name: "GT 2.3 ABB 13E1",
      },
      {
        name: "GT 2.4 ABB 13E1",
      },
    ],
  },
  {
    id: 2,
    name: "Blok 3",
    children: [
      {
        name: "GT 3.1 MHI 701F3",
      },
      {
        name: "GT 3.2 MHI 701F3",
      },
      {
        name: "GT 3.3 MHI 701F3",
      },
    ],
  },
  {
    id: 3,
    name: "Blok 4",
    children: [
      {
        name: "GT 4.1 MHI 701F4",
      },
      {
        name: "GT 4.2 MHI 701F4",
      },
      {
        name: "GT 4.3 MHI 701F4",
      },
    ],
  },
]);

const handleClick = (id: number) => {
  if (buttonActive.value === id) {
    buttonActive.value = null;
  } else {
    buttonActive.value = id;
  }
};

onMounted(() => {
  titleHeader.value = "Unit";
});
</script>

<template>
  <div
    class="w-full min-h-screen"
    :style="{
      backgroundImage: `url(${imgUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }"
  >
    <div class="container-unit">
      <Breadcrumb :items="breadcrumb" />
      <div class="content-unit">
        <div class="wrapper-button-unit">
          <div v-for="(item, key) in data" :key="key" class="button-group">
            <button
              class="button-unit"
              :class="{ 'button-active': item.id === buttonActive }"
              @click="handleClick(item.id)"
            >
              {{ item.name }}
            </button>
            <div
              class="button-group-gt"
              :class="{ 'children-active': item.id === buttonActive }"
            >
              <button
                v-for="(element, index) in item.children"
                :key="index"
                class="button-gt"
              >
                {{ element.name }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
.button-active
  @apply bg-cyan-500 #{!important}

.children-active
  @apply max-h-full opacity-100 pointer-events-auto mt-4 #{!important}

.container-unit
  @apply pt-[120px] pl-4
  .content-unit
    @apply p-10
    .wrapper-button-unit
      @apply flex flex-col gap-4
      .button-group
        @apply flex flex-col
        .button-unit
          @apply bg-buttonGray w-[200px] py-2 text-center text-sm text-neutral-50 font-bold cursor-pointer
          clip-path: polygon(90% 0, 100% 50%, 90% 100%, 0 100%, 0 0)
          &:hover
            @apply bg-cyan-500
        .button-group-gt
          @apply grid grid-cols-4 gap-y-4 gap-x-0 ml-[200px] max-h-0 opacity-0 pointer-events-none duration-300 transition-all
          .button-gt
            @apply bg-buttonGray w-full py-2 text-center text-sm text-neutral-50 font-bold cursor-pointer mr-[-30px]
            clip-path: polygon(5% 0, 100% 0, 95% 100%, 0% 100%)
            &:hover
              @apply bg-cyan-500
</style>
