<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { Icon } from "@/components";

const router = useRouter();
const route = useRoute();
const locationId = route.params.id;

const imgUrl = new URL("@/assets/images/priok.png", import.meta.url).href;

const data = ref([
  {
    name: "BLOK 1",
    children: [
      {
        name: "GT 1.1 ABB13E1",
      },
      {
        name: "GT 1.2 ABB13E1",
      },
      {
        name: "GT 1.3 ABB13E1",
      },
      {
        name: "GT 1.4 ABB13E1",
      },
    ],
  },
  {
    name: "BLOK 2",
    children: [
      {
        name: "GT 2.1 ABB13E1",
      },
      {
        name: "GT 2.2 ABB13E1",
      },
      {
        name: "GT 2.3 ABB13E1",
      },
      {
        name: "GT 2.4 ABB13E1",
      },
    ],
  },
  {
    name: "BLOK 3",
    children: [
      {
        name: "GT 3.1 ABB13E1",
      },
      {
        name: "GT 3.2 ABB13E1",
      },
      {
        name: "GT 3.3 ABB13E1",
      },
      {
        name: "GT 3.4 ABB13E1",
      },
    ],
  },
  {
    name: "BLOK 4",
    children: [
      {
        name: "GT 4.1 ABB13E1",
      },
      {
        name: "GT 4.2 ABB13E1",
      },
      {
        name: "GT 4.3 ABB13E1",
      },
      {
        name: "GT 4.4 ABB13E1",
      },
    ],
  },
]);

const back = () => {
  router.push("/");
};
</script>

<template>
  <div class="header-title">
    <div class="back-button" @click="back">
      <Icon name="caret-left" />
    </div>
    <p>{{ locationId.toString().toUpperCase() }}</p>
  </div>
  <div class="location">
    <div class="location-image">
      <img :src="imgUrl" />
    </div>
    <div class="location-list">
      <div class="card-list">
        <div class="card-wrapper">
          <div v-for="(item, key) in data" :key="key" class="list-item">
            <p>{{ item.name }}</p>
            <div class="children">
              <div
                v-for="(element, index) in item.children"
                :key="index"
                class="children-item"
              >
                {{ element.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
.header-title
  @apply flex items-center gap-4
  .back-button
    @apply rounded h-10 w-10 bg-neutral-100 flex items-center justify-center text-base text-neutral-950 cursor-pointer hover:bg-neutral-200
  > p
    @apply text-xl font-bold text-neutral-950
.location
  @apply w-full flex justify-between gap-20 mt-5
  &-image
    @apply w-full h-[calc(100vh-200px)]
    img
      @apply object-cover object-center bg-no-repeat w-full h-full
  &-list
    @apply w-[500px]
  .card-list
    @apply rounded bg-white shadow w-full p-6 h-[calc(100vh-200px)]
    .card-wrapper
      @apply flex flex-col gap-4 max-h-full overflow-y-auto
      .list-item
        @apply flex flex-col
        > p
          @apply py-3 text-lg font-bold text-neutral-950 border-b border-neutral-100
        .children
          @apply flex flex-col gap-1 py-2
          &-item
            @apply text-base cursor-pointer text-neutral-950 py-2 px-4 hover:bg-neutral-100 rounded
</style>
