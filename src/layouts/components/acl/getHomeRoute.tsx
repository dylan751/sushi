// ** Types
import { OrganizationProfileResponseDto, ProfileResponseDto } from 'src/__generated__/AccountifyAPI'

// ** Utils
import { getOrganization } from 'src/utils/localStorage'

/**
 *  Set Home URL based on User Roles
 */
const getHomeRoute = (user: ProfileResponseDto) => {
  const organization: OrganizationProfileResponseDto = getOrganization()
  const uniqueName = organization ? `/${organization.uniqueName}` : ''

  // Get user's organization's role
  let role = ''
  if (organization) {
    const userOrganization = user.organizations.find(org => org.id === organization.id)!
    role = userOrganization.roles[0].slug // Just to check if an user has logged in an organization or not
  }

  if (!role) return '/organization'
  else return `${uniqueName}/home`
}

export default getHomeRoute
