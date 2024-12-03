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
    const isAddScope = ref(false);
    const isFinish = ref(false);
    const isRemoveNext = ref(false);
    const isStepNavigation = ref(false);

    return {
      titleHeader,
      disabledNext,
      disabledBack,
      isAddScope,
      isFinish,
      isRemoveNext,
      isStepNavigation,
    };
  },
  {
    persist: {
      storage: encryptStorage as StorageLike,
      pick: [],
    },
  }
);
