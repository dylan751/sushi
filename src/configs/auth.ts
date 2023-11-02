export default {
  // meEndpoint: '/auth/me',
  meEndpoint: 'http://localhost:4000/internal/api/v1/auth/profile',

  // loginEndpoint: '/jwt/login',
  loginEndpoint: 'http://localhost:4000/internal/api/v1/auth/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
