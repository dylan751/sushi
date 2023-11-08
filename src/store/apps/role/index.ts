// ** Redux Imports
import { createSlice, createAsyncThunk, Dispatch } from '@reduxjs/toolkit'

// ** Types
import { Api, CreateRoleRequestDto, RoleResponseDto, UpdateRoleRequestDto } from 'src/__generated__/AccountifyAPI'

// ** Utils
import { getAccessToken, getOrgId } from 'src/utils/localStorage'

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Roles
export const fetchData = createAsyncThunk('appRoles/fetchData', async () => {
  const organizationId = getOrgId()
  const storedToken = getAccessToken()

  const response = await new Api({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
    timeout: 30 * 1000, // 30 seconds
    headers: {
      Authorization: `Bearer ${storedToken}`
    }
  }).internal.getRoleListForOrganization(organizationId)

  return response.data
})

// ** Add Role
export const addRole = createAsyncThunk('appRoles/addRole', async (data: CreateRoleRequestDto, { dispatch }: Redux) => {
  const organizationId = getOrgId()
  const storedToken = getAccessToken()

  const response = await new Api({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
    timeout: 30 * 1000, // 30 seconds
    headers: {
      Authorization: `Bearer ${storedToken}`
    }
  }).internal.createRolesForAnOrganization(organizationId, data)

  dispatch(fetchData())

  return response.data
})

// ** Update Role
export const updateRole = createAsyncThunk(
  'appRoles/updateRole',
  async (data: UpdateRoleRequestDto & { roleId: number }, { dispatch }: Redux) => {
    const organizationId = getOrgId()
    const storedToken = getAccessToken()

    const response = await new Api({
      baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
      timeout: 30 * 1000, // 30 seconds
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    }).internal.updateARoleForAnOrganization(organizationId, data.roleId, data)

    dispatch(fetchData())

    return response.data
  }
)

// ** Delete Role

export const appRolesSlice = createSlice({
  name: 'appRoles',
  initialState: {
    data: [] as RoleResponseDto[]
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.roles
    })
  }
})

export default appRolesSlice.reducer
