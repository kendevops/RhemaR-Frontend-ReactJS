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
    path: "/ict-admin/course/:id",
    component: lazy(() => import("../../views/ict-admin/Course")),
    meta: {
      action: "read",
      resource: "Admins",
    },
  },
  {
    path: "/ict-admin/create-course",
    component: lazy(() => import("../../views/ict-admin/CreateCourse")),
    meta: {
      action: "read",
      resource: "Admins",
    },
  },
  {
    path: "/ict-admin/timetable",
    component: lazy(() => import("../../views/ict-admin/TimeTable")),
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
  {
    path: "/ict-admin/profile",
    component: lazy(() => import("../../views/student/profile")),
    meta: {
      action: "read",
      resource: "Admins",
    },
  },
  {
    path: "/ict-admin/applications",
    component: lazy(() => import("../../views/ict-admin/Applications")),
    meta: {
      action: "read",
      resource: "Admins",
    },
  },
  {
    path: "/ict-admin/exams",
    component: lazy(() => import("../../views/ict-admin/Exams")),
    meta: {
      action: "read",
      resource: "Admins",
    },
  },
  {
    path: "/ict-admin/help-desk",
    component: lazy(() => import("../../views/ict-admin/HelpDesk")),
    meta: {
      action: "read",
      resource: "Admins",
    },
  },
  {
    path: "/ict-admin/events",
    component: lazy(() => import("../../views/ict-admin/Events")),
    meta: {
      action: "read",
      resource: "Admins",
    },
  },
];

export default ictAdminRoutes;
