import {
  Api,
  CaslPermission,
  LoginRequestDto,
  OrganizationProfileResponseDto,
  ProfileResponseDto,
  RegisterRequestDto
} from '../__generated__/AccountifyAPI'

export type ErrCallbackType = (err: { [key: string]: string }) => void

export type UserAuthValuesType = {
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
  register: (params: RegisterRequestDto, errorCallback?: ErrCallbackType) => void
}

export type ApiValuesType = {
  $api: Api<unknown>
  set$Api: (value: Api<unknown>) => void
}
