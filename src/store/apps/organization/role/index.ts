// ** Redux Imports
import { createSlice, createAsyncThunk, Dispatch } from '@reduxjs/toolkit'

// ** Types
import { Api, CreateRoleRequestDto, RoleResponseDto, UpdateRoleRequestDto } from 'src/__generated__/AccountifyAPI'

// ** Utils
import { getAccessToken } from 'src/utils/localStorage'
import { fetchUser } from '../user'

// ** Third Party Imports
import toast from 'react-hot-toast'

interface DataParams {
  query: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Roles
export const fetchRole = createAsyncThunk(
  'appRoles/fetchRole',
  async (params: DataParams & { organizationId: number }) => {
    const storedToken = getAccessToken()
    const { organizationId, ...resParams } = params

    try {
      const response = await new Api({
        baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
        timeout: 30 * 1000, // 30 seconds
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }).internal.getRoleListForOrganization(organizationId, resParams)

      return response.data
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }
)

// ** Add Role
export const addRole = createAsyncThunk(
  'appRoles/addRole',
  async (data: CreateRoleRequestDto & { organizationId: number }, { dispatch }: Redux) => {
    const storedToken = getAccessToken()
    const { organizationId, ...resData } = data

    try {
      const response = await new Api({
        baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
        timeout: 30 * 1000, // 30 seconds
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }).internal.createRolesForAnOrganization(organizationId, resData)

      dispatch(fetchRole({ organizationId, query: '' }))
      toast.success('Add role succeed')

      return response.data
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }
)

// ** Update Role
export const updateRole = createAsyncThunk(
  'appRoles/updateRole',
  async (data: UpdateRoleRequestDto & { organizationId: number; roleId: number }, { dispatch }: Redux) => {
    const storedToken = getAccessToken()
    const { organizationId, ...resData } = data

    try {
      const response = await new Api({
        baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
        timeout: 30 * 1000, // 30 seconds
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }).internal.updateARoleForAnOrganization(organizationId, resData.roleId, resData)

      dispatch(fetchRole({ organizationId, query: '' }))
      toast.success('Update role succeed')

      return response.data
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }
)

// ** Delete Role
export const deleteRole = createAsyncThunk(
  'appRoles/deleteRole',
  async (params: { organizationId: number; roleId: number }, { dispatch }: Redux) => {
    const storedToken = getAccessToken()
    const { organizationId, roleId } = params

    try {
      const response = await new Api({
        baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
        timeout: 30 * 1000, // 30 seconds
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }).internal.deleteARoleForAnOrganization(organizationId, roleId)

      dispatch(fetchRole({ organizationId, query: '' }))
      dispatch(fetchUser({ organizationId, role: '', query: '' }))
      toast.success('Delete role succeed')

      return response.data
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }
)

export const appRolesSlice = createSlice({
  name: 'appRoles',
  initialState: {
    roles: [] as RoleResponseDto[],
    totalRoles: 0,
    paramsRoles: {}
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchRole.fulfilled, (state, action) => {
      state.roles = action.payload?.roles || []
      state.totalRoles = action.payload?.metadata.total || 0
      state.paramsRoles = action.payload?.metadata.params || {}
    })
  }
})

export default appRolesSlice.reducer
