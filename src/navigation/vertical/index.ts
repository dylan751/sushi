// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

// ** Utils
import { getOrgUniqueName } from 'src/utils/organization'

const navigation = (): VerticalNavItemsType => {
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
      icon: 'mdi:account-outline'
    },
    {
      path: `/${uniqueName}/exchange-rates`,
      action: 'read',
      subject: 'settings',
      title: 'navbar.exchange_rates',
      icon: 'mdi:exchange'
    },
    {
      action: 'read',
      subject: 'settings',
      title: 'navbar.settings_page.settings',
      icon: 'mdi:account-cog-outline',
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
    },
    {
      title: 'navbar.landing_page.landing_pages',
      icon: 'mdi:content-copy',
      badgeContent: '4',
      badgeColor: 'info',
      children: [
        {
          action: 'read',
          subject: 'settings',
          title: 'navbar.landing_page.home',
          path: `${process.env.NEXT_PUBLIC_LANDING_PAGE_ENDPOINT}`,
          externalLink: true,
          openInNewTab: true
        },
        {
          action: 'read',
          subject: 'settings',
          title: 'navbar.landing_page.pricing',
          path: `${process.env.NEXT_PUBLIC_LANDING_PAGE_ENDPOINT}/pricing`,
          externalLink: true,
          openInNewTab: true
        },
        {
          action: 'read',
          subject: 'settings',
          title: 'navbar.landing_page.payment',
          path: `${process.env.NEXT_PUBLIC_LANDING_PAGE_ENDPOINT}/payment`,
          externalLink: true,
          openInNewTab: true
        },
        {
          action: 'read',
          subject: 'settings',
          title: 'navbar.landing_page.help_center',
          path: `${process.env.NEXT_PUBLIC_LANDING_PAGE_ENDPOINT}/help-center`,
          externalLink: true,
          openInNewTab: true
        }
      ]
    }
  ]
}

export default navigation
