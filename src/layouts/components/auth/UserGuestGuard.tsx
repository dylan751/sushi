// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Next Auth Imports
import { useSession } from 'next-auth/react'

interface UserGuestGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const UserGuestGuard = (props: UserGuestGuardProps) => {
  const { children, fallback } = props
  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    if (session.status === 'authenticated' && !router.query.returnUrl) {
      // TODO: Investigate more
      /**
       * Comment this for now as it causes `Abort fetching component for route: '/'` error
       * Check: https://stackoverflow.com/questions/73343986/next-js-abort-fetching-component-for-route-login
       */
      // router.replace('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.route, session.status])

  if (session.status === 'unauthenticated') {
    return <>{children}</>
  } else {
    return fallback
  }
}

export default UserGuestGuard
