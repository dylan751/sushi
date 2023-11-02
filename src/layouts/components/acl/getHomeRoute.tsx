/**
 *  Set Home URL based on User Roles
 */
const getHomeRoute = (role: string) => {
  const organization = JSON.parse(window.localStorage.getItem('organization')!)
  const uniqueName = organization ? `/${organization.uniqueName}` : ''

  if (role === 'unknown') return '/organization'
  else if (role === 'client') return '/acl'
  else return `${uniqueName}/home`
}

export default getHomeRoute
