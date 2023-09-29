import { lazy } from "react";

const ProspectiveStudentRoutes = [
  {
    path: "/dashboard",
    component: lazy(() => import("../../views/prospective-student/Dashboard")),
    meta: {
      action: "read",
      resource: "Applications",
    },
  },
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
    path: "/confirm-verification/:id",
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
