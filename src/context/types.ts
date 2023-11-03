import { CaslPermission, OrganizationProfileResponseDto, ProfileResponseDto } from '../__generated__/AccountifyAPI'

export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: ProfileResponseDto | null
  organization: OrganizationProfileResponseDto | null
  permissions: CaslPermission[]
  setLoading: (value: boolean) => void
  setUser: (value: ProfileResponseDto | null) => void
  setOrganization: (value: OrganizationProfileResponseDto | null) => void
  setPermissions: (value: CaslPermission[]) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
}
