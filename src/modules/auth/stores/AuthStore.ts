import type { StorageLike } from "pinia-plugin-persistedstate";
import { defineStore } from "pinia";
import { ref } from "vue";

import { encryptStorage } from "@/utils/storage";
import { api } from "@/api/axios";

import type { UserType } from "../types/AuthType";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const access_token = ref<string>("");
    const users = ref<UserType | null>(null);

    function getToken() {
      return encryptStorage.getItem("access_token");
    }

    function setToken(newToken: string) {
      access_token.value = newToken;
      api.defaults.headers.common["Authorization"] = "Bearer " + newToken;
    }

    function clearToken() {
      access_token.value = "";
      encryptStorage.removeItem("access_token");
      api.defaults.headers.common["Authorization"] = "";
    }

    function checkToken() {
      const token = getToken();

      if (token) {
        setToken(token);
      }
    }

    function setUsers(usersInfo: UserType) {
      users.value = usersInfo;
    }

    function clearUsers() {
      users.value = null;
      encryptStorage.removeItem("users");
    }

    // const login = async (payload: LoginPayloadType) => {
    //   return await api
    //     .post(endpoint + "/auth/login", {
    //       email: payload.email,
    //       password: payload.password,
    //     })
    //     .then((resp) => {
    //       return Promise.resolve(resp);
    //     })
    //     .catch((err) => {
    //       return Promise.reject(err);
    //     });
    // };

    const logout = async () => {
      clearToken();
      clearUsers();
    };

    return {
      access_token,
      getToken,
      setToken,
      clearToken,
      checkToken,
      setUsers,
      clearUsers,
      logout,
    };
  },
  {
    persist: {
      storage: encryptStorage as StorageLike,
      pick: ["access_token", "users"],
    },
  }
);
