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
import type {
  AdditionalScopeCreateInterface,
  AdditionalScopeUpdateInterface,
} from "../types/AdditionalScopeType";
import type { BidangCreateInterface } from "../types/BidangType";
import type { SubBidangCreateInterface } from "../types/SubBidangType";
import type { HseDocCreateInterface } from "../types/HseDocTypes";
import type { HseCreateInterface } from "../types/HseTypes";
import type { SequenceCreateInterface } from "../types/SequenceTypes";
import type { ActivityCreateInterface } from "../types/AcitivityType";
import type { EquipmentCreateInterface } from "../types/EquipmentType";
import type { PartStdCreateInterface } from "../types/PartStdType";
import type { ManpowerStdCreateInterface } from "../types/ManpowerStdType";

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
      payload: AdditionalScopeUpdateInterface
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
    // --- END\

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
    // END

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
      getGlobalUnit,
      createGlobalUnit,
      updateGlobalUnit,
      deleteGlobalUnit,
      getScope,
      createScope,
      updateScope,
      deleteScope,
      getAdditionalScope,
      createAdditionalScope,
      updateAdditionalScope,
      deleteAdditionalScope,
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
      getUser,
      createUser,
      updateUser,
      deleteUser,
      getRole,
      getPermission,
      createRole,
      updateRole,
      deleteRole,
      getBidang,
      createBidang,
      updateBidang,
      deleteBidang,
      getSubBidang,
      createSubBidang,
      updateSubBidang,
      deleteSubBidang,
      getHseDoc,
      updateHseDoc,
      createHseDoc,
      deleteHseDoc,
      getHse,
      createHse,
      updateHse,
      deleteHse,
      getSequence,
      createSequence,
      updateSequence,
      deleteSequence,
      getActivity,
      createActivity,
      updateActivity,
      deleteActivity,
      getEquipment,
      createEquipment,
      updateEquipment,
      deleteEquipment,
      getPartStd,
      createPartStd,
      updatePartStd,
      deletePartStd,
      getManpowerStd,
      createManpowerStd,
      updateManpowerStd,
      deleteManpowerStd,
    };
  },
  {
    persist: {
      storage: encryptStorage as StorageLike,
      pick: [],
    },
  }
);
