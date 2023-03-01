import { lazy } from "react";

const StudentRoutes = [
  {
    path: "/student/dashboard",
    component: lazy(() => import("../../views/student/dashboard")),
    meta: {
      action: "read",
      resource: "Students",
    },
  },
  {
    path: "/student/tuition-clearance",
    component: lazy(() => import("../../views/student/tuition-clearance")),
    meta: {
      action: "read",
      resource: "Students",
    },
  },
  {
    path: "/student/profile",
    component: lazy(() => import("../../views/student/profile")),
    meta: {
      action: "read",
      resource: "Students",
    },
  },
  {
    path: "/student/courses",
    component: lazy(() => import("../../views/student/Courses")),
    meta: {
      action: "read",
      resource: "Students",
    },
  },
  {
    path: "/student/all-courses",
    component: lazy(() => import("../../views/student/AllCourses")),
    meta: {
      action: "read",
      resource: "Students",
    },
  },
  {
    path: "/student/lecture/:id",
    component: lazy(() => import("../../views/student/Lecture")),
    meta: {
      action: "read",
      resource: "Students",
    },
  },
  {
    path: "/student/exam/:id",
    component: lazy(() => import("../../views/student/Exam")),
    meta: {
      action: "read",
      resource: "Students",
    },
  },
  {
    path: "/student/downloads",
    component: lazy(() => import("../../views/student/Downloads")),
    meta: {
      action: "read",
      resource: "Students",
    },
  },
  {
    path: "/student/helpdesk",
    component: lazy(() => import("../../views/student/HelpDesk")),
    meta: {
      action: "read",
      resource: "Students",
    },
  },
];

export default StudentRoutes;
