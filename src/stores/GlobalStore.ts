import type { StorageLike } from "pinia-plugin-persistedstate";
import { defineStore } from "pinia";
import { ref } from "vue";

import { encryptStorage } from "@/utils/storage";

export const useGlobalStore = defineStore(
  "global",
  () => {
    const titleHeader = ref<string>("");

    return {
      titleHeader,
    };
  },
  {
    persist: {
      storage: encryptStorage as StorageLike,
      pick: [],
    },
  }
);
