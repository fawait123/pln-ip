import type { StorageLike } from "pinia-plugin-persistedstate";
import { defineStore } from "pinia";
import { ref } from "vue";

import { encryptStorage } from "@/utils/storage";
import { api } from "@/api/axios";

import type { LoginPayloadInterface, UserType } from "../types/AuthType";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const access_token = ref<string>("");
    const refresh_token = ref<string>("");
    const users = ref<UserType | null>(null);

    function getToken() {
      return encryptStorage.getItem("access_token");
    }

    function setToken(newToken: string) {
      access_token.value = newToken;
      api.defaults.headers.common["Authorization"] = "Bearer " + newToken;
    }

    function getRefreshToken() {
      return encryptStorage.getItem("refresh_token");
    }

    function setRefreshToken(newToken: string) {
      refresh_token.value = newToken;
      encryptStorage.setItem("refresh_token", newToken);
    }

    function clearToken() {
      access_token.value = "";
      refresh_token.value = "";
      encryptStorage.removeItem("access_token");
      encryptStorage.removeItem("refresh_token");
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

    const login = async (payload: LoginPayloadInterface) => {
      return await api
        .post("/auth/login", {
          email: payload.email,
          password: payload.password,
        })
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    };

    const logout = async () => {
      clearToken();
      clearUsers();
    };

    return {
      access_token,
      refresh_token,
      getToken,
      setToken,
      getRefreshToken,
      setRefreshToken,
      clearToken,
      checkToken,
      setUsers,
      clearUsers,
      logout,
      login,
    };
  },
  {
    persist: {
      storage: encryptStorage as StorageLike,
      pick: ["access_token", "users"],
    },
  }
);
