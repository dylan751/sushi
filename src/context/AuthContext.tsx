// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import { AuthValuesType, ErrCallbackType } from './types'
import {
  CaslPermission,
  LoginRequestDto,
  OrganizationProfileResponseDto,
  PermissionAction,
  PermissionSubject,
  ProfileResponseDto
} from 'src/__generated__/AccountifyAPI'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  organization: null,
  permissions: [{ action: PermissionAction.READ, subject: PermissionSubject.USER }],
  loading: true,
  setUser: () => null,
  setOrganization: () => null,
  setPermissions: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<ProfileResponseDto | null>(defaultProvider.user)
  const [organization, setOrganization] = useState<OrganizationProfileResponseDto | null>(defaultProvider.organization)
  const [permissions, setPermissions] = useState<CaslPermission[]>(defaultProvider.permissions)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!

      if (storedToken) {
        setLoading(true)
        await axios
          .get(authConfig.meEndpoint, {
            headers: {
              Authorization: `Bearer ${storedToken}`
            }
          })
          .then(async response => {
            setLoading(false)
            setUser(response.data)
          })
          .catch(() => {
            localStorage.removeItem('userData')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('accessToken')
            setUser(null)
            setLoading(false)
            if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
              router.replace('/login')
            }
          })
      } else {
        setLoading(false)
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params: LoginRequestDto, errorCallback?: ErrCallbackType) => {
    axios
      .post(authConfig.loginEndpoint, params)
      .then(async response => {
        window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken)
        const returnUrl = router.query.returnUrl

        setUser(response.data.userData)
        window.localStorage.setItem('userData', JSON.stringify(response.data.userData))

        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

        router.replace(redirectURL as string)
      })

      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem('organization')
    window.localStorage.removeItem('permissions')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const values = {
    user,
    organization,
    permissions,
    loading,
    setUser,
    setOrganization,
    setPermissions,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
