export const getAccessToken = (): string => {
  return localStorage.getItem('accessToken') || ''
}
