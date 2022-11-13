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
  {
    path: "/student/all-courses",
    component: lazy(() => import("../../views/student/AllCourses")),
  },
  {
    path: "/student/lecture/:id",
    component: lazy(() => import("../../views/student/Lecture")),
  },
  {
    path: "/student/exam/:id",
    component: lazy(() => import("../../views/student/Exam")),
  },
  {
    path: "/student/downloads",
    component: lazy(() => import("../../views/student/Downloads")),
  },
];

export default StudentRoutes;
