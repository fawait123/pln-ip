import MainLayout from "@/layouts/MainLayout.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

export const routeMain = [
  // {
  //   path: "/:id/create/unit/:scope/:menu/scope",
  //   name: "main scope",
  //   component: () => import("@/modules/main/views/scope/Scope.vue"),
  //   meta: { layout: MainLayout, requireAuth: true },
  // },
  {
    path: "/:id/create/unit/:scope/:menu/:id_project/scope-mekanik",
    name: "scope mekanik",
    component: () => import("@/modules/main/views/scope/Mekanik.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:scope/:menu/:id_project/scope-listrik",
    name: "scope listrik",
    component: () => import("@/modules/main/views/scope/Listrik.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:scope/:menu/:id_project/scope-instrument",
    name: "scope instrument",
    component: () => import("@/modules/main/views/scope/Instrument.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  // {
  //   path: "/:id/create/unit/:scope/:menu/:id_project/work-instruction",
  //   name: "main work instruction",
  //   component: () =>
  //     import("@/modules/main/views/work-instruction/WorkInstruction.vue"),
  //   meta: { layout: MainLayout, requireAuth: true },
  // },
  {
    path: "/:id/create/unit/:scope/:menu/:id_project/work-instruction-mekanik",
    name: "work instruction mekanik",
    component: () =>
      import("@/modules/main/views/work-instruction/Mekanik.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:scope/:menu/:id_project/work-instruction-listrik",
    name: "work instruction listrik",
    component: () =>
      import("@/modules/main/views/work-instruction/Listrik.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:scope/:menu/:id_project/work-instruction-instrument",
    name: "work instruction instrument",
    component: () =>
      import("@/modules/main/views/work-instruction/Instrument.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:scope/:menu/:id_project/consumable-material",
    name: "main consumable material",
    component: () => import("@/modules/main/views/ConsumableMaterial.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:scope/:menu/:id_project/manpower",
    name: "main manpower",
    component: () => import("@/modules/main/views/Manpower.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:scope/:menu/:id_project/part",
    name: "main part",
    component: () => import("@/modules/main/views/Part.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:scope/:menu/:id_project/hse",
    name: "main hse",
    component: () => import("@/modules/main/views/Hse.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:scope/:menu/:id_project/qc-plan",
    name: "main qc plan",
    component: () => import("@/modules/main/views/QcPlan.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:scope/:menu/:id_project/squences",
    name: "main squences",
    component: () => import("@/modules/scope/views/Sequence.vue"),
    meta: { layout: DefaultLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:scope/:menu/:id_project/preview",
    name: "preview",
    component: () => import("@/modules/main/views/Preview.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:scope/:menu/:id_project/results",
    name: "results",
    component: () => import("@/modules/main/views/Results.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:scope/:menu/:id_project/add-scope-squences",
    name: "main add scope squences",
    component: () => import("@/modules/main/views/AddScopeSquences.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:scope/:menu/:id_project/add-scope-table",
    name: "main add scope table",
    component: () => import("@/modules/main/views/AddScopeTable.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:scope/:menu/:id_project/add-scope-squences/:section",
    name: "main add scope squences section",
    component: () => import("@/modules/scope/views/CIAddScopeSection.vue"),
    meta: { layout: DefaultLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:scope/:menu/:id_project/add-scope-squences/:section/result",
    name: "main add scope squences section result",
    component: () =>
      import("@/modules/scope/views/CIAddScopeSectionResult.vue"),
    meta: { layout: DefaultLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:scope/:menu/:id_project/add-scope-squences/:section/result/finish",
    name: "main add scope squences section result finish",
    component: () => import("@/modules/scope/views/CIResult.vue"),
    meta: { layout: DefaultLayout, requireAuth: true },
  },
];
