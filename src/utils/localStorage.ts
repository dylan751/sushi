import { OrganizationProfileResponseDto, ProfileResponseDto } from 'src/__generated__/AccountifyAPI'
import authConfig from 'src/configs/auth'

export const getAccessToken = (): string => {
  return window.localStorage.getItem(authConfig.storageTokenKeyName) || ''
}

export const getUserData = (): ProfileResponseDto | null => {
  const userData = window.localStorage.getItem('userData')

  if (userData) {
    return JSON.parse(userData)
  }

  return null
}

export const getOrganization = (): OrganizationProfileResponseDto | null => {
  const organization = window.localStorage.getItem('organization')
  if (organization) {
    return JSON.parse(organization)
  }

  return null
}

export const getOrgId = (): number => {
  const organization = JSON.parse(window.localStorage.getItem('organization') || '')

  return organization.id
}
