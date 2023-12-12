// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

// ** Utils
import { getOrganization } from 'src/utils/localStorage'

const navigation = (): VerticalNavItemsType => {
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
      action: 'read',
      subject: 'user',
      title: 'navbar.account_settings_page.account_settings',
      icon: 'mdi:account-cog-outline',
      children: [
        {
          action: 'read',
          subject: 'user',
          title: 'navbar.account_settings_page.account',
          path: `${uniqueName}/account-settings/account`
        },
        {
          action: 'read',
          subject: 'user',
          title: 'navbar.account_settings_page.security',
          path: `${uniqueName}/account-settings/security`
        }
      ]
    }
  ]
}

export default navigation
