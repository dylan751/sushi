// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Types
import { Api, OrganizationUserResponseDto } from 'src/__generated__/AccountifyAPI'

// ** Utils
import { getAccessToken, getOrgId } from 'src/utils/localStorage'

interface DataParams {
  query: string
  role: string
}

// ** Fetch Users
export const fetchData = createAsyncThunk('appUsers/fetchData', async (params: DataParams) => {
  const organizationId = getOrgId()
  const storedToken = getAccessToken()

  const response = await new Api({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
    timeout: 30 * 1000, // 30 seconds
    headers: {
      Authorization: `Bearer ${storedToken}`
    }
  }).internal.usersControllerFindAll(organizationId, params)

  return response.data
})

// ** Add User

// ** Update User

// ** Delete User

export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: [] as OrganizationUserResponseDto[],
    total: 1,
    params: {},
    allData: [] as OrganizationUserResponseDto[]
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.users
      state.total = action.payload.metadata.total
      state.params = action.payload.metadata.params
      state.allData = action.payload.metadata.allData
    })
  }
})

export default appUsersSlice.reducer
