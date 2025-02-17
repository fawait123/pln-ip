import { defineStore } from "pinia";
import { ref } from "vue";

import { api } from "@/api/axios";
import { encryptStorage } from "@/utils/storage";
import type { StorageLike } from "pinia-plugin-persistedstate";
import type { IParams } from "@/types/GlobalType";

export const useMainStore = defineStore(
  "main",
  () => {
    const getScopeStandar = async (payload: IParams) => {
      return await api
        .get(`/transaction/scope-standart/pagination`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const getManPower = async (payload: IParams) => {
      return await api
        .get(`/transaction/manpower/pagination`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const getPart = async (payload: IParams) => {
      return await api
        .get(`/transaction/part/pagination`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const getHse = async (payload: IParams) => {
      return await api
        .get(`/transaction/hse/pagination`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const getQcPlan = async (payload: IParams) => {
      return await api
        .get(`/transaction/qc-plan/pagination`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    return { getScopeStandar, getManPower, getPart, getHse, getQcPlan };
  },
  {
    persist: {
      storage: encryptStorage as StorageLike,
      pick: [],
    },
  }
);
