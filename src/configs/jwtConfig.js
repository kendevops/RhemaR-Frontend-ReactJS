// ** Auth Endpoints
export default {
  loginEndpoint: '/api/login',
  registerEndpoint: '/api/register',
  refreshEndpoint: '/api/refresh-token',
  logoutEndpoint: '/api/logout',
  verifyEmailEndpoint: '/api/verify-email',
  resetPasswordEndpoint: '/api/reset-password',
  forgotPasswordEndpoint: '/api/forgot-password',

  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken'
}
