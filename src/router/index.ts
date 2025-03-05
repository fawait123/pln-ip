import { createRouter, createWebHistory } from "vue-router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/modules/auth/stores/AuthStore";
import { routeAuth } from "@/modules/auth/router/AuthRouter";
import { routeScope } from "@/modules/scope/router/ScopeRouter";
import { routeDashboard } from "@/modules/dashboard/router/DashboardRouter";
import { routeMain } from "@/modules/main/router/MainRouter";
import { routeMaster } from "@/modules/master/router/MasterRouter";
// import { api } from "@/api/axios";

const routes = [
  ...routeAuth,
  ...routeDashboard,
  ...routeScope,
  ...routeMain,
  ...routeMaster,
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }

    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const { access_token } = storeToRefs(authStore);
  const token = access_token.value;

  // if (token) {
  //   api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  // }

  const handleNavigation = () => {
    if (token) {
      if (to.matched.some((record) => record.meta.onlyGuest)) {
        next({ path: "/" });
      } else if (to.matched.some((record) => record.meta.requireAuth)) {
        next();
      } else {
        next();
      }
    } else if (to.matched.some((record) => record.meta.requireAuth)) {
      if (!token) {
        next({ path: "/login" });
      } else {
        next();
      }
    } else {
      next();
    }
  };

  return handleNavigation();
});

export default router;
