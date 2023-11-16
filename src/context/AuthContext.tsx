// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Config
import authConfig from 'src/configs/auth'

// ** Third Party Imports
import toast from 'react-hot-toast'

// ** Hooks
import { useApi } from 'src/hooks/useApi'

// ** Types
import { AuthValuesType, ErrCallbackType } from './types'
import {
  Api,
  CaslPermission,
  LoginRequestDto,
  OrganizationProfileResponseDto,
  PermissionAction,
  PermissionSubject,
  ProfileResponseDto,
  RegisterRequestDto
} from 'src/__generated__/AccountifyAPI'

// ** Utils
import { getAccessToken } from 'src/utils/localStorage'
import { getOrgUniqueName } from 'src/utils/organization'

// ** Store Imports
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'
import { fetchProfile } from 'src/store/auth/profile'
import { fetchPermissions } from 'src/store/auth/permission'

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
  register: () => Promise.resolve(),
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
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchProfile())
    dispatch(fetchPermissions())
  }, [dispatch])

  const { $api, set$Api } = useApi()

  // This runs whenever the page is reloaded
  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = getAccessToken()

      if (storedToken) {
        const api = new Api({
          baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
          timeout: 30 * 1000, // 30 seconds
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        })

        // Re-create axios instance with Bearer token everytime the page is reloaded
        set$Api(api)

        setLoading(true)

        // This api is called right after the page is reloaded, therefore it haven't had attached accesstoken yet
        api.internal
          .getUserProfile()
          .then(async response => {
            setLoading(false)
            setUser(response.data)

            /**
             * Check current url
             * Get uniqueName from the user's manual typing url
             * If it's a valid uniqueName -> set organization, permissions in localStorage -> redirect
             * If it's not a valid uniqueName -> redirect to /organization page for the user to select again
             * TODO: Consider Server-side rendered navItems (dynamic?)
             */
            const orgUniqueName = getOrgUniqueName()
            const organization = response.data.organizations.find(org => org.uniqueName === orgUniqueName)
            if (organization) {
              window.localStorage.setItem('organization', JSON.stringify(organization))
              setOrganization(organization)
              const response = await api.internal.getUserPermissions(organization.id)
              setPermissions(response.data.permissions)
            } else {
              router.replace('/organization')
            }
          })
          .catch(() => {
            localStorage.removeItem('userData')
            localStorage.removeItem('organization')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem(authConfig.storageTokenKeyName)
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
    $api.internal
      .login(params)
      .then(async response => {
        window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken)
        const returnUrl = router.query.returnUrl

        setUser(response.data.userData)
        window.localStorage.setItem('userData', JSON.stringify(response.data.userData))

        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

        // Create axios instance with Bearer token
        set$Api(
          new Api({
            baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
            timeout: 30 * 1000, // 30 seconds
            headers: {
              Authorization: `Bearer ${getAccessToken()}`
            }
          })
        )

        toast.success('Login succeed')
        router.replace(redirectURL as string)
      })

      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleRegister = (params: RegisterRequestDto, errorCallback?: ErrCallbackType) => {
    $api.internal
      .register(params)
      .then(() => {
        toast.success('Register succeed')
        router.replace('/login')
      })

      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem('organization')
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
    register: handleRegister,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
