import MasterLayout from "@/layouts/MasterLayout.vue";

export const routeMaster = [
  {
    path: "/master/location",
    name: "master location",
    component: () => import("@/modules/master/views/Location.vue"),
    meta: { layout: MasterLayout, requireAuth: true },
  },
  {
    path: "/master/unit",
    name: "master unit",
    component: () => import("@/modules/master/views/Unit.vue"),
    meta: { layout: MasterLayout, requireAuth: true },
  },
  {
    path: "/master/machine",
    name: "master machine",
    component: () => import("@/modules/master/views/Machine.vue"),
    meta: { layout: MasterLayout, requireAuth: true },
  },
  {
    path: "/master/inspection-type",
    name: "master inspection type",
    component: () => import("@/modules/master/views/InspectionType.vue"),
    meta: { layout: MasterLayout, requireAuth: true },
  },
];
