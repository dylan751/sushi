export default {
  userProfileEndpoint: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/profile`,
  loginEndpoint: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/login`,
  registerEndpoint: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/register`,
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
