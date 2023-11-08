import authConfig from 'src/configs/auth'

export const getAccessToken = () => {
  return window.localStorage.getItem(authConfig.storageTokenKeyName)!
}

export const getUserData = () => {
  return JSON.parse(window.localStorage.getItem('userData')!)
}

export const getOrganization = () => {
  return JSON.parse(window.localStorage.getItem('organization')!)
}

export const getOrgId = () => {
  return JSON.parse(window.localStorage.getItem('organization')!).id
}

export const getPermissions = () => {
  return JSON.parse(window.localStorage.getItem('permissions')!)
}
