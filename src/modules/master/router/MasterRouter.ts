import MasterLayout from "@/layouts/MasterLayout.vue";

export const routeMaster = [
  {
    path: "/master/location",
    name: "master location",
    component: () => import("@/modules/master/views/Location.vue"),
    meta: { layout: MasterLayout, requireAuth: true, role: "superuser" },
  },
  {
    path: "/master/unit",
    name: "master unit",
    component: () => import("@/modules/master/views/Unit.vue"),
    meta: { layout: MasterLayout, requireAuth: true, role: "superuser" },
  },
  {
    path: "/master/machine",
    name: "master machine",
    component: () => import("@/modules/master/views/Machine.vue"),
    meta: { layout: MasterLayout, requireAuth: true, role: "superuser" },
  },
  {
    path: "/master/inspection-type",
    name: "master inspection type",
    component: () => import("@/modules/master/views/InspectionType.vue"),
    meta: { layout: MasterLayout, requireAuth: true, role: "superuser" },
  },
  {
    path: "/master/global-unit",
    name: "master global unit",
    component: () => import("@/modules/master/views/GlobalUnit.vue"),
    meta: { layout: MasterLayout, requireAuth: true, role: "superuser" },
  },
  {
    path: "/master/scope",
    name: "master scope",
    component: () => import("@/modules/master/views/Scope.vue"),
    meta: { layout: MasterLayout, requireAuth: true, role: "superuser" },
  },
  {
    path: "/master/additional-scope",
    name: "master additional scope",
    component: () => import("@/modules/master/views/AdditionalScope.vue"),
    meta: { layout: MasterLayout, requireAuth: true, role: "superuser" },
  },
  {
    path: "/master/consumable-material",
    name: "master consumable material",
    component: () => import("@/modules/master/views/ConsumableMaterial.vue"),
    meta: { layout: MasterLayout, requireAuth: true, role: "superuser" },
  },
  {
    path: "/master/part",
    name: "master part",
    component: () => import("@/modules/master/views/Part.vue"),
    meta: { layout: MasterLayout, requireAuth: true, role: "superuser" },
  },
  {
    path: "/master/tools",
    name: "master tools",
    component: () => import("@/modules/master/views/Tools.vue"),
    meta: { layout: MasterLayout, requireAuth: true, role: "superuser" },
  },
  {
    path: "/master/manpower",
    name: "master manpower",
    component: () => import("@/modules/master/views/Manpower.vue"),
    meta: { layout: MasterLayout, requireAuth: true, role: "superuser" },
  },
  {
    path: "/master/role",
    name: "master role",
    component: () => import("@/modules/master/views/Role.vue"),
    meta: { layout: MasterLayout, requireAuth: true, role: "superuser" },
  },
  {
    path: "/master/user",
    name: "master user",
    component: () => import("@/modules/master/views/User.vue"),
    meta: { layout: MasterLayout, requireAuth: true, role: "superuser" },
  },
  {
    path: "/master/bidang",
    name: "master bidang",
    component: () => import("@/modules/master/views/Bidang.vue"),
    meta: { layout: MasterLayout, requireAuth: true, role: "superuser" },
  },
  {
    path: "/master/sub-bidang",
    name: "master subbidang",
    component: () => import("@/modules/master/views/SubBidang.vue"),
    meta: { layout: MasterLayout, requireAuth: true, role: "superuser" },
  },
];
