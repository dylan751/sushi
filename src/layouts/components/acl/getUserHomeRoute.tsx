// ** Types
import { ProfileResponseDto } from 'src/__generated__/AccountifyAPI'

// ** Utils
import { getOrgUniqueName } from 'src/utils/organization'

/**
 *  Set Home URL based on User Roles
 */
const getUserHomeRoute = (user: ProfileResponseDto) => {
  const orgUniqueName = getOrgUniqueName()
  const organization = user.organizations.find(org => org.uniqueName === orgUniqueName)

  // Get user's organization's role
  let role = ''
  if (organization) {
    const userOrganization = user.organizations.find(org => org.id === organization.id)!
    role = userOrganization.roles[0].slug // Just to check if an user has logged in an organization or not
  }

  if (!role) return '/organization'
  else return `${orgUniqueName}/home`
}

export default getUserHomeRoute
