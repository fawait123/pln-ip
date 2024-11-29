import DefaultLayout from "@/layouts/DefaultLayout.vue";

export const routeScope = [
  {
    path: "/:id/create/unit/:scope",
    name: "scope",
    component: () => import("@/modules/scope/views/Scope.vue"),
    meta: { layout: DefaultLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:scope/ci",
    name: "combustion-inspection",
    component: () => import("@/modules/scope/views/CombustionInspection.vue"),
    meta: { layout: DefaultLayout, requireAuth: true },
  },
];
