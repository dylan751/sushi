// ** Types
import { OrganizationProfileResponseDto } from 'src/__generated__/AccountifyAPI'

// ** Utils
import { getCreateOrganizationUrl, getSelectOrganizationUrl } from 'src/utils/router/organization'

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
  if (currentPath === getCreateOrganizationUrl()) {
    return currentPath
  }

  /**
   * Default redirect path
   */
  return getSelectOrganizationUrl()
}

export default getUserHomeRoute
