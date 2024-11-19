import DefaultLayout from "@/layouts/DefaultLayout.vue";

export const routeDashboard = [
  {
    path: "/",
    name: "dashboard",
    component: () => import("@/modules/dashboard/views/Dashboard.vue"),
    meta: { layout: DefaultLayout, requireAuth: true },
  },
  {
    path: "/:id",
    name: "blok",
    component: () => import("@/modules/dashboard/views/Location.vue"),
    meta: { layout: DefaultLayout, requireAuth: true },
  },
];
