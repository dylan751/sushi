// ** Redux Imports
import { createSlice, createAsyncThunk, Dispatch } from '@reduxjs/toolkit'

// ** Third Party Imports
import toast from 'react-hot-toast'

// ** Types
import {
  Api,
  BulkInviteRequestDto,
  OrganizationUserResponseDto,
  UpdateOrganizationUserRequestDto
} from 'src/__generated__/AccountifyAPI'

// ** Utils
import { getAccessToken } from 'src/utils/localStorage'

interface DataParams {
  query: string
  role: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Users
export const fetchUser = createAsyncThunk(
  'appUsers/fetchUser',
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
      }).internal.getUserListForOrganization(organizationId, resParams)

      return response.data
    } catch (error: any) {
      toast.error(error.message)
    }
  }
)

// ** Add User
export const addUser = createAsyncThunk(
  'appUsers/addUser',
  async (data: BulkInviteRequestDto & { organizationId: number }, { dispatch }: Redux) => {
    const storedToken = getAccessToken()
    const { organizationId, ...resData } = data

    try {
      const response = await new Api({
        baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
        timeout: 30 * 1000, // 30 seconds
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }).internal.inviteUsersToOrganization(organizationId, resData)

      dispatch(fetchUser({ organizationId, role: '', query: '' }))
      dispatch(fetchAdminCount(organizationId))
      toast.success('Add user succeed')

      return response.data
    } catch (error: any) {
      toast.error(error.message)
    }
  }
)

// ** Update User
export const updateUser = createAsyncThunk(
  'appUsers/updateUser',
  async (data: UpdateOrganizationUserRequestDto & { organizationId: number; userId: number }, { dispatch }: Redux) => {
    const storedToken = getAccessToken()
    const { organizationId, ...resData } = data

    try {
      const response = await new Api({
        baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
        timeout: 30 * 1000, // 30 seconds
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }).internal.updateOrganizationUserInformation(organizationId, resData.userId, resData)

      dispatch(fetchUser({ organizationId, role: '', query: '' }))
      dispatch(fetchAdminCount(organizationId))
      toast.success('Update user role succeed')

      return response.data
    } catch (error: any) {
      toast.error(error.message)
    }
  }
)

// ** Delete User
export const deleteUser = createAsyncThunk(
  'appRoles/deleteUser',
  async (params: { organizationId: number; userId: number }, { dispatch }: Redux) => {
    const storedToken = getAccessToken()
    const { organizationId, userId } = params

    try {
      const response = await new Api({
        baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
        timeout: 30 * 1000, // 30 seconds
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }).internal.deleteAnOrganizationUser(organizationId, userId)

      dispatch(fetchUser({ organizationId, role: '', query: '' }))
      dispatch(fetchAdminCount(organizationId))
      toast.success('Remove user from this organization succeed')

      return response.data
    } catch (error: any) {
      toast.error(error.message)
    }
  }
)

// ** Fetch Admin counts
export const fetchAdminCount = createAsyncThunk('appUsers/fetchAdminCount', async (organizationId: number) => {
  const storedToken = getAccessToken()

  try {
    const response = await new Api({
      baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
      timeout: 30 * 1000, // 30 seconds
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    }).internal.countTotalAdminsOfOrganization(organizationId)

    return response.data
  } catch (error: any) {
    toast.error(error.message)
  }
})

export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    users: [] as OrganizationUserResponseDto[],
    totalUsers: 0,
    paramsUsers: {},

    totalAdmins: 0
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.users = action.payload?.users || []
      state.totalUsers = action.payload?.metadata.total || 0
      state.paramsUsers = action.payload?.metadata.params || {}
    }),
      builder.addCase(fetchAdminCount.fulfilled, (state, action) => {
        state.totalAdmins = action.payload?.totalAdmins || 0
      })
  }
})

export default appUsersSlice.reducer
