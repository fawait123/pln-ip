import MainLayout from "@/layouts/MainLayout.vue";

export const routeMain = [
  {
    path: "/:id/create/unit/:scope/scope",
    name: "main scope",
    component: () => import("@/modules/main/views/Scope.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
];
