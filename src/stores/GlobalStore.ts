import type { StorageLike } from "pinia-plugin-persistedstate";
import { defineStore } from "pinia";
import { ref } from "vue";

import { encryptStorage } from "@/utils/storage";
import { api } from "@/api/axios";
import type { CreateDocumentInterface } from "@/types/GlobalType";

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

    const createDocument = async (payload: CreateDocumentInterface) => {
      const formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value);
        }
      });

      return await api
        .post(`/document`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    return {
      createDocument,
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
