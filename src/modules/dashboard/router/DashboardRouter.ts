import DefaultLayout from "@/layouts/DefaultLayout.vue";
import MapLayout from "@/layouts/MapLayout.vue";
import UserHistoryLayout from "@/layouts/UserHistoryLayout.vue";

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
  {
    path: "/user-history",
    name: "user history",
    component: () => import("@/modules/dashboard/views/UserHistory.vue"),
    meta: { layout: UserHistoryLayout, requireAuth: true },
  },
];
