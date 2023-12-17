// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

// ** Utils
import { getOrganization } from 'src/utils/localStorage'

const navigation = (): HorizontalNavItemsType => {
  const organization = getOrganization()
  const uniqueName = organization ? `/${organization.uniqueName}` : ''

  return [
    {
      title: 'navbar.dashboards_page.dashboards',
      icon: 'mdi:home-outline',
      badgeContent: 'new',
      badgeColor: 'error',
      children: [
        {
          action: 'read',
          subject: 'user',
          title: 'navbar.dashboards_page.analytics',
          path: `${uniqueName}/dashboards/analytics`
        }
      ]
    },
    {
      path: `${uniqueName}/roles`,
      action: 'read',
      subject: 'role',
      title: 'navbar.role_page',
      icon: 'mdi:shield-outline'
    },
    {
      path: `${uniqueName}/users`,
      action: 'read',
      subject: 'user',
      title: 'navbar.user_page',
      icon: 'mdi:account-outline'
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
