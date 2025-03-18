import AuthLayout from "@/layouts/AuthLayout.vue";

export const routeNotFound = [
  {
    path: "/not-found",
    name: "not-found",
    component: () => import("@/modules/not-found/views/Index.vue"),
    meta: { layout: AuthLayout },
  },
];
