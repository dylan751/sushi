// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'
import { getOrgUniqueName } from 'src/utils/organization'

// ** Utils

const navigation = (): HorizontalNavItemsType => {
  const uniqueName = getOrgUniqueName()

  return [
    {
      path: `/${uniqueName}/dashboards`,
      action: 'read',
      subject: 'dashboard',
      title: 'navbar.dashboards_page.dashboards',
      icon: 'mdi:home-outline',
      badgeContent: 'new',
      badgeColor: 'error'
    },
    {
      title: 'navbar.project_page.project',
      icon: 'mdi:cube-outline',
      children: [
        {
          action: 'read',
          subject: 'project',
          title: 'navbar.project_page.list',
          path: `/${uniqueName}/projects/list`
        },
        {
          action: 'create',
          subject: 'project',
          title: 'navbar.project_page.add',
          path: `/${uniqueName}/projects/add`
        }
      ]
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
      path: `/${uniqueName}/roles`,
      action: 'read',
      subject: 'role',
      title: 'navbar.role_page',
      icon: 'mdi:shield-outline'
    },
    {
      path: `/${uniqueName}/users`,
      action: 'read',
      subject: 'user',
      title: 'navbar.user_page',
      icon: 'mdi:outline'
    },
    {
      action: 'read',
      subject: 'settings',
      title: 'navbar.settings_page.settings',
      icon: 'mdi:cog-outline',
      children: [
        {
          action: 'read',
          subject: 'settings',
          title: 'navbar.settings_page.account',
          path: `/${uniqueName}/settings/account`
        },
        {
          action: 'read',
          subject: 'settings',
          title: 'navbar.settings_page.security',
          path: `/${uniqueName}/settings/security`
        },
        {
          action: 'read',
          subject: 'settings',
          title: 'navbar.settings_page.organization',
          path: `/${uniqueName}/settings/organization`
        }
      ]
    }
  ]
}

export default navigation
