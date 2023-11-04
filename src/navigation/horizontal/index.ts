// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => {
  const organization = JSON.parse(window.localStorage.getItem('organization')!)
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
      path: `${uniqueName}/role`,
      action: 'read',
      subject: 'role',
      title: 'navbar.role_page',
      icon: 'mdi:shield-outline'
    }
  ]
}

export default navigation
