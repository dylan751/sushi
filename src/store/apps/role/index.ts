// ** Redux Imports
import { createSlice, createAsyncThunk, Dispatch } from '@reduxjs/toolkit'

// ** Types
import { Api, CreateRoleRequestDto, RoleResponseDto, UpdateRoleRequestDto } from 'src/__generated__/AccountifyAPI'

// ** Utils
import { getAccessToken, getOrgId } from 'src/utils/localStorage'
import { fetchUser } from '../user'

// ** Third Party Imports
import toast from 'react-hot-toast'

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Roles
export const fetchRole = createAsyncThunk('appRoles/fetchRole', async () => {
  const organizationId = getOrgId()
  const storedToken = getAccessToken()

  try {
    const response = await new Api({
      baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
      timeout: 30 * 1000, // 30 seconds
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    }).internal.getRoleListForOrganization(organizationId)

    return response.data
  } catch (error: any) {
    toast.error(error.message)
  }
})

// ** Add Role
export const addRole = createAsyncThunk('appRoles/addRole', async (data: CreateRoleRequestDto, { dispatch }: Redux) => {
  const organizationId = getOrgId()
  const storedToken = getAccessToken()

  try {
    const response = await new Api({
      baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
      timeout: 30 * 1000, // 30 seconds
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    }).internal.createRolesForAnOrganization(organizationId, data)

    dispatch(fetchRole())
    toast.success('Add role succeed')

    return response.data
  } catch (error: any) {
    toast.error(error.message)
  }
})

// ** Update Role
export const updateRole = createAsyncThunk(
  'appRoles/updateRole',
  async (data: UpdateRoleRequestDto & { roleId: number }, { dispatch }: Redux) => {
    const organizationId = getOrgId()
    const storedToken = getAccessToken()

    try {
      const response = await new Api({
        baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
        timeout: 30 * 1000, // 30 seconds
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }).internal.updateARoleForAnOrganization(organizationId, data.roleId, data)

      dispatch(fetchRole())

      return response.data
    } catch (error: any) {
      toast.error(error.message)
    }
  }
)

// ** Delete Role
export const deleteRole = createAsyncThunk('appRoles/deleteRole', async (roleId: number, { dispatch }: Redux) => {
  const organizationId = getOrgId()
  const storedToken = getAccessToken()

  try {
    const response = await new Api({
      baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
      timeout: 30 * 1000, // 30 seconds
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    }).internal.deleteARoleForAnOrganization(organizationId, roleId)

    dispatch(fetchRole())
    dispatch(fetchUser({ role: '', query: '' }))
    toast.success('Delete role succeed')

    return response.data
  } catch (error: any) {
    toast.error(error.message)
  }
})

export const appRolesSlice = createSlice({
  name: 'appRoles',
  initialState: {
    data: [] as RoleResponseDto[]
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchRole.fulfilled, (state, action) => {
      state.data = action.payload?.roles || []
    })
  }
})

export default appRolesSlice.reducer
