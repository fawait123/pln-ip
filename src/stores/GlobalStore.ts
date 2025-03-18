import type { StorageLike } from "pinia-plugin-persistedstate";
import { defineStore } from "pinia";
import { ref } from "vue";

import { encryptStorage } from "@/utils/storage";
import { api } from "@/api/axios";
import type { CreateDocumentInterface } from "@/types/GlobalType";
import type { TInspection } from "@/modules/inspection/types/InspectionType";

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
    const InspectionType = ref<TInspection>();

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

    const deleteDocument = async (ids: string[]) => {
      return await api
        .delete(`/document/delete/multi`, {
          data: { ids },
        })
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    return {
      createDocument,
      deleteDocument,
      titleHeader,
      disabledNext,
      disabledBack,
      isAddScope,
      isFinish,
      isRemoveNext,
      isStepNavigation,
      InspectionType,
    };
  },
  {
    persist: {
      storage: encryptStorage as StorageLike,
      pick: [],
    },
  }
);
