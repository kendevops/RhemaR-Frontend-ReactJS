// ** Auth Endpoints
export default {
  loginEndpoint: 'login',
  registerEndpoint: 'register',
  refreshEndpoint: 'refresh-token',
  logoutEndpoint: 'logout',
  verifyEmailEndpoint: 'verify-email',
  resetPasswordEndpoint: 'reset-password',
  forgotPasswordEndpoint: 'forgot-password',

  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken'
}
