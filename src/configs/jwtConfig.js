// ** Auth Endpoints
export default {
  loginEndpoint: "/auth/login",
  registerEndpoint: "/auth/signup",
  refreshEndpoint: "/auth/refresh",
  logoutEndpoint: "/auth/logout",
  verifyEmailEndpoint: "/auth/email/resend-verification",
  resetPasswordEndpoint: "/auth/password/reset",
  forgotPasswordEndpoint: "/auth/password/forgot",

  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: "Bearer",

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: "accessToken",
  storageRefreshTokenKeyName: "refreshToken",
};
