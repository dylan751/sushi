// ** Types
import { OrganizationProfileResponseDto } from 'src/__generated__/AccountifyAPI'

// ** Utils
export const defaultHomeRoute = 'dashboards/analytics'
export const selectOrganizationRoute = 'organization'
export const loginRoute = 'login'

export const createOrganizationRoute = '/organization/new/'

/**
 *  Set Home URL based on User Roles
 */
const getUserHomeRoute = (organization: OrganizationProfileResponseDto | undefined, currentPath: string) => {
  /**
   * If user has permission for that organization, log them in
   */
  if (organization) {
    return currentPath
  }

  /**
   * Acceptable paths
   */
  if (currentPath === createOrganizationRoute) {
    return currentPath
  }

  /**
   * Default redirect path
   */
  return `/${selectOrganizationRoute}`
}

export default getUserHomeRoute
