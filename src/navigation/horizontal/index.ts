// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

// ** Utils
import { getOrganization } from 'src/utils/localStorage'

const navigation = (): HorizontalNavItemsType => {
  const organization = getOrganization()
  const uniqueName = organization ? `/${organization.uniqueName}` : ''

  return [
    {
      path: `${uniqueName}/home`,
      action: 'read',
      subject: 'user',
      title: 'navbar.home',
      icon: 'mdi:home-outline'
    },
    {
      path: `${uniqueName}/second-page`,
      action: 'read',
      subject: 'user',
      title: 'Second Page',
      icon: 'mdi:email-outline'
    },
    {
      path: `${uniqueName}/roles`,
      action: 'read',
      subject: 'role',
      title: 'navbar.role_page',
      icon: 'mdi:shield-outline'
    },
    {
      title: 'Account Settings',
      icon: 'mdi:account-cog-outline',
      children: [
        {
          title: 'Account',
          path: `${uniqueName}/account-settings/account`
        },
        {
          title: 'Security',
          path: `${uniqueName}/account-settings/security`
        }
      ]
    }
  ]
}

export default navigation
