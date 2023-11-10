import { OrganizationProfileResponseDto, ProfileResponseDto } from 'src/__generated__/AccountifyAPI'
import authConfig from 'src/configs/auth'

export const getAccessToken = (): string => {
  return window.localStorage.getItem(authConfig.storageTokenKeyName)!
}

export const getUserData = (): ProfileResponseDto => {
  return JSON.parse(window.localStorage.getItem('userData')!)
}

export const getOrganization = (): OrganizationProfileResponseDto => {
  return JSON.parse(window.localStorage.getItem('organization')!)
}

export const getOrgId = (): number => {
  return JSON.parse(window.localStorage.getItem('organization')!).id
}
