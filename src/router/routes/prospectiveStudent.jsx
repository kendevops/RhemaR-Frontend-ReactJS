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
    path: "/profile",
    component: lazy(() => import("../../views/student/profile")),
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
  {
    path: "/:id",
    component: lazy(() =>
      import("../../views/prospective-student/ConfirmVerification")
    ),
    layout: "GuestLayout",
    meta: {
      publicRoute: true,
    },
  },
];

export default ProspectiveStudentRoutes;
