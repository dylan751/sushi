export const getSelectOrganizationUrl = (): string => {
  return '/organization'
}

export const getCreateOrganizationUrl = (): string => {
  return '/organization/new'
}

export const getOrganizationDefaultHomeUrl = (orgUniqueName: string | undefined): string => {
  return `/${orgUniqueName}/dashboards/analytics`
}
