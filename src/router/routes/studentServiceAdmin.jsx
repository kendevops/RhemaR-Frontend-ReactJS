import { lazy } from "react";

const StudentServiceAdminRoutes = [
  {
    path: "/student-services-admin/alumni",
    component: lazy(() => import("../../views/campus-coordinator/alumni")),
  },
  {
    path: "/student-services-admin/dashboard",
    component: lazy(() => import("../../views/campus-coordinator/dashboard")),
  },
  {
    path: "/student-services-admin/chat",
    component: lazy(() => import("../../views/campus-coordinator/chat")),
  },
  {
    path: "/student-services-admin/events",
    component: lazy(() => import("../../views/campus-coordinator/events")),
  },
  {
    path: "/student-services-admin/helpdesk",
    component: lazy(() => import("../../views/campus-coordinator/helpdesk")),
  },
  {
    path: "/student-services-admin/instructors",
    component: lazy(() => import("../../views/campus-coordinator/instructors")),
  },
  {
    path: "/student-services-admin/instructor/:id",
    component: lazy(() => import("../../views/ict-admin/Instructor")),
  },
  {
    path: "/student-services-admin/message-board",
    component: lazy(() => import("../../views/ict-admin/MessageBoard")),
  },
  {
    path: "/student-services-admin/profile",
    component: lazy(() => import("../../views/campus-coordinator/profile")),
  },
  {
    path: "/student-services-admin/students",
    component: lazy(() => import("../../views/campus-coordinator/students")),
  },
  {
    path: "/student-services-admin/applications",
    component: lazy(() => import("../../views/ict-admin/Applications")),
  },

  {
    path: "/student-services-admin/student-services-admin",
    component: lazy(() =>
      import("../../views/campus-coordinator/studentServicesAdmin")
    ),
  },

  {
    path: "/student-services-admin/defered-applications",
    component: lazy(() =>
      import("../../views/campus-coordinator/DeferedApplications")
    ),
  },

  {
    path: "/student-services-admin/:id",
    component: lazy(() =>
      import("../../views/campus-coordinator/studentDetails")
    ),
  },
  {
    path: "/student-services-admin/tuition-clearance",
    component: lazy(() =>
      import("../../views/campus-coordinator/tuitionClearance")
    ),
  },
].map((p) => ({
  ...p,
  meta: {
    action: "read",
    resource: "CampusCoordinators",
  },
}));

export default StudentServiceAdminRoutes;
