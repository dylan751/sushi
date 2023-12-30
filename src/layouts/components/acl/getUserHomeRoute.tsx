// ** Types
import { ProfileResponseDto } from 'src/__generated__/AccountifyAPI'

// ** Utils
import { getOrgUniqueName } from 'src/utils/organization'

export const defaultHomeRoute = 'dashboards/analytics'

/**
 *  Set Home URL based on User Roles
 */
const getUserHomeRoute = (user: ProfileResponseDto) => {
  const orgUniqueName = getOrgUniqueName()
  const organization = user.organizations && user.organizations.find(org => org.uniqueName === orgUniqueName)

  if (organization) {
    return `${orgUniqueName}/${defaultHomeRoute}`
  }

  return '/organization'
}

export default getUserHomeRoute
