// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Hooks Import
import { useUserAuth } from 'src/hooks/useUserAuth'

interface UserGuestGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const UserGuestGuard = (props: UserGuestGuardProps) => {
  const { children, fallback } = props
  const auth = useUserAuth()
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    if (window.localStorage.getItem('userData')) {
      router.replace('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.route])

  if (auth.loading || (!auth.loading && auth.user !== null)) {
    return fallback
  }

  return <>{children}</>
}

export default UserGuestGuard
