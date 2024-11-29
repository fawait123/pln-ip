import DefaultLayout from "@/layouts/DefaultLayout.vue";
import MapLayout from "@/layouts/MapLayout.vue";

export const routeDashboard = [
  {
    path: "/",
    name: "dashboard",
    component: () => import("@/modules/dashboard/views/Dashboard.vue"),
    meta: { layout: MapLayout, requireAuth: true },
  },
  {
    path: "/:id",
    name: "blok",
    component: () => import("@/modules/dashboard/views/Location.vue"),
    meta: { layout: DefaultLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit",
    name: "unit",
    component: () => import("@/modules/dashboard/views/Unit.vue"),
    meta: { layout: DefaultLayout, requireAuth: true },
  },
];
