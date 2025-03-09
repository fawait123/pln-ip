import { defineStore } from "pinia";
import { ref } from "vue";

import { api } from "@/api/axios";
import { encryptStorage } from "@/utils/storage";
import type { StorageLike } from "pinia-plugin-persistedstate";
import type { IParams } from "@/types/GlobalType";

export const useDashboardStore = defineStore(
  "dashboard",
  () => {
    const getLocation = async (payload: IParams) => {
      return await api
        .get(`/location`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const getUnit = async (payload: IParams) => {
      return await api
        .get(`/unit`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const getMachine = async (payload: IParams) => {
      return await api
        .get(`/machine`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    return { getLocation, getUnit, getMachine };
  },
  {
    persist: {
      storage: encryptStorage as StorageLike,
      pick: [],
    },
  }
);
