import type { StorageLike } from "pinia-plugin-persistedstate";
import { defineStore } from "pinia";
import { ref } from "vue";

import { encryptStorage } from "@/utils/storage";

export const useGlobalStore = defineStore(
  "global",
  () => {
    const titleHeader = ref<string>("");
    const disabledNext = ref(false);
    const disabledBack = ref(false);

    return {
      titleHeader,
      disabledNext,
      disabledBack,
    };
  },
  {
    persist: {
      storage: encryptStorage as StorageLike,
      pick: [],
    },
  }
);
