// ** React Imports
import { ReactNode, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Types
import type { ACLObj, AppAbility } from 'src/configs/userAcl'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Config Imports
import { buildAbilityFor } from 'src/configs/userAcl'

// ** Component Imports
import NotAuthorized from 'src/pages/401'
import Spinner from 'src/@core/components/spinner'
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useSession } from 'next-auth/react'

// ** Util Imports
import getUserHomeRoute from 'src/layouts/components/acl/getUserHomeRoute'
import { getOrgUniqueName } from 'src/utils/organization'
import { getAccessToken, getOrganization } from 'src/utils/localStorage'

// ** Axios Imports
import { $api } from 'src/utils/api'

// ** Store Imports
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'
import { fetchProfile } from 'src/store/auth/profile'
import { fetchPermissions } from 'src/store/auth/permission'

interface AclGuardProps {
  children: ReactNode
  authGuard?: boolean
  guestGuard?: boolean
  aclAbilities: ACLObj
}

const UserAclGuard = (props: AclGuardProps) => {
  // ** Props
  const { aclAbilities, children, guestGuard = false, authGuard = true } = props

  // ** Hooks
  const session = useSession()
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  // ** Vars
  let ability: AppAbility

  useEffect(() => {
    // This code runs on page reload
    const initAuth = async (): Promise<void> => {
      if (session.data && session.data.accessToken) {
        localStorage.setItem('accessToken', session.data.accessToken)
      }

      if (session.data && session.data.user) {
        const orgUniqueName = getOrgUniqueName()
        const organization = session.data.user.organizations.find(org => org.uniqueName === orgUniqueName)
        if (organization) {
          const response = await $api(session.data.accessToken).internal.getOrganizationUsersPermissions(
            organization.id
          )
          localStorage.setItem('organization', JSON.stringify(organization))
          localStorage.setItem('permissions', JSON.stringify(response.data.permissions))
        }

        // If user manually change the url, then redirect them to that organization's defaultHomeRoute
        const homeRoute = getUserHomeRoute(organization, router.asPath)
        router.replace(homeRoute)
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const storedToken = getAccessToken()
    const organization = getOrganization()
    if (session.data && session.data.user && storedToken) {
      dispatch(fetchProfile())
      if (organization) {
        dispatch(fetchPermissions())
      }
    }
  }, [dispatch, session.data])

  // User is logged in, build ability for the user based on his role
  if (session.data && session.data.user && !ability) {
    const permissions = JSON.parse(window.localStorage.getItem('permissions')!)
    ability = buildAbilityFor(permissions)

    // ability = buildAbilityFor((session.data as any).permissions)
    if (router.route === '/') {
      return <Spinner />
    }
  }

  // If guest guard or no guard is true or any error page
  if (guestGuard || router.route === '/404' || router.route === '/500' || !authGuard) {
    // If user is logged in and his ability is built
    if (session.data && session.data.user && ability) {
      return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
    } else {
      // If user is not logged in (render pages like login, register etc..)
      return <>{children}</>
    }
  }

  // Check the access of current user and render pages
  if (ability && session.data && session.data.user && ability.can(aclAbilities.action, aclAbilities.subject)) {
    if (router.route === '/') {
      return <Spinner />
    }

    return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
  }

  // Render Not Authorized component if the current user has limited access
  return (
    <BlankLayout>
      <NotAuthorized />
    </BlankLayout>
  )
}

export default UserAclGuard
