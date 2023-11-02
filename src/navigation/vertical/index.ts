// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  const organization = JSON.parse(window.localStorage.getItem('organization')!)
  const uniqueName = organization ? `/${organization.uniqueName}` : ''

  return [
    {
      title: 'Home',
      path: `${uniqueName}/home`,
      icon: 'mdi:home-outline'
    },
    {
      title: 'Second Page',
      path: `${uniqueName}/second-page`,
      icon: 'mdi:email-outline'
    },
    {
      path: `${uniqueName}/acl`,
      action: 'read',
      subject: 'acl-page',
      title: 'Access Control',
      icon: 'mdi:shield-outline'
    }
  ]
}

export default navigation
