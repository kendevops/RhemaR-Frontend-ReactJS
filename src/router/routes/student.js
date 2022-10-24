import { lazy } from "react";

const StudentRoutes = [
  {
    path: "/student/dashboard",
    component: lazy(() => import("../../views/student/dashboard")),
  },
  {
    path: "/student/tuition-clearance",
    component: lazy(() => import("../../views/student/tuition-clearance")),
  },
  {
    path: "/student/profile",
    component: lazy(() => import("../../views/student/profile")),
  },
  {
    path: "/student/courses",
    component: lazy(() => import("../../views/student/Courses")),
  },
];

export default StudentRoutes;
