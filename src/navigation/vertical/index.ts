// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

// ** Utils
import { getOrgUniqueName } from 'src/utils/organization'

const navigation = (): VerticalNavItemsType => {
  const uniqueName = getOrgUniqueName()

  return [
    {
      title: 'navbar.dashboards_page.dashboards',
      icon: 'mdi:home-outline',
      badgeContent: 'new',
      badgeColor: 'error',
      children: [
        {
          action: 'read',
          subject: 'dashboard',
          title: 'navbar.dashboards_page.analytics',
          path: `/${uniqueName}/dashboards/analytics`
        }
      ]
    },
    {
      path: `/${uniqueName}/roles`,
      action: 'read',
      subject: 'role',
      title: 'navbar.role_page',
      icon: 'mdi:shield-outline'
    },
    {
      title: 'navbar.invoice_page.invoice',
      icon: 'mdi:file-document-outline',
      children: [
        {
          action: 'read',
          subject: 'invoice',
          title: 'navbar.invoice_page.list',
          path: `/${uniqueName}/invoice/list`
        },
        {
          action: 'create',
          subject: 'invoice',
          title: 'navbar.invoice_page.add',
          path: `/${uniqueName}/invoice/add`
        }
      ]
    },
    {
      path: `/${uniqueName}/users`,
      action: 'read',
      subject: 'user',
      title: 'navbar.user_page',
      icon: 'mdi:account-outline'
    },
    {
      action: 'read',
      subject: 'account-settings',
      title: 'navbar.account_settings_page.account_settings',
      icon: 'mdi:account-cog-outline',
      children: [
        {
          action: 'read',
          subject: 'account-settings',
          title: 'navbar.account_settings_page.account',
          path: `/${uniqueName}/account-settings/account`
        },
        {
          action: 'read',
          subject: 'account-settings',
          title: 'navbar.account_settings_page.security',
          path: `/${uniqueName}/account-settings/security`
        }
      ]
    }
  ]
}

export default navigation
