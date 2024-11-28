import DefaultLayout from "@/layouts/DefaultLayout.vue";

export const routeScope = [
  {
    path: "/scope",
    name: "scope",
    component: () => import("@/modules/scope/views/Scope.vue"),
    meta: { layout: DefaultLayout, requireAuth: true },
  },
];
