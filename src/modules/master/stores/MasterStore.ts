import { defineStore } from "pinia";

import { api } from "@/api/axios";
import { encryptStorage } from "@/utils/storage";
import type { StorageLike } from "pinia-plugin-persistedstate";
import type { IParams } from "@/types/GlobalType";

import type { LocationCreateInterface } from "../types/LocationType";
import type { UnitCreateInterface } from "../types/UnitType";
import type { MachineCreateInterface } from "../types/MachineType";
import type { InspectionTypeCreateInterface } from "../types/InspectionType";

export const useMasterStore = defineStore(
  "master",
  () => {
    const getLocation = async (payload: IParams) => {
      return await api
        .get(`/location/list`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const createLocation = async (payload: LocationCreateInterface) => {
      return await api
        .post(`/location`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const getUnit = async (payload: IParams) => {
      return await api
        .get(`/unit/list`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const createUnit = async (payload: UnitCreateInterface) => {
      return await api
        .post(`/unit`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const getMachine = async (payload: IParams) => {
      return await api
        .get(`/machine/list`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const createMachine = async (payload: MachineCreateInterface) => {
      return await api
        .post(`/machine`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const getInspectionType = async (payload: IParams) => {
      return await api
        .get(`/inspection-type/list`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const createInspectionType = async (
      payload: InspectionTypeCreateInterface
    ) => {
      return await api
        .post(`/inspection-type`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    return {
      getLocation,
      createLocation,
      getUnit,
      createUnit,
      getMachine,
      createMachine,
      getInspectionType,
      createInspectionType,
    };
  },
  {
    persist: {
      storage: encryptStorage as StorageLike,
      pick: [],
    },
  }
);
