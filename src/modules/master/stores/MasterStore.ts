import { defineStore } from "pinia";

import { api } from "@/api/axios";
import { encryptStorage } from "@/utils/storage";
import type { StorageLike } from "pinia-plugin-persistedstate";
import type { IParams } from "@/types/GlobalType";

import type { LocationCreateInterface } from "../types/LocationType";
import type { UnitCreateInterface } from "../types/UnitType";
import type { MachineCreateInterface } from "../types/MachineType";
import type { InspectionTypeCreateInterface } from "../types/InspectionType";
import type { PartCreateInterface } from "../types/PartType";
import type { ManpowerCreateInterface } from "../types/ManpowerType";
import type { ConsMatCreateInterface } from "../types/ConsumableMaterialType";
import type { ToolsCreateInterface } from "../types/ToolsType";

export const useMasterStore = defineStore(
  "master",
  () => {
    // --- LOCATION
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

    const updateLocation = async (
      id: string,
      payload: LocationCreateInterface
    ) => {
      return await api
        .put(`/location/${id}`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const deleteLocation = async (id: string) => {
      return await api
        .delete(`/location/${id}`)
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };
    // --- END

    // --- UNIT
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

    const updateUnit = async (id: string, payload: UnitCreateInterface) => {
      return await api
        .put(`/unit/${id}`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const deleteUnit = async (id: string) => {
      return await api
        .delete(`/unit/${id}`)
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };
    // --- END

    // --- MACHINE
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

    const updateMachine = async (
      id: string,
      payload: MachineCreateInterface
    ) => {
      return await api
        .put(`/machine/${id}`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const deleteMachine = async (id: string) => {
      return await api
        .delete(`/machine/${id}`)
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };
    // --- END

    // --- INSPECTION TYPE
    const getInspectionType = async (payload: IParams) => {
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

    const updateInspectionType = async (
      id: string,
      payload: InspectionTypeCreateInterface
    ) => {
      return await api
        .put(`/inspection-type/${id}`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const deleteInspectionType = async (id: string) => {
      return await api
        .delete(`/inspection-type/${id}`)
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };
    // --- END

    // --- CONSUMABLE MATERIAL
    const getConsMat = async (payload: IParams) => {
      return await api
        .get(`/consumble-material`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const createConsMat = async (payload: ConsMatCreateInterface) => {
      return await api
        .post(`/consumble-material`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const updateConsMat = async (
      id: string,
      payload: ConsMatCreateInterface
    ) => {
      return await api
        .put(`/consumble-material/${id}`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const deleteConsMat = async (id: string) => {
      return await api
        .delete(`/consumble-material/${id}`)
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };
    // --- END

    // --- PART
    const getPart = async (payload: IParams) => {
      return await api
        .get(`/part`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const createPart = async (payload: PartCreateInterface) => {
      return await api
        .post(`/part`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const updatePart = async (id: string, payload: PartCreateInterface) => {
      return await api
        .put(`/part/${id}`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const deletePart = async (id: string) => {
      return await api
        .delete(`/part/${id}`)
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };
    // --- END

    // --- TOOLS
    const getTools = async (payload: IParams) => {
      return await api
        .get(`/tools`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const createTools = async (payload: ToolsCreateInterface) => {
      return await api
        .post(`/tools`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const updateTools = async (id: string, payload: ToolsCreateInterface) => {
      return await api
        .put(`/tools/${id}`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const deleteTools = async (id: string) => {
      return await api
        .delete(`/tools/${id}`)
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };
    // --- END

    // --- MANPOWER
    const getManpower = async (payload: IParams) => {
      return await api
        .get(`/manpower`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const createManpower = async (payload: ManpowerCreateInterface) => {
      return await api
        .post(`/manpower`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const updateManpower = async (
      id: string,
      payload: ManpowerCreateInterface
    ) => {
      return await api
        .put(`/manpower/${id}`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const deleteManpower = async (id: string) => {
      return await api
        .delete(`/manpower/${id}`)
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };
    // --- END

    return {
      getLocation,
      createLocation,
      updateLocation,
      deleteLocation,
      getUnit,
      createUnit,
      updateUnit,
      deleteUnit,
      getMachine,
      createMachine,
      updateMachine,
      deleteMachine,
      getInspectionType,
      createInspectionType,
      updateInspectionType,
      deleteInspectionType,
      getConsMat,
      createConsMat,
      updateConsMat,
      deleteConsMat,
      getPart,
      createPart,
      updatePart,
      deletePart,
      getTools,
      createTools,
      updateTools,
      deleteTools,
      getManpower,
      createManpower,
      updateManpower,
      deleteManpower,
    };
  },
  {
    persist: {
      storage: encryptStorage as StorageLike,
      pick: [],
    },
  }
);
