// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Next Auth Imports
import { useSession } from 'next-auth/react'

// ** Utils Imports
import { getLoginUrl } from 'src/utils/router/auth'

interface UserAuthGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const UserAuthGuard = (props: UserAuthGuardProps) => {
  const { children, fallback } = props
  const session = useSession()
  const router = useRouter()

  useEffect(
    () => {
      if (!router.isReady) {
        return
      }

      if (session.status === 'unauthenticated') {
        if (router.asPath !== '/') {
          router.replace({
            pathname: getLoginUrl(),
            query: { returnUrl: router.asPath }
          })
        } else {
          router.replace(getLoginUrl())
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route, session.status]
  )

  if (session.status !== 'authenticated') {
    return fallback
  }

  return <>{children}</>
}

export default UserAuthGuard
