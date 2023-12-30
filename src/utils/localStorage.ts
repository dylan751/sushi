import { OrganizationProfileResponseDto, ProfileResponseDto } from 'src/__generated__/AccountifyAPI'

export const getAccessToken = (): string => {
  return localStorage.getItem('accessToken') || ''
}

export const getUserData = (): ProfileResponseDto | null => {
  const userData = localStorage.getItem('userData')

  if (userData) {
    return JSON.parse(userData)
  }

  return null
}

export const getOrganization = (): OrganizationProfileResponseDto | null => {
  const organization = localStorage.getItem('organization')
  if (organization) {
    return JSON.parse(organization)
  }

  return null
}

export const getOrgId = (): number => {
  const organization = JSON.parse(localStorage.getItem('organization') || '')

  return organization.id
}
