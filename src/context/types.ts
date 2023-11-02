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
  name: string
  password: string
  organizations: UserOrganizationType[]
  avatar?: string | null
}

export type OrganizationType = {
  id: number
  name: string
  uniqueName: string
}

export type UserOrganizationType = {
  id: number
  name: string
  uniqueName: string
  roles: any[]
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
}
