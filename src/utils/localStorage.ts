import { OrganizationProfileResponseDto, ProfileResponseDto } from 'src/__generated__/AccountifyAPI'

export const getAccessToken = (): string => {
  return window.localStorage.getItem('accessToken') || ''
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
