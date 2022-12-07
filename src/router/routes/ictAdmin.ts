import { lazy } from "react";

//campuses route
//campus/:id route

const ictAdminRoutes = [
  {
    path: "/ict-admin/dashboard",
    component: lazy(() => import("../../views/ict-admin/Dashboard")),
    meta: {
      action: "read",
      resource: "Admins",
    },
  },
  {
    path: "/ict-admin/user-management",
    component: lazy(() => import("../../views/ict-admin/UserManagement")),
    meta: {
      action: "read",
      resource: "Admins",
    },
  },
  {
    path: "/ict-admin/tuition-management",
    component: lazy(() => import("../../views/ict-admin/TuitionManagement")),
    meta: {
      action: "manage",
      resource: "all",
    },
  },
  {
    path: "/ict-admin/roles-privilleges",
    component: lazy(() => import("../../views/ict-admin/RolesPriviledges")),
    meta: {
      action: "read",
      resource: "Admins",
    },
  },
  {
    path: "/ict-admin/courses",
    component: lazy(() => import("../../views/ict-admin/Courses")),
    meta: {
      action: "read",
      resource: "Admins",
    },
  },
  {
    path: "/ict-admin/message-board",
    component: lazy(() => import("../../views/ict-admin/MessageBoard")),
    meta: {
      action: "read",
      resource: "Admins",
    },
  },
  {
    path: "/ict-admin/resources",
    component: lazy(() => import("../../views/ict-admin/Resources")),
    meta: {
      action: "read",
      resource: "Admins",
    },
  },
  {
    path: "/ict-admin/instructors",
    component: lazy(() => import("../../views/ict-admin/Instructors")),
    meta: {
      action: "read",
      resource: "Admins",
    },
  },

  {
    path: "/ict-admin/instructor/:id",
    component: lazy(() => import("../../views/ict-admin/Instructor")),
    meta: {
      action: "read",
      resource: "Admins",
    },
  },
  {
    path: "/ict-admin/tuition-clearance",
    component: lazy(() => import("../../views/ict-admin/TuitionClearance")),
    meta: {
      action: "read",
      resource: "Admins",
    },
  },
  {
    path: "/ict-admin/tuition/:id",
    component: lazy(() => import("../../views/ict-admin/Tuition")),
    meta: {
      action: "read",
      resource: "Admins",
    },
  },
];

export default ictAdminRoutes;
