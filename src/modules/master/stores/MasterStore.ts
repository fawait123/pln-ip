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
import type { GlobalUnitCreateInterface } from "../types/GlobalUnitType";
import type { RoleCreateInterface } from "../types/RoleType";
import type { UserCreateInterface } from "../types/UserType";
import type {
  ScopeCreateInterface,
  ScopeUpdateInterface,
} from "../types/ScopeType";
import type { AdditionalScopeCreateInterface } from "../types/AdditionalScopeType";
import type { BidangCreateInterface } from "../types/BidangType";
import type { SubBidangCreateInterface } from "../types/SubBidangType";
import type { HseDocCreateInterface } from "../types/HseDocTypes";
import type { HseCreateInterface } from "../types/HseTypes";
import type { SequenceCreateInterface } from "../types/SequenceTypes";
import type { ActivityCreateInterface } from "../types/AcitivityType";
import type { EquipmentCreateInterface } from "../types/EquipmentType";
import type { PartStdCreateInterface } from "../types/PartStdType";
import type { ManpowerStdCreateInterface } from "../types/ManpowerStdType";
import type { ConsumableMaterialStdCreateInterface } from "../types/ConsumableMaterialStdType";

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

    const downloadLocation = async () => {
      return await api
        .post(
          `/location/export`,
          {},
          {
            responseType: "blob",
          }
        )
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `Location.xlsx`;

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

    const templateLocation = async () => {
      return await api
        .post(
          `/location/template`,
          {},
          {
            responseType: "blob",
          }
        )
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `Location Template.xlsx`;

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

    const importLocation = async (payload: File) => {
      const formData = new FormData();
      formData.append("file", payload);

      return await api
        .post(`/location/import`, formData)
        .then((resp) => {
          return Promise.resolve(resp);
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

    const downloadUnit = async () => {
      return await api
        .post(
          `/unit/export`,
          {},
          {
            responseType: "blob",
          }
        )
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `Unit.xlsx`;

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

    const templateUnit = async () => {
      return await api
        .post(
          `/unit/template`,
          {},
          {
            responseType: "blob",
          }
        )
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `Unit Template.xlsx`;

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

    const importUnit = async (payload: File) => {
      const formData = new FormData();
      formData.append("file", payload);

      return await api
        .post(`/unit/import`, formData)
        .then((resp) => {
          return Promise.resolve(resp);
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

    const downloadMachine = async () => {
      return await api
        .post(
          `/machine/export`,
          {},
          {
            responseType: "blob",
          }
        )
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `Machine.xlsx`;

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

    const templateMachine = async () => {
      return await api
        .post(
          `/machine/template`,
          {},
          {
            responseType: "blob",
          }
        )
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `Machine Template.xlsx`;

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

    const importMachine = async (payload: File) => {
      const formData = new FormData();
      formData.append("file", payload);

      return await api
        .post(`/machine/import`, formData)
        .then((resp) => {
          return Promise.resolve(resp);
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

    const downloadInspectionType = async () => {
      return await api
        .post(
          `/inspection-type/export`,
          {},
          {
            responseType: "blob",
          }
        )
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `Inspection Type.xlsx`;

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

    const templateInspectionType = async () => {
      return await api
        .post(
          `/inspection-type/template`,
          {},
          {
            responseType: "blob",
          }
        )
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `Inspection Type Template.xlsx`;

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

    const importInspectionType = async (payload: File) => {
      const formData = new FormData();
      formData.append("file", payload);

      return await api
        .post(`/isnpection-type/import`, formData)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };
    // --- END

    // --- GLOBAL UNIT
    const getGlobalUnit = async (payload: IParams) => {
      return await api
        .get(`/global-unit`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const createGlobalUnit = async (payload: GlobalUnitCreateInterface) => {
      return await api
        .post(`/global-unit`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const updateGlobalUnit = async (
      id: string,
      payload: GlobalUnitCreateInterface
    ) => {
      return await api
        .put(`/global-unit/${id}`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const deleteGlobalUnit = async (id: string) => {
      return await api
        .delete(`/global-unit/${id}`)
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const downloadGlobalUnit = async () => {
      return await api
        .post(
          `/global-unit/export`,
          {},
          {
            responseType: "blob",
          }
        )
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `Global Unit.xlsx`;

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

    const templateGlobalUnit = async () => {
      return await api
        .post(
          `/global-unit/template`,
          {},
          {
            responseType: "blob",
          }
        )
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `Global Unit Template.xlsx`;

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

    const importGlobalUnit = async (payload: File) => {
      const formData = new FormData();
      formData.append("file", payload);

      return await api
        .post(`/global-unit/import`, formData)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };
    // --- END

    // --- SCOPE
    const getScope = async (payload: IParams) => {
      return await api
        .get(`/scope-standart`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const createScope = async (payload: ScopeCreateInterface) => {
      return await api
        .post(`/scope-standart`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const updateScope = async (id: string, payload: ScopeUpdateInterface) => {
      return await api
        .put(`/scope-standart/${id}`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const deleteScope = async (id: string) => {
      return await api
        .delete(`/scope-standart/${id}`)
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const downloadScope = async () => {
      return await api
        .post(
          `/scope-standart/export`,
          {},
          {
            responseType: "blob",
          }
        )
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `Scope Standart.xlsx`;

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

    const templateScope = async () => {
      return await api
        .post(
          `/scope-standart/template`,
          {},
          {
            responseType: "blob",
          }
        )
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `Scope Standart Template.xlsx`;

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

    const importScope = async (payload: File) => {
      const formData = new FormData();
      formData.append("file", payload);

      return await api
        .post(`/scope-standart/import`, formData)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };
    // --- END

    // --- ADDITIONAL SCOPE
    const getAdditionalScope = async (payload: IParams) => {
      return await api
        .get(`/additional-scope`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const createAdditionalScope = async (
      payload: AdditionalScopeCreateInterface
    ) => {
      return await api
        .post(`/additional-scope`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const updateAdditionalScope = async (
      id: string,
      payload: AdditionalScopeCreateInterface
    ) => {
      return await api
        .put(`/additional-scope/${id}`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const deleteAdditionalScope = async (id: string) => {
      return await api
        .delete(`/additional-scope/${id}`)
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const downloadAdditionalScope = async () => {
      return await api
        .post(
          `/additional-scope/export`,
          {},
          {
            responseType: "blob",
          }
        )
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `Additional Scope.xlsx`;

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

    const templateAdditionalScope = async () => {
      return await api
        .post(
          `/additional-scope/template`,
          {},
          {
            responseType: "blob",
          }
        )
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `Additional Scope Template.xlsx`;

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

    const importAdditionalScope = async (payload: File) => {
      const formData = new FormData();
      formData.append("file", payload);

      return await api
        .post(`/additional-scope/import`, formData)
        .then((resp) => {
          return Promise.resolve(resp);
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

    const downloadConsMat = async () => {
      return await api
        .post(
          `/consumble-material/export`,
          {},
          {
            responseType: "blob",
          }
        )
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

    const templateConsMat = async () => {
      return await api
        .post(
          `/consumble-material/template`,
          {},
          {
            responseType: "blob",
          }
        )
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `Consumable Material Template.xlsx`;

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

    const importConsMat = async (payload: File) => {
      const formData = new FormData();
      formData.append("file", payload);

      return await api
        .post(`/consumble-material/import`, formData)
        .then((resp) => {
          return Promise.resolve(resp);
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

    const downloadPart = async () => {
      return await api
        .post(
          `/part/export`,
          {},
          {
            responseType: "blob",
          }
        )
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

    const templatePart = async () => {
      return await api
        .post(
          `/part/template`,
          {},
          {
            responseType: "blob",
          }
        )
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `Part Template.xlsx`;

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

    const importPart = async (payload: File) => {
      const formData = new FormData();
      formData.append("file", payload);

      return await api
        .post(`/part/import`, formData)
        .then((resp) => {
          return Promise.resolve(resp);
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

    const downloadManpower = async () => {
      return await api
        .post(
          `/manpower/export`,
          {},
          {
            responseType: "blob",
          }
        )
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

    const templateManpower = async () => {
      return await api
        .post(
          `/manpower/template`,
          {},
          {
            responseType: "blob",
          }
        )
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `Manpower Template.xlsx`;

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

    const importManpower = async (payload: File) => {
      const formData = new FormData();
      formData.append("file", payload);

      return await api
        .post(`/manpower/import`, formData)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };
    // --- END

    // --- USER
    const getUser = async (payload: IParams) => {
      return await api
        .get(`/user`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const createUser = async (payload: UserCreateInterface) => {
      return await api
        .post(`/user`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const updateUser = async (id: number, payload: UserCreateInterface) => {
      return await api
        .put(`/user/${id}`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const deleteUser = async (id: number) => {
      return await api
        .delete(`/user/${id}`)
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const downloadUser = async () => {
      return await api
        .post(
          `/user/export`,
          {},
          {
            responseType: "blob",
          }
        )
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `User.xlsx`;

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

    const templateUser = async () => {
      return await api
        .post(
          `/user/template`,
          {},
          {
            responseType: "blob",
          }
        )
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `User Template.xlsx`;

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

    const importUser = async (payload: File) => {
      const formData = new FormData();
      formData.append("file", payload);

      return await api
        .post(`/user/import`, formData)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };
    // --- END

    // --- ROLE
    const getRole = async (payload: IParams) => {
      return await api
        .get(`/role`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const getPermission = async () => {
      return await api
        .get(`/role/list/permissions`)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const createRole = async (payload: RoleCreateInterface) => {
      return await api
        .post(`/role`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const updateRole = async (id: number, payload: RoleCreateInterface) => {
      return await api
        .put(`/role/${id}`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const deleteRole = async (id: number) => {
      return await api
        .delete(`/role/${id}`)
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };
    // --- END

    // --- BIDANG
    const getBidang = async (payload: IParams) => {
      return await api
        .get(`/bidang`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const createBidang = async (payload: BidangCreateInterface) => {
      return await api
        .post(`/bidang`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const updateBidang = async (id: string, payload: BidangCreateInterface) => {
      return await api
        .put(`/bidang/${id}`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const deleteBidang = async (id: string) => {
      return await api
        .delete(`/bidang/${id}`)
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const downloadBidang = async () => {
      return await api
        .post(
          `/bidang/export`,
          {},
          {
            responseType: "blob",
          }
        )
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `Bidang.xlsx`;

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

    const templateBidang = async () => {
      return await api
        .post(
          `/bidang/template`,
          {},
          {
            responseType: "blob",
          }
        )
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `Bidang Template.xlsx`;

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

    const importBidang = async (payload: File) => {
      const formData = new FormData();
      formData.append("file", payload);

      return await api
        .post(`/bidang/import`, formData)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };
    // --- END

    // --- SUBBIDANG
    const getSubBidang = async (payload: IParams) => {
      return await api
        .get(`/sub-bidang`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const createSubBidang = async (payload: SubBidangCreateInterface) => {
      return await api
        .post(`/sub-bidang`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const updateSubBidang = async (
      id: string,
      payload: SubBidangCreateInterface
    ) => {
      return await api
        .put(`/sub-bidang/${id}`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const deleteSubBidang = async (id: string) => {
      return await api
        .delete(`/sub-bidang/${id}`)
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const downloadSubBidang = async () => {
      return await api
        .post(
          `/sub-bidang/export`,
          {},
          {
            responseType: "blob",
          }
        )
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `Sub Bidang.xlsx`;

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

    const templateSubBidang = async () => {
      return await api
        .post(
          `/sub-bidang/template`,
          {},
          {
            responseType: "blob",
          }
        )
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `Sub Bidang Template.xlsx`;

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

    const importSubBidang = async (payload: File) => {
      const formData = new FormData();
      formData.append("file", payload);

      return await api
        .post(`/sub-bidang/import`, formData)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };
    // --- END

    // --- HSE DOC
    const getHseDoc = async (payload: IParams) => {
      return await api
        .get(`/hse-doc`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const createHseDoc = async (payload: HseDocCreateInterface) => {
      return await api
        .post(`/hse-doc`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const updateHseDoc = async (id: string, payload: HseDocCreateInterface) => {
      return await api
        .put(`/hse-doc/${id}`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const deleteHseDoc = async (id: string) => {
      return await api
        .delete(`/hse-doc/${id}`)
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const downloadHseDoc = async () => {
      return await api
        .post(
          `/hse-doc/export`,
          {},
          {
            responseType: "blob",
          }
        )
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `HSE Doc.xlsx`;

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

    const templateHseDoc = async () => {
      return await api
        .post(
          `/hse-doc/template`,
          {},
          {
            responseType: "blob",
          }
        )
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `HSE Doc Template.xlsx`;

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

    const importHseDoc = async (payload: File) => {
      const formData = new FormData();
      formData.append("file", payload);

      return await api
        .post(`/hse-doc/import`, formData)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };
    // --- END

    // --- HSE
    const getHse = async (payload: IParams) => {
      return await api
        .get(`/hse`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const createHse = async (payload: HseCreateInterface) => {
      return await api
        .post(`/hse`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const updateHse = async (id: string, payload: HseCreateInterface) => {
      return await api
        .put(`/hse/${id}`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const deleteHse = async (id: string) => {
      return await api
        .delete(`/hse/${id}`)
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };
    // --- END

    // --- HSE
    const getSequence = async (payload: IParams) => {
      return await api
        .get(`/sequence`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const createSequence = async (payload: SequenceCreateInterface) => {
      return await api
        .post(`/sequence`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const updateSequence = async (
      id: string,
      payload: SequenceCreateInterface
    ) => {
      return await api
        .put(`/sequence/${id}`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const deleteSequence = async (id: string) => {
      return await api
        .delete(`/sequence/${id}`)
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const downloadSequence = async () => {
      return await api
        .post(
          `/sequence/export`,
          {},
          {
            responseType: "blob",
          }
        )
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `Sequence.xlsx`;

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

    const templateSequence = async () => {
      return await api
        .post(
          `/sequence/template`,
          {},
          {
            responseType: "blob",
          }
        )
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `Sequence Template.xlsx`;

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

    const importSequence = async (payload: File) => {
      const formData = new FormData();
      formData.append("file", payload);

      return await api
        .post(`/sequence/import`, formData)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };
    // --- END

    // ACTIVITY
    const getActivity = async (payload: IParams) => {
      return await api
        .get(`/activity`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const createActivity = async (payload: ActivityCreateInterface) => {
      return await api
        .post(`/activity`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const updateActivity = async (
      id: string,
      payload: ActivityCreateInterface
    ) => {
      return await api
        .put(`/activity/${id}`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const deleteActivity = async (id: string) => {
      return await api
        .delete(`/activity/${id}`)
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const downloadActivity = async () => {
      return await api
        .post(
          `/activity/export`,
          {},
          {
            responseType: "blob",
          }
        )
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `Activity.xlsx`;

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

    const templateActivity = async () => {
      return await api
        .post(
          `/activity/template`,
          {},
          {
            responseType: "blob",
          }
        )
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `Activity Template.xlsx`;

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

    const importActivity = async (payload: File) => {
      const formData = new FormData();
      formData.append("file", payload);

      return await api
        .post(`/activity/import`, formData)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };
    // END

    // EQUIPMENT
    const getEquipment = async (payload: IParams) => {
      return await api
        .get(`/equipment`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const createEquipment = async (payload: EquipmentCreateInterface) => {
      return await api
        .post(`/equipment`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const updateEquipment = async (
      id: string,
      payload: EquipmentCreateInterface
    ) => {
      return await api
        .put(`/equipment/${id}`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const deleteEquipment = async (id: string) => {
      return await api
        .delete(`/equipment/${id}`)
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const downloadEquipment = async () => {
      return await api
        .post(
          `/equipment/export`,
          {},
          {
            responseType: "blob",
          }
        )
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `Equipment.xlsx`;

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

    const templateEquipment = async () => {
      return await api
        .post(
          `/equipment/template`,
          {},
          {
            responseType: "blob",
          }
        )
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `Equipment Template.xlsx`;

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

    const importEquipment = async (payload: File) => {
      const formData = new FormData();
      formData.append("file", payload);

      return await api
        .post(`/equipment/import`, formData)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };
    // END

    // PART STD
    const getPartStd = async (payload: IParams) => {
      return await api
        .get(`/part-std`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const createPartStd = async (payload: PartStdCreateInterface) => {
      return await api
        .post(`/part-std`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const updatePartStd = async (
      id: string,
      payload: PartStdCreateInterface
    ) => {
      return await api
        .put(`/part-std/${id}`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const deletePartStd = async (id: string) => {
      return await api
        .delete(`/part-std/${id}`)
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const downloadPartStd = async () => {
      return await api
        .post(
          `/part-std/export`,
          {},
          {
            responseType: "blob",
          }
        )
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `Part Standart.xlsx`;

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

    const templatePartStd = async () => {
      return await api
        .post(
          `/part-std/template`,
          {},
          {
            responseType: "blob",
          }
        )
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `Part Standart Template.xlsx`;

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

    const importPartStd = async (payload: File) => {
      const formData = new FormData();
      formData.append("file", payload);

      return await api
        .post(`/part-std/import`, formData)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };
    // END

    // MANPOWER STD
    const getManpowerStd = async (payload: IParams) => {
      return await api
        .get(`/manpower-std`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const createManpowerStd = async (payload: ManpowerStdCreateInterface) => {
      return await api
        .post(`/manpower-std`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const updateManpowerStd = async (
      id: string,
      payload: ManpowerStdCreateInterface
    ) => {
      return await api
        .put(`/manpower-std/${id}`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const deleteManpowerStd = async (id: string) => {
      return await api
        .delete(`/manpower-std/${id}`)
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const downloadManpowerStd = async () => {
      return await api
        .post(
          `/manpower-std/export`,
          {},
          {
            responseType: "blob",
          }
        )
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `Manpower Standart.xlsx`;

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

    const templateManpowerStd = async () => {
      return await api
        .post(
          `/manpower-std/template`,
          {},
          {
            responseType: "blob",
          }
        )
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `Manpower Standart Template.xlsx`;

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

    const importManpowerStd = async (payload: File) => {
      const formData = new FormData();
      formData.append("file", payload);

      return await api
        .post(`/manpower-std/import`, formData)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };
    // END

    // CONSUMABLE MATERIAL STD
    const getConsumableMaterialStd = async (payload: IParams) => {
      return await api
        .get(`/cons-mat-std`, {
          params: payload,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const createConsumableMaterialStd = async (
      payload: ConsumableMaterialStdCreateInterface
    ) => {
      return await api
        .post(`/cons-mat-std`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const updateConsumableMaterialStd = async (
      id: string,
      payload: ConsumableMaterialStdCreateInterface
    ) => {
      return await api
        .put(`/cons-mat-std/${id}`, payload)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const deleteConsumableMaterialStd = async (id: string) => {
      return await api
        .delete(`/cons-mat-std/${id}`)
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const downloadConsumableMaterialStd = async () => {
      return await api
        .post(
          `/cons-mat-std/export`,
          {},
          {
            responseType: "blob",
          }
        )
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `Consumable Material Standart.xlsx`;

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

    const templateConsumableMaterialStd = async () => {
      return await api
        .post(
          `/cons-mat-std/template`,
          {},
          {
            responseType: "blob",
          }
        )
        .then((resp) => {
          const url = window.URL.createObjectURL(
            new Blob([resp.data], {
              type: resp.headers["content-type"],
            })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `Consumable Material Standart Template.xlsx`;

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

    const importConsumableMaterialStd = async (payload: File) => {
      const formData = new FormData();
      formData.append("file", payload);

      return await api
        .post(`/cons-mat-std/import`, formData)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };
    // END

    return {
      getLocation,
      createLocation,
      updateLocation,
      deleteLocation,
      downloadLocation,
      templateLocation,
      importLocation,
      getUnit,
      createUnit,
      updateUnit,
      deleteUnit,
      downloadUnit,
      templateUnit,
      importUnit,
      getMachine,
      createMachine,
      updateMachine,
      deleteMachine,
      downloadMachine,
      templateMachine,
      importMachine,
      getInspectionType,
      createInspectionType,
      updateInspectionType,
      deleteInspectionType,
      downloadInspectionType,
      templateInspectionType,
      importInspectionType,
      getGlobalUnit,
      createGlobalUnit,
      updateGlobalUnit,
      deleteGlobalUnit,
      downloadGlobalUnit,
      templateGlobalUnit,
      importGlobalUnit,
      getScope,
      createScope,
      updateScope,
      deleteScope,
      downloadScope,
      templateScope,
      importScope,
      getAdditionalScope,
      createAdditionalScope,
      updateAdditionalScope,
      deleteAdditionalScope,
      downloadAdditionalScope,
      templateAdditionalScope,
      importAdditionalScope,
      getConsMat,
      createConsMat,
      updateConsMat,
      deleteConsMat,
      downloadConsMat,
      templateConsMat,
      importConsMat,
      getPart,
      createPart,
      updatePart,
      deletePart,
      downloadPart,
      templatePart,
      importPart,
      getTools,
      createTools,
      updateTools,
      deleteTools,
      getManpower,
      createManpower,
      updateManpower,
      deleteManpower,
      downloadManpower,
      templateManpower,
      importManpower,
      getUser,
      createUser,
      updateUser,
      deleteUser,
      downloadUser,
      templateUser,
      importUser,
      getRole,
      getPermission,
      createRole,
      updateRole,
      deleteRole,
      getBidang,
      createBidang,
      updateBidang,
      deleteBidang,
      downloadBidang,
      templateBidang,
      importBidang,
      getSubBidang,
      createSubBidang,
      updateSubBidang,
      deleteSubBidang,
      downloadSubBidang,
      templateSubBidang,
      importSubBidang,
      getHseDoc,
      updateHseDoc,
      createHseDoc,
      deleteHseDoc,
      downloadHseDoc,
      templateHseDoc,
      importHseDoc,
      getHse,
      createHse,
      updateHse,
      deleteHse,
      getSequence,
      createSequence,
      updateSequence,
      deleteSequence,
      downloadSequence,
      templateSequence,
      importSequence,
      getActivity,
      createActivity,
      updateActivity,
      deleteActivity,
      downloadActivity,
      templateActivity,
      importActivity,
      getEquipment,
      createEquipment,
      updateEquipment,
      deleteEquipment,
      downloadEquipment,
      templateEquipment,
      importEquipment,
      getPartStd,
      createPartStd,
      updatePartStd,
      deletePartStd,
      downloadPartStd,
      templatePartStd,
      importPartStd,
      getManpowerStd,
      createManpowerStd,
      updateManpowerStd,
      deleteManpowerStd,
      downloadManpowerStd,
      templateManpowerStd,
      importManpowerStd,
      getConsumableMaterialStd,
      createConsumableMaterialStd,
      updateConsumableMaterialStd,
      deleteConsumableMaterialStd,
      downloadConsumableMaterialStd,
      templateConsumableMaterialStd,
      importConsumableMaterialStd,
    };
  },
  {
    persist: {
      storage: encryptStorage as StorageLike,
      pick: [],
    },
  }
);
