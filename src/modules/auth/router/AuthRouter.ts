import AuthLayout from "@/layouts/AuthLayout.vue";

export const routeAuth = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/modules/auth/views/Login.vue"),
    meta: { layout: AuthLayout, onlyGuest: true },
  },
];
