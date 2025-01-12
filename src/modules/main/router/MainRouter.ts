import MainLayout from "@/layouts/MainLayout.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

export const routeMain = [
  {
    path: "/:id/create/unit/:scope/scope",
    name: "main scope",
    component: () => import("@/modules/main/views/Scope.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:scope/work-instruction",
    name: "main work instruction",
    component: () => import("@/modules/main/views/WorkInstruction.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:scope/consumable-material",
    name: "main consumable material",
    component: () => import("@/modules/main/views/ConsumableMaterial.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:scope/manpower",
    name: "main manpower",
    component: () => import("@/modules/main/views/Manpower.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:scope/part",
    name: "main part",
    component: () => import("@/modules/main/views/Part.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:scope/hse",
    name: "main hse",
    component: () => import("@/modules/main/views/Hse.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:scope/qc-plan",
    name: "main qc plan",
    component: () => import("@/modules/main/views/QcPlan.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:scope/squences",
    name: "main squences",
    component: () => import("@/modules/scope/views/Sequence.vue"),
    meta: { layout: DefaultLayout, requireAuth: true },
  },
];
