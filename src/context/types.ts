import {
  CaslPermission,
  LoginRequestDto,
  OrganizationProfileResponseDto,
  ProfileResponseDto
} from '../__generated__/AccountifyAPI'

export type ErrCallbackType = (err: { [key: string]: string }) => void

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
  login: (params: LoginRequestDto, errorCallback?: ErrCallbackType) => void
}
