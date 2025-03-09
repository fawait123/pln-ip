import MainLayout from "@/layouts/MainLayout.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import AddScopeLayout from "@/layouts/AddScopeLayout.vue";

export const routeMain = [
  // {
  //   path: "/:id/create/unit/:id_unit/:id_machine/:menu/scope",
  //   name: "main scope",
  //   component: () => import("@/modules/main/views/scope/Scope.vue"),
  //   meta: { layout: MainLayout, requireAuth: true },
  // },
  {
    path: "/:id/create/unit/:id_unit/:id_machine/:menu/:id_project/:id_inspection/scope-mekanik",
    name: "scope mekanik",
    component: () => import("@/modules/main/views/scope/Mekanik.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:id_unit/:id_machine/:menu/:id_project/:id_inspection/scope-listrik",
    name: "scope listrik",
    component: () => import("@/modules/main/views/scope/Listrik.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:id_unit/:id_machine/:menu/:id_project/:id_inspection/scope-instrument",
    name: "scope instrument",
    component: () => import("@/modules/main/views/scope/Instrument.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  // {
  //   path: "/:id/create/unit/:id_unit/:id_machine/:menu/:id_project/work-instruction",
  //   name: "main work instruction",
  //   component: () =>
  //     import("@/modules/main/views/work-instruction/WorkInstruction.vue"),
  //   meta: { layout: MainLayout, requireAuth: true },
  // },
  {
    path: "/:id/create/unit/:id_unit/:id_machine/:menu/:id_project/:id_inspection/work-instruction-mekanik",
    name: "work instruction mekanik",
    component: () =>
      import("@/modules/main/views/work-instruction/Mekanik.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:id_unit/:id_machine/:menu/:id_project/:id_inspection/work-instruction-listrik",
    name: "work instruction listrik",
    component: () =>
      import("@/modules/main/views/work-instruction/Listrik.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:id_unit/:id_machine/:menu/:id_project/:id_inspection/work-instruction-instrument",
    name: "work instruction instrument",
    component: () =>
      import("@/modules/main/views/work-instruction/Instrument.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:id_unit/:id_machine/:menu/:id_project/:id_inspection/consumable-material",
    name: "main consumable material",
    component: () => import("@/modules/main/views/ConsumableMaterial.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:id_unit/:id_machine/:menu/:id_project/:id_inspection/manpower",
    name: "main manpower",
    component: () => import("@/modules/main/views/Manpower.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:id_unit/:id_machine/:menu/:id_project/:id_inspection/part",
    name: "main part",
    component: () => import("@/modules/main/views/Part.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:id_unit/:id_machine/:menu/:id_project/:id_inspection/tools",
    name: "main tools",
    component: () => import("@/modules/main/views/Tools.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:id_unit/:id_machine/:menu/:id_project/:id_inspection/hse",
    name: "main hse",
    component: () => import("@/modules/main/views/Hse.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:id_unit/:id_machine/:menu/:id_project/:id_inspection/qc-plan",
    name: "main qc plan",
    component: () => import("@/modules/main/views/QcPlan.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:id_unit/:id_machine/:menu/:id_project/:id_inspection/squences",
    name: "main squences",
    component: () => import("@/modules/scope/views/Sequence.vue"),
    meta: { layout: DefaultLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:id_unit/:id_machine/:menu/:id_project/:id_inspection/preview",
    name: "preview",
    component: () => import("@/modules/main/views/Preview.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:id_unit/:id_machine/:menu/:id_project/:id_inspection/results",
    name: "results",
    component: () => import("@/modules/main/views/Results.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:id_unit/:id_machine/:menu/:id_project/:id_inspection/add-scope",
    name: "main add scope",
    component: () => import("@/modules/main/views/AddScope.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:id_unit/:id_machine/:menu/:id_project/:id_inspection/add-scope-squences",
    name: "main add scope squences",
    component: () => import("@/modules/main/views/AddScopeSquences.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:id_unit/:id_machine/:menu/:id_project/:id_inspection/add-scope-table",
    name: "main add scope table",
    component: () => import("@/modules/main/views/AddScopeTable.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:id_unit/:id_machine/:menu/:id_project/:id_inspection/add-scope/:id_scope/scope-mekanik",
    name: "add scope detail scope mekanik",
    component: () =>
      import("@/modules/main/views/add-scope-detail/scope/Mekanik.vue"),
    meta: { layout: AddScopeLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:id_unit/:id_machine/:menu/:id_project/:id_inspection/add-scope/:id_scope/scope-listrik",
    name: "add scope detail scope listrik",
    component: () =>
      import("@/modules/main/views/add-scope-detail/scope/Listrik.vue"),
    meta: { layout: AddScopeLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:id_unit/:id_machine/:menu/:id_project/:id_inspection/add-scope/:id_scope/scope-instrument",
    name: "add scope detail scope instrument",
    component: () =>
      import("@/modules/main/views/add-scope-detail/scope/Instrument.vue"),
    meta: { layout: AddScopeLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:id_unit/:id_machine/:menu/:id_project/:id_inspection/add-scope/:id_scope/work-instruction-mekanik",
    name: "add scope detail work instruction mekanik",
    component: () =>
      import(
        "@/modules/main/views/add-scope-detail/work-instruction/Mekanik.vue"
      ),
    meta: { layout: AddScopeLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:id_unit/:id_machine/:menu/:id_project/:id_inspection/add-scope/:id_scope/work-instruction-listrik",
    name: "add scope detail work instruction listrik",
    component: () =>
      import(
        "@/modules/main/views/add-scope-detail/work-instruction/Listrik.vue"
      ),
    meta: { layout: AddScopeLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:id_unit/:id_machine/:menu/:id_project/:id_inspection/add-scope/:id_scope/work-instruction-instrument",
    name: "add scope detail work instruction instrument",
    component: () =>
      import(
        "@/modules/main/views/add-scope-detail/work-instruction/Instrument.vue"
      ),
    meta: { layout: AddScopeLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:id_unit/:id_machine/:menu/:id_project/:id_inspection/add-scope/:id_scope/consumable-material",
    name: "add scope detail consumable material",
    component: () =>
      import("@/modules/main/views/add-scope-detail/ConsumableMaterial.vue"),
    meta: { layout: AddScopeLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:id_unit/:id_machine/:menu/:id_project/:id_inspection/add-scope/:id_scope/manpower",
    name: "add scope detail manpower",
    component: () =>
      import("@/modules/main/views/add-scope-detail/Manpower.vue"),
    meta: { layout: AddScopeLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:id_unit/:id_machine/:menu/:id_project/:id_inspection/add-scope/:id_scope/part",
    name: "add scope detail part",
    component: () => import("@/modules/main/views/add-scope-detail/Part.vue"),
    meta: { layout: AddScopeLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:id_unit/:id_machine/:menu/:id_project/:id_inspection/add-scope/:id_scope/qc-plan",
    name: "add scope detail qc plan",
    component: () => import("@/modules/main/views/add-scope-detail/QcPlan.vue"),
    meta: { layout: AddScopeLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:id_unit/:id_machine/:menu/:id_project/:id_inspection/add-scope/:id_scope/tools",
    name: "add scope detail tools",
    component: () => import("@/modules/main/views/add-scope-detail/Tools.vue"),
    meta: { layout: AddScopeLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:id_unit/:id_machine/:menu/:id_project/:id_inspection/add-scope-squences/:section",
    name: "main add scope squences section",
    component: () => import("@/modules/scope/views/CIAddScopeSection.vue"),
    meta: { layout: DefaultLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:id_unit/:id_machine/:menu/:id_project/add-scope-squences/:section/result",
    name: "main add scope squences section result",
    component: () =>
      import("@/modules/scope/views/CIAddScopeSectionResult.vue"),
    meta: { layout: DefaultLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:id_unit/:id_machine/:menu/:id_project/add-scope-squences/:section/result/finish",
    name: "main add scope squences section result finish",
    component: () => import("@/modules/scope/views/CIResult.vue"),
    meta: { layout: DefaultLayout, requireAuth: true },
  },
];
