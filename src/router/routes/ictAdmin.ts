import { lazy } from "react";

const ictAdminRoutes = [
  {
    path: "/ict-admin/dashboards",
    component: lazy(() => import("../../views/ict-admin/Dashboard")),
  },
  {
    path: "/ict-admin/user-management",
    component: lazy(() => import("../../views/ict-admin/UserManagement")),
  },
  {
    path: "/ict-admin/roles-privilleges",
    component: lazy(() => import("../../views/ict-admin/RolesPriviledges")),
  },
  {
    path: "/ict-admin/courses",
    component: lazy(() => import("../../views/ict-admin/Courses")),
  },
  {
    path: "/ict-admin/message-board",
    component: lazy(() => import("../../views/ict-admin/MessageBoard")),
  },
];

export default ictAdminRoutes;
