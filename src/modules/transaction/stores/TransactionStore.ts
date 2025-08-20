import { defineStore } from "pinia";

import { api } from "@/api/axios";
import { encryptStorage } from "@/utils/storage";
import type { StorageLike } from "pinia-plugin-persistedstate";
import type { IParams } from "@/types/GlobalType";

import type { CreateScopeInterface } from "../types/ScopeType";
import type { UpdateConsMatInterface } from "../types/ConsumableMaterialType";
import type { UpdateManPowerInterface } from "../types/ManpowerType";
import type { UpdatePartInterface } from "../types/PartType";
import type { CreateAddScopeInterface } from "../types/AddScopeTableType";
import type { UpdateToolsInterface } from "../types/ToolsType";
import type { CreateHseInterface } from "../types/HseType";

export const useTransactionStore = defineStore(
  "transaction",
  () => {
    const getTotalDurationScope = async (payload: Record<string, any>) => {
      return await api
        .get(`/transaction/scope-standart/resource/duration`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const getScopeStandar = async (payload: IParams) => {
      return await api
        .get(`/transaction/scope-standart/resource/pagination`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const createScopeStandar = async (payload: CreateScopeInterface) => {
      return await api
        .post(`/transaction/scope-standart/resource/asset`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const deleteScopeStandar = async (id: string) => {
      return await api
        .delete(`/transaction/scope-standart/${id}`)
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const getConsMat = async (payload: IParams) => {
      return await api
        .get(`/transaction/consumable-material/resource/pagination`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const updateConsMat = async (
      payload: UpdateConsMatInterface,
      id: string
    ) => {
      return await api
        .put(`/transaction/consumable-material/${id}`, payload)
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const getManPower = async (payload: IParams) => {
      return await api
        .get(`/transaction/manpower/resource/pagination`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const updateManPower = async (
      payload: UpdateManPowerInterface,
      id: string
    ) => {
      return await api
        .put(`/transaction/manpower/${id}`, payload)
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const getPart = async (payload: IParams) => {
      return await api
        .get(`/transaction/part/resource/pagination`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const updatePart = async (payload: UpdatePartInterface, id: string) => {
      return await api
        .put(`/transaction/part/${id}`, payload)
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const getTools = async (payload: IParams) => {
      return await api
        .get(`/transaction/tools`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const updateTools = async (payload: UpdateToolsInterface, id: string) => {
      return await api
        .put(`/transaction/tools/${id}`, payload)
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const getHse = async (payload: IParams) => {
      return await api
        .get(`/transaction/hse/resource/pagination`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const createHse = async (payload: CreateHseInterface) => {
      return await api
        .post(`/transaction/hse/resource`, payload)
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const updateHse = async (id: string, payload: CreateHseInterface) => {
      return await api
        .put(`/transaction/hse/${id}`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const deleteHse = async (id: string) => {
      return await api
        .delete(`/transaction/hse/${id}`)
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const getQcPlan = async (payload: IParams) => {
      return await api
        .get(`/transaction/qc-plan/resource/pagination`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const getAddScope = async (payload: IParams) => {
      return await api
        .get(`/transaction/additional-scope/resource/pagination`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const createAddScope = async (payload: CreateAddScopeInterface) => {
      return await api
        .post(`/transaction/additional-scope/resource/asset`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const getDetailInspection = async (id: string) => {
      return await api
        .get(`/inspection-type/${id}`)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const getDownloadResultScope = async (project_uuid: string) => {
      return await api
        .get(`/transaction/result/resource/export/scope-standart`, {
          params: {
            project_uuid,
          },
          responseType: "blob",
        })
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `Scope.xlsx`;

          document.body.appendChild(a);
          a.click();

          document.body.removeChild(a);

          URL.revokeObjectURL(url);

          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const getDownloadResultConsMat = async (project_uuid: string) => {
      return await api
        .get(`/transaction/result/resource/export/consmat`, {
          params: {
            project_uuid,
          },
          responseType: "blob",
        })
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `Consumable Material.xlsx`;

          document.body.appendChild(a);
          a.click();

          document.body.removeChild(a);

          URL.revokeObjectURL(url);

          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const getDownloadResultPart = async (project_uuid: string) => {
      return await api
        .get(`/transaction/result/resource/export/part`, {
          params: {
            project_uuid,
          },
          responseType: "blob",
        })
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `Part.xlsx`;

          document.body.appendChild(a);
          a.click();

          document.body.removeChild(a);

          URL.revokeObjectURL(url);

          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const getDownloadResultManpower = async (project_uuid: string) => {
      return await api
        .get(`/transaction/result/resource/export/manpower`, {
          params: {
            project_uuid,
          },
          responseType: "blob",
        })
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `Manpower.xlsx`;

          document.body.appendChild(a);
          a.click();

          document.body.removeChild(a);

          URL.revokeObjectURL(url);

          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const getDownloadResultTools = async (project_uuid: string) => {
      return await api
        .get(`/transaction/result/resource/export/tools`, {
          params: {
            project_uuid,
          },
          responseType: "blob",
        })
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `Tools.xlsx`;

          document.body.appendChild(a);
          a.click();

          document.body.removeChild(a);

          URL.revokeObjectURL(url);

          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const getDownloadResultHse = async (project_uuid: string) => {
      return await api
        .get(`/transaction/result/resource/export/hse`, {
          params: {
            project_uuid,
          },
          responseType: "blob",
        })
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `Tools.xlsx`;

          document.body.appendChild(a);
          a.click();

          document.body.removeChild(a);

          URL.revokeObjectURL(url);

          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const getDownloadResultQcPlan = async (project_uuid: string) => {
      return await api
        .get(`/transaction/result/resource/export/qc-plan`, {
          params: {
            project_uuid,
          },
          responseType: "blob",
        })
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `Tools.xlsx`;

          document.body.appendChild(a);
          a.click();

          document.body.removeChild(a);

          URL.revokeObjectURL(url);

          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    return {
      getScopeStandar,
      createScopeStandar,
      deleteScopeStandar,
      getConsMat,
      updateConsMat,
      getManPower,
      updateManPower,
      getPart,
      updatePart,
      getTools,
      updateTools,
      getHse,
      createHse,
      updateHse,
      deleteHse,
      getQcPlan,
      getAddScope,
      createAddScope,
      getDetailInspection,
      getDownloadResultScope,
      getDownloadResultConsMat,
      getDownloadResultPart,
      getDownloadResultManpower,
      getDownloadResultTools,
      getDownloadResultHse,
      getDownloadResultQcPlan,
      getTotalDurationScope
    };
  },
  {
    persist: {
      storage: encryptStorage as StorageLike,
      pick: [],
    },
  }
);
