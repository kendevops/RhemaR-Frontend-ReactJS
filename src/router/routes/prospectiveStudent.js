import { lazy } from "react";

const ProspectiveStudentRoutes = [
  {
    path: "/application",
    component: lazy(() =>
      import("../../views/prospective-student/application")
    ),
    meta: {
      action: "read",
      resource: "Applications",
    },
  },
  {
    path: "/verify",
    component: lazy(() => import("../../views/prospective-student/Verify")),
    layout: "GuestLayout",
    meta: {
      publicRoute: true,
    },
  },
];

export default ProspectiveStudentRoutes;
