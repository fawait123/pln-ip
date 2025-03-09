import { defineStore } from "pinia";
import { ref } from "vue";

import { api } from "@/api/axios";
import { encryptStorage } from "@/utils/storage";
import type { StorageLike } from "pinia-plugin-persistedstate";
import type { IParams } from "@/types/GlobalType";
import type { TCreateGenerate } from "../types/ScopeType";

export const useScopeStore = defineStore(
  "scope",
  () => {
    const getInspection = async (payload: IParams) => {
      return await api
        .get(`/inspection-type`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const generate = async (payload: TCreateGenerate) => {
      return await api
        .post(`/generate`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const getProject = async (payload: IParams) => {
      return await api
        .get(`/transaction/project/list`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    return { getInspection, generate, getProject };
  },
  {
    persist: {
      storage: encryptStorage as StorageLike,
      pick: [],
    },
  }
);
