import { lazy } from "react";

const ictAdminRoutes = [
  {
    path: "/ict-admin/dashboards",
    component: lazy(() => import("../../views/ict-admin/Dashboard")),
    meta: {
      action: "manage",
      resource: "all",
    },
  },
  {
    path: "/ict-admin/user-management",
    component: lazy(() => import("../../views/ict-admin/UserManagement")),
    meta: {
      action: "manage",
      resource: "all",
    },
  },
  {
    path: "/ict-admin/roles-privilleges",
    component: lazy(() => import("../../views/ict-admin/RolesPriviledges")),
    meta: {
      action: "manage",
      resource: "all",
    },
  },
  {
    path: "/ict-admin/courses",
    component: lazy(() => import("../../views/ict-admin/Courses")),
    meta: {
      action: "manage",
      resource: "all",
    },
  },
  {
    path: "/ict-admin/message-board",
    component: lazy(() => import("../../views/ict-admin/MessageBoard")),
    meta: {
      action: "manage",
      resource: "all",
    },
  },
  {
    path: "/ict-admin/resources",
    component: lazy(() => import("../../views/ict-admin/Resources")),
    meta: {
      action: "manage",
      resource: "all",
    },
  },
];

export default ictAdminRoutes;
