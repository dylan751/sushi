// ** Types
import { OrganizationProfileResponseDto } from 'src/__generated__/AccountifyAPI'

// ** Utils
export const defaultHomeRoute = 'dashboards/analytics'
export const selectOrganizationRoute = 'organization'
export const loginRoute = 'login'

/**
 *  Set Home URL based on User Roles
 */
const getUserHomeRoute = (organization: OrganizationProfileResponseDto | undefined, currentPath: string) => {
  if (organization) {
    return currentPath
  }

  return `/${selectOrganizationRoute}`
}

export default getUserHomeRoute
