import axios, { AxiosError } from "axios";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/modules/auth/stores/AuthStore";
import { useRouter } from "vue-router";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const authStore = useAuthStore();
  const { access_token } = storeToRefs(authStore);

  if (access_token.value) {
    config.headers.Authorization = `Bearer ${access_token.value}`;
  }
  return config;
});

export { api };
