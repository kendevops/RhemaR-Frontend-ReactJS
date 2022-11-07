import { lazy } from "react";
import { Redirect } from "react-router-dom";

const AuthRoutes = [
  {
    path: "/login",
    component: lazy(() => import("../../views/auth/login")),
    layout: "GuestLayout",
    meta: {
      publicRoute: true,
    },
  },
  {
    path: "/forgot-password",
    component: lazy(() => import("../../views/auth/forgotPassword")),
    layout: "BlankLayout",
    meta: {
      publicRoute: true,
    },
  },
  {
    path: "/reset-password",
    component: lazy(() => import("../../views/auth/resetPassword")),
    layout: "BlankLayout",
    meta: {
      publicRoute: true,
    },
  },
  {
    path: "/register",
    component: lazy(() => import("../../views/auth/register")),
    layout: "GuestLayout",
    meta: {
      publicRoute: true,
    },
  },
  {
    path: "/email-sent",
    component: lazy(() => import("../../views/auth/emailVerificationLink")),
    layout: "GuestLayout",
    meta: {
      publicRoute: true,
    },
  },
  {
    path: "/email-verification",
    component: lazy(() => import("../../views/auth/emailVerificationResult")),
    layout: "GuestLayout",
    meta: {
      publicRoute: true,
    },
  },
];

export default AuthRoutes;
