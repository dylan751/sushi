import {
  Api,
  CaslPermission,
  LoginRequestDto,
  OrganizationProfileResponseDto,
  ProfileResponseDto,
  RegisterRequestDto
} from '../__generated__/AccountifyAPI'

export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
}

export type UserDataType = {
  id: number
  role: string
  email: string
  fullName: string
  username: string
  password: string
  avatar?: string | null
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
}

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
